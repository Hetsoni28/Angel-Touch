'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DASHBOARD_NAV_ITEMS } from './DashboardSidebar'
import { LogOut } from 'lucide-react'

export function DashboardBottomBar() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dde7dd] z-50 flex justify-around items-center px-2 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      {DASHBOARD_NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center p-2 min-w-[64px] ${
              isActive ? 'text-[#2e7a3a]' : 'text-[#8a8d87]'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'fill-[#2e7a3a]/10' : ''}`} />
            <span className="text-[9px] font-bold tracking-widest uppercase text-center w-full truncate leading-tight">
              {item.label.split(' ')[0]}
            </span>
          </Link>
        )
      })}
      <form action="/auth/signout" method="post" className="flex flex-col items-center justify-center min-w-[64px]">
        <button
          type="submit"
          className="flex flex-col items-center justify-center p-2 text-[#8a8d87] hover:text-[#d32f2f]"
        >
          <LogOut className="w-5 h-5 mb-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-center leading-tight">
            Sign Out
          </span>
        </button>
      </form>
    </nav>
  )
}
