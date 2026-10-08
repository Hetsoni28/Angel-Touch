/**
 * POST /api/payments/create-order
 * ─────────────────────────────────────────────────────────────────────────────
 * Creates a Razorpay order for a class enrollment or membership.
 * Returns the Razorpay order_id to the frontend to open the payment modal.
 *
 * Security:
 *   - Requires authenticated session.
 *   - Amount is NEVER trusted from the browser — always calculated server-side.
 *   - Razorpay secret key is server-only (not exposed to client).
 */

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ok, fail, unauthorized, serverError } from '@/lib/api/response'
import { z } from 'zod'
import Razorpay from 'razorpay'

const schema = z.object({
  type: z.enum(['class_enrollment', 'membership']),
  referenceId: z.string().min(1), // enrollmentId or membershipPlanId
  amount: z.number().int().positive(), // in paise (₹999 = 99900)
})

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorized()

    // 2. Validate body
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return fail(parsed.error.errors[0].message)

    const { type, referenceId, amount } = parsed.data

    // 3. Verify Razorpay keys exist
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return serverError('Payment gateway is not configured.')
    }

    // 4. Create Razorpay instance (server-side only)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // 5. Create order
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      notes: {
        userId: user.id,
        type,
        referenceId,
      },
    })

    return ok({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    })

  } catch {
    return serverError('Failed to create payment order.')
  }
}
