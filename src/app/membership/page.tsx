import { client } from '@/sanity/lib/client'
import { MembershipHero } from '@/components/organisms/MembershipHero'
import { MembershipValueProps } from '@/components/organisms/MembershipValueProps'
import { MembershipPlans, type MembershipPlan } from '@/components/organisms/MembershipPlans'
import { ComingSoonBanner } from '@/components/organisms/ComingSoonBanner'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { PAYMENTS_ENABLED } from '@/lib/features'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/atoms/JsonLd'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Ayurvedic Formulator Membership',
  description:
    'Unlimited access to every recorded Angel Touch masterclass. Learn Ayurvedic skincare and hair care formulation at your own pace with Heena Thaker.',
  path: '/membership',
  image: {
    url: '/images/learning_hero.jpg',
    alt: 'Ayurvedic formulation workbench with herbs and oils for Angel Touch members',
  },
})


export const instant = false

export default async function MembershipPage() {
  // Inquiry mode: membership is a full-page "opening soon" banner until payments are switched on.
  if (!PAYMENTS_ENABLED) {
    return (
      <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Membership', path: '/membership' }])} />
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
      </>
    )
  }

  const plans = await client.fetch<MembershipPlan[]>(`
    *[_type == "membershipPlan"] | order(price asc) {
      _id,
      name,
      price,
      billingPeriod,
      features
    }
  `)

  return (
    // <div>, not <main>: the root layout already renders the page's <main>.
    <div className="min-h-screen bg-[#faf8f2]">
      <JsonLd data={breadcrumbJsonLd([{ name: 'Membership', path: '/membership' }])} />
      <MembershipHero />
      <MembershipValueProps />
      <MembershipPlans plans={plans} />
    </div>
  )
}
