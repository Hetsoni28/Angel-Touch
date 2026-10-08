/**
 * Supabase Server Client
 *
 * Use in:
 *   - Server Components
 *   - Server Actions
 *   - Route Handlers
 *
 * This client reads cookies but cannot set them.
 * Use the middleware client for session refresh.
 */
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Ignore: setAll called from Server Component (read-only cookies).
            // Session refresh is handled by middleware.
          }
        },
      },
    }
  )
}

/**
 * Supabase Service Role Client
 *
 * Use ONLY in:
 *   - Server Actions that need to bypass RLS
 *     (e.g. confirming a payment, granting recording access)
 *
 * NEVER expose the service role key to the browser.
 * NEVER use this in Client Components.
 */
export async function createServiceClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // ignore
          }
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
