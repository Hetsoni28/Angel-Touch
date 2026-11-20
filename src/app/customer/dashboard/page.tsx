import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { getPortalData, greeting } from '@/lib/portal'
import { DashboardMembershipCard } from '@/components/organisms/DashboardMembershipCard'
import { PortalQuickActions } from '@/components/organisms/PortalQuickActions'
import { PAYMENTS_ENABLED } from '@/lib/features'
import {
  PortalWelcome,
  PortalSectionTitle,
  PortalNextClass,
  PortalRecordingsRail,
  PortalRecentPayments,
  PortalMembershipComingSoon,
} from '@/components/organisms/PortalHome'

export const instant = false

/**
 * Customer portal — Home.
 * Everything on this screen is the customer's own data (Supabase + Sanity).
 */
export default async function DashboardPage() {
  await connection() // per-request: depends on the signed-in customer
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/customer/dashboard')

  const [data, { data: rawPayments }] = await Promise.all([
    getPortalData(user.id),
    supabase
      .from('payments')
      .select('id, amount_paise, status, created_at, payment_type')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(3),
  ])
  const { now, profile, membership, isMember, joined, upcoming, recordings } = data

  const firstName = profile?.full_name?.trim().split(/\s+/)[0] || user.email?.split('@')[0] || 'there'
  const payments = (rawPayments ?? []).map((p) => ({
    id: p.id,
    amount: p.amount_paise ? p.amount_paise / 100 : 0,
    status: p.status,
    created_at: p.created_at,
    payment_type: p.payment_type,
  }))

  return (
    <div className="w-full space-y-7 md:space-y-9">
      <PortalWelcome
        greeting={greeting(now)}
        firstName={firstName}
        memberSince={profile?.created_at}
        isMember={isMember}
        membershipEnds={membership?.expires_at}
        stats={[
          { label: upcoming.length === 1 ? 'Upcoming class' : 'Upcoming classes', value: upcoming.length, href: '/customer/classes' },
          { label: joined.length === 1 ? 'Class joined' : 'Classes joined', value: joined.length, href: '/customer/classes' },
          { label: recordings.length === 1 ? 'Recording' : 'Recordings', value: recordings.length, href: '/customer/library' },
        ]}
      />

      <PortalQuickActions />

      <section aria-labelledby="next-class-title">
        <PortalSectionTitle
          id="next-class-title"
          title="Your next class"
          href={upcoming.length > 1 ? '/customer/classes' : undefined}
          linkLabel={`All ${upcoming.length}`}
        />
        <PortalNextClass nextClass={upcoming[0] ?? null} now={now} />
      </section>

      <section aria-labelledby="recordings-title">
        <PortalSectionTitle
          id="recordings-title"
          title="Your recordings"
          href={recordings.length ? '/customer/library' : undefined}
          linkLabel="Library"
        />
        <PortalRecordingsRail recordings={recordings} />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 md:gap-8">
        <section aria-labelledby="membership-title">
          <PortalSectionTitle id="membership-title" title="Membership" />
          {/* Membership isn't on sale yet: say so, unless this customer already has one */}
          {!isMember && !PAYMENTS_ENABLED ? (
            <PortalMembershipComingSoon />
          ) : (
            <DashboardMembershipCard
              isMember={isMember}
              expiresAt={membership?.expires_at || undefined}
              status={membership?.status}
            />
          )}
        </section>
        <section aria-labelledby="payments-title">
          <PortalSectionTitle
            id="payments-title"
            title="Recent payments"
            href={payments.length ? '/customer/billing' : undefined}
            linkLabel="Billing"
          />
          <PortalRecentPayments payments={payments} />
        </section>
      </div>
    </div>
  )
}
