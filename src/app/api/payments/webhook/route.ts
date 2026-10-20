/**
 * POST /api/payments/webhook
 * ─────────────────────────────────────────────────────────────────────────────
 * Razorpay Webhook — the ONLY place that confirms payments and grants access.
 *
 * Flow:
 *   Razorpay (payment success/failure)
 *     → POST /api/payments/webhook (this file)
 *     → Verify HMAC signature (reject if invalid — prevents fake webhooks)
 *     → Update payment record status
 *     → If class_enrollment: set enrollment status = 'confirmed'
 *     → If membership: set membership status = 'active', set expires_at
 *     → Grant recording_access if applicable
 *
 * Security:
 *   - Webhook secret verified via HMAC-SHA256 (Razorpay standard).
 *   - Uses service-role client — no user session required.
 *   - No browser can call this — it is called by Razorpay servers only.
 */

import { NextRequest } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { ok, fail, serverError } from '@/lib/api/response'
import { sendEmail } from '@/lib/email/service'
import { verifyRazorpayWebhookSignature } from '@/lib/security/crypto'
import { checkRateLimit, rateLimitExceededResponse } from '@/lib/security/rateLimit'
import {
  claimPayment,
  confirmEnrollment,
  getOwnedEnrollment,
  grantMembership,
} from '@/lib/payments/entitlements'

export async function POST(req: NextRequest) {
  try {
    // 0. Webhook Rate Limiting (120 requests/min to protect against DoS)
    const rateLimit = checkRateLimit(req, { windowMs: 60 * 1000, max: 120, prefix: 'webhook' })
    if (!rateLimit.allowed) {
      return rateLimitExceededResponse(rateLimit)
    }

    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
      return fail('Missing webhook signature or secret.', 400)
    }

    // 1. Verify HMAC signature with timing-safe comparison — rejects any fake/tampered webhook
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature)
    if (!isValid) {
      return fail('Invalid webhook signature.', 401)
    }

    const event = JSON.parse(rawBody)
    const serviceSupabase = await createServiceClient()

    // 2. Handle payment.captured (successful payment)
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity
      // Notes were written by our own server when the order was created
      // (create-order / create-subscription) and the webhook body is signed.
      const notes = payment.notes ?? {}
      const userId: string = notes.userId
      const type: string = notes.type
      const referenceId: string = notes.referenceId

      if (!userId || (type !== 'class_enrollment' && type !== 'membership') || !referenceId) {
        console.error('[Webhook] payment.captured without usable notes', { orderId: payment.order_id })
        return ok({ received: true, ignored: true })
      }

      let classId: string | null = null
      if (type === 'class_enrollment') {
        const enrollment = await getOwnedEnrollment(serviceSupabase, referenceId, userId)
        if (!enrollment) {
          console.error('[Webhook] Enrollment not found for paid order', { orderId: payment.order_id, referenceId })
          return serverError('Enrollment not found.') // non-2xx → Razorpay retries
        }
        classId = enrollment.classId
      }

      // Claim the order exactly once (verify route may already have done it)
      const claim = await claimPayment(serviceSupabase, {
        orderId: payment.order_id,
        paymentId: payment.id,
        userId,
        type,
        referenceId: type === 'class_enrollment' ? classId : referenceId,
        amountPaise: Number(payment.amount),
        currency: payment.currency,
      })

      if (claim === 'error') return serverError('Ledger update failed.') // Razorpay retries
      if (claim === 'already_processed') return ok({ received: true, alreadyProcessed: true })

      // Email + name for notifications
      const { data: authUser } = await serviceSupabase.auth.admin.getUserById(userId)
      const { data: profile } = await serviceSupabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .maybeSingle()
      const userEmail = authUser?.user?.email ?? ''
      const userName = profile?.full_name ?? 'Valued Customer'

      if (type === 'class_enrollment') {
        const confirmed = await confirmEnrollment(serviceSupabase, referenceId, userId)
        if (!confirmed) {
          console.error(`[Webhook] PAID BUT NOT CONFIRMED — order=${payment.order_id} enrollment=${referenceId}`)
          return serverError('Enrollment confirm failed.')
        }

        if (userEmail) {
          await sendEmail({
            type: 'PAYMENT_CONFIRMATION',
            to: userEmail,
            name: userName,
            amount: payment.amount,
            orderId: payment.order_id,
            paymentId: payment.id,
            description: 'Ayurvedic Masterclass Enrollment',
          }).catch(console.error) // Non-blocking — don't fail the webhook if email fails
        }
      }

      if (type === 'membership') {
        const { ok: granted, expiresAt } = await grantMembership(serviceSupabase, {
          userId,
          orderId: payment.order_id,
          planName: notes.planName ?? null,
          billingPeriod: notes.billingPeriod ?? null,
        })
        if (!granted) {
          console.error(`[Webhook] PAID BUT MEMBERSHIP NOT GRANTED — order=${payment.order_id}`)
          return serverError('Membership grant failed.')
        }

        if (userEmail) {
          await sendEmail({
            type: 'MEMBERSHIP_ACTIVATION',
            to: userEmail,
            name: userName,
            planName: notes.planName || 'Angel Touch Premium Membership',
            expiresAt: expiresAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            libraryUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/customer/library`,
          }).catch(console.error)
        }
      }
    }

    // 3. Handle payment.failed
    if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity
      const { userId, type, referenceId } = payment.notes

      await serviceSupabase.from('payments').insert({
        user_id: userId,
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: 'failed',
        payment_type: type,
      })

      // Revert enrollment to cancelled if payment failed
      if (type === 'class_enrollment') {
        await serviceSupabase
          .from('class_enrollments')
          .update({ status: 'cancelled' })
          .eq('id', referenceId)
          .eq('user_id', userId)
      }

      // Fetch user email for notifications
      const { data: profile } = await serviceSupabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single()

      if (profile?.email) {
        await sendEmail({
          type: 'PAYMENT_FAILED',
          to: profile.email,
          name: profile.full_name ?? 'Valued Customer',
          amount: payment.amount,
          orderId: payment.order_id,
          retryUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/account/billing`,
        }).catch(console.error)
      }
    }

    // 4. Handle Refunds
    if (event.event === 'refund.processed' || event.event === 'refund.created') {
      const refund = event.payload.refund.entity
      const paymentId = refund.payment_id

      // Find the payment to see what it was for
      const { data: paymentRecord } = await serviceSupabase
        .from('payments')
        .select('user_id, payment_type, razorpay_order_id, reference_id')
        .eq('razorpay_payment_id', paymentId)
        .single()

      if (paymentRecord) {
        // Mark payment as refunded
        await serviceSupabase
          .from('payments')
          .update({ status: 'refunded' })
          .eq('razorpay_payment_id', paymentId)

        if (paymentRecord.payment_type === 'class_enrollment') {
          // Revoke access to THIS class only (reference_id = Sanity class _id).
          // Never cancel by user_id alone — that would wipe every class they own.
          if (paymentRecord.reference_id) {
            await serviceSupabase
              .from('class_enrollments')
              .update({ status: 'cancelled' })
              .eq('user_id', paymentRecord.user_id)
              .eq('class_id', paymentRecord.reference_id)
          } else {
            console.error('[Webhook] Refund without reference_id — revoke manually', { paymentId })
          }
        } else if (paymentRecord.payment_type === 'membership') {
          // Revoke membership access immediately
          await serviceSupabase
            .from('memberships')
            .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
            .eq('gateway_subscription_id', paymentRecord.razorpay_order_id || '')
        }
      }
    }

    // 5. True Razorpay Subscription Events (Future-proofing for Phase 17/18)
    if (event.event.startsWith('subscription.')) {
      const subscription = event.payload.subscription.entity
      const subId = subscription.id
      
      if (event.event === 'subscription.activated' || event.event === 'subscription.charged') {
        // Extended time based on current end or new billing cycle
        // Razorpay sends current_end in unix timestamp
        const expiresAt = subscription.current_end ? new Date(subscription.current_end * 1000).toISOString() : new Date().toISOString()
        
        await serviceSupabase
          .from('memberships')
          .update({ status: 'active', expires_at: expiresAt })
          .eq('gateway_subscription_id', subId)
      }
      
      if (event.event === 'subscription.cancelled') {
        await serviceSupabase
          .from('memberships')
          .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
          .eq('gateway_subscription_id', subId)
      }
      
      if (event.event === 'subscription.halted') {
        await serviceSupabase
          .from('memberships')
          .update({ status: 'paused' })
          .eq('gateway_subscription_id', subId)
      }
      
      if (event.event === 'subscription.completed') {
        await serviceSupabase
          .from('memberships')
          .update({ status: 'expired' })
          .eq('gateway_subscription_id', subId)
      }
    }

    return ok({ received: true })

  } catch {
    return serverError('Webhook processing failed.')
  }
}
