/**
 * Customer portal data — one place for the access rules and formatting the
 * portal screens share, so Home, Classes and Library always agree.
 * Everything here is real data from Supabase + Sanity; nothing is invented.
 * Server-only (uses the request's Supabase session).
 */
import { createClient } from '@/lib/supabase/server'
import { client } from '@/sanity/lib/client'
import type { MasterclassListItem } from '@/sanity/lib/types'

export * from './portalFormat'

// ── Data ──
/** hasRecording is a yes/no only — the private video URL itself is never sent to these screens. */
export type PortalClass = MasterclassListItem & { duration?: string; hasRecording?: boolean }

const CLASS_FIELDS = `_id, title, slug, date, time, duration, shortDescription,
  "imageUrl": coalesce(image.asset->url, mainImage.asset->url),
  "imageAlt": coalesce(image.alt, mainImage.alt),
  "hasRecording": defined(recordingUrl)`

export async function getPortalData(userId: string) {
  const supabase = await createClient()
  const now = new Date()

  const [{ data: membership }, { data: enrollments }, { data: profile }] = await Promise.all([
    supabase
      .from('memberships')
      .select('status, expires_at, plan_name')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('expires_at', { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle(),
    supabase.from('class_enrollments').select('class_id, status, created_at').eq('user_id', userId),
    supabase.from('profiles').select('full_name, created_at').eq('id', userId).maybeSingle(),
  ])

  const isMember = !!membership?.expires_at && new Date(membership.expires_at) > now
  const confirmedIds = (enrollments ?? []).filter((e) => e.status === 'confirmed').map((e) => e.class_id)

  // Same access rule as the video player: members see every past class,
  // everyone else sees only the classes they joined.
  const recordingsQuery = isMember
    ? `*[_type == "masterclass" && date < now()] | order(date desc) { ${CLASS_FIELDS} }`
    : `*[_type == "masterclass" && _id in $ids && date < now()] | order(date desc) { ${CLASS_FIELDS} }`

  const [joined, recordings] = await Promise.all([
    confirmedIds.length
      ? client.fetch<PortalClass[]>(`*[_type == "masterclass" && _id in $ids] | order(date asc) { ${CLASS_FIELDS} }`, { ids: confirmedIds }).catch(() => [])
      : Promise.resolve([] as PortalClass[]),
    isMember || confirmedIds.length
      ? client.fetch<PortalClass[]>(recordingsQuery, { ids: confirmedIds }).catch(() => [])
      : Promise.resolve([] as PortalClass[]),
  ])

  const upcoming = joined.filter((c) => new Date(c.date) >= now)
  const past = joined.filter((c) => new Date(c.date) < now).reverse()

  return { now, profile, membership, isMember, joined, upcoming, past, recordings }
}
