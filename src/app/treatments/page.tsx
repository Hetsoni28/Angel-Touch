import { TreatmentsHero } from '@/components/organisms/TreatmentsHero'
import { TreatmentsCatalogue } from '@/components/organisms/TreatmentsCatalogue'
import { WhyAngelTouch } from '@/components/organisms/WhyAngelTouch'
import { InquiryCTA } from '@/components/organisms/InquiryCTA'
import { client } from '@/sanity/lib/client'
import { ALL_TREATMENTS_QUERY } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Treatments | Angel Touch',
  description: 'Explore premium beauty and wellness treatments at Angel Touch, a women-only salon in Satellite, Ahmedabad.',
}

export const instant = false

export default async function TreatmentsPage() {
  // Fetch real data from Sanity. Catch errors to gracefully render empty state.
  let sanityTreatments = []
  try {
    sanityTreatments = await client.fetch(ALL_TREATMENTS_QUERY)
  } catch (error) {
    console.error('Failed to fetch treatments from Sanity:', error)
  }

  return (
    <>
      <TreatmentsHero />
      <TreatmentsCatalogue treatments={sanityTreatments} />
      <WhyAngelTouch />
      <InquiryCTA />
    </>
  )
}
