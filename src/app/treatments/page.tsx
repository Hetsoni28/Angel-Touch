import { TreatmentsHero } from '@/components/organisms/TreatmentsHero'
import { TreatmentsCatalogue } from '@/components/organisms/TreatmentsCatalogue'
import { WhyAngelTouch } from '@/components/organisms/WhyAngelTouch'
import { InquiryCTA } from '@/components/organisms/InquiryCTA'
import { client } from '@/sanity/lib/client'
import { ALL_TREATMENTS_QUERY } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayurvedic Treatments & Therapies',
  description:
    'Experience authentic Ayurvedic healing at Angel Touch — Shirodhara, Abhyanga full-body massage, holistic skin treatments, bridal styling, and more. Women-only salon in Satellite, Ahmedabad.',
  alternates: { canonical: 'https://angeltouch.in/treatments' },
  openGraph: {
    title: 'Ayurvedic Treatments & Therapies | Angel Touch',
    description:
      'Shirodhara, Abhyanga, holistic skin treatments, and bridal styling. Authentic Ayurvedic healing at Angel Touch — women-only salon.',
    url: 'https://angeltouch.in/treatments',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Ayurvedic treatments at Angel Touch' }],
  },
}


const fallbackTreatments = [
  {
    _id: 't1',
    name: 'Advanced Aroma Facial',
    slug: 'advanced-aroma-facial',
    imageUrl: '/images/ayurvedic_face_mask_jar_1791410290852.jpg',
    description: 'A deeply restorative facial using pure botanical essential oils to clarify, hydrate and balance the skin.',
    duration: 60,
  },
  {
    _id: 't2',
    name: 'Shirodhara Therapy',
    slug: 'shirodhara',
    imageUrl: '/images/ayurvedic_shirodhara.jpg',
    description: 'A continuous, rhythmic flow of warm medicated herbal oil over the forehead to support mental clarity and deep relaxation.',
    duration: 45,
  },
  {
    _id: 't3',
    name: 'Botanical Hair Spa',
    slug: 'botanical-hair-spa',
    imageUrl: '/images/ayurvedic_hair_elixir_1791410293201.jpg',
    description: 'Intensive nourishment for the scalp and hair using natural Ayurvedic ingredients to restore strength and shine.',
    duration: 60,
  },
  {
    _id: 't4',
    name: 'Bridal Styling',
    slug: 'bridal-styling',
    imageUrl: '/images/ayurvedic_beauty_editorial_1791410358517.jpg',
    description: 'Flawless, elegant bridal makeup and hair styling for your special day, available in-salon or on location.',
    duration: 120,
  }
]

export const instant = false

export default async function TreatmentsPage() {
  let sanityTreatments = []
  try {
    const data = await client.fetch(ALL_TREATMENTS_QUERY)
    if (data && data.length > 0) {
      sanityTreatments = data
    } else {
      sanityTreatments = fallbackTreatments
    }
  } catch {
    sanityTreatments = fallbackTreatments
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

