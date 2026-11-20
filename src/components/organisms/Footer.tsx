'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SITE_INFO } from '@/lib/siteInfo'
import { generateWhatsAppLink } from '@/utils/whatsapp'

// Evaluated when the page loads, so the copyright year never goes stale.
const YEAR = new Date().getFullYear()

const INSTAGRAM_URL = 'https://www.instagram.com/angeltouch_by_heena_thaker/'

const treatments = [
  { label: 'Aroma facials & skin', href: '/treatments?category=facial' },
  { label: 'Clean-up & D-tan', href: '/treatments?category=clean-up' },
  { label: 'Shirodhara', href: '/treatments?category=shirodhara' },
  { label: 'Hair spa', href: '/treatments?category=hair-spa' },
  { label: 'Body spa', href: '/treatments?category=body-spa' },
  { label: 'Bridal makeup', href: '/treatments?category=bridal-makeup' },
  { label: 'Nail art', href: '/treatments?category=nail-art' },
]

const learn = [
  { label: 'Beauty academy', href: '/academy' },
  { label: 'Live classes', href: '/classes' },
  { label: 'Recorded classes', href: '/recordings' },
  { label: 'Membership', href: '/membership' },
]

const studio = [
  { label: 'About Heena Thaker', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
]

const legal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refunds & cancellations', href: '/refund' },
]

const linkClass =
  'text-[14px] text-[#4a4846] hover:text-[#1e5f2e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors'

function Column({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="eyebrow !text-[#1e2228] mb-5">{title}</p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClass}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return null

  const bookingLink = generateWhatsAppLink({ type: 'GENERAL', message: 'I would like to book an appointment.' })

  return (
    // Customer portal on phones is an app shell: no marketing footer there
    <footer className={`${pathname.startsWith('/customer') ? 'hidden md:block' : ''} bg-[#faf8f2] border-t border-[#dde7dd]`}>

      {/* ── Booking strip ── */}
      <div className="bg-[#2e7a3a] px-6 md:px-10 py-10 md:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 md:gap-10">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/75 mb-2">
              Women-only studio · Satellite, Ahmedabad
            </p>
            <h2
              className="text-[1.5rem] md:text-[2rem] font-medium text-white leading-snug"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
            >
              Ready to book your <span className="italic font-normal text-[#f6e7c8]">appointment</span>?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book an appointment on WhatsApp (opens in a new tab)"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 bg-white text-[#1e5f2e] text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#f6e7c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2e7a3a] transition-colors"
            >
              Book on WhatsApp
            </a>
            <a
              href={SITE_INFO.phoneHref}
              aria-label={`Call Angel Touch at ${SITE_INFO.phoneDisplay}`}
              className="inline-flex items-center justify-center min-h-[48px] px-7 border border-white/70 text-white text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-[#1e5f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2e7a3a] transition-colors tabular"
            >
              Call {SITE_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-16">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-4 lg:pr-8">
            <Link href="/" className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded" aria-label="Angel Touch by Heena Thaker – home">
              <Image src="/logo.svg" alt="Angel Touch by Heena Thaker" width={220} height={64} className="h-14 w-auto" loading="lazy" />
            </Link>
            <p className="text-[14px] text-[#4a4846] leading-[1.75] max-w-sm mb-8">
              A women-only Ayurvedic salon and beauty academy founded by Heena Thaker: skin and
              aroma treatments, Shirodhara, hair care, bridal makeup, and courses that teach how
              it&apos;s all done.
            </p>

            <p className="eyebrow !text-[#1e2228] mb-3">Opening hours</p>
            <dl className="max-w-xs mb-8 border-t border-[#dde7dd]">
              {SITE_INFO.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 py-2.5 border-b border-[#dde7dd] text-[13.5px] tabular">
                  <dt className="text-[#4a4846]">{h.days.replace('Monday to Saturday', 'Mon – Sat')}</dt>
                  <dd className="text-[#1e2228] font-medium">{h.time.replace(' to ', ' – ')}</dd>
                </div>
              ))}
            </dl>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Angel Touch by Heena Thaker on Instagram (opens in a new tab)"
              className="inline-flex items-center gap-2.5 text-[13px] text-[#4a4846] hover:text-[#1e5f2e] transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-[#dde7dd] flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
              @angeltouch_by_heena_thaker
            </a>
          </div>

          <div className="lg:col-span-2"><Column title="Treatments" items={treatments} /></div>
          <div className="lg:col-span-2 flex flex-col gap-10">
            <Column title="Learn" items={learn} />
            <Column title="Studio" items={studio} />
          </div>

          {/* Visit */}
          <div className="col-span-2 lg:col-span-4">
            <p className="eyebrow !text-[#1e2228] mb-5">Visit the studio</p>
            <address className="not-italic text-[14px] text-[#1e2228] leading-[1.75] mb-4">
              UGF-6, Policlinic Chamber,<br />
              Opp. Judges Bungalow Road,<br />
              Satellite, Ahmedabad, Gujarat 380015
            </address>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
              <a href={SITE_INFO.google.directionsUrl} target="_blank" rel="noopener noreferrer" className="at-link at-link-green min-h-[36px]" aria-label="Get directions on Google Maps (opens in a new tab)">
                Get directions <span className="arrow" aria-hidden="true">↗</span>
              </a>
              <a href={SITE_INFO.phoneHref} className="at-link min-h-[36px] tabular">
                {SITE_INFO.phoneDisplay}
              </a>
            </div>
            <div className="relative w-full h-40 bg-[#e9f3e9] border border-[#dde7dd] overflow-hidden grayscale-[60%] hover:grayscale-0 transition-[filter] duration-500">
              <iframe
                title={`Map: ${SITE_INFO.google.name}, Satellite, Ahmedabad`}
                src={SITE_INFO.google.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[#dde7dd] pt-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[12px] text-[#6b6e68] pr-0 sm:pr-20">
          <p className="tabular">© {YEAR} {SITE_INFO.businessName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#1e5f2e] transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p>
            Designed &amp; developed by{' '}
            <a
              href="https://www.hntech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1e5f2e] hover:text-[#2e7a3a] transition-colors"
            >
              HNTech
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
