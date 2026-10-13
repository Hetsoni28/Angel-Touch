/**
 * POST /api/payments/verify
 * ─────────────────────────────────────────────────────────────────────────────
 * Server-Side Payment Verification
 *
 * Security:
 *   - Authenticated user session required.
 *   - Rate limited to prevent brute force signature testing.
 *   - Input validated with Zod.
 *   - Cryptographic HMAC-SHA256 signature verification via timing-safe comparison.
 *   - Secrets (RAZORPAY_KEY_SECRET) never exposed to browser.
 *   - Updates Supabase ledger and confirms access via service-role client.
 */

import { NextRequest } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { ok, fail, unauthorized, serverError } from '@/lib/api/response'
import { verifyPaymentSchema } from '@/lib/security/validation'
import { verifyRazorpayPaymentSignature } from '@/lib/security/crypto'
import { checkRateLimit, rateLimitExceededResponse, RATE_LIMIT_PRESETS } from '@/lib/security/rateLimit'
import { sendEmail } from '@/lib/email/service'

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const rateLimit = checkRateLimit(req, RATE_LIMIT_PRESETS.PAYMENTS)
    if (!rateLimit.allowed) {
      return rateLimitExceededResponse(rateLimit)
    }

    // 2. Authenticate User Session
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return unauthorized()
    }

    // 3. Input Validation
    const body = await req.json()
    const parsed = verifyPaymentSchema.safeParse(body)
    if (!parsed.success) {
      return fail(parsed.error.issues[0]?.message || 'Invalid request parameters.', 400)
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      type,
      referenceId,
    } = parsed.data

    // 4. Server-Side HMAC-SHA256 Cryptographic Signature Verification
    const isValidSignature = verifyRazorpayPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!isValidSignature) {
      console.warn(
        `[Security] Signature verification failed for order: ${razorpay_order_id}, user: ${user.id}`
      )
      return fail('Cryptographic payment verification failed. Invalid signature.', 400)
    }

    // 5. Database Updates via Service Client (Secure Ledger)
    const serviceSupabase = await createServiceClient()

    // Upsert payment into payments ledger
    const { error: paymentError } = await serviceSupabase.from('payments').upsert(
      {
        user_id: user.id,
        razorpay_order_id,
        razorpay_payment_id,
        status: 'succeeded',
        payment_type: type,
        reference_id: referenceId,
      },
      { onConflict: 'razorpay_order_id' }
    )

    if (paymentError) {
      console.error('[Database Error] Failed to update payment ledger:', paymentError)
    }

    // Fetch user profile for email notifications
    const { data: profile } = await serviceSupabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', user.id)
      .single()

    const userEmail = profile?.email || user.email || ''
    const userName = profile?.full_name || 'Valued Customer'

    // 6. Grant Entitlements Based on Payment Type
    if (type === 'class_enrollment') {
      // Confirm the enrollment
      await serviceSupabase
        .from('class_enrollments')
        .update({ status: 'confirmed' })
        .eq('id', referenceId)
        .eq('user_id', user.id)

      // Send confirmation email (non-blocking)
      if (userEmail) {
        sendEmail({
          type: 'PAYMENT_CONFIRMATION',
          to: userEmail,
          name: userName,
          amount: 0, // amount is recorded in ledger
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          description: 'Ayurvedic Masterclass Enrollment',
        }).catch((err) => console.error('[Email Error]:', err))
      }
    } else if (type === 'membership') {
      // Activate membership for 30 days
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)

      await serviceSupabase.from('memberships').upsert(
        {
          user_id: user.id,
          plan_name: 'Premium',
          tier: 'premium',
          status: 'active',
          expires_at: expiresAt.toISOString(),
          started_at: new Date().toISOString(),
          gateway: 'razorpay',
          gateway_subscription_id: razorpay_order_id,
        },
        { onConflict: 'user_id' }
      )

      if (userEmail) {
        sendEmail({
          type: 'MEMBERSHIP_ACTIVATION',
          to: userEmail,
          name: userName,
          planName: 'Angel Touch Premium Membership',
          expiresAt: expiresAt.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          libraryUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/customer/library`,
        }).catch((err) => console.error('[Email Error]:', err))
      }
    }

    return ok({
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      type,
    })
  } catch (error) {
    console.error('[Server Error] Payment verification failed:', error)
    return serverError('Internal server error during payment verification.')
  }
}
