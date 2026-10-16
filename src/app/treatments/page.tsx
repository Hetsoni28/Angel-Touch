import { TreatmentsHero } from '@/components/organisms/TreatmentsHero'
import { TreatmentsCatalogue } from '@/components/organisms/TreatmentsCatalogue'
import { WhyAngelTouch } from '@/components/organisms/WhyAngelTouch'
import { InquiryCTA } from '@/components/organisms/InquiryCTA'
import { client } from '@/sanity/lib/client'
import { ALL_TREATMENTS_QUERY } from '@/sanity/lib/queries'
import { OFFICIAL_MENU_TREATMENTS } from '@/data/treatmentsData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayurvedic Treatments, Skin Facials & Spa Therapies | Angel Touch Ahmedabad',
  description:
    'Experience restorative women-only Ayurvedic therapies in Satellite, Ahmedabad. Rejuvenate with authentic Shirodhara, Abhyanga body massage, botanical skin facials, herbal hair care, and bridal styling.',
  alternates: { canonical: 'https://angeltouch.in/treatments' },
  keywords: [
    'Ayurvedic treatments Ahmedabad',
    'Shirodhara therapy Ahmedabad',
    'Abhyanga massage Satellite Ahmedabad',
    'Botanical skin facial Satellite',
    'Herbal hair spa Ahmedabad',
    'Bridal makeup artist Satellite Ahmedabad',
    'Ayurvedic wellness sanctuary Ahmedabad',
    'Women salon Satellite Ahmedabad',
  ],
  openGraph: {
    title: 'Ayurvedic Treatments, Skin Facials & Spa Therapies | Angel Touch Ahmedabad',
    description:
      'Authentic Shirodhara, Abhyanga, botanical facials, and bridal styling at Angel Touch — Ahmedabad\'s premier women-only Ayurvedic sanctuary.',
    url: 'https://angeltouch.in/treatments',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Ayurvedic treatments at Angel Touch Ahmedabad' }],
  },
}


export const instant = false

export default async function TreatmentsPage() {
  let treatments = OFFICIAL_MENU_TREATMENTS

  try {
    const sanityTreatments = await client.fetch(ALL_TREATMENTS_QUERY)
    if (sanityTreatments && Array.isArray(sanityTreatments) && sanityTreatments.length > 0) {
      const sanitySlugs = new Set(sanityTreatments.map((t: any) => t.slug))
      const nonOverridden = OFFICIAL_MENU_TREATMENTS.filter((t) => !sanitySlugs.has(t.slug))
      treatments = [...sanityTreatments, ...nonOverridden]
    }
  } catch (error) {
    console.error('Failed to fetch treatments from Sanity, using official menu:', error)
  }

  return (
    <>
      <TreatmentsHero />
      <TreatmentsCatalogue treatments={treatments} />
      <WhyAngelTouch />
      <InquiryCTA />
    </>
  )
}

