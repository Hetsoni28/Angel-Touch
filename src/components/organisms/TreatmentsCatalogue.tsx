'use client'

import { useState, useMemo } from 'react'
import { FadeIn } from '@/components/atoms/FadeIn'
import Link from 'next/link'
import Image from 'next/image'

type Treatment = {
  _id: string
  name: string
  slug: string
  category?: string
  price?: string
  imageUrl?: string
  description?: string
  duration?: number
}

const CATEGORY_MAP: Record<string, string> = {
  'ayurvedic-spa': 'Ayurvedic & Spa',
  'facials-skin': 'Facials & Skin',
  'hair-care': 'Hair Rituals',
  'bridal-styling': 'Bridal Styling',
  'grooming': 'Essential Grooming',
}

const FALLBACK_IMAGES = [
  '/images/face_mask.jpg',
  '/images/ayurvedic_shirodhara.jpg',
  '/images/ayurvedic_hair_elixir.jpg',
  '/images/ayurvedic_abhyanga.jpg',
  '/images/kesar_radiance_oil.jpg',
  '/images/ayurvedic_editorial_bg.jpg',
]

function resolveTreatmentImage(t: Treatment, index: number): string {
  if (t.imageUrl) return t.imageUrl

  const lowerName = (t.name || '').toLowerCase()
  if (lowerName.includes('shirodhara')) return '/images/ayurvedic_shirodhara.jpg'
  if (lowerName.includes('hair') || lowerName.includes('scalp')) return '/images/ayurvedic_hair_elixir.jpg'
  if (lowerName.includes('facial') || lowerName.includes('skin') || lowerName.includes('glow') || lowerName.includes('face') || lowerName.includes('fruit')) return '/images/face_mask.jpg'
  if (lowerName.includes('abhyanga') || lowerName.includes('massage') || lowerName.includes('body')) return '/images/ayurvedic_abhyanga.jpg'
  if (lowerName.includes('bridal') || lowerName.includes('makeup')) return '/images/ayurvedic_editorial_bg.jpg'
  if (lowerName.includes('oil') || lowerName.includes('kesar')) return '/images/kesar_radiance_oil.jpg'

  if (t.category === 'hair-care') return '/images/ayurvedic_hair_elixir.jpg'
  if (t.category === 'ayurvedic-spa') return '/images/ayurvedic_shirodhara.jpg'
  if (t.category === 'facials-skin') return '/images/face_mask.jpg'
  if (t.category === 'bridal-styling') return '/images/ayurvedic_editorial_bg.jpg'
  if (t.category === 'grooming') return '/images/ayurvedic_abhyanga.jpg'

  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
}

export function TreatmentsCatalogue({ treatments }: { treatments?: Treatment[] | null }) {
  const displayTreatments = treatments || []
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Collect unique categories present in the data
  const availableCategories = useMemo(() => {
    const cats = new Set<string>()
    displayTreatments.forEach((t) => {
      if (t.category) cats.add(t.category)
    })
    return Array.from(cats)
  }, [displayTreatments])

  const filteredTreatments = useMemo(() => {
    if (selectedCategory === 'all') return displayTreatments
    return displayTreatments.filter((t) => t.category === selectedCategory)
  }, [displayTreatments, selectedCategory])

  if (displayTreatments.length === 0) {
    return (
      <section id="catalogue" className="relative py-32 md:py-48 min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/treatments-services-bg.png"
            alt="Spa Treatment Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center drop-shadow-md">
          <h2 
            className="text-[2.2rem] md:text-[3rem] font-medium text-[#1e2228] mb-6 drop-shadow-md" 
            style={{ fontFamily: 'var(--font-heading)', textShadow: '0 2px 10px rgba(255,255,255,0.8)' }}
          >
            Treatments & Services
          </h2>
          <p 
            className="text-[16px] text-[#2c2a28] font-medium drop-shadow-sm max-w-md mx-auto" 
            style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9)' }}
          >
            No treatments are currently available in the catalogue. Please check back later.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="catalogue" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Editorial Introduction */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-28">
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

        {/* Grid Header & Category Filter Tabs */}
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

          {/* Category Tabs (if treatments have categories) */}
          {availableCategories.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2 border transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#1e5f2e] text-white border-[#1e5f2e]'
                    : 'bg-[#faf8f2] text-[#5c5a58] border-[#dde7dd] hover:border-[#1e5f2e]'
                }`}
              >
                All
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-semibold tracking-[0.14em] uppercase px-4 py-2 border transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1e5f2e] text-white border-[#1e5f2e]'
                      : 'bg-[#faf8f2] text-[#5c5a58] border-[#dde7dd] hover:border-[#1e5f2e]'
                  }`}
                >
                  {CATEGORY_MAP[cat] || cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Treatments Editorial Layout */}
        <div className="flex flex-col gap-24 md:gap-36">
          {filteredTreatments.map((treatment, index) => {
            const isEven = index % 2 !== 0
            const imageSrc = resolveTreatmentImage(treatment, index)
            const categoryLabel = treatment.category
              ? (CATEGORY_MAP[treatment.category] || treatment.category)
              : 'Signature Treatment'

            return (
              <FadeIn key={treatment._id || index} delay={0.1}>
                <article className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
                  
                  {/* Image - Always has an authentic editorial photo */}
                  <div className="w-full lg:w-1/2">
                    <Link 
                      href={`/treatments/${treatment.slug}`} 
                      className="block relative w-full aspect-[4/3] sm:aspect-[4/5] bg-[#e9f3e9] overflow-hidden rounded-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
                      aria-label={`View treatment details: ${treatment.name}`}
                    >
                      <Image
                        src={imageSrc}
                        alt={treatment.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 flex flex-col lg:items-start">
                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                      <span className="w-8 h-px bg-[#1e5f2e]" aria-hidden="true" />
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1e5f2e]">
                        {categoryLabel}
                      </span>
                    </div>

                    <Link 
                      href={`/treatments/${treatment.slug}`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                    >
                      <h4
                        className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.1] mb-4 sm:mb-6 hover:text-[#2e7a3a] transition-colors"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {treatment.name}
                      </h4>
                    </Link>
                    
                    {/* Duration & Price badges */}
                    {(treatment.duration || treatment.price) && (
                      <div className="flex items-center flex-wrap gap-2.5 mb-6">
                        {treatment.duration && (
                          <span className="text-[11px] tracking-[0.14em] uppercase text-[#5c5a58] font-medium bg-[#faf8f2] px-3.5 py-1.5 border border-[#dde7dd]">
                            {treatment.duration} Minutes
                          </span>
                        )}
                        {treatment.price && (
                          <span className="text-[11px] tracking-[0.12em] font-semibold text-[#1e5f2e] bg-[#e9f3e9] px-3.5 py-1.5 border border-[#1e5f2e]/20">
                            {treatment.price}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {treatment.description && (
                      <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] mb-8 max-w-md">
                        {treatment.description}
                      </p>
                    )}

                    <div className="flex items-center gap-6">
                      <Link
                        href={`/treatments/${treatment.slug}`}
                        aria-label={`Discover more about ${treatment.name}`}
                        className="group inline-flex items-center min-h-[44px] gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1e2228] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
                      >
                        <span className="border-b border-[#1e2228] group-hover:border-[#2e7a3a] pb-1 transition-colors">
                          Discover More
                        </span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M5 12h14m-6-6l6 6-6 6"/>
                        </svg>
                      </Link>
                    </div>
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

