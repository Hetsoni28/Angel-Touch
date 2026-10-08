'use client'

/**
 * Supabase Browser Client
 *
 * Use in:
 *   - Client Components ('use client')
 *   - Real-time subscriptions
 *   - Client-side auth state
 *
 * Uses the anon key only. RLS protects all data.
 */
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
