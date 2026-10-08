/**
 * Angel Touch — Next.js Middleware
 * ─────────────────────────────────────────────────────────────────────────────
 * Runs on EVERY request before it reaches any page or API route.
 *
 * Protection Rules:
 *   /dashboard/*  → Authenticated users only. Redirect unauthenticated → /login
 *   /admin/*      → Admin users only. Non-admins → /403. Unauthenticated → /login
 *
 * IMPORTANT: Admin role is NOT checked here (middleware only has anon key).
 *            Role check is a double-lock — done server-side inside /admin pages
 *            via requireAdmin() which uses get_my_role() DB function.
 *            Middleware only handles the session/authentication layer.
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Build Supabase client ──────────────────────────────────────────────────
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // ── Refresh session — DO NOT REMOVE ───────────────────────────────────────
  const { data: { user } } = await supabase.auth.getUser()

  // ── Route: /admin/* ────────────────────────────────────────────────────────
  // Layer 1: Not logged in at all → redirect to login
  // Layer 2: Logged in but not admin → handled server-side inside the page via requireAdmin()
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      loginUrl.searchParams.set('reason', 'unauthenticated')
      return NextResponse.redirect(loginUrl)
    }
    // Authenticated — let the page-level requireAdmin() do role verification
    return supabaseResponse
  }

  // ── Route: /dashboard/* ───────────────────────────────────────────────────
  // Not logged in → redirect to login with return URL
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return supabaseResponse
  }

  // ── Route: /account/* ────────────────────────────────────────────────────
  if (pathname.startsWith('/account')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return supabaseResponse
  }

  // ── All other routes — pass through ──────────────────────────────────────
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image  (image optimization)
     * - favicon.ico, icon.svg
     * - static image files (.svg, .png, .jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
