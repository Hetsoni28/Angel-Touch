import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { DashboardSidebar } from '@/components/organisms/DashboardSidebar'
import { DashboardBottomBar } from '@/components/organisms/DashboardBottomBar'
import { PortalAppBar } from '@/components/organisms/PortalAppBar'
import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your classes, membership, and account details.',
  robots: { index: false, follow: false },
}

export const instant = false

/**
 * Customer portal shell.
 *  - Phones: an app — own top bar (PortalAppBar), full-width screens, bottom tabs.
 *    The marketing header/footer are hidden here (see Header.tsx / Footer.tsx).
 *  - Tablet/desktop: site header + sidebar navigation.
 */
export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/customer/dashboard')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, full_name')
    .eq('id', user.id)
    .maybeSingle()
  const isAdmin = !!profile?.is_admin
  const name = profile?.full_name || user.email?.split('@')[0] || ''

  return (
    <div className="min-h-screen bg-[#faf8f2] md:py-14">
      <PortalAppBar name={name} />

      <div className="max-w-7xl mx-auto md:px-10">
        <div className="hidden md:block mb-8">
          <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'My account' }]} />
        </div>

        <div className="flex flex-col md:flex-row md:gap-10 lg:gap-12">
          <DashboardSidebar isAdmin={isAdmin} />

          {/* Bottom padding keeps content clear of the phone tab bar (+ iPhone home indicator) */}
          <main className="flex-1 min-w-0 px-4 pt-5 pb-[calc(88px+env(safe-area-inset-bottom))] sm:px-6 md:p-0">
            {children}
          </main>
        </div>
      </div>

      <DashboardBottomBar isAdmin={isAdmin} />
    </div>
  )
}
