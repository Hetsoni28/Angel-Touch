/**
 * Server-side Auth Helpers
 * ─────────────────────────────────────────────
 * Import these ONLY in Server Components, Server Actions, and Route Handlers.
 * Never import in Client Components.
 *
 * Role Security Model:
 *  - CUSTOMER → profiles.is_admin = FALSE (default for all new users)
 *  - ADMIN    → profiles.is_admin = TRUE  (set ONLY via service-role server action)
 *  - Role is ALWAYS read from the database — never from client claims or JWT.
 */

import { createClient, createServiceClient } from './server'
import { redirect } from 'next/navigation'
import type { Profile } from './types'

export type UserRole = 'ADMIN' | 'CUSTOMER'

// ── Current session ──────────────────────────────────────────

/**
 * Returns the authenticated Supabase auth user, or null.
 * Fast — reads from session cookie. Does NOT query profiles table.
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

// ── Profile & role ───────────────────────────────────────────

/**
 * Returns the full Profile row for the authenticated user, or null.
 * Queries the profiles table — use when you need role or display name.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !data) return null
  return data
}

/**
 * Returns the role of the current user: 'ADMIN' | 'CUSTOMER' | null
 * Uses the secure DB function get_my_role() — cannot be spoofed.
 */
export async function getCurrentRole(): Promise<UserRole | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('get_my_role')
  if (error || !data) return null
  return data as UserRole
}

// ── Route guards ─────────────────────────────────────────────

/**
 * Ensures the user is authenticated.
 * Redirects to /login if not. Use at the top of protected Server Components.
 */
export async function requireAuth(redirectTo = '/login') {
  const user = await getCurrentUser()
  if (!user) redirect(redirectTo)
  return user
}

/**
 * Ensures the user is authenticated AND has ADMIN role.
 * Redirects to / if not an admin.
 */
export async function requireAdmin() {
  const user = await requireAuth()
  const profile = await getCurrentProfile()

  if (!profile?.is_admin) {
    redirect('/')
  }

  return { user, profile }
}

// ── Admin management (service-role only) ─────────────────────

/**
 * Grants ADMIN role to a user.
 * Uses service-role key — bypasses RLS. Call only from secure server actions.
 */
export async function grantAdminRole(userId: string): Promise<void> {
  const supabase = await createServiceClient()
  const { error } = await supabase
    .from('profiles')
    .update({ is_admin: true })
    .eq('id', userId)

  if (error) throw new Error(`Failed to grant admin role: ${error.message}`)
}

/**
 * Revokes ADMIN role from a user.
 * Uses service-role key — bypasses RLS.
 */
export async function revokeAdminRole(userId: string): Promise<void> {
  const supabase = await createServiceClient()
  const { error } = await supabase
    .from('profiles')
    .update({ is_admin: false })
    .eq('id', userId)

  if (error) throw new Error(`Failed to revoke admin role: ${error.message}`)
}
