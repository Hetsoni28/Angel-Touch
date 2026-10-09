import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar'
import { DashboardBottomBar } from '@/components/organisms/DashboardBottomBar'
import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Angel Touch',
  description: 'Manage your classes, membership, and account details.',
}

export const instant = false

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login?redirect=/customer/dashboard')
  }

  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single()
    isAdmin = !!profile?.is_admin
  }

  return (
    <div className="min-h-screen bg-[#faf8f2] py-12 pb-32 md:py-16 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="mb-10">
          <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Customer Dashboard' }]} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <DashboardSidebar isAdmin={isAdmin} />
          <DashboardBottomBar isAdmin={isAdmin} />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
