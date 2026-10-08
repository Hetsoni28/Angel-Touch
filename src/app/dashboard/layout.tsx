'use client'

import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar'
import { DashboardBottomBar } from '@/components/organisms/DashboardBottomBar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf8f2] py-12 pb-32 md:py-16 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="mb-10">
          <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <DashboardSidebar />
          <DashboardBottomBar />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
