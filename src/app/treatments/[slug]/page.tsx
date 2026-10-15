import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const instant = false

const fallbackTreatments = [
  {
    _id: 't1',
    name: 'Advanced Aroma Facial',
    slug: 'advanced-aroma-facial',
    category: 'facial',
    imageUrl: '/images/face_mask.jpg',
    description: 'A deeply restorative facial using pure botanical essential oils to clarify, hydrate and balance the skin.',
  },
  {
    _id: 't2',
    name: 'Shirodhara Therapy',
    slug: 'shirodhara',
    category: 'shirodhara',
    imageUrl: '/images/ayurvedic_shirodhara.jpg',
    description: 'A continuous, rhythmic flow of warm medicated herbal oil over the forehead to support mental clarity and deep relaxation.',
  },
  {
    _id: 't3',
    name: 'Botanical Hair Spa',
    slug: 'botanical-hair-spa',
    category: 'hair-spa',
    imageUrl: '/images/ayurvedic_hair_elixir.jpg',
    description: 'Intensive nourishment for the scalp and hair using natural Ayurvedic ingredients to restore strength and shine.',
  },
  {
    _id: 't4',
    name: 'Bridal Styling',
    slug: 'bridal-styling',
    category: 'bridal-makeup',
    imageUrl: '/images/ayurvedic_editorial_bg.jpg',
    description: 'Flawless, elegant bridal makeup and hair styling for your special day, available in-salon or on location.',
  }
]

// We use a comprehensive groq query for the detail page
const TREATMENT_BY_SLUG_QUERY = groq`
  *[_type == "treatment" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    featured,
    "imageUrl": coalesce(
      image.asset->url,
      images[0].asset->url,
      null
    )
  }
`

function resolveTreatmentImage(t: { imageUrl?: string; category?: string; name?: string }): string {
  if (t.imageUrl) return t.imageUrl
  const lowerName = (t.name || '').toLowerCase()
  if (lowerName.includes('shirodhara')) return '/images/ayurvedic_shirodhara.jpg'
  if (lowerName.includes('hair') || lowerName.includes('scalp')) return '/images/ayurvedic_hair_elixir.jpg'
  if (lowerName.includes('facial') || lowerName.includes('skin') || lowerName.includes('glow') || lowerName.includes('clean') || lowerName.includes('bleach') || lowerName.includes('tan')) return '/images/face_mask.jpg'
  if (lowerName.includes('abhyanga') || lowerName.includes('massage') || lowerName.includes('body') || lowerName.includes('scrub') || lowerName.includes('wrap') || lowerName.includes('steam')) return '/images/ayurvedic_abhyanga.jpg'
  if (lowerName.includes('bridal') || lowerName.includes('makeup') || lowerName.includes('ceremony')) return '/images/ayurvedic_editorial_bg.jpg'
  if (lowerName.includes('nail') || lowerName.includes('hand') || lowerName.includes('feet') || lowerName.includes('waxing') || lowerName.includes('threading')) return '/images/kesar_radiance_oil.jpg'
  
  const cat = t.category || ''
  if (cat.includes('hair') || cat.includes('scalp')) return '/images/ayurvedic_hair_elixir.jpg'
  if (cat === 'shirodhara') return '/images/ayurvedic_shirodhara.jpg'
  if (cat === 'facial' || cat === 'skin' || cat === 'clean-up' || cat === 'bleach-dtan') return '/images/face_mask.jpg'
  if (cat.includes('body') || cat === 'steam-bath') return '/images/ayurvedic_abhyanga.jpg'
  if (cat.includes('makeup') || cat.includes('bridal')) return '/images/ayurvedic_editorial_bg.jpg'
  if (cat === 'nail-art' || cat === 'hand-feet-care' || cat === 'waxing' || cat === 'threading') return '/images/kesar_radiance_oil.jpg'

  return '/images/ayurvedic_abhyanga.jpg'
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  // Try to fetch from Sanity
  let treatment = null
  try {
    treatment = await client.fetch(TREATMENT_BY_SLUG_QUERY, { slug })
  } catch (e) {
    // ignore
  }

  if (!treatment) {
    treatment = fallbackTreatments.find(t => t.slug === slug)
  }

  if (treatment) {
    const title = `${treatment.name} | Ayurvedic Treatment`
    const description = treatment.description || 'Authentic Ayurvedic therapy at Angel Touch.'
    const image = resolveTreatmentImage(treatment)

    return {
      title,
      description,
      alternates: { canonical: `https://angeltouch.in/treatments/${slug}` },
      openGraph: {
        title: `${treatment.name} | Angel Touch`,
        description,
        url: `https://angeltouch.in/treatments/${slug}`,
        images: [{ url: image.startsWith('http') ? image : `https://angeltouch.in${image}`, alt: treatment.name }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${treatment.name} | Angel Touch`,
        description,
        images: [image.startsWith('http') ? image : `https://angeltouch.in${image}`],
      },
    }
  }

  // Fallback
  return {
    title: 'Treatment | Angel Touch',
    description: 'Explore premium Ayurvedic treatments at Angel Touch.',
  }
}

export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let treatment = null
  
  try {
    treatment = await client.fetch(TREATMENT_BY_SLUG_QUERY, { slug })
  } catch (error) {
    console.error('Failed to fetch treatment:', error)
  }

  // Fallback for static demo if Sanity doesn't return anything
  if (!treatment) {
    treatment = fallbackTreatments.find(t => t.slug === slug)
    
    if (!treatment) {
      notFound()
    }
  }

  const displayImage = resolveTreatmentImage(treatment)

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: treatment.name,
    description: treatment.description,
    provider: {
      '@type': 'BeautySalon',
      name: 'Angel Touch by Heena Thaker',
      url: 'https://angeltouch.in',
      telephone: '+919723179638',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'UGF-6, Policlinic Chamber, Opp. Judges Bunglow Road',
        addressLocality: 'Satellite, Ahmedabad',
        postalCode: '380015',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
    serviceType: 'Ayurvedic Therapy & Beauty',
    areaServed: {
      '@type': 'City',
      name: 'Ahmedabad',
    },
    image: displayImage.startsWith('http') ? displayImage : `https://angeltouch.in${displayImage}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <article className="min-h-screen bg-[#faf8f2]">
        
        {/* Editorial Hero */}
        <header className="relative w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end">
          
          <div className="absolute inset-0 z-0">
            <Image
              src={displayImage}
              alt={treatment.name}
              fill
              sizes="100vw"
              className="object-cover object-[center_30%] sm:object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f2] via-[#faf8f2]/60 to-[#faf8f2]/10 sm:via-[#faf8f2]/40" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-12 sm:pb-16 md:pb-24">
            <FadeIn>
              <div className="mb-6 md:mb-10">
                <DynamicBreadcrumbs 
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Treatments', href: '/treatments' },
                    { label: treatment.name }
                  ]} 
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4 sm:mb-5">
                    Signature Treatment
                  </p>
                  <h1
                    className="text-[2.1rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.4rem] font-medium text-[#1e2228] leading-[1.08]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {treatment.name}
                  </h1>
                </div>

              </div>
            </FadeIn>
          </div>

        </header>

        {/* Details Content */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Main Description */}
            <div className="lg:col-span-7 xl:col-span-6">
              <FadeIn delay={0.1}>
                <h2
                  className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2] mb-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  About this experience
                </h2>
                <div className="prose prose-lg prose-p:text-[#5c5a58] prose-p:leading-[1.8] prose-p:mb-6 max-w-none">
                  <p className="text-[16px] md:text-[18px]">
                    {treatment.description || 'An intentional ritual designed to honour your natural beauty, combining advanced aesthetic techniques with time-tested Ayurvedic wisdom at our private women-only sanctuary in Satellite, Ahmedabad.'}
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-5 lg:col-start-8">
              <FadeIn delay={0.2}>
                <div className="sticky top-32 bg-white border border-[#dde7dd]/60 p-8 md:p-12 shadow-sm">
                  <h3
                    className="text-[1.4rem] font-medium text-[#1e2228] mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Reserve your time
                  </h3>
                  <p className="text-[14px] text-[#5c5a58] leading-[1.7] mb-8">
                    To ensure the highest quality of care, all treatments are by appointment only. Let us know when you&apos;d like to visit.
                  </p>

                  <a
                    href={generateWhatsAppLink({ 
                      type: 'TREATMENT', 
                      itemName: treatment.name,
                      itemUrl: `https://angeltouch.in/treatments/${slug}`
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
                  >
                    Book via WhatsApp
                  </a>

                  <div className="mt-8 pt-8 border-t border-[#dde7dd]/60">
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-4">
                      Need Assistance?
                    </p>
                    <a href="tel:+919723179638" className="flex items-center gap-3 text-[13px] font-medium text-[#1e2228] hover:text-[#2e7a3a] transition-colors">
                      <svg className="w-4 h-4 text-[#5c8f60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      +91 97231 79638
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </section>

      </article>
    </>
  )
}
