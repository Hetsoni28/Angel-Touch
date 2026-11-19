import Link from 'next/link'
import type { Metadata } from 'next'
import { generateWhatsAppLink } from '@/utils/whatsapp'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const SUGGESTIONS = [
  { href: '/treatments', label: 'Treatments', note: 'Facials, Shirodhara, hair spa, bridal' },
  { href: '/academy', label: 'Academy', note: 'Beauty & cosmetology courses' },
  { href: '/classes', label: 'Classes', note: 'Live formulation masterclasses' },
  { href: '/contact', label: 'Contact', note: 'Address, hours and directions' },
]

export default function NotFound() {
  return (
    <section className="bg-[#faf8f2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Error 404</p>
          <h1
            className="text-[2.4rem] md:text-[3.4rem] font-medium text-[#1e2228] leading-[1.06] mb-7"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            This page could not be <span className="accent-italic">found</span>.
          </h1>
          <span className="gold-rule mb-7" />
          <p className="text-[16px] text-[#4a4846] leading-[1.75] mb-10">
            The link may be old, or the page may have moved. These are the places most people are
            looking for:
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#dde7dd]/70 border border-[#dde7dd]/70 mb-12">
          {SUGGESTIONS.map((s) => (
            <li key={s.href} className="bg-[#faf8f2]">
              <Link
                href={s.href}
                className="group flex flex-col h-full p-6 md:p-7 hover:bg-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2e7a3a]"
              >
                <span className="flex items-center justify-between mb-2">
                  <span className="text-[1.2rem] text-[#1e2228]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {s.label}
                  </span>
                  <span className="text-[#b9c4b6] group-hover:text-[#2e7a3a] group-hover:translate-x-1 transition-all duration-300" aria-hidden="true">→</span>
                </span>
                <span className="text-[13.5px] text-[#4a4846] leading-snug">{s.note}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/" className="at-btn">Back to home</Link>
          <a
            href={generateWhatsAppLink({ type: 'GENERAL' })}
            target="_blank"
            rel="noopener noreferrer"
            className="at-btn-ghost"
            aria-label="Ask us on WhatsApp (opens in a new tab)"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
