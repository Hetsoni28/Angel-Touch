import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { client } from '@/sanity/lib/client'
import { ALL_TREATMENTS_QUERY } from '@/sanity/lib/queries'

export async function FeaturedTreatmentsSection() {
  let treatments = []
  try {
    const data = await client.fetch(ALL_TREATMENTS_QUERY)
    treatments = data.filter((t: any) => t.featured).slice(0, 2)
    if (treatments.length === 0) {
      treatments = data.slice(0, 2)
    }
  } catch (error) {
    console.error('Failed to fetch featured treatments', error)
  }

  if (treatments.length === 0) return null

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
            <Link href="/treatments" className="at-link shrink-0">
              View all treatments &rarr;
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {treatments.map((t: any, index: number) => (
            <FadeIn key={t._id || index} delay={0.1 * (index + 1)} className="flex flex-col h-full">
              <article className="group flex flex-col h-full bg-white border border-[#dde7dd]/80 p-6 sm:p-8">
                
                <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-[16/10] relative">
                  <img
                    src={t.imageUrl || '/images/ayurvedic_abhyanga.jpg'}
                    alt={t.name}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3
                    className="text-[1.3rem] md:text-[1.45rem] font-medium text-[#1e2228] leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t.name}
                  </h3>
                  {t.duration && (
                    <span className="shrink-0 text-[10px] tracking-[0.14em] text-[#5c8f60] font-semibold uppercase bg-[#e9f3e9] px-3 py-1">
                      {t.duration}
                    </span>
                  )}
                </div>

                <p className="text-[14px] text-[#5c5a58] leading-relaxed mb-6 grow line-clamp-3">
                  {t.shortDescription || t.description || ''}
                </p>

                <div className="pt-2 border-t border-[#dde7dd]/60">
                  <Link
                    href={`/treatments/${t.slug?.current || t.slug}`}
                    className="at-link at-link-green"
                  >
                    Enquire / Book &rarr;
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
