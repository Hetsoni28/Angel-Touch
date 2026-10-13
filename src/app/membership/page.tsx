import { client } from '@/sanity/lib/client'
import { MembershipHero } from '@/components/organisms/MembershipHero'
import { MembershipValueProps } from '@/components/organisms/MembershipValueProps'
import { MembershipPlans } from '@/components/organisms/MembershipPlans'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayurvedic Formulator Membership',
  description:
    'Join the Angel Touch Formulator Membership for unlimited access to the complete recorded masterclass vault. Monthly and annual plans — learn authentic Ayurvedic formulation at your own pace.',
  alternates: { canonical: 'https://angeltouch.in/membership' },
  openGraph: {
    title: 'Ayurvedic Formulator Membership | Angel Touch',
    description:
      'Unlock unlimited access to Angel Touch\'s complete library of Ayurvedic formulation masterclass recordings. Flexible monthly and annual plans.',
    url: 'https://angeltouch.in/membership',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Angel Touch Formulator Membership' }],
  },
}


export const instant = false

export default async function MembershipPage() {
  const plans = await client.fetch(`
    *[_type == "membershipPlan"] | order(price asc) {
      _id,
      name,
      price,
      billingPeriod,
      features
    }
  `)

  return (
    <main className="min-h-screen bg-[#faf8f2]">
      <MembershipHero />
      <MembershipValueProps />
      <MembershipPlans plans={plans} />
    </main>
  )
}
