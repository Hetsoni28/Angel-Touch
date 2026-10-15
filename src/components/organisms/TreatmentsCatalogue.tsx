'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { FadeIn } from '@/components/atoms/FadeIn'
import Link from 'next/link'
import Image from 'next/image'

type Treatment = {
  _id: string
  name: string
  slug: string
  category?: string
  imageUrl?: string
  description?: string
}

const CATEGORY_MAP: Record<string, string> = {
  'threading': 'Threading',
  'bleach-dtan': 'Bleach / D-Tan',
  'clean-up': 'Clean Up',
  'waxing': 'Waxing',
  'facial': 'Facial',
  'skin': 'Skin Care',
  'shirodhara': 'Shirodhara',
  'hair-cut': 'Hair Cut',
  'scalp-analysis-hair-regrowth': 'Scalp & Hair Regrowth',
  'hair-treatments': 'Hair Treatments',
  'technical-style-services': 'Technical & Styling',
  'special-hair-care': 'Special Hair Care',
  'hair-care-style': 'Hair Care & Style',
  'hair-spa': 'Hair Spa',
  'body-scrub': 'Body Scrub',
  'body-wrap': 'Body Wrap',
  'steam-bath': 'Steam Bath',
  'hand-feet-care': 'Hand & Feet Care',
  'body-care-spa': 'Body Care & Spa',
  'body-spa': 'Body Spa',
  'family-makeup': 'Family Makeup',
  'occasion-makeup': 'Occasion Makeup',
  'bridal-makeup': 'Bridal Makeup',
  'bridal-packages': 'Bridal Packages',
  'nail-art': 'Nail Art',
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
  if (lowerName.includes('facial') || lowerName.includes('skin') || lowerName.includes('glow') || lowerName.includes('clean') || lowerName.includes('bleach') || lowerName.includes('tan')) return '/images/face_mask.jpg'
  if (lowerName.includes('abhyanga') || lowerName.includes('massage') || lowerName.includes('body') || lowerName.includes('scrub') || lowerName.includes('wrap') || lowerName.includes('steam')) return '/images/ayurvedic_abhyanga.jpg'
  if (lowerName.includes('bridal') || lowerName.includes('makeup') || lowerName.includes('ceremony')) return '/images/ayurvedic_editorial_bg.jpg'
  if (lowerName.includes('nail') || lowerName.includes('hand') || lowerName.includes('feet') || lowerName.includes('waxing') || lowerName.includes('threading')) return '/images/kesar_radiance_oil.jpg'

  const cat = t.category || ''
  if (cat.includes('hair') || cat.includes('scalp')) return '/images/ayurvedic_hair_elixir.jpg'
  if (cat === 'shirodhara') return '/images/ayurvedic_shirodhara.jpg'
  if (cat === 'facial' || cat === 'skin' || cat === 'clean-up' || cat === 'bleach-dtan') return '/images/face_mask.jpg'
  if (cat.includes('body') || cat === 'steam-bath') return '/images/ayurvedic_abhyanga.jpg'
  if (cat.includes('makeup') || cat.includes('bridal')) return '/images/ayurvedic_editorial_bg.jpg'
  if (cat === 'nail-art' || cat === 'hand-feet-care' || cat === 'waxing' || cat === 'threading') return '/images/kesar_radiance_oil.jpg'

  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
}

const OFFICIAL_CATEGORIES = [
  { key: 'threading', label: '1. Threading' },
  { key: 'bleach-dtan', label: '2. Bleach / D-Tan' },
  { key: 'clean-up', label: '3. Clean Up' },
  { key: 'waxing', label: '4. Waxing' },
  { key: 'facial', label: '5. Facial' },
  { key: 'skin', label: '6. Skin Care' },
  { key: 'shirodhara', label: '7. Shirodhara' },
  { key: 'hair-cut', label: '8. Hair Cut' },
  { key: 'scalp-analysis-hair-regrowth', label: '9. Scalp Analysis & Hair Regrowth' },
  { key: 'hair-treatments', label: '10. Hair Treatments' },
  { key: 'technical-style-services', label: '11. Technical & Style Services' },
  { key: 'special-hair-care', label: '12. Special Hair Care' },
  { key: 'hair-care-style', label: '13. Hair Care & Style' },
  { key: 'hair-spa', label: '14. Hair Spa' },
  { key: 'body-scrub', label: '15. Body Scrub' },
  { key: 'body-wrap', label: '16. Body Wrap' },
  { key: 'steam-bath', label: '17. Steam Bath' },
  { key: 'hand-feet-care', label: '18. Hand & Feet Care' },
  { key: 'body-care-spa', label: '19. Body Care & Spa' },
  { key: 'body-spa', label: '20. Body Spa' },
  { key: 'family-makeup', label: '21. All Family Makeup Services' },
  { key: 'occasion-makeup', label: '22. Engagement / Occasion Makeup' },
  { key: 'bridal-makeup', label: '23. Bridal Makeup Services' },
  { key: 'bridal-packages', label: '24. Bridal Packages' },
  { key: 'nail-art', label: '25. Nail Art Services' },
]

export function TreatmentsCatalogue({ treatments }: { treatments?: Treatment[] | null }) {
  const displayTreatments = treatments || []
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const filteredTreatments = useMemo(() => {
    if (selectedCategory === 'all') return displayTreatments
    return displayTreatments.filter((t) => t.category === selectedCategory)
  }, [displayTreatments, selectedCategory])

  const selectedCategoryLabel = useMemo(() => {
    if (selectedCategory === 'all') return 'All Treatments'
    const found = OFFICIAL_CATEGORIES.find((c) => c.key === selectedCategory)
    return found ? found.label : (CATEGORY_MAP[selectedCategory] || selectedCategory)
  }, [selectedCategory])

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

        {/* Grid Header & Proper Category Dropdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 pb-8 border-b border-[#dde7dd]/70">
          <FadeIn>
            <h3
              className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Explore our treatments.
            </h3>
            <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed">
              Find an experience tailored to your needs.
            </p>
          </FadeIn>

          {/* Proper Category Dropdown List */}
          <div className="relative shrink-0 w-full md:w-auto" ref={dropdownRef}>
            <label htmlFor="treatment-category-filter" className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-2">
              Filter by Menu Category
            </label>
            <div className="relative">
              <button
                id="treatment-category-filter"
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="w-full md:min-w-[300px] flex items-center justify-between gap-4 px-4 py-3 bg-[#faf8f2] hover:bg-white border border-[#dde7dd] hover:border-[#1e5f2e] focus:outline-none focus:ring-2 focus:ring-[#1e5f2e]/30 transition-all text-left shadow-sm"
              >
                <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#1e2228] truncate">
                  {selectedCategoryLabel}
                </span>
                <svg
                  className={`w-4 h-4 text-[#1e5f2e] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 left-0 md:left-auto md:w-[320px] mt-1.5 bg-white border border-[#dde7dd] shadow-xl z-50 max-h-80 overflow-y-auto py-1 animate-in fade-in-50 duration-150"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedCategory === 'all'}
                    onClick={() => {
                      setSelectedCategory('all')
                      setIsOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[12px] tracking-[0.04em] flex items-center justify-between transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#e9f3e9] text-[#1e5f2e] font-semibold'
                        : 'text-[#1e2228] hover:bg-[#faf8f2]'
                    }`}
                  >
                    <span>All Treatments</span>
                    <span className="text-[11px] text-[#8a8d87]">
                      ({displayTreatments.length})
                    </span>
                  </button>
                  
                  <div className="my-1 border-t border-[#dde7dd]/60" />

                  {OFFICIAL_CATEGORIES.map((cat) => {
                    const count = displayTreatments.filter((t) => t.category === cat.key).length
                    const isSelected = selectedCategory === cat.key

                    return (
                      <button
                        key={cat.key}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSelectedCategory(cat.key)
                          setIsOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] tracking-[0.04em] flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#e9f3e9] text-[#1e5f2e] font-semibold'
                            : 'text-[#1e2228] hover:bg-[#faf8f2]'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.label}</span>
                        {count > 0 && (
                          <span className={`text-[11px] shrink-0 ${isSelected ? 'text-[#1e5f2e] font-bold' : 'text-[#8a8d87]'}`}>
                            ({count})
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Treatments Editorial Layout */}
        {filteredTreatments.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 bg-[#faf8f2] border border-[#dde7dd]/70 p-8 max-w-2xl mx-auto shadow-sm">
              <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#1e5f2e] mb-3">
                Angel Touch Service Menu
              </p>
              <h4
                className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {selectedCategoryLabel}
              </h4>
              <p className="text-[15px] text-[#5c5a58] leading-relaxed mb-8 max-w-md mx-auto">
                Bespoke services in this category are available by appointment at our private women-only sanctuary in Satellite, Ahmedabad.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href={`https://wa.me/919723179638?text=Hello%20Angel%20Touch%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(selectedCategoryLabel)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-[#164722] transition-colors"
                >
                  Inquire via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="px-6 py-3.5 border border-[#1e2228] text-[#1e2228] text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-white transition-colors"
                >
                  View All Treatments
                </button>
              </div>
            </div>
          </FadeIn>
        ) : (
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
                    

                    
                    <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] mb-8 max-w-md">
                      {treatment.description || 'An intentional Ayurvedic ritual designed to honour your natural beauty and restore radiant wellbeing.'}
                    </p>

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
      )}

      </div>
    </section>
  )
}

