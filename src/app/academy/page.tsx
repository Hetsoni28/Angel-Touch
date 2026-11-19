import { client } from '@/sanity/lib/client'
import { ALL_ACADEMY_COURSES_QUERY } from '@/sanity/lib/queries'
import { AcademyHero } from '@/components/organisms/AcademyHero'
import { AcademyHallmarks } from '@/components/organisms/AcademyHallmarks'
import { AcademyCatalogue } from '@/components/organisms/AcademyCatalogue'
import { AcademyWorkshopBanner } from '@/components/organisms/AcademyWorkshopBanner'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/atoms/JsonLd'
import { breadcrumbJsonLd, absoluteUrl, ORGANIZATION_REF } from '@/lib/seo'
import { OFFICIAL_ACADEMY_COURSES } from '@/lib/academyCourses'

export const metadata: Metadata = pageMetadata({
  title: 'Beauty & Cosmetology Courses in Ahmedabad',
  description:
    'Certified cosmetology, skin, hair, aromatherapy and Ayurveda courses taught by Heena Thaker at Angel Touch Academy in Satellite, Ahmedabad. Enquire today.',
  path: '/academy',
  image: {
    url: '/images/ayurvedic_academy_workshop.jpg',
    alt: 'Students in a hands-on cosmetology workshop at Angel Touch Beauty Academy, Ahmedabad',
  },
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
})

export const instant = false

export default async function AcademyPage() {
  const sanityCourses = (await client.fetch(ALL_ACADEMY_COURSES_QUERY).catch(() => [])) || []

  const courses: { name: string; description?: string }[] =
    sanityCourses.length > 0 ? sanityCourses : OFFICIAL_ACADEMY_COURSES

  // Course rich results need name, description and provider for every course.
  const coursesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Beauty, cosmetology and Ayurveda courses at Angel Touch Academy',
    url: absoluteUrl('/academy'),
    itemListElement: courses
      .filter((c) => c.name && c.description)
      .map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Course',
          name: c.name,
          description: c.description,
          provider: ORGANIZATION_REF,
          url: absoluteUrl('/academy'),
        },
      })),
  }

  return (
    // <div>, not <main>: the root layout already renders the page's <main>.
    <div className="bg-[#faf8f2] min-h-screen">
      <JsonLd data={[breadcrumbJsonLd([{ name: 'Academy', path: '/academy' }]), coursesSchema]} />
      <AcademyHero />
      <AcademyHallmarks />
      <AcademyCatalogue initialCourses={sanityCourses.length > 0 ? sanityCourses : undefined} />
      <AcademyWorkshopBanner />
    </div>
  )
}
