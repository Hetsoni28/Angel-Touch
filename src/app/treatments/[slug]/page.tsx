import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { FadeIn } from '@/components/atoms/FadeIn'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const instant = false

// We use a basic groq query for the detail page
const TREATMENT_BY_SLUG_QUERY = groq`
  *[_type == "treatment" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "imageUrl": images[0].asset->url,
    "description": description[0].children[0].text,
    duration
  }
`

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Try to fetch from Sanity
  let treatment = null
  try {
    treatment = await client.fetch(TREATMENT_BY_SLUG_QUERY, { slug })
  } catch (e) {
    // ignore
  }

  if (treatment) {
    return {
      title: `${treatment.name} | Angel Touch`,
      description: treatment.description || 'Ayurvedic treatment at Angel Touch.',
    }
  }

  // Fallback
  return {
    title: 'Treatment | Angel Touch',
    description: 'Explore premium treatments at Angel Touch.',
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
    treatment = fallbackTreatments.find(t => t.slug === slug)
    
    if (!treatment) {
      notFound()
    }
  }

  return (
    <>
      <article className="min-h-screen bg-[#faf8f2]">
        
        {/* Editorial Hero */}
        <header className="relative w-full min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end">
          
          <div className="absolute inset-0 z-0">
            {treatment.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={treatment.imageUrl}
                alt={treatment.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-[#e9f3e9]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f2] via-[#faf8f2]/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
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

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16">
                <div className="max-w-2xl">
                  <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-5">
                    Signature Treatment
                  </p>
                  <h1
                    className="text-[2.6rem] md:text-[3.8rem] lg:text-[4.4rem] font-medium text-[#1e2228] leading-[1.05]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {treatment.name}
                  </h1>
                </div>

                {treatment.duration && (
                  <div className="shrink-0 flex items-center gap-3 bg-white px-5 py-3 border border-[#dde7dd]/60 shadow-sm">
                    <svg className="w-4 h-4 text-[#5c8f60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1e2228]">
                      {treatment.duration} Minutes
                    </span>
                  </div>
                )}
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
                    {treatment.description}
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
                  
                  <Link
                    href={`/contact?treatment=${treatment.slug}`}
                    className="flex items-center justify-center w-full py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
                  >
                    Enquire / Book
                  </Link>

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
