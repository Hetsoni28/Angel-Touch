'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search, User, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Classes', href: '/classes' },
  { label: 'Recordings', href: '/recordings' },
  { label: 'Membership', href: '/membership' },
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
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[88px] flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex-shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 rounded-sm"
            aria-label="Angel Touch Home"
          >
            <Image src="/logo.svg" alt="Angel Touch by Heena Thaker" width={220} height={64} className="h-12 sm:h-16 w-auto object-contain" priority />
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
          <div className="flex items-center gap-2 sm:gap-4">
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
              className="hidden sm:flex items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              <User strokeWidth={1.75} className="w-[18px] h-[18px]" aria-hidden="true" />
            </Link>
            <Link
              href="/classes"
              className="hidden md:inline-flex items-center min-h-[44px] px-5 py-2.5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e5f2e] focus-visible:ring-offset-2"
            >
              Explore Classes
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden text-[#1e2228] w-11 h-11 flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu strokeWidth={1.75} className="w-6 h-6" aria-hidden="true" />}
            </button>
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
          className="fixed inset-0 z-40 bg-[#faf8f2] flex flex-col pt-[88px] overflow-y-auto"
        >
          <div className="px-6 py-4 border-b border-[#dde7dd]">
            <form action="/search" method="GET" className="flex items-center bg-white border border-[#dde7dd] px-4 py-2.5 rounded-sm focus-within:border-[#2e7a3a]">
              <Search strokeWidth={1.75} className="w-4 h-4 text-[#6b6e68] mr-3 shrink-0" aria-hidden="true" />
              <input
                type="text"
                name="q"
                aria-label="Search products, classes, treatments in mobile menu"
                placeholder="Search products, classes, treatments..."
                className="w-full bg-transparent text-[14px] text-[#1e2228] outline-none placeholder-[#6b6e68] focus-visible:outline-none"
              />
            </form>
          </div>

          <nav aria-label="Mobile Navigation" className="flex flex-col px-6 py-6 gap-4 border-b border-[#dde7dd]">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`text-[20px] font-medium transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm ${
                pathname === '/' ? 'text-[#2e7a3a] font-semibold' : 'text-[#1e2228] hover:text-[#2e7a3a]'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Home
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-[20px] font-medium transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm ${
                    isActive ? 'text-[#2e7a3a] font-semibold' : 'text-[#1e2228] hover:text-[#2e7a3a]'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/customer/dashboard"
              onClick={() => setMobileOpen(false)}
              className="text-[20px] font-medium text-[#2e7a3a] hover:text-[#1e5f2e] transition-colors flex items-center gap-2 pt-3 border-t border-[#dde7dd]/50 py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <User className="w-5 h-5" aria-hidden="true" /> My Account & Dashboard
            </Link>
          </nav>
          <div className="px-6 mt-auto pb-8 pt-6 flex flex-col gap-3">
            <Link
              href="/classes"
              onClick={() => setMobileOpen(false)}
              className="block w-full min-h-[44px] text-center py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e5f2e] focus-visible:ring-offset-2"
            >
              Explore Classes
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
