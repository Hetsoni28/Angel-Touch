'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Video, User, CreditCard, LogOut } from 'lucide-react'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Video Library', href: '/library', icon: Video },
    { label: 'Profile', href: '/account/profile', icon: User },
    { label: 'Billing', href: '/account/billing', icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f2] py-12 pb-32 md:py-16 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="mb-10">
          <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Desktop Sidebar */}
          <aside className="hidden md:block md:w-64 lg:w-72 flex-shrink-0">
            <nav className="flex flex-col gap-2 sticky top-32">
              {navItems.map((item) => {
                const isActive = pathname === item.href
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
                <form action="/auth/signout" method="post">
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

          {/* Mobile Bottom Bar */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#dde7dd] z-50 flex justify-around items-center px-2 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
            {navItems.map((item) => {
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

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

        </div>
      </div>
    </div>
  )
}
