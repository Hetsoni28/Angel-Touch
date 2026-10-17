import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'

export async function FeaturedProductsSection() {
  const rituals = [
    {
      name: 'Botanical Hair Spa & Scalp Therapy',
      slug: 'treatments?category=hair-spa',
      category: 'Hair Care & Rituals',
      imageUrl: '/images/treatment_hair_spa.jpg',
      description: 'A deeply nourishing Ayurvedic hair ritual with warm botanical oil massage and gentle scalp revival for silky, lustrous locks.',
    },
    {
      name: 'Bridal & Ceremony Artistry',
      slug: 'treatments?category=bridal-makeup',
      category: 'Bridal & Styling',
      imageUrl: '/images/treatment_bridal_styling.jpg',
      description: 'Exquisite traditional Gujarati and contemporary bridal makeup with authentic draping, fresh floral styling, and timeless royal elegance.',
    },
    {
      name: 'Purifying Clean-Up & D-Tan Ritual',
      slug: 'treatments?category=clean-up',
      category: 'Skin & Aesthetics',
      imageUrl: '/images/treatment_clean_up.jpg',
      description: 'Refreshing botanical fruit enzyme cleanse and herbal tan removal designed to clarify congested pores and restore luminous skin tone.',
    }
  ]

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <FadeIn delay={0.1}>
            <h2
              className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Signature Sanctuary Rituals.
            </h2>
            <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed max-w-md">
              Formulated from botanical ingredients drawn from Ayurvedic tradition. Crafted with dedicated care for hair, bridal, and glowing skin.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            <Link 
              href="/treatments" 
              className="at-link shrink-0 inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
            >
              View all services &rarr;
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {rituals.map((ritual: any, index: number) => (
            <FadeIn key={index} delay={0.1 * (index + 1)} className="flex flex-col h-full">
              <article className="group flex flex-col h-full">
                <div className="overflow-hidden bg-[#faf8f2] border border-[#dde7dd]/60 img-zoom mb-5 aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] relative">
                  <Image
                    src={ritual.imageUrl}
                    alt={ritual.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] tracking-[0.22em] text-[#5c5a58] uppercase mb-1.5">{ritual.category}</p>
                <h3
                  className="text-[1.1rem] font-medium text-[#1e2228] mb-2 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {ritual.name}
                </h3>
                <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-4 grow line-clamp-3">
                  {ritual.description}
                </p>
                <Link 
                  href={`/${ritual.slug}`} 
                  className="at-link at-link-green inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                  aria-label={`View ritual details: ${ritual.name}`}
                >
                  Explore Service &rarr;
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
