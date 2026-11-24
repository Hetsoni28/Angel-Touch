'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, GraduationCap, Crown, CreditCard, LayoutDashboard, Database, LogOut } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Enrollments', href: '/admin/enrollments', icon: GraduationCap },
  { label: 'Memberships', href: '/admin/memberships', icon: Crown },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Sanity CMS', href: '/studio', icon: Database },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside aria-label="Admin Console Navigation" className="w-full md:w-64 flex-shrink-0 bg-white border-b md:border-b-0 md:border-r border-[#dde7dd] md:min-h-[calc(100vh-80px)]">
      <div className="p-3 sm:p-4 md:p-6">
        <h2 className="hidden md:block text-[#4a4e4d] text-[10px] font-bold tracking-widest uppercase mb-4">Admin Console</h2>
        <nav aria-label="Admin Navigation Links" className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = item.href === '/admin' 
              ? pathname === '/admin' 
              : pathname.startsWith(item.href)
              
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center min-h-[44px] px-3 md:px-4 py-2 md:py-2.5 text-[11px] md:text-[12px] font-semibold tracking-wider md:tracking-widest uppercase transition-all duration-200 rounded whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-1 ${
                  isActive 
                    ? 'bg-[#e9f3e9] text-[#1e5f2e]' 
                    : 'text-[#5c5a58] hover:bg-[#faf8f2] hover:text-[#1e2228]'
                }`}
              >
                <Icon className="w-4 h-4 mr-2 md:mr-3 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}

          {/* Sign out: last item in the phone scroller, below a divider on desktop */}
          <form action={logoutAction} className="shrink-0 md:mt-3 md:pt-3 md:border-t md:border-[#dde7dd]">
            <button
              type="submit"
              className="w-full flex items-center min-h-[44px] px-3 md:px-4 py-2 md:py-2.5 text-[11px] md:text-[12px] font-semibold tracking-wider md:tracking-widest uppercase rounded whitespace-nowrap text-[#5c5a58] hover:bg-red-50 hover:text-red-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-1"
            >
              <LogOut className="w-4 h-4 mr-2 md:mr-3 shrink-0" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </aside>
  )
}
