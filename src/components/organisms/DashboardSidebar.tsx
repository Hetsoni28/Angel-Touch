'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Video, User, CreditCard, LogOut, Settings, Calendar } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'

export const getDashboardNavItems = (isAdmin: boolean) => {
  const items = [
    { label: 'Overview', href: '/customer/dashboard', icon: LayoutDashboard },
    { label: 'My Classes', href: '/customer/classes', icon: Calendar },
    { label: 'Video Library', href: '/customer/library', icon: Video },
    { label: 'Profile', href: '/customer/profile', icon: User },
    { label: 'Billing', href: '/customer/billing', icon: CreditCard },
  ]
  
  if (isAdmin) {
    items.push({ label: 'Admin Studio', href: '/studio', icon: Settings })
  }
  
  return items
}

export function DashboardSidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const navItems = getDashboardNavItems(isAdmin)

  return (
    <aside aria-label="Dashboard Sidebar Navigation" className="hidden md:block md:w-64 lg:w-72 flex-shrink-0">
      <nav aria-label="Dashboard Links" className="flex flex-col gap-2 sticky top-32">
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
              className={`flex items-center min-h-[44px] px-5 py-3.5 text-[13px] font-semibold tracking-widest uppercase transition-all duration-200 border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 rounded-r ${
                isActive 
                  ? 'border-[#2e7a3a] bg-white text-[#1e5f2e] shadow-sm' 
                  : 'border-transparent text-[#5c5a58] hover:bg-white hover:text-[#1e2228]'
              }`}
            >
              <Icon className="w-4 h-4 mr-4" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}

        <div className="mt-8 pt-6 border-t border-[#dde7dd]">
          <form action={logoutAction}>
            <button
              type="submit"
              aria-label="Sign out of your account"
              className="w-full flex items-center min-h-[44px] px-5 py-3.5 text-[13px] font-semibold tracking-widest uppercase text-[#5c5a58] hover:text-[#d32f2f] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d32f2f] focus-visible:ring-offset-2 rounded-r transition-all duration-200 border-l-2 border-transparent"
            >
              <LogOut className="w-4 h-4 mr-4" aria-hidden="true" />
              Sign Out
            </button>
          </form>
        </div>
      </nav>
    </aside>
  )
}
