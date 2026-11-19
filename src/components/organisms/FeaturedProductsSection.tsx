import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { CinematicImage } from '@/components/atoms/CinematicImage'

const rituals = [
  {
    name: 'Botanical Hair Spa & Scalp Therapy',
    href: '/treatments?category=hair-spa',
    category: 'Hair care',
    imageUrl: '/images/treatment_hair_spa.jpg',
    description: 'Warm botanical oil worked into the scalp, followed by a deep-conditioning spa for soft, glossy hair.',
  },
  {
    name: 'Bridal & Ceremony Artistry',
    href: '/treatments?category=bridal-makeup',
    category: 'Bridal & styling',
    imageUrl: '/images/treatment_bridal_styling.jpg',
    description: 'Traditional Gujarati and contemporary bridal looks, with saree draping and fresh-flower hair styling.',
  },
  {
    name: 'Clean-Up & D-Tan Ritual',
    href: '/treatments?category=clean-up',
    category: 'Skin',
    imageUrl: '/images/treatment_clean_up.jpg',
    description: 'A fruit-enzyme cleanse and herbal de-tan that clears congested pores and brings back an even tone.',
  },
]

export function FeaturedProductsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 mb-12 md:mb-14">
          <FadeIn>
            <p className="eyebrow mb-4">Most requested</p>
            <h2
              className="text-[1.9rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.12]"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
            >
              Signature <span className="accent-italic">rituals</span>.
            </h2>
            <p className="mt-4 text-[15.5px] text-[#4a4846] leading-[1.75] max-w-md">
              Three treatments that show the Angel Touch approach: botanical ingredients and
              unhurried, hands-on care.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} direction="none">
            <Link href="/treatments" className="at-link shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm">
              All treatments <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-10">
          {rituals.map((ritual, index) => (
            <FadeIn key={ritual.name} delay={0.08 * index} className="flex flex-col h-full">
              <article className="group relative flex flex-col h-full">
                <CinematicImage
                  src={ritual.imageUrl}
                  alt={`${ritual.name} – ${ritual.category} at Angel Touch, Ahmedabad`}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  parallax={4}
                  reveal
                  className="img-zoom bg-[#faf8f2] mb-6 aspect-[4/5] md:aspect-[3/4]"
                  imageClassName="object-cover object-center"
                >
                  <span className="absolute top-0 left-0 bg-[#faf8f2] px-3 py-2 text-[10px] tracking-[0.2em] uppercase text-[#1e5f2e] font-semibold">
                    {ritual.category}
                  </span>
                </CinematicImage>
                <h3
                  className="text-[1.25rem] font-medium text-[#1e2228] mb-2.5 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {ritual.name}
                </h3>
                <p className="text-[14px] text-[#4a4846] leading-[1.7] mb-5 grow">{ritual.description}</p>
                <Link
                  href={ritual.href}
                  className="at-link at-link-green min-h-[44px] after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                  aria-label={`See treatment details: ${ritual.name}`}
                >
                  See details <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
