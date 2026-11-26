import { cacheLife } from 'next/cache'
import { client } from '@/sanity/lib/client'
import { ALL_ACADEMY_COURSES_QUERY } from '@/sanity/lib/queries'
import { courseFromSanity, type AcademyCourse, type SanityAcademyCourse } from './academyCourses'

/**
 * Academy courses for the site, edited in Sanity Studio (Academy Course).
 * Cached for a few minutes, so Studio edits show on the site shortly after
 * publishing without slowing every page view.
 *
 * Returns an empty list if Sanity can't be reached; the academy page then
 * shows a "contact us" message instead of the catalogue.
 */
export async function getAcademyCourses(): Promise<AcademyCourse[]> {
  'use cache'
  cacheLife('minutes')

  try {
    // Refresh the underlying request at least every 60s, so an old (e.g. empty) answer
    // can never be served from Next's fetch cache after courses are published.
    const docs = await client.fetch<SanityAcademyCourse[]>(ALL_ACADEMY_COURSES_QUERY, {}, { next: { revalidate: 60 } })
    return (docs ?? [])
      .map(courseFromSanity)
      .filter((c): c is AcademyCourse => c !== null)
      .sort((a, b) => Number(a.num) - Number(b.num) || a.name.localeCompare(b.name))
  } catch (err) {
    console.error('[Academy] Could not load courses from Sanity:', err)
    return []
  }
}
