import { requireAdmin } from '@/lib/supabase/auth'
import { AdminSidebar } from '@/components/organisms/AdminSidebar'

export const metadata = {
  title: 'Admin Console | Angel Touch',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Layer 2 Security: Double check admin role on server
  await requireAdmin()

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#faf8f2]">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-12 overflow-y-auto min-w-0">
        {children}
      </main>
    </div>
  )
}
