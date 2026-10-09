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

export function TreatmentsCatalogue({ treatments }: { treatments?: Treatment[] | null }) {
  const displayTreatments = treatments || []

  if (displayTreatments.length === 0) {
    return (
      <section id="catalogue" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Treatments & Services
          </h2>
          <p className="text-[#5c5a58]">
            No treatments are currently available. Please check back later.
          </p>
        </div>
      </section>
    )
  }

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

        {/* Treatments Editorial Layout */}
        <div className="flex flex-col gap-24 md:gap-40">
          {displayTreatments.map((treatment, index) => {
            const isEven = index % 2 !== 0
            
            return (
              <FadeIn key={treatment._id} delay={0.1}>
                <article className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
                  
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <Link href={`/treatments/${treatment.slug}`} className="block relative w-full aspect-[4/5] bg-[#e9f3e9] overflow-hidden rounded-sm group">
                      {treatment.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={treatment.imageUrl}
                          alt={treatment.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8a8d87] text-sm">
                          No image
                        </div>
                      )}
                    </Link>
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-1/2 flex flex-col ${isEven ? 'lg:items-start' : 'lg:items-start'}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-8 h-px bg-[#5c8f60]" />
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5c8f60]">
                        Signature Treatment
                      </span>
                    </div>

                    <Link href={`/treatments/${treatment.slug}`}>
                      <h4
                        className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.1] mb-6 hover:text-[#2e7a3a] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {treatment.name}
                      </h4>
                    </Link>
                    
                    {treatment.duration && (
                      <p className="text-[11px] tracking-[0.16em] uppercase text-[#8a8d87] font-medium mb-8">
                        {treatment.duration} Minutes
                      </p>
                    )}
                    
                    <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] mb-10 max-w-md">
                      {treatment.description}
                    </p>

                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="group inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1e2228] hover:text-[#2e7a3a] transition-colors"
                    >
                      <span className="border-b border-[#1e2228] group-hover:border-[#2e7a3a] pb-1 transition-colors">
                        Discover More
                      </span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14m-6-6l6 6-6 6"/>
                      </svg>
                    </Link>
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
