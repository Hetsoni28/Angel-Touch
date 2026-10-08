/**
 * GET /api/recordings/access?classId=xxx
 * ─────────────────────────────────────────────────────────────────────────────
 * The security gatekeeper for video playback.
 * Returns the YouTube URL ONLY if the user is authorized.
 *
 * Access Rules (Step 16 — locked in CLASSES_ARCHITECTURE.md):
 *   1. User enrolled in this specific class (confirmed) → GRANTED
 *   2. User has an active membership → GRANTED
 *   3. Otherwise → DENIED
 *
 * Security:
 *   - Requires authenticated session.
 *   - YouTube URL is NEVER stored in the frontend or Sanity directly.
 *   - The URL is fetched from Sanity server-side and returned only if authorized.
 *   - Browser never sees the YouTube URL unless access is granted.
 */

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ok, fail, unauthorized, serverError } from '@/lib/api/response'
import { sanityClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function GET(req: NextRequest) {
  try {
    const classId = req.nextUrl.searchParams.get('classId')
    if (!classId) return fail('classId is required.')

    // 1. Authenticate
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return unauthorized()

    // 2. Check Access Rule 1: Direct class enrollment (confirmed)
    const { data: enrollment } = await supabase
      .from('class_enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('class_id', classId)
      .eq('status', 'confirmed')
      .single()

    // 3. Check Access Rule 2: Active membership
    const { data: membership } = await supabase
      .from('memberships')
      .select('id, expires_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    const hasEnrollment = !!enrollment
    const hasMembership = membership && new Date(membership.expires_at) > new Date()

    if (!hasEnrollment && !hasMembership) {
      return fail('Access denied. Please enroll in this class or subscribe to a membership.', 403)
    }

    // 4. Fetch the YouTube URL from Sanity (server-side only)
    const recording = await sanityClient.fetch(
      groq`*[_type == "masterclass" && _id == $classId][0] {
        "recordingUrl": recordingUrl
      }`,
      { classId }
    )

    if (!recording?.recordingUrl) {
      return fail('Recording is not yet available for this class.', 404)
    }

    return ok({
      recordingUrl: recording.recordingUrl,
      accessType: hasEnrollment ? 'enrollment' : 'membership',
    })

  } catch {
    return serverError()
  }
}
