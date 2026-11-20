'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Video, User, CreditCard, LogOut, Settings, CalendarDays } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'

/** Portal navigation. `short` is the label used in the phone tab bar. */
export const getDashboardNavItems = (isAdmin: boolean) => {
  const items = [
    { label: 'Overview', short: 'Home', href: '/customer/dashboard', icon: Home },
    { label: 'My Classes', short: 'Classes', href: '/customer/classes', icon: CalendarDays },
    { label: 'Video Library', short: 'Library', href: '/customer/library', icon: Video },
    { label: 'Billing', short: 'Billing', href: '/customer/billing', icon: CreditCard },
    { label: 'Profile', short: 'Profile', href: '/customer/profile', icon: User },
  ]
  if (isAdmin) {
    items.push({ label: 'Admin Studio', short: 'Studio', href: '/studio', icon: Settings })
  }
  return items
}

export const isNavActive = (pathname: string, href: string) =>
  href === '/customer/dashboard' ? pathname === href : pathname.startsWith(href)

/** Desktop sidebar (tablet and up). Phones use DashboardBottomBar. */
export function DashboardSidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const navItems = getDashboardNavItems(isAdmin)

  return (
    <aside aria-label="Account navigation" className="hidden md:block md:w-60 lg:w-64 shrink-0">
      <nav className="flex flex-col gap-1 sticky top-32 bg-white border border-[#dde7dd] rounded-xl p-2">
        {navItems.map((item) => {
          const active = isNavActive(pathname, item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 min-h-[46px] px-4 rounded-lg text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] ${
                active ? 'bg-[#e9f3e9] text-[#1e5f2e] font-semibold' : 'text-[#4a4846] hover:bg-[#faf8f2] hover:text-[#1e2228]'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={active ? 2.2 : 1.8} aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}

        <div className="mt-2 pt-2 border-t border-[#dde7dd]">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 min-h-[46px] px-4 rounded-lg text-[14px] text-[#4a4846] hover:bg-red-50 hover:text-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              <LogOut className="w-[18px] h-[18px]" strokeWidth={1.8} aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </nav>
    </aside>
  )
}
