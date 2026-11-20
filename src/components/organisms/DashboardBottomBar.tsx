'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { getDashboardNavItems, isNavActive } from './DashboardSidebar'

/**
 * Phone tab bar for the customer portal — a floating dock in the brand's ink
 * colour. An ivory pill sits behind the active tab and slides to whichever tab
 * you tap (shared-layout animation). Five large targets, readable labels, and
 * room for the iPhone home indicator. Sign out lives on the Profile tab.
 */
export function DashboardBottomBar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  // Five tabs on phones; the admin Studio link stays on desktop.
  const navItems = getDashboardNavItems(isAdmin).filter((i) => i.href !== '/studio')

  return (
    <nav
      aria-label="Account tabs"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 px-3 pointer-events-none"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 10px)' }}
    >
      <ul
        className="pointer-events-auto mx-auto max-w-md grid grid-cols-5 gap-1 p-1.5 rounded-[22px] bg-[#1e2228]/95 backdrop-blur-xl border border-white/10 shadow-[0_18px_40px_-12px_rgba(30,34,40,0.55),0_4px_10px_-4px_rgba(30,34,40,0.3)]"
      >
        {navItems.map((item) => {
          const active = isNavActive(pathname, item.href)
          const Icon = item.icon
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="relative flex flex-col items-center justify-center gap-1 h-[58px] rounded-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#edc179] [-webkit-tap-highlight-color:transparent] active:scale-[0.96] transition-transform"
              >
                {active && (
                  <motion.span
                    layoutId="portal-tab-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[16px] bg-[#faf8f2] shadow-[inset_0_-2px_0_0_#edc179]"
                    transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.9 }}
                  />
                )}
                <Icon
                  className={`relative w-[21px] h-[21px] transition-colors duration-200 ${active ? 'text-[#1e5f2e]' : 'text-white/70'}`}
                  strokeWidth={active ? 2.2 : 1.7}
                  aria-hidden="true"
                />
                <span
                  className={`relative text-[10.5px] leading-none tracking-[0.01em] transition-colors duration-200 ${
                    active ? 'text-[#1e5f2e] font-semibold' : 'text-white/65 font-medium'
                  }`}
                >
                  {item.short}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
