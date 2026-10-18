import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

const SITE_URL = 'https://angeltouch.in'

const SLUGS_QUERY = groq`{
  "products": *[_type == "product"]{ "slug": slug.current },
  "treatments": *[_type == "treatment"]{ "slug": slug.current },
  "masterclasses": *[_type == "masterclass"]{ "slug": slug.current }
}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/treatments`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/classes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/academy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/recordings`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/membership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic routes from Sanity
  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const data = await client.fetch<{
      products: { slug: string }[]
      treatments: { slug: string }[]
      masterclasses: { slug: string }[]
    }>(SLUGS_QUERY)

    const productRoutes: MetadataRoute.Sitemap = (data.products ?? []).map((p) => ({
      url: `${SITE_URL}/shop/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))

    const classRoutes: MetadataRoute.Sitemap = (data.masterclasses ?? []).map((m) => ({
      url: `${SITE_URL}/classes/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    dynamicRoutes = [...productRoutes, ...classRoutes]
  } catch {
    // Sitemap still works with static routes if Sanity is unreachable
  }

  return [...staticRoutes, ...dynamicRoutes]
}
