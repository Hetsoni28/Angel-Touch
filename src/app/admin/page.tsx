import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { Card } from '@/components/atoms/Card'
import { Users, GraduationCap, Crown, CreditCard } from 'lucide-react'

export const instant = false

export default async function AdminDashboardPage() {
  await connection()
  const supabase = await createClient()

  // Fetch quick stats
  const [
    { count: customersCount },
    { count: enrollmentsCount },
    { count: membershipsCount },
    { count: paymentsCount }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('class_enrollments').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
    supabase.from('memberships').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'succeeded')
  ])

  const stats = [
    { label: 'Total Customers', value: customersCount || 0, icon: Users },
    { label: 'Confirmed Enrollments', value: enrollmentsCount || 0, icon: GraduationCap },
    { label: 'Active Memberships', value: membershipsCount || 0, icon: Crown },
    { label: 'Successful Payments', value: paymentsCount || 0, icon: CreditCard },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Admin Dashboard</h1>
        <p className="text-[#5c5a58] text-[15px]">Welcome to the Angel Touch backend console.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white border border-[#dde7dd] p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#faf8f2] rounded-full flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#2e7a3a]" />
              </div>
              <p className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-1">{stat.label}</p>
              <p className="font-playfair text-3xl text-[#1e2228]">{stat.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
