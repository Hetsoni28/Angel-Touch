/**
 * SEO helpers
 * ─────────────────────────────────────────────────────────────────────────────
 * One place that builds every page's metadata so each page gets, consistently:
 *   - a title (the root layout adds " | Angel Touch")
 *   - a meta description of at most 160 characters
 *   - its OWN canonical URL (never the homepage's)
 *   - Open Graph + Twitter cards that match the page
 *   - robots rules (noindex for private / thin pages)
 *
 * Usage:
 *   export const metadata = pageMetadata({
 *     title: 'Ayurvedic Treatments in Ahmedabad',
 *     description: '...',
 *     path: '/treatments',
 *     image: { url: '/images/treatment_shirodhara.jpg', alt: '...' },
 *   })
 */
import type { Metadata } from 'next'
import { SITE_INFO } from './siteInfo'

export const SITE_URL = SITE_INFO.siteUrl
export const SITE_NAME = SITE_INFO.businessName

export const DEFAULT_OG_IMAGE = {
  url: '/images/og-default.jpg',
  width: 1200,
  height: 630,
  alt: "Angel Touch by Heena Thaker — women's Ayurvedic salon in Satellite, Ahmedabad",
}

/** Search engines cut descriptions at ~160 characters; trim on a word boundary. */
export const MAX_DESCRIPTION = 160
/** Keep alt text short enough for screen readers to read comfortably. */
export const MAX_ALT = 125

export function clampText(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—–-]+$/, '')}…`
}

/** Absolute URL for a site path ("/shop" → "https://angeltouch.in/shop"). */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path
  const clean = path === '/' ? '' : `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`
  return `${SITE_URL}${clean}`
}

export type SeoImage = { url: string; alt: string; width?: number; height?: number }

export type PageSeoInput = {
  /** Page title WITHOUT the brand — the layout template appends " | Angel Touch". */
  title: string
  description: string
  /** Route path, e.g. "/shop" or "/classes/my-class". Used for the canonical URL. */
  path: string
  image?: SeoImage
  /** Hide from search engines (login pages, search results, paywalled content). */
  noindex?: boolean
  /** Explicit canonical, when this content's main copy lives at another URL. */
  canonical?: string
  /** Use the title as-is, without the " | Angel Touch" suffix (homepage). */
  absoluteTitle?: boolean
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
}

export function pageMetadata(input: PageSeoInput): Metadata {
  const description = clampText(input.description, MAX_DESCRIPTION)
  const url = absoluteUrl(input.path)
  const image = input.image ?? DEFAULT_OG_IMAGE
  // Only declare dimensions we actually know — wrong ones make previews crop badly.
  const ogImage = {
    url: image.url,
    ...(image.width && image.height ? { width: image.width, height: image.height } : {}),
    alt: clampText(image.alt, MAX_ALT),
  }
  const fullTitle = input.absoluteTitle ? input.title : `${input.title} | ${SITE_INFO.shortName}`

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    alternates: { canonical: input.canonical ? absoluteUrl(input.canonical) : url },
    openGraph: {
      type: input.type ?? 'website',
      locale: 'en_IN',
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
    ...(input.noindex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {}),
  }
}

// ── Sanity SEO fields ─────────────────────────────────────────────────────────

/** Shape of the `seo` object in Sanity (src/sanity/schemaTypes/seo.ts). */
export type SanitySeo = {
  metaTitle?: string | null
  metaDescription?: string | null
  canonicalUrl?: string | null
  noIndex?: boolean | null
  ogImageUrl?: string | null
  ogImageAlt?: string | null
} | null | undefined

/**
 * Builds metadata from a Sanity document's `seo` object, falling back to
 * sensible defaults (the document's own title, summary and image) for any
 * field the editor left empty.
 */
export function sanityPageMetadata(seo: SanitySeo, fallback: PageSeoInput): Metadata {
  const image = seo?.ogImageUrl
    ? { url: seo.ogImageUrl, alt: seo.ogImageAlt || fallback.image?.alt || fallback.title }
    : fallback.image
  return pageMetadata({
    ...fallback,
    title: seo?.metaTitle?.trim() || fallback.title,
    description: seo?.metaDescription?.trim() || fallback.description,
    canonical: seo?.canonicalUrl?.trim() || fallback.canonical,
    noindex: seo?.noIndex ?? fallback.noindex,
    image,
  })
}

/** GROQ projection for the `seo` object — use inside a query: `seo { ${SEO_PROJECTION} }`. */
export const SEO_PROJECTION = `
  metaTitle,
  metaDescription,
  canonicalUrl,
  noIndex,
  "ogImageUrl": openGraphImage.asset->url,
  "ogImageAlt": openGraphImage.alt
`

// ── Structured data (JSON-LD) ─────────────────────────────────────────────────

export type Crumb = { name: string; path: string }

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

/** Reference to the business, for `provider` / `brand` / `organizer` fields. */
export const ORGANIZATION_REF = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
} as const

/** Serialises JSON-LD safely for a <script> tag (escapes "<" so content can't close the tag). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
