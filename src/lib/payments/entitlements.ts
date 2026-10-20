/**
 * Payment → Entitlement helpers (server-only)
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared by /api/payments/verify and /api/payments/webhook so both paths
 * apply exactly the same rules.
 *
 * Key rule: ONE Razorpay order grants access ONCE.
 *   claimPayment() atomically flips the ledger row for an order from
 *   'pending' → 'succeeded'. Only the caller that wins that flip may grant
 *   access. Replays of the same order (or the webhook arriving after the
 *   browser verify, or vice-versa) get 'already_processed' and grant nothing.
 */

import type { createServiceClient } from '@/lib/supabase/server'

type ServiceClient = Awaited<ReturnType<typeof createServiceClient>>

export type ClaimResult = 'claimed' | 'already_processed' | 'error'

/**
 * Marks the ledger row for this order as succeeded — exactly once.
 */
export async function claimPayment(
  svc: ServiceClient,
  params: {
    orderId: string
    paymentId: string
    userId: string
    type: 'class_enrollment' | 'membership'
    referenceId: string | null // class Sanity _id or membership plan _id
    amountPaise: number
    currency?: string
  }
): Promise<ClaimResult> {
  const { orderId, paymentId, userId, type, referenceId, amountPaise, currency = 'INR' } = params

  // 1. Atomic claim of the pending row created by create-order / create-subscription
  const { data: claimed, error: claimError } = await svc
    .from('payments')
    .update({ status: 'succeeded', razorpay_payment_id: paymentId })
    .eq('razorpay_order_id', orderId)
    .eq('user_id', userId)
    .eq('status', 'pending')
    .select('id')

  if (claimError) {
    console.error('[Payments] Claim failed:', claimError.message, { orderId })
    return 'error'
  }
  if (claimed && claimed.length > 0) return 'claimed'

  // 2. No pending row — was this order already processed?
  const { data: existing, error: lookupError } = await svc
    .from('payments')
    .select('id, status')
    .eq('razorpay_order_id', orderId)

  if (lookupError) {
    console.error('[Payments] Ledger lookup failed:', lookupError.message, { orderId })
    return 'error'
  }

  const alreadyDone = (existing ?? []).some(
    (row) => row.status === 'succeeded' || row.status === 'refunded' || row.status === 'partially_refunded'
  )
  if (alreadyDone) return 'already_processed'

  // 3. The pending row is missing (e.g. its insert failed at order time).
  //    Record the successful payment now and grant access.
  const { error: insertError } = await svc.from('payments').insert({
    user_id: userId,
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    amount: amountPaise / 100,
    currency,
    status: 'succeeded',
    payment_type: type,
    reference_id: referenceId,
  })

  if (insertError) {
    console.error('[Payments] Ledger insert failed:', insertError.message, { orderId })
    return 'error'
  }
  return 'claimed'
}

/**
 * Looks up a pending enrollment that belongs to this user.
 * Returns the Sanity class _id, or null if it is not theirs / not found.
 */
export async function getOwnedEnrollment(
  svc: ServiceClient,
  enrollmentId: string,
  userId: string
): Promise<{ id: string; classId: string; status: string } | null> {
  const { data, error } = await svc
    .from('class_enrollments')
    .select('id, class_id, status')
    .eq('id', enrollmentId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error || !data) return null
  return { id: data.id, classId: data.class_id, status: data.status }
}

/**
 * Confirms a class enrollment. Only touches a row owned by this user.
 */
export async function confirmEnrollment(
  svc: ServiceClient,
  enrollmentId: string,
  userId: string
): Promise<boolean> {
  const { data, error } = await svc
    .from('class_enrollments')
    .update({ status: 'confirmed' })
    .eq('id', enrollmentId)
    .eq('user_id', userId)
    .select('id')

  if (error) {
    console.error('[Payments] Enrollment confirm failed:', error.message, { enrollmentId })
    return false
  }
  return !!data && data.length > 0
}

/**
 * Activates (or extends) a membership.
 * - Yearly plans get 365 days, everything else 30 days.
 * - If the user already has an active, unexpired membership, the new
 *   period is added on top of the current expiry instead of replacing it.
 */
export async function grantMembership(
  svc: ServiceClient,
  params: { userId: string; orderId: string; planName?: string | null; billingPeriod?: string | null }
): Promise<{ ok: boolean; expiresAt: Date }> {
  const { userId, orderId } = params
  const planName = params.planName || 'Premium'
  const days = /year/i.test(params.billingPeriod ?? '') ? 365 : 30
  const now = new Date()

  const { data: active } = await svc
    .from('memberships')
    .select('id, expires_at')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle()

  const currentExpiry = active?.expires_at ? new Date(active.expires_at) : null
  const base = currentExpiry && currentExpiry > now ? currentExpiry : now
  const expiresAt = new Date(base.getTime() + days * 24 * 60 * 60 * 1000)

  if (active) {
    const { error } = await svc
      .from('memberships')
      .update({
        plan_name: planName,
        expires_at: expiresAt.toISOString(),
        gateway: 'razorpay',
        gateway_subscription_id: orderId,
      })
      .eq('id', active.id)

    if (error) {
      console.error('[Payments] Membership extend failed:', error.message, { orderId })
      return { ok: false, expiresAt }
    }
    return { ok: true, expiresAt }
  }

  const { error } = await svc.from('memberships').insert({
    user_id: userId,
    plan_name: planName,
    tier: 'premium',
    status: 'active',
    started_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    gateway: 'razorpay',
    gateway_subscription_id: orderId,
  })

  if (error) {
    console.error('[Payments] Membership insert failed:', error.message, { orderId })
    return { ok: false, expiresAt }
  }
  return { ok: true, expiresAt }
}
