import { client } from '@/sanity/lib/client'
import { ALL_ACADEMY_COURSES_QUERY } from '@/sanity/lib/queries'
import { AcademyHero } from '@/components/organisms/AcademyHero'
import { AcademyHallmarks } from '@/components/organisms/AcademyHallmarks'
import { AcademyCatalogue } from '@/components/organisms/AcademyCatalogue'
import { AcademyWorkshopBanner } from '@/components/organisms/AcademyWorkshopBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skincare & Beauty Academy | Angel Touch Ahmedabad',
  description:
    'Certified diploma and individual course categories in Advanced Cosmetology, Trichology, Clinical Aesthetics, Machinery, Chemical Peels, and Aromatherapy by Heena Thaker in Satellite, Ahmedabad.',
  alternates: { canonical: 'https://angeltouch.in/academy' },
  keywords: [
    'Beauty academy Ahmedabad',
    'Skincare academy Satellite Ahmedabad',
    'Cosmetology course Ahmedabad',
    'Trichology training Ahmedabad',
    'Aromatherapy course Ahmedabad',
    'Clinical aesthetics training Ahmedabad',
    'Heena Thaker academy',
    'Chemical peel course Ahmedabad',
    'Aesthetic machinery training Ahmedabad',
    'Women beauty school Ahmedabad',
  ],
  openGraph: {
    title: 'Skincare & Beauty Academy | Angel Touch Ahmedabad',
    description:
      'Certified Cosmetology, Trichology, Clinical Machinery, and Aromatherapy Diploma courses taught personally by Heena Thaker.',
    url: 'https://angeltouch.in/academy',
    images: [{ url: '/images/ayurvedic_academy_workshop.jpg', width: 1200, height: 630, alt: 'Angel Touch Skincare & Beauty Academy' }],
  },
}

export const instant = false

export default async function AcademyPage() {
  const sanityCourses = (await client.fetch(ALL_ACADEMY_COURSES_QUERY).catch(() => [])) || []

  return (
    <main className="bg-[#faf8f2] min-h-screen">
      <AcademyHero />
      <AcademyHallmarks />
      <AcademyCatalogue initialCourses={sanityCourses.length > 0 ? sanityCourses : undefined} />
      <AcademyWorkshopBanner />
    </main>
  )
}
