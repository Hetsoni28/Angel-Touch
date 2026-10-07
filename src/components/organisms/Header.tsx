'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, User, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Classes', href: '/classes' },
  { label: 'Membership', href: '/membership' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#faf8f2]/95 backdrop-blur-md border-b border-[#dde7dd]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.svg" alt="Angel Touch" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav — center */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-[12px] font-medium text-[#5c5a58] hover:text-[#2e7a3a] tracking-[0.14em] uppercase transition-colors">
              Home
            </Link>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-medium text-[#5c5a58] hover:text-[#2e7a3a] tracking-[0.14em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button aria-label="Search" className="hidden sm:block text-[#1e2228] hover:text-[#2e7a3a] transition-colors">
              <Search strokeWidth={1.5} className="w-[18px] h-[18px]" />
            </button>
            <Link href="/account" aria-label="Account" className="hidden sm:block text-[#1e2228] hover:text-[#2e7a3a] transition-colors">
              <User strokeWidth={1.5} className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="/classes"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
            >
              Explore Classes
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden text-[#1e2228]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu strokeWidth={1.5} className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf8f2] flex flex-col pt-[72px]">
          <nav className="flex flex-col px-8 py-10 gap-6">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-[24px] font-medium text-[#1e2228]" style={{ fontFamily: 'var(--font-heading)' }}>Home</Link>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-[24px] font-medium text-[#1e2228]" style={{ fontFamily: 'var(--font-heading)' }}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-8 mt-auto pb-10">
            <Link href="/classes" onClick={() => setMobileOpen(false)} className="block w-full text-center py-4 bg-[#2e7a3a] text-white text-[12px] font-semibold tracking-[0.18em] uppercase">
              Explore Classes
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
