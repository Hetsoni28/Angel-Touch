'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getDashboardNavItems } from './DashboardSidebar'
import { LogOut, Calendar } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'

export function DashboardBottomBar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const navItems = getDashboardNavItems(isAdmin)

  return (
    <nav aria-label="Mobile Dashboard Navigation" className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dde7dd] z-50 flex justify-around items-center px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe overflow-x-auto">
      {navItems.map((item) => {
        const isActive = item.href === '/customer/dashboard' 
          ? pathname === '/customer/dashboard' 
          : pathname.startsWith(item.href)
          
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center p-1.5 min-w-[52px] min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded ${
              isActive ? 'text-[#2e7a3a]' : 'text-[#5c5a58]'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'fill-[#2e7a3a]/10' : ''}`} aria-hidden="true" />
            <span className="text-[8.5px] sm:text-[9px] font-bold tracking-wider sm:tracking-widest uppercase text-center w-full truncate leading-tight">
              {item.label.split(' ')[0]}
            </span>
          </Link>
        )
      })}
      <form action={logoutAction} className="flex flex-col items-center justify-center min-w-[52px]">
        <button
          type="submit"
          aria-label="Sign out of your account"
          className="flex flex-col items-center justify-center p-1.5 min-w-[52px] min-h-[48px] text-[#5c5a58] hover:text-[#d32f2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d32f2f] rounded"
        >
          <LogOut className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[8.5px] sm:text-[9px] font-bold tracking-wider sm:tracking-widest uppercase text-center leading-tight">
            Sign Out
          </span>
        </button>
      </form>
    </nav>
  )
}
