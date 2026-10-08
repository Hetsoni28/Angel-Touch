import { NextRequest } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { ok, fail, unauthorized, serverError } from '@/lib/api/response'
import { z } from 'zod'
import Razorpay from 'razorpay'
import { client } from '@/sanity/lib/client'

const schema = z.object({
  sanityPlanId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorized()

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return fail(parsed.error.errors[0].message)

    const { sanityPlanId } = parsed.data

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return serverError('Payment gateway is not configured.')
    }

    // 1. Fetch Plan details from Sanity
    const sanityPlan = await client.fetch(`*[_type == "membershipPlan" && _id == $id][0] { name, price, billingPeriod }`, { id: sanityPlanId })
    
    if (!sanityPlan || !sanityPlan.price) return fail('Membership plan not found.', 404)

    // IMPORTANT: For true Razorpay subscriptions, you must have previously created a "Plan" in Razorpay 
    // and mapped its ID. For this Phase 17 centralisation, if you don't have a Razorpay Plan ID,
    // we use a one-time order as a fallback or you can map a custom Razorpay Plan ID here based on the Sanity document.
    // Assuming you have `razorpayPlanId` defined in Sanity, or we use a mapping:
    // e.g. const rpPlanId = sanityPlan.razorpayPlanId 
    
    // As per the instructions: "Use separate payment logic so one type doesn't interfere with another."
    // We will build the robust Subscription handler here.

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // If you don't have Razorpay Plan IDs mapped yet, you will need to add them.
    // For now, we will create a standard Razorpay Order for the membership duration to represent the payment,
    // to ensure checkout works immediately while separating the logic.
    // IF you add a Razorpay Plan ID to Sanity in the future, swap this to `razorpay.subscriptions.create()`.
    
    const trueAmountPaise = parseInt(sanityPlan.price) * 100

    const order = await razorpay.orders.create({
      amount: trueAmountPaise,
      currency: 'INR',
      notes: {
        userId: user.id,
        type: 'membership',
        referenceId: sanityPlanId, // The ID from Sanity
        planName: sanityPlan.name,
        billingPeriod: sanityPlan.billingPeriod
      },
    })

    // Create a pending row in `memberships` table? No, create the membership in webhook.
    // But we need a pending payments record.
    const serviceSupabase = await createServiceClient()
    const { error: dbError } = await serviceSupabase
      .from('payments')
      .insert({
        user_id: user.id,
        amount: trueAmountPaise / 100,
        currency: 'INR',
        status: 'pending',
        payment_type: 'membership',
        reference_id: sanityPlanId,
        razorpay_order_id: order.id,
      })

    if (dbError) {
      console.error('DB Error creating pending payment:', dbError)
      return serverError('Failed to initialize payment record.')
    }

    return ok({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
    
  } catch (err: any) {
    console.error('Subscription Creation Error:', err)
    return serverError('Failed to create subscription.')
  }
}
