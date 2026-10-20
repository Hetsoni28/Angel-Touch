import { client } from '@/sanity/lib/client'
import { MembershipHero } from '@/components/organisms/MembershipHero'
import { MembershipValueProps } from '@/components/organisms/MembershipValueProps'
import { MembershipPlans } from '@/components/organisms/MembershipPlans'
import { ComingSoonBanner } from '@/components/organisms/ComingSoonBanner'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { PAYMENTS_ENABLED } from '@/lib/features'
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
  // Inquiry mode: membership is a full-page "opening soon" banner until payments are switched on.
  if (!PAYMENTS_ENABLED) {
    return (
      <ComingSoonBanner
        title="Membership opens soon."
        description="One membership will unlock every past masterclass recording, to watch and rewatch at your own pace. Message us and we'll let you know the day it opens."
        imageSrc="/images/learning_hero.jpg"
        imageAlt="Ayurvedic formulation in progress at a workbench of herbs, oils and jars"
        primary={{
          label: 'Notify me on WhatsApp',
          href: generateWhatsAppLink({ type: 'MEMBERSHIP' }),
          ariaLabel: 'Ask to be notified on WhatsApp when membership opens (opens in a new window)',
        }}
        secondary={{ label: 'See live classes', href: '/classes' }}
        note="Membership covers recordings of past classes. Live classes are booked separately and are open for registration now."
      />
    )
  }

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
