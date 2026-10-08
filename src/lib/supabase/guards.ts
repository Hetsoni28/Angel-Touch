/**
 * RLS Guard Utilities
 * ─────────────────────────────────────────────
 * Server-side helpers to verify data ownership before returning
 * any resource to the caller. Use these in Server Actions and
 * Route Handlers as a second layer of defence beyond RLS.
 *
 * Why a second layer?
 *   RLS is enforced by Postgres. These guards add application-level
 *   clarity and produce meaningful error messages in server logs.
 *
 * Import ONLY in server-side code.
 */

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/supabase/auth'

// ── Generic ownership check ──────────────────────────────────

/**
 * Throws if the authenticated user does not own the resource.
 * Use as an extra guard in server actions before any write operation.
 */
export async function assertOwnership(resourceUserId: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user) throw new Error('UNAUTHORIZED: Not authenticated')
  if (user.id !== resourceUserId) {
    throw new Error(`FORBIDDEN: User ${user.id} cannot access resource owned by ${resourceUserId}`)
  }
}

// ── Profile guard ─────────────────────────────────────────────

/**
 * Fetches the profile for the current user.
 * Returns null if not authenticated or profile not found.
 * RLS ensures only the user's own row is returned.
 */
export async function getMyProfile() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .single()
  return data
}

// ── Membership guard ──────────────────────────────────────────

/**
 * Returns the current user's active membership, or null.
 * RLS ensures no other user's membership is returned.
 */
export async function getMyActiveMembership() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('memberships')
    .select('*')
    .eq('status', 'active')
    .maybeSingle()
  return data
}

// ── Enrollment guard ──────────────────────────────────────────

/**
 * Returns the current user's enrollment for a specific class, or null.
 * RLS ensures only own enrollments are visible.
 */
export async function getMyEnrollment(classId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('class_enrollments')
    .select('*')
    .eq('class_id', classId)
    .maybeSingle()
  return data
}

/**
 * Returns all of the current user's class enrollments.
 */
export async function getMyEnrollments() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('class_enrollments')
    .select('*')
    .order('enrolled_at', { ascending: false })
  return data ?? []
}

// ── Recording access guard ────────────────────────────────────

/**
 * Returns true if the current user has access to the given recording.
 * Checks recording_access table — RLS ensures only own rows are returned.
 * Also validates that membership-based access hasn't expired.
 */
export async function canAccessRecording(recordingId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('recording_access')
    .select('expires_at')
    .eq('recording_id', recordingId)
    .maybeSingle()

  if (error || !data) return false

  // If expires_at is set, check it hasn't passed
  if (data.expires_at) {
    return new Date(data.expires_at) > new Date()
  }

  // Permanent access (purchase-based)
  return true
}

/**
 * Returns all recordings the current user can access.
 */
export async function getMyRecordingAccess() {
  const supabase = await createClient()
  const now = new Date().toISOString()

  const { data } = await supabase
    .from('recording_access')
    .select('recording_id, granted_via, expires_at, granted_at')
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('granted_at', { ascending: false })

  return data ?? []
}

// ── Payment guard ─────────────────────────────────────────────

/**
 * Returns all of the current user's payment history.
 * RLS ensures only own payments are returned.
 */
export async function getMyPayments() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('payments')
    .select('id, payment_type, amount_paise, currency, status, gateway, created_at')
    .order('created_at', { ascending: false })
  return data ?? []
}
