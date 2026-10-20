/**
 * POST /api/payments/verify
 * ─────────────────────────────────────────────────────────────────────────────
 * Server-side payment verification, called by the browser right after the
 * Razorpay checkout succeeds.
 *
 * What the browser sends is NOT trusted for anything except identifying the
 * order. Everything that decides access comes from Razorpay itself:
 *
 *   1. Checkout signature (HMAC of order_id|payment_id) must be valid.
 *   2. The order is fetched from Razorpay. Its `notes` (written by OUR server
 *      in create-order / create-subscription) say who it belongs to and what
 *      it pays for. The order must belong to the logged-in user, and the
 *      type / referenceId sent by the browser must match the notes.
 *   3. The payment is fetched from Razorpay. It must belong to that order,
 *      be captured, and be for the full order amount.
 *   4. The ledger row for the order is claimed exactly once — replaying the
 *      same order/payment/signature cannot grant access a second time.
 *
 * The webhook (/api/payments/webhook) applies the same rules, so whichever
 * of the two arrives first grants access and the other is a no-op.
 */

import { NextRequest } from 'next/server'
import Razorpay from 'razorpay'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { ok, fail, unauthorized, forbidden, serverError, paymentsDisabled } from '@/lib/api/response'
import { PAYMENTS_ENABLED } from '@/lib/features'
import { verifyPaymentSchema } from '@/lib/security/validation'
import { verifyRazorpayPaymentSignature } from '@/lib/security/crypto'
import { checkRateLimit, rateLimitExceededResponse, RATE_LIMIT_PRESETS } from '@/lib/security/rateLimit'
import { sendEmail } from '@/lib/email/service'
import {
  claimPayment,
  confirmEnrollment,
  getOwnedEnrollment,
  grantMembership,
} from '@/lib/payments/entitlements'

const PENDING_MESSAGE =
  'Your payment was received but is still pending confirmation. Access will activate automatically within a few minutes — please do not pay again.'

export async function POST(req: NextRequest) {
  // Inquiry mode: online payments are switched off (src/lib/features.ts)
  if (!PAYMENTS_ENABLED) return paymentsDisabled()

  try {
    // 1. Rate limiting
    const rateLimit = checkRateLimit(req, RATE_LIMIT_PRESETS.PAYMENTS)
    if (!rateLimit.allowed) {
      return rateLimitExceededResponse(rateLimit)
    }

    // 2. Authenticated user
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorized()

    // 3. Input validation
    const body = await req.json()
    const parsed = verifyPaymentSchema.safeParse(body)
    if (!parsed.success) {
      return fail(parsed.error.issues[0]?.message || 'Invalid request parameters.', 400)
    }
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, type, referenceId } = parsed.data

    // 4. Checkout signature
    const isValidSignature = verifyRazorpayPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })
    if (!isValidSignature) {
      console.warn(`[Security] Bad checkout signature. order=${razorpay_order_id} user=${user.id}`)
      return fail('Payment verification failed. Invalid signature.', 400)
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return serverError('Payment gateway is not configured.')
    }

    // 5. Ask Razorpay what this order and payment actually are
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id),
    ])

    const notes = (order.notes ?? {}) as Record<string, string | number | undefined>
    const orderUserId = String(notes.userId ?? '')
    const orderType = String(notes.type ?? '')
    const orderReferenceId = String(notes.referenceId ?? '')

    // 5a. Order must belong to this user
    if (!orderUserId || orderUserId !== user.id) {
      console.warn(`[Security] Order ${razorpay_order_id} belongs to ${orderUserId}, verify called by ${user.id}`)
      return forbidden()
    }

    // 5b. Browser's claim must match what our server put on the order
    if (orderType !== type || orderReferenceId !== referenceId) {
      console.warn(
        `[Security] Verify mismatch. order=${razorpay_order_id} notes=${orderType}/${orderReferenceId} body=${type}/${referenceId}`
      )
      return fail('Payment details do not match this order.', 400)
    }

    // 5c. Payment must belong to the order and cover the full amount
    const orderAmount = Number(order.amount)
    const paidAmount = Number(payment.amount)
    if (payment.order_id !== order.id || paidAmount !== orderAmount || payment.currency !== order.currency) {
      console.warn(`[Security] Payment ${razorpay_payment_id} does not match order ${razorpay_order_id}`)
      return fail('Payment does not match this order.', 400)
    }

    // 5d. Money must actually be captured
    if (payment.status !== 'captured') {
      // 'authorized' = bank approved but not yet captured; the webhook will finish it.
      return fail(PENDING_MESSAGE, 409)
    }

    // 6. Grant access — exactly once per order
    const serviceSupabase = await createServiceClient()

    let enrollmentClassId: string | null = null
    if (orderType === 'class_enrollment') {
      const enrollment = await getOwnedEnrollment(serviceSupabase, orderReferenceId, user.id)
      if (!enrollment) {
        console.error(`[Payments] Enrollment ${orderReferenceId} not found for user ${user.id}`)
        return fail(PENDING_MESSAGE, 500)
      }
      enrollmentClassId = enrollment.classId
    }

    const claim = await claimPayment(serviceSupabase, {
      orderId: order.id,
      paymentId: payment.id,
      userId: user.id,
      type: orderType as 'class_enrollment' | 'membership',
      referenceId: orderType === 'class_enrollment' ? enrollmentClassId : orderReferenceId,
      amountPaise: paidAmount,
      currency: payment.currency,
    })

    if (claim === 'error') {
      return fail(PENDING_MESSAGE, 500)
    }

    if (claim === 'already_processed') {
      // Webhook (or an earlier verify) already granted access for this order.
      return ok({ verified: true, alreadyProcessed: true, orderId: order.id, type: orderType })
    }

    // claim === 'claimed' → this request grants the entitlement
    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle()
    const userEmail = user.email || ''
    const userName = profile?.full_name || 'Valued Customer'

    if (orderType === 'class_enrollment') {
      const confirmed = await confirmEnrollment(serviceSupabase, orderReferenceId, user.id)
      if (!confirmed) {
        console.error(`[Payments] PAID BUT NOT CONFIRMED — order=${order.id} enrollment=${orderReferenceId}`)
        return fail(PENDING_MESSAGE, 500)
      }

      if (userEmail) {
        sendEmail({
          type: 'PAYMENT_CONFIRMATION',
          to: userEmail,
          name: userName,
          amount: paidAmount,
          orderId: order.id,
          paymentId: payment.id,
          description: 'Ayurvedic Masterclass Enrollment',
        }).catch((err) => console.error('[Email Error]:', err))
      }
    } else if (orderType === 'membership') {
      const { ok: granted, expiresAt } = await grantMembership(serviceSupabase, {
        userId: user.id,
        orderId: order.id,
        planName: notes.planName ? String(notes.planName) : null,
        billingPeriod: notes.billingPeriod ? String(notes.billingPeriod) : null,
      })
      if (!granted) {
        console.error(`[Payments] PAID BUT MEMBERSHIP NOT GRANTED — order=${order.id}`)
        return fail(PENDING_MESSAGE, 500)
      }

      if (userEmail) {
        sendEmail({
          type: 'MEMBERSHIP_ACTIVATION',
          to: userEmail,
          name: userName,
          planName: notes.planName ? String(notes.planName) : 'Angel Touch Premium Membership',
          expiresAt: expiresAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
          libraryUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/customer/library`,
        }).catch((err) => console.error('[Email Error]:', err))
      }
    } else {
      return fail('Unknown payment type.', 400)
    }

    return ok({ verified: true, paymentId: payment.id, orderId: order.id, type: orderType })
  } catch (error) {
    console.error('[Server Error] Payment verification failed:', error)
    return serverError('Internal server error during payment verification.')
  }
}
