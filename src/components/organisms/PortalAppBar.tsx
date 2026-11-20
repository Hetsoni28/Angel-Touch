import Link from 'next/link'
import { Home } from 'lucide-react'
import { generateWhatsAppLink } from '@/utils/whatsapp'

/**
 * Phone app bar for the customer portal (hidden from tablet up, where the site
 * header is shown). Avatar + greeting on the left, back-to-site and Book on the right.
 */
export function PortalAppBar({ name }: { name: string }) {
  const first = name.trim().split(/\s+/)[0] || 'there'
  const initials = name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || 'AT'

  return (
    <header
      className="md:hidden sticky top-0 z-40 bg-[#faf8f2]/95 backdrop-blur-md border-b border-[#dde7dd]"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between gap-3 h-[60px] px-4">
        <Link href="/customer/profile" className="flex items-center gap-3 min-w-0" aria-label="My profile">
          <span
            aria-hidden="true"
            className="w-10 h-10 shrink-0 rounded-full bg-[#1e5f2e] text-[#f6e7c8] flex items-center justify-center text-[14px] font-semibold tracking-wide"
          >
            {initials}
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] text-[#6b6e68] leading-none mb-1">Hello,</span>
            <span className="block text-[16px] text-[#1e2228] leading-none truncate" style={{ fontFamily: 'var(--font-heading)' }}>
              {first}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            aria-label="Back to the Angel Touch website"
            className="w-10 h-10 rounded-full border border-[#dde7dd] bg-white flex items-center justify-center text-[#1e2228] active:bg-[#e9f3e9]"
          >
            <Home className="w-[18px] h-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <a
            href={generateWhatsAppLink({ type: 'GENERAL', message: 'I would like to book an appointment.' })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book an appointment on WhatsApp (opens in a new tab)"
            className="h-10 px-4 rounded-full bg-[#2e7a3a] text-white text-[12px] font-semibold tracking-wide flex items-center active:bg-[#1e5f2e]"
          >
            Book
          </a>
        </div>
      </div>
    </header>
  )
}
