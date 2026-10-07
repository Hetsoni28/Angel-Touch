import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

// TODO: Replace with Sanity CMS query
const placeholderTreatments = [
  {
    id: '1',
    name: 'Abhyanga Herbal Massage',
    duration: '60 min',
    description:
      'A warm herbal oil full-body massage following Ayurvedic technique, designed to nourish the skin, ease muscle tension, and support the body\'s natural cleansing process.',
    slug: 'abhyanga',
    image: '/images/ayurvedic_abhyanga.jpg',
  },
  {
    id: '2',
    name: 'Shirodhara Oil Therapy',
    duration: '45 min',
    description:
      'A continuous, rhythmic flow of warm medicated oil over the forehead — a deeply calming Ayurvedic experience traditionally used to support mental clarity and reduce accumulated stress.',
    slug: 'shirodhara',
    image: '/images/ayurvedic_shirodhara.jpg',
  },
]

export function FeaturedTreatmentsSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Intro */}
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
              View all treatments →
            </Link>
          </FadeIn>
        </div>

        {/* Treatment Grid — balanced 2-column editorial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {placeholderTreatments.map((t, index) => (
            <FadeIn key={t.id} delay={0.1 * (index + 1)} className="flex flex-col h-full">
              <article className="group flex flex-col h-full bg-white border border-[#dde7dd]/80 p-6 sm:p-8">
                {/* Image */}
                <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-[16/10] max-h-[260px]">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3
                    className="text-[1.3rem] md:text-[1.45rem] font-medium text-[#1e2228] leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t.name}
                  </h3>
                  <span className="shrink-0 text-[10px] tracking-[0.14em] text-[#5c8f60] font-semibold uppercase bg-[#e9f3e9] px-3 py-1">
                    {t.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[14px] text-[#5c5a58] leading-relaxed mb-6 flex-grow">
                  {t.description}
                </p>

                {/* CTA */}
                <div className="pt-2 border-t border-[#dde7dd]/60">
                  <Link
                    href={`/treatments/${t.slug}#enquire`}
                    className="at-link at-link-green"
                  >
                    Enquire / Book →
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

