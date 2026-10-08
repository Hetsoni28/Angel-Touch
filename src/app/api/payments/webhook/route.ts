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
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
      return fail('Missing webhook signature or secret.', 400)
    }

    // 1. Verify HMAC signature — rejects any fake/tampered webhook
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex')

    if (expectedSignature !== signature) {
      return fail('Invalid webhook signature.', 401)
    }

    const event = JSON.parse(rawBody)
    const serviceSupabase = await createServiceClient()

    // 2. Handle payment.captured (successful payment)
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity
      const { userId, type, referenceId } = payment.notes

      // Record the payment in our ledger (upsert to update the pending record created in create-order)
      await serviceSupabase.from('payments').upsert({
        razorpay_order_id: payment.order_id,
        user_id: userId,
        razorpay_payment_id: payment.id,
        amount: payment.amount / 100, // Razorpay amount is in paise, DB expects INR
        currency: payment.currency,
        status: 'succeeded',
        payment_type: type,
      }, { onConflict: 'razorpay_order_id' })

      // Fetch user email for notifications
      const { data: profile } = await serviceSupabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', userId)
        .single()

      const userEmail = profile?.email ?? ''
      const userName = profile?.full_name ?? 'Valued Customer'

      // Grant access based on payment type
      if (type === 'class_enrollment') {
        // Confirm enrollment
        await serviceSupabase
          .from('class_enrollments')
          .update({ status: 'confirmed' })
          .eq('id', referenceId)
          .eq('user_id', userId)

        // Send payment confirmation email
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

      if (type === 'membership') {
        // Activate membership for 30 days
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 30)

        await serviceSupabase
          .from('memberships')
          .upsert({
            user_id: userId,
            plan_name: payment.notes.planName || 'Premium',
            tier: 'premium',
            status: 'active',
            expires_at: expiresAt.toISOString(),
            started_at: new Date().toISOString(),
            gateway: 'razorpay',
            gateway_subscription_id: payment.order_id, // we used order_id since we created a one-time order as fallback
          }, { onConflict: 'user_id' })

        // Send membership activation email
        await sendEmail({
          type: 'MEMBERSHIP_ACTIVATION',
          to: userEmail,
          name: userName,
          planName: 'Angel Touch Premium Membership',
          expiresAt: expiresAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
          libraryUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/library`,
        }).catch(console.error)
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

    return ok({ received: true })

  } catch {
    return serverError('Webhook processing failed.')
  }
}
