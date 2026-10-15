'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { FadeIn } from '@/components/atoms/FadeIn'
import { Pagination } from '@/components/molecules/Pagination'
import { CATEGORY_MAP, OFFICIAL_CATEGORIES } from '@/data/treatmentsData'

type Treatment = {
  _id: string
  name: string
  slug: string
  category?: string
  imageUrl?: string
  description?: string
  featured?: boolean
}

const ITEMS_PER_PAGE = 6

export function TreatmentsCatalogue({ treatments }: { treatments?: Treatment[] | null }) {
  const displayTreatments = treatments || []
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const catalogueTopRef = useRef<HTMLDivElement>(null)

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

  // Filtered treatments by active category
  const filteredTreatments = useMemo(() => {
    if (selectedCategory === 'all') return displayTreatments
    return displayTreatments.filter((t) => t.category === selectedCategory)
  }, [displayTreatments, selectedCategory])

  // Pagination calculation
  const totalPages = Math.ceil(filteredTreatments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTreatments = useMemo(() => {
    return filteredTreatments.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredTreatments, startIndex])

  if (displayTreatments.length === 0) {
    return (
      <section id="catalogue" className="bg-white py-24 md:py-32 border-t border-[#dde7dd]/70">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1e5f2e] mb-3">
            Angel Touch Menu
          </p>
          <h2 className="text-[2rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Services by Appointment
          </h2>
          <p className="text-[15px] text-[#5c5a58] max-w-md mx-auto mb-8">
            Please contact us directly on WhatsApp to inquire about services and book your private session.
          </p>
          <a
            href="https://wa.me/919723179638?text=Hello%20Angel%20Touch%2C%20I%20would%20like%20to%20inquire%20about%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1e5f2e] hover:bg-[#164722] text-white text-[11px] font-semibold tracking-[0.16em] uppercase rounded-sm transition-colors"
          >
            Inquire via WhatsApp
          </a>
        </div>
      </section>
    )
  }

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
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#5c5a58]">
                {selectedCategory === 'all' 
                  ? `Showing all ${filteredTreatments.length} services across 25 salon categories.`
                  : `Showing all ${filteredTreatments.length} services under ${selectedCategoryLabel}.`
                }
              </p>
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
                  className="px-6 py-3.5 bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-[#164722] transition-colors rounded-sm"
                >
                  Inquire via WhatsApp
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
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
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
