'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const services = [
  { label: 'Advanced Skin Treatments', href: '/treatments' },
  { label: 'Aroma Facials', href: '/treatments' },
  { label: 'Aromatherapy & Wellness', href: '/treatments' },
  { label: 'Shirodhara Oil Therapy', href: '/treatments' },
  { label: 'Hair Spa, Smoothening & Keratin', href: '/treatments' },
  { label: 'Hair Colouring & Re-moulding', href: '/treatments' },
  { label: 'Bridal & Wedding Makeup', href: '/treatments' },
  { label: 'Nail Art, Manicure & Pedicure', href: '/treatments' },
  { label: 'Skincare Academy (Levels 1–3)', href: '/classes' },
]

const explore = [
  { label: 'Shop', href: '/shop' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Classes', href: '/classes' },
  { label: 'Recorded Classes', href: '/classes#recorded' },
  { label: 'Membership', href: '/membership' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const legal = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Refund & Cancellation', href: '/refund' },
]

const hours = [
  { day: 'Mon – Sat', time: '10:00 AM – 8:00 PM' },
  { day: 'Sunday', time: '10:00 AM – 4:30 PM' },
]

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return null

  return (
    <footer className="bg-[#faf8f2] border-t border-[#dde7dd]">

      {/* Top CTA Strip */}
      <div className="bg-[#2e7a3a] py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/60 mb-2">
              Women-Only · Satellite, Ahmedabad
            </p>
            <h2
              className="text-[1.4rem] md:text-[1.75rem] font-medium text-white leading-snug"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ready to experience Angel Touch?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:+919723179638"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#2e7a3a] text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#f0f7f0] transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 97231 79638
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-7 py-3.5 border-2 border-white text-white text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-[#2e7a3a] transition-colors duration-200"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand + Hours + Social */}
          <div className="lg:col-span-4">
            <Link href="/" className="block mb-6">
              <img src="/logo.svg" alt="Angel Touch" className="h-16 w-auto" />
            </Link>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed max-w-sm mb-8">
              A premium women-only salon and wellness centre founded by Heena Thaaker — offering advanced skin treatments, Ayurvedic therapies, professional hair services, bridal styling and a certified beauty school.
            </p>

            {/* Hours */}
            <div className="mb-8">
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#1e2228] mb-3">Opening Hours</p>
              <ul className="flex flex-col gap-2">
                {hours.map(h => (
                  <li key={h.day} className="flex items-center justify-between gap-4 text-[13px] border-b border-[#dde7dd]/60 pb-2 last:border-0">
                    <span className="text-[#5c5a58]">{h.day}</span>
                    <span className="text-[#2e7a3a] font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#1e2228] mb-3">Follow</p>
              <a
                href="https://www.instagram.com/angeltouch_by_heena_thaker/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-medium text-[#5c5a58] hover:text-[#2e7a3a] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                @angeltouch_by_heena_thaker
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#1e2228] mb-5">Our Services</p>
            <ul className="flex flex-col gap-2.5">
              {services.map(s => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-[13px] text-[#5c5a58] hover:text-[#2e7a3a] transition-colors group"
                  >
                    <span className="w-3 h-px bg-[#dde7dd] group-hover:bg-[#2e7a3a] transition-colors shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore + Legal */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#1e2228] mb-5">Explore</p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {explore.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-[#5c5a58] hover:text-[#2e7a3a] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#1e2228] mb-4">Policies</p>
            <ul className="flex flex-col gap-2">
              {legal.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[12px] text-[#8a8d87] hover:text-[#2e7a3a] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address + Map */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#1e2228] mb-5">Visit Us</p>

            <div className="flex items-start gap-3 mb-5 pb-5 border-b border-[#dde7dd]">
              <svg className="w-4 h-4 text-[#2e7a3a] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-2">
                  UGF-6, Policlinic Chamber,<br />
                  Opp. Judges Bunglow Road,<br />
                  Satellite, Ahmedabad – 380015
                </p>
                <a
                  href="https://maps.google.com/?q=Angel+Touch+Beauty+Wellness+Satellite+Ahmedabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold tracking-widest uppercase text-[#2e7a3a] hover:underline"
                >
                  Get Directions ↗
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#dde7dd]">
              <svg className="w-4 h-4 text-[#2e7a3a] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <a href="tel:+919723179638" className="text-[13px] font-semibold text-[#1e2228] hover:text-[#2e7a3a] transition-colors">
                +91 97231 79638
              </a>
            </div>

            {/* Embedded real map */}
            <div className="w-full h-32 bg-[#e9f3e9] border border-[#dde7dd] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
              <iframe
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Policlinic+Chamber,+Judges+Bungalow+Road,+Satellite,+Ahmedabad&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#dde7dd] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[11px] text-[#8a8d87] tracking-widest uppercase">
            © 2025 Angel Touch by Heena Thaaker · All rights reserved
          </p>
          <p className="text-[11px] text-[#8a8d87] tracking-widest uppercase">
            Designed & Developed by <a href="#" target="_blank" rel="noopener noreferrer" className="font-bold text-[#5c8f60] hover:text-[#2e7a3a] transition-colors">HNTech</a>
          </p>
        </div>

      </div>
    </footer>
  )
}
