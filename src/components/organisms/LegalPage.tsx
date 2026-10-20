import type { ReactNode } from 'react'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { SITE_INFO } from '@/lib/siteInfo'
import { generateWhatsAppLink } from '@/utils/whatsapp'

interface LegalPageProps {
  title: string
  /** Shown under the title, e.g. "20 October 2026" */
  lastUpdated: string
  intro: ReactNode
  children: ReactNode
}

/**
 * Shared layout for the policy pages (privacy, terms, refund).
 * A single readable column; sections are LegalSection children.
 */
export function LegalPage({ title, lastUpdated, intro, children }: LegalPageProps) {
  return (
    <div className="bg-[#faf8f2] min-h-screen">
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="mb-10">
          <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />
        </div>

        <header className="mb-12 pb-10 border-b border-[#dde7dd]">
          <h1
            className="text-[2.2rem] sm:text-[2.8rem] font-medium text-[#1e2228] leading-[1.1] mb-4"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
          >
            {title}
          </h1>
          <p className="text-[13px] text-[#6b6e68] mb-8">Last updated {lastUpdated}</p>
          <div className="text-[16px] text-[#4a4846] leading-[1.8]">{intro}</div>
        </header>

        <div className="space-y-12">{children}</div>

        <footer className="mt-16 bg-white border border-[#dde7dd] p-6 sm:p-8">
          <h2
            className="text-[1.35rem] font-medium text-[#1e2228] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Questions about this page?
          </h2>
          <p className="text-[15px] text-[#4a4846] leading-[1.8] mb-5">
            Write to us on WhatsApp or call {SITE_INFO.phoneDisplay}. You can also visit us at{' '}
            {SITE_INFO.address}.
          </p>
          <a
            href={generateWhatsAppLink({ type: 'GENERAL', message: `I have a question about your ${title}.` })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message Angel Touch on WhatsApp (opens in a new window)"
            className="at-link at-link-green"
          >
            Message us on WhatsApp
          </a>
        </footer>
      </article>
    </div>
  )
}

interface LegalSectionProps {
  title: string
  children: ReactNode
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section>
      <h2
        className="text-[1.5rem] font-medium text-[#1e2228] leading-[1.25] mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-[15px] text-[#4a4846] leading-[1.8] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-[#1e2228] [&_strong]:font-semibold [&_a]:text-[#2e7a3a] [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </section>
  )
}
