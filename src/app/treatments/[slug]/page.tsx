import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { FadeIn } from '@/components/atoms/FadeIn'
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Try to fetch from Sanity
  let treatment = null
  try {
    treatment = await client.fetch(TREATMENT_BY_SLUG_QUERY, { slug: params.slug })
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

export default async function TreatmentDetailPage({ params }: { params: { slug: string } }) {
  let treatment = null
  
  try {
    treatment = await client.fetch(TREATMENT_BY_SLUG_QUERY, { slug: params.slug })
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
    treatment = fallbackTreatments.find(t => t.slug === params.slug)
    
    if (!treatment) {
      notFound()
    }
  }

  return (
    <>
      <section className="bg-[#faf8f2] pt-16 pb-20 md:pt-24 md:pb-32 min-h-[70vh] border-b border-[#dde7dd]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="mb-10">
            <Link href="/treatments" className="text-[11px] font-semibold tracking-widest uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors">
              ← Back to Treatments
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Image */}
            <div className="order-2 lg:order-1">
              <FadeIn>
                <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#e9f3e9] rounded-sm overflow-hidden">
                  {treatment.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={treatment.imageUrl}
                      alt={treatment.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8a8d87]">
                      No image available
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <FadeIn delay={0.1}>
                <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4">
                  Angel Touch Treatment
                </p>
                <h1
                  className="text-[2.2rem] md:text-[3rem] font-medium text-[#1e2228] leading-[1.1] mb-6"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {treatment.name}
                </h1>
                
                {treatment.duration && (
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5c8f60]" />
                    <span className="text-[13px] text-[#5c5a58] font-medium tracking-wide uppercase">
                      {treatment.duration} Minutes
                    </span>
                  </div>
                )}

                <span className="gold-rule mb-8 block" />
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] mb-10">
                  {treatment.description}
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <Link
                  href={`/contact?treatment=${treatment.slug}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
                >
                  Enquire / Book This Treatment
                </Link>
              </FadeIn>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
