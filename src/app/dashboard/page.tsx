import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { ArrowRight, Video, Calendar, Star, History, CreditCard, User } from 'lucide-react'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'

export const instant = false

export default async function DashboardPage() {
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
    <div className="min-h-screen bg-[#faf8f2] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        <div className="mb-10">
          <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Dashboard' }]} />
        </div>

        {/* Welcome Section */}
        <div className="mb-12 border-b border-[#dde7dd] pb-8">
          <h1 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-2">
            Welcome back, {firstName}.
          </h1>
          <p className="text-[#5c5a58] text-[15px]">
            Manage your classes, membership, and account details here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#faf8f2] border border-[#dde7dd]">
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
                <div className="text-center p-8 border border-dashed border-[#dde7dd]">
                  <p className="text-[#5c5a58] text-[14px] mb-4">You have no upcoming live classes.</p>
                  <Link href="/classes#upcoming" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-[#1e2228] text-[#1e2228] hover:bg-[#1e2228] hover:text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200">
                    Browse Classes
                  </Link>
                </div>
              )}
            </section>

          </div>

          {/* Sidebar (Right 1 column) */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <section className="bg-white border border-[#dde7dd] p-6">
              <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/library" className="flex items-center p-3 hover:bg-[#faf8f2] transition-colors border border-transparent hover:border-[#dde7dd] text-[#1e2228] text-[14px]">
                  <Video className="w-4 h-4 mr-3 text-[#5c5a58]" />
                  My Video Library
                </Link>
                <Link href="/account/profile" className="flex items-center p-3 hover:bg-[#faf8f2] transition-colors border border-transparent hover:border-[#dde7dd] text-[#1e2228] text-[14px]">
                  <User className="w-4 h-4 mr-3 text-[#5c5a58]" />
                  Edit Profile
                </Link>
                <Link href="/account/billing" className="flex items-center p-3 hover:bg-[#faf8f2] transition-colors border border-transparent hover:border-[#dde7dd] text-[#1e2228] text-[14px]">
                  <CreditCard className="w-4 h-4 mr-3 text-[#5c5a58]" />
                  Billing & Invoices
                </Link>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white border border-[#dde7dd] p-6">
              <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-4 flex items-center">
                <History className="w-3.5 h-3.5 mr-2" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {!payments || payments.length === 0 ? (
                  <p className="text-[13px] text-[#5c5a58]">No recent activity.</p>
                ) : (
                  payments.map((payment) => (
                    <div key={payment.id} className="pb-4 border-b border-[#dde7dd] last:border-0 last:pb-0">
                      <p className="text-[14px] text-[#1e2228] mb-1">
                        {payment.payment_type === 'class_enrollment' ? 'Class Purchase' : 'Membership Purchase'}
                      </p>
                      <div className="flex justify-between items-center text-[12px] text-[#8a8d87]">
                        <span>{new Date(payment.created_at).toLocaleDateString()}</span>
                        <span className={payment.status === 'succeeded' ? 'text-[#2e7a3a]' : 'text-[#5c5a58]'}>
                          ₹{payment.amount} • {payment.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  )
}
