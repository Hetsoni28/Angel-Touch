import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'
import { client } from '@/sanity/lib/client'
import { ALL_TREATMENTS_QUERY } from '@/sanity/lib/queries'
import { generateWhatsAppLink } from '@/utils/whatsapp'

type FeaturedTreatment = {
  _id?: string
  slug?: { current: string } | string
  name: string
  price?: string | number
  imageUrl?: string
  shortDescription?: string
  description?: string
  featured?: boolean
}

export async function FeaturedTreatmentsSection() {
  let treatments: FeaturedTreatment[] = []
  try {
    const data = await client.fetch<FeaturedTreatment[]>(ALL_TREATMENTS_QUERY)
    treatments = data.filter((t) => t.featured).slice(0, 2)
    if (treatments.length === 0 && data.length > 0) {
      treatments = data.slice(0, 2)
    }
  } catch {
    // Ignore and proceed to fallback below
  }

  if (treatments.length === 0) {
    // Graceful fallback to signature treatments
    treatments = [
      {
        name: 'Advanced Aroma Facial',
        slug: 'advanced-aroma-facial',
        imageUrl: '/images/treatment_aroma_facial.jpg',
        description: 'A deeply restorative facial using pure botanical essential oils to clarify, hydrate and balance the skin.',
      },
      {
        name: 'Shirodhara Therapy',
        slug: 'shirodhara',
        imageUrl: '/images/treatment_shirodhara.jpg',
        description: 'A continuous, rhythmic flow of warm medicated herbal oil over the forehead to support mental clarity and deep relaxation.',
      }
    ]
  }

  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 mb-12 md:mb-16">
          <FadeIn>
            <div className="max-w-xl">
              <p className="eyebrow mb-4">Book a treatment</p>
              <h2
                className="text-[1.9rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.12]"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                Personal care, one guest <span className="accent-italic">at a time</span>.
              </h2>
              <p className="mt-4 text-[15.5px] text-[#4a4846] leading-[1.75]">
                Aromatherapy and Ayurvedic practice, adapted to your skin and hair on the day. Message
                us on WhatsApp with the treatment you&apos;d like and we&apos;ll suggest a time.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} direction="none">
            <Link
              href="/treatments"
              className="at-link shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
            >
              All treatments <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {treatments.map((t, index) => {
            const fallbackImage = (t.name || '').toLowerCase().includes('shirodhara')
              ? '/images/treatment_shirodhara.jpg'
              : (t.name || '').toLowerCase().includes('hair')
              ? '/images/ayurvedic_hair_elixir.jpg'
              : (t.name || '').toLowerCase().includes('facial')
              ? '/images/treatment_aroma_facial.jpg'
              : index % 2 === 0
              ? '/images/treatment_aroma_facial.jpg'
              : '/images/treatment_shirodhara.jpg'
            const imgSrc = t.imageUrl || fallbackImage

            return (
              <FadeIn key={t._id || index} delay={0.1 * (index + 1)} className="flex flex-col h-full">
                <article className="at-card group flex flex-col h-full bg-white p-5 sm:p-7">
                  <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-7 aspect-[16/10] relative">
                    <Image
                      src={imgSrc}
                      alt={`${t.name} treatment at Angel Touch Ayurvedic salon, Satellite, Ahmedabad`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-cover object-[center_35%]"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3
                      className="text-[1.3rem] md:text-[1.45rem] font-medium text-[#1e2228] leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {t.name}
                    </h3>
                    {t.price && (
                      <div className="shrink-0">
                        <span className="text-[11px] font-semibold text-[#1e5f2e] bg-[#faf8f2] border border-[#dde7dd] px-2.5 py-0.5">
                          {t.price}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-[14.5px] text-[#4a4846] leading-[1.7] mb-6 grow line-clamp-3">
                    {t.shortDescription || t.description || ''}
                  </p>

                  <div className="pt-4 border-t border-[#dde7dd]/70">
                    <a
                      href={generateWhatsAppLink({ type: 'TREATMENT', itemName: t.name })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="at-link at-link-green min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                      aria-label={`Book ${t.name} on WhatsApp (opens in a new tab)`}
                    >
                      Book on WhatsApp <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>

      </div>
    </section>
  )
}
