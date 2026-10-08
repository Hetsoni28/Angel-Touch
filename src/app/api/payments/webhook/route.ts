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

      // Record the payment in our ledger
      await serviceSupabase.from('payments').insert({
        user_id: userId,
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: 'succeeded',
        payment_type: type,
      })

      // Grant access based on payment type
      if (type === 'class_enrollment') {
        // Confirm enrollment
        await serviceSupabase
          .from('class_enrollments')
          .update({ status: 'confirmed' })
          .eq('id', referenceId)
          .eq('user_id', userId)
      }

      if (type === 'membership') {
        // Activate membership for 30 days
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 30)

        await serviceSupabase
          .from('memberships')
          .upsert({
            user_id: userId,
            plan_id: referenceId,
            status: 'active',
            expires_at: expiresAt.toISOString(),
          }, { onConflict: 'user_id' })
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
    }

    return ok({ received: true })

  } catch {
    return serverError('Webhook processing failed.')
  }
}
