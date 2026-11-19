/**
 * /auth/callback
 *
 * Supabase redirects here after the user clicks the email confirmation link.
 * This route exchanges the one-time `code` from the URL for a live session.
 *
 * URL pattern from Supabase:
 *   /auth/callback?code=<one_time_code>
 */
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Only allow same-site relative paths — "//evil.com" or "@evil.com" would
  // otherwise turn `${origin}${next}` into an open redirect.
  const rawNext = searchParams.get('next') ?? '/account'
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') && !rawNext.startsWith('/\\')
    ? rawNext
    : '/account'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Confirmed — redirect to account (or wherever `next` points)
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Something went wrong (expired link, already used, etc.)
  return NextResponse.redirect(
    `${origin}/login?error=Email+confirmation+failed.+Please+try+registering+again.`
  )
}
