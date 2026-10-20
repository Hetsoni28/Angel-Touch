import { createClient } from 'next-sanity'

/**
 * Sanity read client (server-side).
 *
 * SECURITY: masterclass documents hold the unlisted YouTube `recordingUrl`.
 * Sanity has no per-field privacy, so the ONLY way to keep those links away
 * from the public API is to make the dataset PRIVATE (sanity.io/manage →
 * Datasets → production → Visibility: Private) and read it with a token.
 *
 * SANITY_API_READ_TOKEN — a "Viewer" token from sanity.io/manage → API → Tokens.
 * Server-only: never prefix it with NEXT_PUBLIC_.
 */
const isServer = typeof window === 'undefined'
const token = isServer ? process.env.SANITY_API_READ_TOKEN : undefined

if (isServer && !token && process.env.NODE_ENV === 'production') {
  console.warn(
    '[Sanity] SANITY_API_READ_TOKEN is not set. If the dataset is private, all content queries will return empty.'
  )
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '12345678',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  // A token-authenticated client would otherwise also see unpublished drafts.
  perspective: 'published',
  // Authenticated reads go to the live API; anonymous reads can use the CDN.
  useCdn: !token,
})
