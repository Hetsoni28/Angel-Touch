'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, GraduationCap, Video, Crown, CreditCard, LayoutDashboard, Database } from 'lucide-react'

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
    <aside className="w-64 flex-shrink-0 bg-white border-r border-[#dde7dd] min-h-[calc(100vh-80px)]">
      <div className="p-6">
        <h2 className="text-[#8a8d87] text-[10px] font-bold tracking-widest uppercase mb-4">Admin Console</h2>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.href === '/admin' 
              ? pathname === '/admin' 
              : pathname.startsWith(item.href)
              
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-[12px] font-semibold tracking-widest uppercase transition-all duration-200 rounded ${
                  isActive 
                    ? 'bg-[#e9f3e9] text-[#1e5f2e]' 
                    : 'text-[#5c5a58] hover:bg-[#faf8f2] hover:text-[#1e2228]'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
