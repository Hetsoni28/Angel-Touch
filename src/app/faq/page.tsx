import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { FAQ_GROUPS } from '@/lib/faq'
import { SITE_INFO } from '@/lib/siteInfo'
import { generateWhatsAppLink } from '@/utils/whatsapp'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers about booking treatments, our women-only studio in Satellite, Ahmedabad, products, live classes, recordings, membership and academy courses at Angel Touch.',
  alternates: { canonical: 'https://angeltouch.in/faq' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    }))
  ),
}

const slugId = (title: string) => 'faq-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function FaqPage() {
  return (
    <div className="bg-[#faf8f2] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="mb-10">
          <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        </div>

        <header className="mb-14">
          <h1
            className="text-[2.2rem] sm:text-[2.8rem] font-medium text-[#1e2228] leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
          >
            Frequently asked questions
          </h1>
          <p className="text-[16px] text-[#4a4846] leading-[1.8]">
            Quick answers about visiting us, booking, products and classes. Can&apos;t find what you need?{' '}
            <a
              href={generateWhatsAppLink({ type: 'GENERAL' })}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2e7a3a] underline underline-offset-2"
            >
              Ask us on WhatsApp
            </a>{' '}
            or call {SITE_INFO.phoneDisplay}.
          </p>
        </header>

        <div className="space-y-14">
          {FAQ_GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={slugId(group.title)}>
              <h2
                id={slugId(group.title)}
                className="text-[1.5rem] font-medium text-[#1e2228] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {group.title}
              </h2>
              <div className="border-t border-[#dde7dd]">
                {group.items.map((item) => (
                  <details key={item.question} className="group border-b border-[#dde7dd]">
                    <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 rounded-sm">
                      <span className="text-[16px] font-medium text-[#1e2228] leading-[1.5] group-hover:text-[#2e7a3a] transition-colors">
                        {item.question}
                      </span>
                      <Plus
                        className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#2e7a3a] transition-transform duration-300 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pb-6 pr-10 text-[15px] text-[#4a4846] leading-[1.8]">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-[14px] text-[#6b6e68] leading-[1.8]">
          For bookings and refunds, see our{' '}
          <Link href="/refund" className="text-[#2e7a3a] underline underline-offset-2">Refund &amp; Cancellation Policy</Link>.
          How we handle your information is explained in our{' '}
          <Link href="/privacy" className="text-[#2e7a3a] underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}
