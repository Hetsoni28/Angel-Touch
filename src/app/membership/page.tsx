import { client } from '@/sanity/lib/client'
import { MembershipHero } from '@/components/organisms/MembershipHero'
import { MembershipValueProps } from '@/components/organisms/MembershipValueProps'
import { MembershipPlans } from '@/components/organisms/MembershipPlans'

export const metadata = {
  title: 'Membership | Angel Touch',
  description: 'Unlock unlimited access to our recorded vault of premium Ayurvedic formulation masterclasses.',
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
