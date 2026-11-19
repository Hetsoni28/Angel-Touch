import { TreatmentsHero } from '@/components/organisms/TreatmentsHero'
import { TreatmentsCatalogue } from '@/components/organisms/TreatmentsCatalogue'
import { TreatmentsAcademySection } from '@/components/organisms/TreatmentsAcademySection'
import { WhyAngelTouch } from '@/components/organisms/WhyAngelTouch'
import { InquiryCTA } from '@/components/organisms/InquiryCTA'
import { client } from '@/sanity/lib/client'
import { ALL_TREATMENTS_QUERY } from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/atoms/JsonLd'
import { breadcrumbJsonLd, absoluteUrl, ORGANIZATION_REF } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Ayurvedic Salon Treatments in Ahmedabad',
  description:
    'Shirodhara, aroma facials, hair spa, body spa, waxing and bridal makeup at our women-only Ayurvedic salon in Satellite, Ahmedabad. Book on WhatsApp.',
  path: '/treatments',
  image: {
    url: '/images/treatment_shirodhara.jpg',
    alt: 'Shirodhara Ayurvedic oil therapy at Angel Touch salon, Satellite, Ahmedabad',
  },
  keywords: [
    'Ayurvedic treatments Ahmedabad',
    'Aroma facials Satellite',
    'Aromatherapy Ahmedabad',
    'Shirodhara therapy Ahmedabad',
    'Abhyanga massage Satellite Ahmedabad',
    'Botanical skin facial Satellite',
    'Herbal hair spa Ahmedabad',
    'Bridal makeup artist Satellite Ahmedabad',
    'Ayurvedic wellness sanctuary Ahmedabad',
    'Women salon Satellite Ahmedabad',
  ],
})

export const instant = false

export default async function TreatmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  // Raw value from the URL; the (client) catalogue validates it.
  const initialCategory = category ?? 'all'
  const treatments = (await client.fetch(ALL_TREATMENTS_QUERY).catch(() => [])) || []

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ayurvedic salon treatments at Angel Touch, Satellite, Ahmedabad',
    url: absoluteUrl('/treatments'),
    itemListElement: (treatments as { name: string; description?: string; duration?: string }[])
      .slice(0, 100)
      .map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: t.name,
          ...(t.description ? { description: t.description } : {}),
          provider: ORGANIZATION_REF,
          areaServed: { '@type': 'City', name: 'Ahmedabad' },
        },
      })),
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Treatments', path: '/treatments' }]),
          ...(treatments.length > 0 ? [servicesSchema] : []),
        ]}
      />
      <TreatmentsHero />
      <TreatmentsCatalogue key={initialCategory} treatments={treatments} initialCategory={initialCategory} />
      <TreatmentsAcademySection />
      <WhyAngelTouch />
      <InquiryCTA />
    </>
  )
}

