'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Search, User, Menu, X, ChevronDown, ChevronRight, Phone, MapPin } from 'lucide-react'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { SITE_INFO } from '@/lib/siteInfo'

// ── Navigation model ──────────────────────────────────────────────────────────
// Category keys must match the treatment categories in Sanity / TreatmentsCatalogue.
const TREATMENT_LINKS = [
  { label: 'Aroma facials & skin', href: '/treatments?category=facial' },
  { label: 'Clean-up & D-tan', href: '/treatments?category=clean-up' },
  { label: 'Shirodhara', href: '/treatments?category=shirodhara' },
  { label: 'Hair spa', href: '/treatments?category=hair-spa' },
  { label: 'Body spa', href: '/treatments?category=body-spa' },
  { label: 'Bridal makeup', href: '/treatments?category=bridal-makeup' },
  { label: 'Nail art', href: '/treatments?category=nail-art' },
  { label: 'Waxing & threading', href: '/treatments?category=waxing' },
]

const LEARN_LINKS = [
  { label: 'Live classes', href: '/classes', note: 'Hands-on formulation masterclasses' },
  { label: 'Recorded classes', href: '/recordings', note: 'Watch past classes on demand' },
  { label: 'Membership', href: '/membership', note: 'The full recorded library' },
]

type MenuKey = 'treatments' | 'learn'

const NAV: (
  | { kind: 'link'; label: string; href: string; match: string[] }
  | { kind: 'menu'; key: MenuKey; label: string; href: string; match: string[] }
)[] = [
  { kind: 'menu', key: 'treatments', label: 'Treatments', href: '/treatments', match: ['/treatments'] },
  { kind: 'link', label: 'Academy', href: '/academy', match: ['/academy'] },
  { kind: 'menu', key: 'learn', label: 'Classes', href: '/classes', match: ['/classes', '/recordings', '/membership'] },
  { kind: 'link', label: 'Shop', href: '/shop', match: ['/shop'] },
  { kind: 'link', label: 'About', href: '/about', match: ['/about'] },
  { kind: 'link', label: 'Contact', href: '/contact', match: ['/contact'] },
]

const MOBILE_LINKS = [
  { label: 'Treatments', href: '/treatments', note: 'Facials, Shirodhara, hair spa, bridal' },
  { label: 'Academy', href: '/academy', note: 'Beauty & cosmetology courses' },
  { label: 'Live classes', href: '/classes', note: 'Ayurvedic formulation masterclasses' },
  { label: 'Recorded classes', href: '/recordings', note: 'Past classes on demand' },
  { label: 'Membership', href: '/membership', note: 'The full recorded library' },
  { label: 'Shop', href: '/shop', note: 'Small-batch Ayurvedic products' },
  { label: 'About Heena Thaker', href: '/about', note: 'Our founder and our story' },
  { label: 'Contact & directions', href: '/contact', note: 'Address, hours and map' },
]

const isActive = (pathname: string, prefixes: string[]) =>
  prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))

const HOURS_SHORT = SITE_INFO.hours
  .map((h) => `${h.days.replace('Monday to Saturday', 'Mon–Sat').replace('Sunday', 'Sun')} ${h.time.replace(':00', '').replace(':00', '').replace(' to ', '–')}`)
  .join('  ·  ')

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuTop, setMenuTop] = useState(0)

  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRefs = useRef<Partial<Record<MenuKey, HTMLButtonElement | null>>>({})

  // Close every menu when the route changes (adjust state during render).
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
    setOpenMenu(null)
  }

  // Compact header once the page has scrolled a little.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Desktop dropdowns: close on outside click or Escape (focus returns to the trigger).
  useEffect(() => {
    if (!openMenu) return
    const onPointer = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerRefs.current[openMenu]?.focus()
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  // Mobile menu: lock page scroll, close on Escape.
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const openWithHover = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(key)
  }
  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }

  const toggleMobile = () => {
    if (!mobileOpen && headerRef.current) setMenuTop(headerRef.current.getBoundingClientRect().bottom)
    setMobileOpen((o) => !o)
  }

  if (pathname.startsWith('/studio')) return null

  const bookingLink = generateWhatsAppLink({ type: 'GENERAL', message: 'I would like to book an appointment.' })

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 inset-x-0 z-50 w-full bg-[#faf8f2]/95 backdrop-blur-md border-b transition-[box-shadow,border-color] duration-300 ${
          scrolled ? 'border-[#dde7dd] shadow-[0_8px_30px_-18px_rgba(30,34,40,0.25)]' : 'border-[#dde7dd]/70'
        }`}
      >
        {/* ── Utility bar: the facts people look for first ── */}
        <div
          className={`hidden md:block bg-[#1e2228] text-white/80 overflow-hidden transition-[max-height,opacity] duration-300 ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
          }`}
          aria-hidden={scrolled}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 h-9 flex items-center justify-between text-[11px] tracking-[0.08em]">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#edc179]" aria-hidden="true" />
              Women-only studio · Satellite, Ahmedabad
            </p>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline tabular">{HOURS_SHORT}</span>
              <a href={SITE_INFO.phoneHref} tabIndex={scrolled ? -1 : 0} className="inline-flex items-center gap-1.5 hover:text-white transition-colors tabular">
                <Phone className="w-3 h-3 text-[#edc179]" aria-hidden="true" />
                {SITE_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* ── Main bar ── */}
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between relative transition-[height] duration-300 ${
            scrolled ? 'h-[64px] sm:h-[70px]' : 'h-[76px] sm:h-[84px]'
          }`}
        >
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={toggleMobile}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="text-[#1e2228] w-11 h-11 -ml-2 flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu strokeWidth={1.5} className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 rounded-sm absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 z-10"
            aria-label="Angel Touch by Heena Thaker – home"
          >
            <Image
              src="/logo.svg"
              alt="Angel Touch by Heena Thaker"
              width={220}
              height={64}
              className={`w-auto object-contain transition-[height] duration-300 max-w-[150px] sm:max-w-[185px] lg:max-w-none ${
                scrolled ? 'h-9 sm:h-10 lg:h-12' : 'h-10 sm:h-12 lg:h-14'
              }`}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav ref={navRef} aria-label="Primary" className="hidden lg:flex items-stretch h-full">
            <ul className="flex items-stretch gap-1 xl:gap-2">
              {NAV.map((item) => {
                const active = isActive(pathname, item.match)
                const linkClass = `relative inline-flex items-center gap-1 h-full px-3 xl:px-3.5 text-[11.5px] tracking-[0.16em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2e7a3a] ${
                  active ? 'text-[#1e2228] font-semibold' : 'text-[#4a4846] font-medium hover:text-[#1e5f2e]'
                }`
                const underline = (
                  <span
                    aria-hidden="true"
                    className={`absolute left-3 right-3 xl:left-3.5 xl:right-3.5 bottom-[18px] h-px bg-[#b38538] origin-left transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                )

                if (item.kind === 'link') {
                  return (
                    <li key={item.href} className="group relative flex">
                      <Link href={item.href} aria-current={active ? 'page' : undefined} className={linkClass}>
                        {item.label}
                        {underline}
                      </Link>
                    </li>
                  )
                }

                const open = openMenu === item.key
                const panelId = `nav-panel-${item.key}`
                return (
                  <li
                    key={item.key}
                    className="group relative flex"
                    onMouseEnter={() => openWithHover(item.key)}
                    onMouseLeave={closeWithDelay}
                  >
                    <button
                      type="button"
                      ref={(el) => { triggerRefs.current[item.key] = el }}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenMenu(open ? null : item.key)}
                      className={linkClass}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                      {underline}
                    </button>

                    <div
                      id={panelId}
                      className={`absolute top-full z-50 pt-0 transition-[opacity,transform,visibility] duration-200 ${
                        item.key === 'treatments' ? 'left-0' : 'left-1/2 -translate-x-1/2'
                      } ${open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}
                    >
                      <div className="bg-white border border-[#dde7dd] shadow-[0_24px_60px_-30px_rgba(30,34,40,0.4)]">
                        {item.key === 'treatments' ? (
                          <div className="grid grid-cols-[1fr_220px] w-[560px]">
                            <div className="p-7">
                              <p className="eyebrow mb-4">Treatment menu</p>
                              <ul className="grid grid-cols-2 gap-x-6">
                                {TREATMENT_LINKS.map((t) => (
                                  <li key={t.href}>
                                    <Link
                                      href={t.href}
                                      className="flex items-center justify-between py-2.5 border-b border-[#dde7dd]/70 text-[14px] text-[#1e2228] hover:text-[#1e5f2e] transition-colors group/l"
                                    >
                                      {t.label}
                                      <span className="text-[#b9c4b6] group-hover/l:text-[#2e7a3a] group-hover/l:translate-x-0.5 transition-all" aria-hidden="true">→</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <Link href="/treatments" className="at-link mt-6 min-h-[36px]">
                                See the full menu <span className="arrow" aria-hidden="true">→</span>
                              </Link>
                            </div>
                            <div className="relative bg-[#faf8f2] p-5 flex flex-col justify-end overflow-hidden">
                              <Image
                                src="/images/treatment_shirodhara.jpg"
                                alt=""
                                fill
                                sizes="220px"
                                className="object-cover opacity-90"
                              />
                              <div className="relative bg-[#faf8f2]/95 p-4">
                                <p className="text-[1.05rem] leading-snug text-[#1e2228] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                  Not sure what to book?
                                </p>
                                <a
                                  href={generateWhatsAppLink({ type: 'GENERAL', message: 'Could you suggest a treatment for me?' })}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1e5f2e] hover:text-[#2e7a3a]"
                                >
                                  Ask us on WhatsApp →
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <ul className="w-[300px] p-3">
                            {LEARN_LINKS.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  aria-current={isActive(pathname, [l.href]) ? 'page' : undefined}
                                  className="block px-4 py-3 hover:bg-[#faf8f2] transition-colors"
                                >
                                  <span className="block text-[15px] text-[#1e2228]" style={{ fontFamily: 'var(--font-heading)' }}>{l.label}</span>
                                  <span className="block text-[12px] text-[#6b6e68] mt-0.5">{l.note}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            <Link
              href="/search"
              aria-label="Search treatments, classes and products"
              className="flex sm:hidden items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              <Search strokeWidth={1.6} className="w-[18px] h-[18px]" aria-hidden="true" />
            </Link>
            <form role="search" action="/search" method="GET" className="hidden sm:flex items-center group rounded-full border border-transparent hover:border-[#dde7dd] focus-within:border-[#dde7dd] hover:bg-white focus-within:bg-white transition-all duration-300">
              <input
                type="search"
                name="q"
                aria-label="Search treatments, classes and products"
                placeholder="Search"
                className="w-0 opacity-0 group-hover:w-32 group-hover:opacity-100 group-hover:pl-4 focus:w-32 focus:opacity-100 focus:pl-4 focus-visible:outline-none transition-all duration-300 ease-out h-9 bg-transparent text-[12px] text-[#1e2228] placeholder-[#6b6e68]"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
              >
                <Search strokeWidth={1.6} className="w-[18px] h-[18px]" aria-hidden="true" />
              </button>
            </form>
            <Link
              href="/customer/dashboard"
              aria-label="My account"
              className="flex items-center justify-center text-[#1e2228] hover:text-[#2e7a3a] transition-colors w-10 h-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
            >
              <User strokeWidth={1.6} className="w-[18px] h-[18px]" aria-hidden="true" />
            </Link>
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book an appointment on WhatsApp (opens in a new tab)"
              className="hidden md:inline-flex items-center gap-2 ml-2 min-h-[44px] px-5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e5f2e] focus-visible:ring-offset-2"
            >
              Book appointment
            </a>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          style={{ top: menuTop }}
          className="lg:hidden fixed inset-x-0 bottom-0 z-[55] bg-[#faf8f2] flex flex-col overflow-y-auto overscroll-contain animate-[menuIn_0.35s_cubic-bezier(0.22,1,0.36,1)]"
        >
          <nav aria-label="Mobile" className="flex-1">
            <ul>
              <li>
                <Link
                  href="/"
                  aria-current={pathname === '/' ? 'page' : undefined}
                  className={`flex items-center justify-between px-6 py-4 border-b border-[#dde7dd]/70 ${pathname === '/' ? 'bg-[#e9f3e9]/60' : ''}`}
                >
                  <span className="text-[19px] text-[#1e2228]" style={{ fontFamily: 'var(--font-heading)' }}>Home</span>
                  <ChevronRight className="w-4 h-4 text-[#8a8d87]" aria-hidden="true" />
                </Link>
              </li>
              {MOBILE_LINKS.map((link) => {
                const active = isActive(pathname, [link.href])
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between px-6 py-3.5 border-b border-[#dde7dd]/70 transition-colors ${active ? 'bg-[#e9f3e9]/60' : 'active:bg-white'}`}
                    >
                      <span className="flex flex-col">
                        <span className={`text-[19px] leading-tight ${active ? 'text-[#1e5f2e]' : 'text-[#1e2228]'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                          {link.label}
                        </span>
                        <span className="text-[12px] text-[#6b6e68] mt-0.5">{link.note}</span>
                      </span>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${active ? 'text-[#1e5f2e]' : 'text-[#8a8d87]'}`} aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="px-6 pt-5">
              <p className="eyebrow mb-3">Popular treatments</p>
              <ul className="flex flex-wrap gap-2">
                {TREATMENT_LINKS.slice(0, 6).map((t) => (
                  <li key={t.href}>
                    <Link href={t.href} className="inline-flex items-center min-h-[36px] px-3.5 border border-[#dde7dd] bg-white text-[13px] text-[#1e2228] hover:border-[#2e7a3a] transition-colors">
                      {t.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 pt-5">
              <Link
                href="/customer/dashboard"
                className="flex items-center justify-between p-4 bg-white border border-[#dde7dd] hover:border-[#2e7a3a] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#e9f3e9] flex items-center justify-center text-[#1e5f2e] shrink-0">
                    <User className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-[#1e2228]">My account</span>
                    <span className="block text-[12px] text-[#6b6e68]">Your classes and recordings</span>
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 text-[#8a8d87]" aria-hidden="true" />
              </Link>
            </div>
          </nav>

          <div className="sticky bottom-0 px-6 pt-4 pb-7 mt-6 border-t border-[#dde7dd] bg-[#faf8f2]">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full min-h-[50px] bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
              aria-label="Book an appointment on WhatsApp (opens in a new tab)"
            >
              Book on WhatsApp
            </a>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <a href={SITE_INFO.phoneHref} className="flex items-center justify-center gap-1.5 min-h-[44px] border border-[#dde7dd] bg-white text-[13px] text-[#1e2228] tabular">
                <Phone className="w-3.5 h-3.5 text-[#1e5f2e]" aria-hidden="true" />
                Call
              </a>
              <Link href="/contact" className="flex items-center justify-center gap-1.5 min-h-[44px] border border-[#dde7dd] bg-white text-[13px] text-[#1e2228]">
                <MapPin className="w-3.5 h-3.5 text-[#1e5f2e]" aria-hidden="true" />
                Directions
              </Link>
            </div>
            <p className="text-[11px] text-center text-[#6b6e68] mt-3 tabular">{HOURS_SHORT}</p>
          </div>
        </div>
      )}
    </>
  )
}
