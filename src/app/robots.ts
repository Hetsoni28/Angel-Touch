import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/**
 * robots.txt — tells crawlers what NOT to fetch.
 * Pages that should be crawlable but not indexed (login, search, recordings)
 * use <meta name="robots" content="noindex"> instead (see pageMetadata), because
 * a blocked URL can't be read, so its noindex tag would never be seen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/studio',
          '/customer',
          '/account',
          '/auth/',
          '/dashboard',
          '/design-system',
          '/classes/*/checkout',
          '/membership/checkout',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
