'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { FadeIn } from '@/components/atoms/FadeIn'
import { Pagination } from '@/components/molecules/Pagination'

export const CATEGORY_MAP: Record<string, string> = {
  'threading': '1. Threading',
  'bleach-dtan': '2. Bleach / D-Tan',
  'clean-up': '3. Clean Up',
  'waxing': '4. Waxing',
  'facial': '5. Facial',
  'skin': '6. Skin Care',
  'shirodhara': '7. Shirodhara',
  'hair-cut': '8. Hair Cut',
  'scalp-analysis-hair-regrowth': '9. Scalp Analysis & Hair Regrowth',
  'hair-treatments': '10. Hair Treatments',
  'technical-style-services': '11. Technical & Style Services',
  'special-hair-care': '12. Special Hair Care',
  'hair-care-style': '13. Hair Care & Style',
  'hair-spa': '14. Hair Spa',
  'body-scrub': '15. Body Scrub',
  'body-wrap': '16. Body Wrap',
  'steam-bath': '17. Steam Bath',
  'hand-feet-care': '18. Hand & Feet Care',
  'body-care-spa': '19. Body Care & Spa',
  'body-spa': '20. Body Spa',
  'family-makeup': '21. All Family Makeup Services',
  'occasion-makeup': '22. Engagement / Occasion Makeup',
  'bridal-makeup': '23. Bridal Makeup Services',
  'bridal-packages': '24. Bridal Packages',
  'nail-art': '25. Nail Art Services',
}

export const OFFICIAL_CATEGORIES = [
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

type Treatment = {
  _id: string
  name: string
  slug: string
  category?: string
  description?: string
  featured?: boolean
}

const ITEMS_PER_PAGE = 6

function shuffleTreatments(items: Treatment[]): Treatment[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function interleaveTreatments(items: Treatment[]): Treatment[] {
  const groups: Record<string, Treatment[]> = {}
  for (const item of items) {
    const cat = item.category || 'other'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(item)
  }
  const result: Treatment[] = []
  const catOrder = [
    'facial', 'shirodhara', 'hair-spa', 'threading', 'body-spa', 'bridal-makeup',
    'clean-up', 'skin', 'bleach-dtan', 'waxing', 'hair-cut', 'scalp-analysis-hair-regrowth',
    'hair-treatments', 'technical-style-services', 'special-hair-care', 'hair-care-style',
    'body-scrub', 'body-wrap', 'steam-bath', 'hand-feet-care', 'body-care-spa',
    'family-makeup', 'occasion-makeup', 'bridal-packages', 'nail-art'
  ].filter(k => groups[k])

  let round = 0
  let added = true
  while (added) {
    added = false
    for (const cat of catOrder) {
      if (groups[cat] && groups[cat][round]) {
        result.push(groups[cat][round])
        added = true
      }
    }
    round++
  }
  return result.length > 0 ? result : items
}

export function TreatmentsCatalogue({ treatments }: { treatments?: Treatment[] | null }) {
  const displayTreatments = treatments || []
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState(false)
  const [shuffledAll, setShuffledAll] = useState<Treatment[]>(() => interleaveTreatments(displayTreatments))
  const dropdownRef = useRef<HTMLDivElement>(null)
  const catalogueTopRef = useRef<HTMLDivElement>(null)

  // Shuffle randomly on client mount
  useEffect(() => {
    if (displayTreatments.length > 0) {
      setShuffledAll(shuffleTreatments(displayTreatments))
    }
  }, [displayTreatments])

  // Listen to URL query parameter e.g. /treatments?category=facial
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('category')
      if (catParam && (catParam === 'all' || OFFICIAL_CATEGORIES.some(c => c.key === catParam))) {
        setSelectedCategory(catParam)
        setCurrentPage(1)
      }
    }
  }, [])

  // Close dropdown on click outside or escape key
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

  const handleSelectCategory = (catKey: string) => {
    if (catKey === 'all') {
      setShuffledAll(shuffleTreatments(displayTreatments))
    }
    setSelectedCategory(catKey)
    setCurrentPage(1)
    setIsOpen(false)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (catKey === 'all') {
        url.searchParams.delete('category')
      } else {
        url.searchParams.set('category', catKey)
      }
      window.history.replaceState({}, '', url.toString())
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    if (catalogueTopRef.current) {
      catalogueTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Active category readable label
  const selectedCategoryLabel = useMemo(() => {
    if (selectedCategory === 'all') return 'All Treatments'
    const found = OFFICIAL_CATEGORIES.find((c) => c.key === selectedCategory)
    return found ? found.label : (CATEGORY_MAP[selectedCategory] || selectedCategory)
  }, [selectedCategory])

  // Filtered treatments by active category (randomized when viewing All Treatments)
  const filteredTreatments = useMemo(() => {
    if (selectedCategory === 'all') {
      return shuffledAll.length > 0 ? shuffledAll : displayTreatments
    }
    return displayTreatments.filter((t) => t.category === selectedCategory)
  }, [displayTreatments, selectedCategory, shuffledAll])

  // Pagination calculation
  const totalPages = Math.ceil(filteredTreatments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTreatments = useMemo(() => {
    return filteredTreatments.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredTreatments, startIndex])


  return (
    <section id="catalogue" ref={catalogueTopRef} className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Section Heading & Category Selector */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[#dde7dd]/80">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-3">
                Official Salon Menu
              </p>
              <h2
                className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-medium text-[#1e2228] leading-[1.15]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Treatments & Services
              </h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <p className="text-[14px] sm:text-[15px] text-[#5c5a58]">
                  {selectedCategory === 'all' 
                    ? `Showing a randomized discovery of all ${filteredTreatments.length} services across 25 salon categories.`
                    : `Showing all ${filteredTreatments.length} services under ${selectedCategoryLabel}.`
                  }
                </p>
                {selectedCategory === 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setShuffledAll(shuffleTreatments(displayTreatments))
                      setCurrentPage(1)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e9f3e9] hover:bg-[#1e5f2e] text-[#1e5f2e] hover:text-white border border-[#1e5f2e]/20 text-[11px] font-semibold tracking-[0.08em] uppercase rounded-sm transition-colors cursor-pointer"
                    title="Shuffle random treatments"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Shuffle Random</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dropdown Menu Filter */}
            <div className="relative shrink-0 w-full sm:w-auto" ref={dropdownRef}>
              <label htmlFor="treatment-category-dropdown" className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-2">
                Filter by Category
              </label>
              <button
                id="treatment-category-dropdown"
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="w-full sm:min-w-[320px] flex items-center justify-between gap-4 px-4 py-3 bg-white hover:bg-[#f6fbf6] border border-[#dde7dd] hover:border-[#1e5f2e] focus:outline-none focus:ring-2 focus:ring-[#1e5f2e]/30 transition-all text-left shadow-sm rounded-sm"
              >
                <span className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#1e2228] truncate">
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
                  className="absolute right-0 left-0 sm:left-auto sm:w-[340px] mt-2 bg-white border border-[#dde7dd] shadow-xl z-50 max-h-84 overflow-y-auto py-2 rounded-sm"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedCategory === 'all'}
                    onClick={() => handleSelectCategory('all')}
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
                        onClick={() => handleSelectCategory(cat.key)}
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

          {/* Quick Category Buttons Bar (Horizontal Scrollable for direct 1-click access) */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all rounded-sm border ${
                selectedCategory === 'all'
                  ? 'bg-[#1e5f2e] text-white border-[#1e5f2e] shadow-sm'
                  : 'bg-white text-[#5c5a58] hover:text-[#1e2228] border-[#dde7dd] hover:border-[#1e5f2e]'
              }`}
            >
              All Treatments
            </button>

            {OFFICIAL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.key
              const count = displayTreatments.filter((t) => t.category === cat.key).length
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleSelectCategory(cat.key)}
                  className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase transition-all rounded-sm border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1e5f2e] text-white border-[#1e5f2e] shadow-sm'
                      : 'bg-white text-[#5c5a58] hover:text-[#1e2228] border-[#dde7dd] hover:border-[#1e5f2e]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#8a8d87]'}`}>
                      ({count})
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Services List WITHOUT ANY IMAGES */}
        {filteredTreatments.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 bg-white border border-[#dde7dd]/70 p-8 max-w-2xl mx-auto shadow-sm rounded-sm">
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-[#164722] transition-colors rounded-sm"
                >
                  <span>Inquire via WhatsApp</span>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={() => handleSelectCategory('all')}
                  className="px-6 py-3.5 border border-[#1e2228] text-[#1e2228] text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-white transition-colors rounded-sm"
                >
                  View All Treatments
                </button>
              </div>
            </div>
          </FadeIn>
        ) : (
          <div>
            {/* Active Sub-heading with page indicator */}
            <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#dde7dd]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-px bg-[#1e5f2e]" aria-hidden="true" />
                <h3 
                  className="text-[1.3rem] sm:text-[1.6rem] font-medium text-[#1e2228]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {selectedCategoryLabel}
                </h3>
              </div>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8a8d87]">
                Page {currentPage} of {Math.max(1, totalPages)} &middot; {filteredTreatments.length} Services
              </span>
            </div>

            {/* Grid of Services (Strictly NO IMAGES) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedTreatments.map((treatment, idx) => {
                const catLabel = treatment.category 
                  ? (CATEGORY_MAP[treatment.category] || treatment.category) 
                  : selectedCategoryLabel
                const globalIndex = startIndex + idx + 1

                return (
                  <FadeIn key={treatment._id || idx} delay={Math.min(idx * 0.05, 0.25)}>
                    <article className="group relative flex flex-col justify-between h-full p-6 sm:p-7 bg-white border border-[#dde7dd]/80 hover:border-[#2e7a3a] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(46,122,58,0.08)] rounded-sm">
                      
                      <div>
                        {/* Header badge */}
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <span className="text-[10px] font-semibold tracking-[0.18em] text-[#1e5f2e] uppercase truncate pr-2">
                            {catLabel}
                          </span>
                          <span className="text-[11px] font-mono text-[#8a8d87]/60 shrink-0">
                            #{String(globalIndex).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Service Name */}
                        <h4 
                          className="text-[1.2rem] sm:text-[1.35rem] font-medium text-[#1e2228] leading-[1.3] mb-3"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {treatment.name}
                        </h4>

                        {/* Service Description */}
                        <p className="text-[13px] sm:text-[14px] text-[#5c5a58] leading-[1.7] mb-6 line-clamp-3">
                          {treatment.description || 'An intentional Ayurvedic ritual designed to restore radiant balance and natural wellbeing.'}
                        </p>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-4 border-t border-[#dde7dd]/60 flex items-center justify-between gap-4">
                        <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8a8d87]">
                          By Appointment
                        </span>

                        <a
                          href={`https://wa.me/919723179638?text=${encodeURIComponent(`Hello Angel Touch, I would like to book an appointment for: ${treatment.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1e5f2e] hover:bg-[#164722] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm transition-all duration-200 shadow-sm"
                        >
                          <span>Book on WhatsApp</span>
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                          </svg>
                        </a>
                      </div>

                    </article>
                  </FadeIn>
                )
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-14 pt-8 border-t border-[#dde7dd] flex flex-col items-center gap-3">
                <p className="text-[12px] tracking-[0.06em] text-[#8a8d87]">
                  Showing <span className="font-semibold text-[#1e2228]">{startIndex + 1}&ndash;{Math.min(startIndex + ITEMS_PER_PAGE, filteredTreatments.length)}</span> of <span className="font-semibold text-[#1e2228]">{filteredTreatments.length}</span> services
                </p>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="py-2"
                />
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  )
}
