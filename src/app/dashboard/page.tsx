import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { ArrowRight, Calendar, Star, History } from 'lucide-react'
import { connection } from 'next/server'

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
        
        {/* Membership Status */}
        <section className="bg-white border border-[#dde7dd] p-8 relative overflow-hidden">
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div>
              <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-1">Membership Status</h2>
              <h3 className="font-playfair text-2xl text-[#1e2228]">
                {isMember ? 'Active Member' : 'No Active Membership'}
              </h3>
            </div>
            <Star className={`w-8 h-8 ${isMember ? 'text-[#edc179]' : 'text-[#dde7dd]'}`} />
          </div>
          
          {isMember ? (
            <>
              <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
                Your membership is active until {new Date(membership.expires_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
              </p>
              <Link href="/library" className="inline-flex items-center text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] transition-colors relative z-10">
                Access Video Library <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </>
          ) : (
            <>
              <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
                Join our membership to get unlimited access to all past class recordings and exclusive Ayurvedic content.
              </p>
              <Link href="/membership" className="inline-flex items-center text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] transition-colors relative z-10">
                Explore Membership <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </>
          )}
        </section>

        {/* Upcoming Class */}
        <section className="bg-white border border-[#dde7dd] p-8">
          <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-6">Your Next Class</h2>
          
          {nextClass ? (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-playfair text-xl text-[#1e2228] mb-1">{nextClass.title}</h3>
                <p className="text-[#5c5a58] text-[14px] flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> 
                  {new Date(nextClass.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • {nextClass.time} IST
                </p>
              </div>
              <Link 
                href={`/classes/${nextClass.slug.current || nextClass.slug}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-widest uppercase transition-colors"
              >
                View Details
              </Link>
            </div>
          ) : (
            <div className="text-center p-6 border border-dashed border-[#dde7dd]">
              <p className="text-[#5c5a58] text-[14px] mb-4">You have no upcoming live classes.</p>
              <Link href="/classes#upcoming" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-[#1e2228] text-[#1e2228] hover:bg-[#1e2228] hover:text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200">
                Browse Classes
              </Link>
            </div>
          )}
        </section>

      </div>

      {/* Recent Activity */}
      <section className="bg-white border border-[#dde7dd] p-8">
        <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-6 flex items-center">
          <History className="w-3.5 h-3.5 mr-2" />
          Recent Activity
        </h2>
        
        <div className="space-y-4">
          {!payments || payments.length === 0 ? (
            <p className="text-[13px] text-[#5c5a58]">No recent activity found.</p>
          ) : (
            payments.map((payment) => (
              <div key={payment.id} className="pb-4 border-b border-[#dde7dd] last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[14px] text-[#1e2228] font-medium mb-1">
                      {payment.payment_type === 'class_enrollment' ? 'Class Purchase' : 'Membership Purchase'}
                    </p>
                    <p className="text-[12px] text-[#8a8d87]">
                      {new Date(payment.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-playfair text-[#1e2228]">₹{payment.amount}</p>
                    <p className={`text-[11px] uppercase tracking-wider font-semibold ${payment.status === 'succeeded' ? 'text-[#2e7a3a]' : 'text-[#8a8d87]'}`}>
                      {payment.status}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  )
}
