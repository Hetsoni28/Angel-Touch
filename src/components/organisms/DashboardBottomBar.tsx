'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getDashboardNavItems, isNavActive } from './DashboardSidebar'

/**
 * Phone tab bar for the customer portal — like a native app's bottom navigation:
 * five large targets, readable labels, a pill behind the active icon, and padding
 * for the iPhone home indicator. (Sign out lives on the Profile tab.)
 */
export function DashboardBottomBar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  // Keep the bar to five tabs on phones; the admin Studio link is on desktop.
  const navItems = getDashboardNavItems(isAdmin).filter((i) => i.href !== '/studio')

  return (
    <nav
      aria-label="Account tabs"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#dde7dd] shadow-[0_-8px_24px_-16px_rgba(30,34,40,0.25)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-5 max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isNavActive(pathname, item.href)
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center justify-center gap-1 h-[62px] focus-visible:outline-none focus-visible:bg-[#e9f3e9]"
              >
                <span
                  className={`flex items-center justify-center w-14 h-8 rounded-full transition-colors duration-200 ${
                    active ? 'bg-[#e9f3e9] text-[#1e5f2e]' : 'text-[#6b6e68]'
                  }`}
                >
                  <Icon className="w-[22px] h-[22px]" strokeWidth={active ? 2.2 : 1.7} aria-hidden="true" />
                </span>
                <span className={`text-[11px] leading-none ${active ? 'text-[#1e5f2e] font-semibold' : 'text-[#6b6e68] font-medium'}`}>
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
