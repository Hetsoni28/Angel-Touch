import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { ArrowRight, Calendar, Star, History } from 'lucide-react'
import { connection } from 'next/server'
import { Button } from '@/components/atoms/Button'

import { DashboardMembershipCard } from '@/components/organisms/DashboardMembershipCard'
import { DashboardUpcomingClass } from '@/components/organisms/DashboardUpcomingClass'
import { DashboardRecentActivity } from '@/components/organisms/DashboardRecentActivity'

export const instant = false

export default async function DashboardPage() {
  await connection() // Force dynamic rendering for Next.js 16
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/dashboard')
  }

  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, created_at')
    .eq('id', user.id)
    .single()

  const firstName = profile?.full_name?.split(' ')[0] || 'There'

  // 2. Fetch Membership
  const { data: membership } = await supabase
    .from('memberships')
    .select('status, expires_at')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  const isMember = !!membership && new Date(membership.expires_at) > new Date()

  // 3. Fetch Class Enrollments
  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select('id, class_id, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const confirmedClassIds = (enrollments || [])
    .filter(e => e.status === 'confirmed')
    .map(e => e.class_id)

  let enrolledClasses: any[] = []
  if (confirmedClassIds.length > 0) {
    // Fetch details from Sanity
    enrolledClasses = await client.fetch(`
      *[_type == "masterclass" && _id in $ids] | order(date asc) {
        _id,
        title,
        slug,
        date,
        time
      }
    `, { ids: confirmedClassIds })
  }

  const now = new Date()
  const upcomingClasses = enrolledClasses.filter(c => new Date(c.date) >= now)
  const nextClass = upcomingClasses.length > 0 ? upcomingClasses[0] : null

  // 4. Fetch Payments (for Recent Activity)
  const { data: payments } = await supabase
    .from('payments')
    .select('id, amount, status, created_at, payment_type')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="w-full space-y-10">
      
      {/* Welcome Section */}
      <div className="border-b border-[#dde7dd] pb-8">
        <h1 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-2">
          Welcome back, {firstName}.
        </h1>
        <p className="text-[#5c5a58] text-[15px]">
          Manage your classes, membership, and account details here.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <DashboardMembershipCard isMember={isMember} expiresAt={membership?.expires_at} />
        <DashboardUpcomingClass nextClass={nextClass} />
      </div>

      <DashboardRecentActivity payments={payments} />

    </div>
  )
}
