/**
 * Shapes of the Sanity query results used across pages.
 * Fields are optional where the CMS may leave them empty.
 */

export interface SanitySlug {
  current: string
}

/** A masterclass as returned by the list/card queries (projected fields only). */
export interface MasterclassListItem {
  _id: string
  title: string
  slug?: SanitySlug | null
  date: string
  time?: string
  price?: number
  type?: string
  description?: string
  shortDescription?: string
  imageUrl?: string
  /** Editor-written alt text from Sanity (image.alt) */
  imageAlt?: string | null
}

/** Safe slug read — returns '' when the document has no slug set. */
export function slugOf(slug: SanitySlug | string | null | undefined): string {
  if (!slug) return ''
  return typeof slug === 'string' ? slug : slug.current ?? ''
}
