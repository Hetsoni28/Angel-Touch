import Link from 'next/link'
import { CalendarHeart, CalendarDays, PlayCircle, MapPin } from 'lucide-react'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { SITE_INFO } from '@/lib/siteInfo'

/** App-style shortcut tiles at the top of the portal home screen. */
export function PortalQuickActions() {
  const actions = [
    {
      label: 'Book a treatment',
      note: 'On WhatsApp',
      href: generateWhatsAppLink({ type: 'GENERAL', message: 'I would like to book an appointment.' }),
      icon: CalendarHeart,
      external: true,
      primary: true,
    },
    { label: 'Live classes', note: 'Upcoming dates', href: '/classes', icon: CalendarDays },
    { label: 'My library', note: 'Watch recordings', href: '/customer/library', icon: PlayCircle },
    { label: 'Directions', note: 'Satellite, Ahmedabad', href: SITE_INFO.google.directionsUrl, icon: MapPin, external: true },
  ]

  return (
    <nav aria-label="Quick actions" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((a) => {
        const Icon = a.icon
        const inner = (
          <>
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                a.primary ? 'bg-white/15 text-[#f6e7c8]' : 'bg-[#e9f3e9] text-[#1e5f2e]'
              }`}
              aria-hidden="true"
            >
              <Icon className="w-5 h-5" strokeWidth={1.8} />
            </span>
            <span className={`block text-[15px] font-semibold leading-tight ${a.primary ? 'text-white' : 'text-[#1e2228]'}`}>{a.label}</span>
            <span className={`block text-[12px] mt-1 ${a.primary ? 'text-white/75' : 'text-[#6b6e68]'}`}>{a.note}</span>
          </>
        )
        const cls = `block rounded-xl p-4 min-h-[118px] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 ${
          a.primary ? 'bg-[#1e5f2e] hover:bg-[#2e7a3a]' : 'bg-white border border-[#dde7dd] hover:border-[#2e7a3a]/40'
        }`
        return a.external ? (
          <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${a.label} (opens in a new tab)`}>
            {inner}
          </a>
        ) : (
          <Link key={a.label} href={a.href} className={cls}>
            {inner}
          </Link>
        )
      })}
    </nav>
  )
}
