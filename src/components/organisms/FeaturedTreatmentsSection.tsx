import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'
import { client } from '@/sanity/lib/client'
import { ALL_TREATMENTS_QUERY } from '@/sanity/lib/queries'

export async function FeaturedTreatmentsSection() {
  let treatments = []
  try {
    const data = await client.fetch(ALL_TREATMENTS_QUERY)
    treatments = data.filter((t: any) => t.featured).slice(0, 2)
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
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <FadeIn delay={0.1}>
            <div className="max-w-xl">
              <h2
                className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Personal care, thoughtfully approached.
              </h2>
              <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed">
                Each treatment at Angel Touch is a considered, personalised experience drawing on authentic Ayurvedic practice and applied with dedicated care.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            <Link 
              href="/treatments" 
              className="at-link shrink-0 inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
            >
              View all treatments &rarr;
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {treatments.map((t: any, index: number) => {
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
                <article className="group flex flex-col h-full bg-white border border-[#dde7dd]/80 p-6 sm:p-8">
                  
                  <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-[16/10] relative">
                    <Image
                      src={imgSrc}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700"
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

                  <p className="text-[14px] text-[#5c5a58] leading-relaxed mb-6 grow line-clamp-3">
                    {t.shortDescription || t.description || ''}
                  </p>

                  <div className="pt-2 border-t border-[#dde7dd]/60">
                    <a
                      href={`https://wa.me/919723179638?text=${encodeURIComponent(`Hello Angel Touch, I would like to book an appointment for: ${t.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="at-link at-link-green inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                      aria-label={`Enquire or book treatment on WhatsApp: ${t.name}`}
                    >
                      Enquire / Book on WhatsApp &rarr;
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
