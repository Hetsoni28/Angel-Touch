'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search, User, Menu, X, ChevronRight, Phone } from 'lucide-react'
import { generateWhatsAppLink } from '@/utils/whatsapp'

const navLinks = [
  { label: 'Shop', href: '/shop', subtitle: 'Handcrafted Ayurvedic Skincare' },
  { label: 'Treatments', href: '/treatments', subtitle: 'Aroma Facials, Shirodhara & Hair Spa' },
  { label: 'Classes', href: '/classes', subtitle: 'Live Formulation Academy' },
  { label: 'Recordings', href: '/recordings', subtitle: 'On-Demand Masterclass Vault' },
  { label: 'Membership', href: '/membership', subtitle: 'Unlimited Vault Access' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape key press and manage body scroll
  useEffect(() => {
    if (!mobileOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (pathname.startsWith('/studio')) return null

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-[#faf8f2] border-b border-[#dde7dd] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-[80px] sm:h-[88px] flex items-center justify-between relative">
          
          {/* Mobile Menu Toggle (Left on mobile, hidden on lg) */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="text-[#1e2228] w-11 h-11 flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu strokeWidth={1.75} className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Logo (Centered on mobile, left-aligned on lg) */}
          <Link 
            href="/" 
            className="flex-shrink-0 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 rounded-sm absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 z-10"
            aria-label="Angel Touch Home"
          >
            <Image 
              src="/logo.svg" 
              alt="Angel Touch by Heena Thaker" 
              width={220} 
              height={64} 
              className="h-10 sm:h-12 lg:h-16 w-auto max-w-[155px] sm:max-w-[190px] lg:max-w-none object-contain" 
              priority 
            />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7 xl:gap-8">
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`text-[12px] tracking-[0.14em] uppercase transition-colors px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm ${
                pathname === '/'
                  ? 'font-semibold text-[#1e2228]'
                  : 'font-medium text-[#4a4846] hover:text-[#2e7a3a]'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-[12px] tracking-[0.14em] uppercase transition-colors px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm ${
                    isActive
                      ? 'font-semibold text-[#1e2228]'
                      : 'font-medium text-[#4a4846] hover:text-[#2e7a3a]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Mobile Search Icon (Beside Login Icon on mobile) */}
            <Link
              href="/search"
              aria-label="Search products, treatments, or classes"
              className="flex sm:hidden items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              <Search strokeWidth={1.75} className="w-[18px] h-[18px]" aria-hidden="true" />
            </Link>

            {/* Desktop Expandable Search Form (sm and above) */}
            <form action="/search" method="GET" className="hidden sm:flex items-center group bg-transparent rounded-full border border-transparent hover:border-[#dde7dd] focus-within:border-[#dde7dd] hover:bg-white focus-within:bg-white transition-all duration-300">
              <input
                type="text"
                name="q"
                aria-label="Search products, treatments, or classes"
                placeholder="Search..."
                className="w-0 opacity-0 group-hover:w-36 group-hover:opacity-100 group-hover:pl-4 focus:w-36 focus:opacity-100 focus:pl-4 focus-visible:outline-none transition-all duration-300 ease-out h-9 bg-transparent text-[12px] text-[#1e2228] placeholder-[#6b6e68]"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="flex items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
              >
                <Search strokeWidth={1.75} className="w-[18px] h-[18px]" aria-hidden="true" />
              </button>
            </form>

            <Link
              href="/customer/dashboard"
              aria-label="Customer Dashboard and Account"
              className="flex items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              <User strokeWidth={1.75} className="w-[18px] h-[18px]" aria-hidden="true" />
            </Link>
            <Link
              href="/classes"
              className="hidden md:inline-flex items-center min-h-[44px] px-5 py-2.5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e5f2e] focus-visible:ring-offset-2"
            >
              Explore Classes
            </Link>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay / Dialog */}
      {mobileOpen && (
        <div 
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-x-0 top-[80px] sm:top-[88px] bottom-0 z-[55] bg-[#faf8f2] flex flex-col justify-between overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div>
            {/* Primary Navigation List */}
            <nav aria-label="Mobile Navigation" className="flex flex-col py-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`flex items-center justify-between px-6 py-3.5 border-b border-[#dde7dd]/50 transition-colors ${
                  pathname === '/' ? 'bg-[#e9f3e9]/70 text-[#1e5f2e]' : 'text-[#1e2228] hover:bg-white/50'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-[17px] font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
                    Home
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-[#6b6e68]">
                    Sanctuary Welcome & Overview
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 ${pathname === '/' ? 'text-[#1e5f2e]' : 'text-[#8a8d87]'}`} aria-hidden="true" />
              </Link>

              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center justify-between px-6 py-3.5 border-b border-[#dde7dd]/50 transition-colors ${
                      isActive ? 'bg-[#e9f3e9]/70 text-[#1e5f2e]' : 'text-[#1e2228] hover:bg-white/50'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[17px] font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
                        {link.label}
                      </span>
                      <span className="text-[10px] tracking-wider uppercase text-[#6b6e68]">
                        {link.subtitle}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#1e5f2e]' : 'text-[#8a8d87]'}`} aria-hidden="true" />
                  </Link>
                )
              })}
            </nav>

            {/* Secondary Pages (About & Contact / Location) */}
            <div className="px-6 py-3 border-b border-[#dde7dd]/60 bg-white/40">
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold tracking-wider uppercase">
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-sm bg-white border border-[#dde7dd] text-[#4a4846] hover:text-[#1e5f2e] hover:border-[#1e5f2e] text-center transition-colors shadow-2xs"
                >
                  About Founder
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 rounded-sm bg-white border border-[#dde7dd] text-[#4a4846] hover:text-[#1e5f2e] hover:border-[#1e5f2e] text-center transition-colors shadow-2xs"
                >
                  Sanctuary & Map
                </Link>
              </div>
            </div>

            {/* Customer Account & Library Card */}
            <div className="px-6 pt-3.5 pb-2">
              <Link
                href="/customer/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-sm bg-white border border-[#dde7dd] shadow-2xs hover:border-[#2e7a3a] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#e9f3e9] flex items-center justify-center text-[#1e5f2e] shrink-0">
                    <User className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1e2228]">My Account & Dashboard</p>
                    <p className="text-[11px] text-[#6b6e68]">Access enrolled classes & library</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8a8d87]" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Bottom Concierge & Primary Action */}
          <div className="px-6 pt-3 pb-8 mt-auto border-t border-[#dde7dd]/60 bg-white/70">
            {/* Quick Contact Row */}
            <div className="flex items-center justify-between gap-2 text-[12px] mb-3">
              <a
                href={generateWhatsAppLink({ type: 'GENERAL' })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Concierge"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-[#25D366]/40 text-[#1e5f2e] rounded-sm font-medium hover:bg-[#e9f3e9] transition-colors shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href="tel:+919723179638"
                aria-label="Call Angel Touch"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-[#dde7dd] text-[#1e2228] rounded-sm font-medium hover:border-[#1e5f2e] transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#1e5f2e]" aria-hidden="true" />
                +91 97231 79638
              </a>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/classes"
              onClick={() => setMobileOpen(false)}
              className="block w-full min-h-[46px] py-3.5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-bold tracking-[0.2em] uppercase text-center rounded-sm shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e5f2e]"
            >
              Explore Masterclasses
            </Link>
            <p className="text-[10px] text-center text-[#6b6e68] tracking-widest uppercase mt-2.5">
              Satellite, Ahmedabad · Women-Only Sanctuary
            </p>
          </div>
        </div>
      )}
    </>
  )
}
