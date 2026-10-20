/**
 * POST /api/classes/enroll
 * ─────────────────────────────────────────────────────────────────────────────
 * Creates a PENDING enrollment record for an authenticated user.
 * Called BEFORE Razorpay payment — locks in the intent.
 * Payment webhook upgrades status to CONFIRMED after successful payment.
 *
 * Security:
 *   - Requires authenticated session (Supabase cookie).
 *   - Uses service-role client to write — RLS cannot be bypassed by the browser.
 *   - Class ID validated server-side.
 */

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/server'
import { ok, fail, unauthorized, serverError, paymentsDisabled } from '@/lib/api/response'
import { PAYMENTS_ENABLED } from '@/lib/features'
import { enrollClassSchema } from '@/lib/security/validation'
import { checkRateLimit, rateLimitExceededResponse, RATE_LIMIT_PRESETS } from '@/lib/security/rateLimit'
import { client } from '@/sanity/lib/client'

export async function POST(req: NextRequest) {
  // Inquiry mode: online payments are switched off (src/lib/features.ts)
  if (!PAYMENTS_ENABLED) return paymentsDisabled()

  try {
    // 0. Rate limiting
    const rateLimit = checkRateLimit(req, RATE_LIMIT_PRESETS.ENROLLMENT)
    if (!rateLimit.allowed) {
      return rateLimitExceededResponse(rateLimit)
    }

    // 1. Authenticate
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorized()

    // 2. Validate body
    const body = await req.json()
    const parsed = enrollClassSchema.safeParse(body)
    if (!parsed.success) return fail(parsed.error.issues[0]?.message || 'Invalid parameters')

    const { classId } = parsed.data

    // 2b. Validate class state in Sanity (cancellation, past date, capacity)
    const masterclass = await client.fetch(
      `*[_type == "masterclass" && _id == $classId][0] { _id, title, capacity, isCancelled, date }`,
      { classId }
    )

    if (!masterclass) {
      return fail('Masterclass not found.', 404)
    }

    if (masterclass.isCancelled) {
      return fail('This masterclass has been cancelled.', 400)
    }

    if (new Date(masterclass.date) < new Date()) {
      return fail('This live class has already concluded.', 400)
    }

    // 3. Check for duplicate enrollment
    const { data: existing } = await supabase
      .from('class_enrollments')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('class_id', classId)
      .maybeSingle()

    if (existing) {
      if (existing.status === 'confirmed') return fail('You are already enrolled in this class.', 409)
      // Return existing pending enrollment ID for payment step
      return ok({ enrollmentId: existing.id, status: existing.status })
    }

    // 3b. Check cohort capacity
    if (masterclass.capacity) {
      const { count: confirmedCount } = await supabase
        .from('class_enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('class_id', classId)
        .eq('status', 'confirmed')

      if (confirmedCount !== null && confirmedCount >= masterclass.capacity) {
        return fail('This masterclass cohort has reached maximum capacity.', 409)
      }
    }

    // 4. Create PENDING enrollment (service-role bypasses RLS safely on server)
    const serviceSupabase = await createServiceClient()
    const { data: enrollment, error } = await serviceSupabase
      .from('class_enrollments')
      .insert({
        user_id: user.id,
        class_id: classId,
        status: 'pending',
      })
      .select('id, status')
      .single()

    if (error || !enrollment) return serverError('Failed to create enrollment.')

    return ok({ enrollmentId: enrollment.id, status: enrollment.status }, 201)

  } catch {
    return serverError()
  }
}
