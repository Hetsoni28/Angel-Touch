import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { getCurrentProfile, getCurrentUser } from '@/lib/supabase/auth'

export const instant = false

/**
 * "My account" entry point used by the header icon.
 * Sends each person to the right place: admins to the admin console,
 * customers to their portal, and visitors to sign in.
 */
export default async function AccountPage() {
  await connection() // per-request: depends on who is signed in
  const user = await getCurrentUser()
  if (!user) redirect('/login?redirect=/account')

  const profile = await getCurrentProfile()
  redirect(profile?.is_admin ? '/admin' : '/customer/dashboard')
}
