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
import { ok, fail, unauthorized, serverError } from '@/lib/api/response'
import { z } from 'zod'

const schema = z.object({
  classId: z.string().min(1, 'classId is required'),
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

    const { classId } = parsed.data

    // 3. Check for duplicate enrollment
    const { data: existing } = await supabase
      .from('class_enrollments')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('class_id', classId)
      .single()

    if (existing) {
      if (existing.status === 'confirmed') return fail('You are already enrolled in this class.', 409)
      // Return existing pending enrollment ID for payment step
      return ok({ enrollmentId: existing.id, status: existing.status })
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
