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
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { ok, fail, unauthorized, serverError } from '@/lib/api/response'
import { z } from 'zod'
import Razorpay from 'razorpay'
import { client } from '@/sanity/lib/client'

const schema = z.object({
  type: z.literal('class_enrollment'),
  referenceId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorized()

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return fail(parsed.error.errors[0].message)

    const { type, referenceId } = parsed.data

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return serverError('Payment gateway is not configured.')
    }

    const serviceSupabase = await createServiceClient()
    
    // Find the enrollment
    const { data: enrollment } = await serviceSupabase
      .from('class_enrollments')
      .select('class_id')
      .eq('id', referenceId)
      .single()
      
    if (!enrollment) return fail('Enrollment not found.', 404)

    // Fetch class price from Sanity
    const sanityClass = await client.fetch(`*[_type == "masterclass" && _id == $id][0] { price }`, { id: enrollment.class_id })
    if (!sanityClass || !sanityClass.price) return fail('Class pricing not found.', 400)
    
    const trueAmountPaise = sanityClass.price * 100 // Convert INR to Paise

    // 5. Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // 6. Create order
    const order = await razorpay.orders.create({
      amount: trueAmountPaise,
      currency: 'INR',
      notes: {
        userId: user.id,
        type,
        referenceId,
      },
    })

    // 7. Create Pending Payment Record in DB
    await serviceSupabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount: trueAmountPaise / 100,
        currency: 'INR',
        status: 'pending',
        payment_type: type,
        reference_id: enrollment.class_id,
        razorpay_order_id: order.id,
        metadata: { type, referenceId }
      })

    return ok({ id: order.id, amount: order.amount, currency: order.currency })
  } catch {
    return serverError('Failed to create payment order.')
  }
}
