import { FadeIn } from '@/components/atoms/FadeIn'
import Link from 'next/link'

type Treatment = {
  _id: string
  name: string
  slug: string
  imageUrl?: string
  description?: string
  duration?: number
}

// Fallback data if Sanity is empty
const fallbackTreatments: Treatment[] = [
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

export function TreatmentsCatalogue({ treatments }: { treatments?: Treatment[] | null }) {
  const displayTreatments = treatments && treatments.length > 0 ? treatments : fallbackTreatments

  return (
    <section id="catalogue" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Editorial Introduction */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <FadeIn>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-5">
              The Angel Touch Approach
            </p>
            <h2
              className="text-[2rem] md:text-[2.8rem] font-medium text-[#1e2228] leading-[1.15] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Beauty begins with thoughtful care.
            </h2>
            <div className="w-px h-12 bg-[#dde7dd] mx-auto mt-8 mb-8" />
            <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8]">
              Every treatment is an intentional ritual designed to honour your natural beauty. Delivered in our private women-only rooms in Satellite, Ahmedabad, we combine advanced aesthetic techniques with time-tested Ayurvedic wisdom.
            </p>
          </FadeIn>
        </div>

        {/* Grid Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <FadeIn>
            <h3
              className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Explore our treatments.
            </h3>
            <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed">
              Find an experience that feels right for you.
            </p>
          </FadeIn>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
          {displayTreatments.map((treatment, index) => (
            <FadeIn key={treatment._id} delay={0.1 * (index % 2 + 1)}>
              <article className="group flex flex-col h-full">
                
                {/* Image */}
                <Link href={`/treatments/${treatment.slug}`} className="block overflow-hidden bg-[#faf8f2] aspect-[4/3] mb-6 rounded-sm">
                  {treatment.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={treatment.imageUrl}
                      alt={treatment.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8a8d87] text-sm">
                      No image
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-col grow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <Link href={`/treatments/${treatment.slug}`}>
                      <h4
                        className="text-[1.4rem] md:text-[1.6rem] font-medium text-[#1e2228] leading-snug hover:text-[#2e7a3a] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {treatment.name}
                      </h4>
                    </Link>
                    {treatment.duration && (
                      <span className="shrink-0 text-[10px] tracking-[0.14em] text-[#5c8f60] font-semibold uppercase bg-[#e9f3e9] px-2.5 py-1 rounded-sm mt-1">
                        {treatment.duration} min
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[14px] md:text-[15px] text-[#5c5a58] leading-[1.7] mb-6 line-clamp-3 grow">
                    {treatment.description}
                  </p>

                  <div className="pt-4 border-t border-[#dde7dd]/60">
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="at-link at-link-green inline-flex"
                    >
                      Enquire / Book →
                    </Link>
                  </div>
                </div>

              </article>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
