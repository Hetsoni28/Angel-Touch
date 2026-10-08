'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Video, User, CreditCard, LogOut, Settings } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'

export const getDashboardNavItems = (isAdmin: boolean) => {
  const items = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Video Library', href: '/dashboard/library', icon: Video },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
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
    <aside className="hidden md:block md:w-64 lg:w-72 flex-shrink-0">
      <nav className="flex flex-col gap-2 sticky top-32">
        {navItems.map((item) => {
          const isActive = item.href === '/dashboard' 
            ? pathname === '/dashboard' 
            : pathname.startsWith(item.href)
            
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-5 py-4 text-[13px] font-semibold tracking-widest uppercase transition-all duration-200 border-l-2 ${
                isActive 
                  ? 'border-[#2e7a3a] bg-white text-[#1e5f2e] shadow-sm' 
                  : 'border-transparent text-[#5c5a58] hover:bg-white hover:text-[#1e2228]'
              }`}
            >
              <Icon className="w-4 h-4 mr-4" />
              {item.label}
            </Link>
          )
        })}

        <div className="mt-8 pt-6 border-t border-[#dde7dd]">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center px-5 py-4 text-[13px] font-semibold tracking-widest uppercase text-[#5c5a58] hover:text-[#d32f2f] hover:bg-white transition-all duration-200 border-l-2 border-transparent"
            >
              <LogOut className="w-4 h-4 mr-4" />
              Sign Out
            </button>
          </form>
        </div>
      </nav>
    </aside>
  )
}
