import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { absoluteUrl } from '@/lib/seo'

/**
 * XML sitemap — only canonical, indexable URLs belong here.
 * Not listed on purpose: /recordings, /search and the account pages (all noindex),
 * /treatments/[slug] (redirects to /treatments), and any Sanity document whose
 * SEO settings say "Hide from search engines".
 */

// Documents edited in Sanity carry their real last-modified date.
const SLUGS_QUERY = groq`{
  "products": *[_type == "product" && defined(slug.current) && seo.noIndex != true]{
    "slug": slug.current, _updatedAt
  },
  "masterclasses": *[_type == "masterclass" && defined(slug.current) && seo.noIndex != true && isCancelled != true]{
    "slug": slug.current, _updatedAt
  }
}`

type SlugDoc = { slug: string; _updatedAt?: string }

const STATIC_ROUTES: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/treatments', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/academy', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/shop', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/classes', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/membership', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/refund', changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  let dynamicRoutes: MetadataRoute.Sitemap = []
  try {
    const data = await client.fetch<{ products: SlugDoc[]; masterclasses: SlugDoc[] }>(SLUGS_QUERY)
    const toEntry = (base: string, priority: number) => (d: SlugDoc): MetadataRoute.Sitemap[number] => ({
      url: absoluteUrl(`${base}/${d.slug}`),
      ...(d._updatedAt ? { lastModified: new Date(d._updatedAt) } : {}),
      changeFrequency: 'weekly',
      priority,
    })
    dynamicRoutes = [
      ...(data.products ?? []).map(toEntry('/shop', 0.7)),
      ...(data.masterclasses ?? []).map(toEntry('/classes', 0.6)),
    ]
  } catch {
    // Sitemap still works with static routes if Sanity is unreachable
  }

  return [...staticRoutes, ...dynamicRoutes]
}
