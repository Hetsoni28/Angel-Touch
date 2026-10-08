'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, User, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Classes', href: '/classes' },
  { label: 'Recordings', href: '/recordings' },
  { label: 'Membership', href: '/membership' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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

  if (pathname.startsWith('/studio')) return null

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-[#faf8f2] border-b border-[#dde7dd] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[88px] flex items-center justify-between">
          
          {}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <img src="/logo.svg" alt="Angel Touch" className="h-16 w-auto object-contain" />
          </Link>

          {}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            <Link
              href="/"
              className={`text-[12px] tracking-[0.14em] uppercase transition-colors ${
                pathname === '/'
                  ? 'font-semibold text-[#1e2228]'
                  : 'font-medium text-[#5c5a58] hover:text-[#2e7a3a]'
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
                  className={`text-[12px] tracking-[0.14em] uppercase transition-colors ${
                    isActive
                      ? 'font-semibold text-[#1e2228]'
                      : 'font-medium text-[#5c5a58] hover:text-[#2e7a3a]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {}
          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="hidden sm:flex items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors p-1"
            >
              <Search strokeWidth={1.75} className="w-[18px] h-[18px]" />
            </button>
            <Link
              href="/customer/dashboard"
              aria-label="Dashboard"
              className="hidden sm:flex items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors p-1"
            >
              <User strokeWidth={1.75} className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="/classes"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
            >
              Explore Classes
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden text-[#1e2228] p-1.5 focus:outline-none"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu strokeWidth={1.75} className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#faf8f2] flex flex-col pt-[96px]">
          <nav className="flex flex-col px-8 py-8 gap-5 border-b border-[#dde7dd]">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-[22px] font-medium text-[#1e2228]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[22px] font-medium text-[#1e2228]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-8 mt-auto pb-10 flex flex-col gap-4">
            <Link
              href="/classes"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-4 bg-[#2e7a3a] text-white text-[12px] font-semibold tracking-[0.18em] uppercase"
            >
              Explore Classes
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
