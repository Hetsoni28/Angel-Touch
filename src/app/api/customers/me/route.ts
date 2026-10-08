/**
 * GET /api/customers/me
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the current authenticated user's profile, memberships,
 * and class enrollments — all in one call for the dashboard.
 *
 * Security:
 *   - Requires authenticated session.
 *   - RLS on profiles/memberships/enrollments ensures users only see their own data.
 */

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ok, unauthorized, serverError } from '@/lib/api/response'

export async function GET(_req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorized()

    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, full_name, email, is_admin, created_at')
      .eq('id', user.id)
      .single()

    // Fetch active membership
    const { data: membership } = await supabase
      .from('memberships')
      .select('id, status, expires_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    // Fetch class enrollments
    const { data: enrollments } = await supabase
      .from('class_enrollments')
      .select('id, class_id, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    return ok({
      profile,
      membership: membership ?? null,
      enrollments: enrollments ?? [],
    })

  } catch {
    return serverError()
  }
}
