/**
 * Email addresses for admin screens.
 * ─────────────────────────────────────────────────────────────────────────────
 * The `profiles` table has no email column — emails live in Supabase Auth
 * (auth.users). Selecting `profiles.email` makes the whole query fail, which
 * is why the admin tables used to come back empty.
 *
 * This reads emails through the service-role client, so it must only be
 * called from server code behind requireAdmin() (the admin layout does this).
 */
import { createServiceClient } from './server'

export async function getEmailsByUserId(userIds: (string | null | undefined)[]): Promise<Record<string, string>> {
  const wanted = new Set(userIds.filter((id): id is string => !!id))
  const emails: Record<string, string> = {}
  if (wanted.size === 0) return emails

  try {
    const supabase = await createServiceClient()
    // Page through Auth users until every requested id is found.
    for (let page = 1; page <= 50 && Object.keys(emails).length < wanted.size; page++) {
      const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 })
      if (error || !data?.users?.length) break
      for (const u of data.users) {
        if (wanted.has(u.id) && u.email) emails[u.id] = u.email
      }
      if (data.users.length < 1000) break
    }
  } catch (err) {
    console.error('[Admin] Could not load user emails:', err)
  }
  return emails
}
