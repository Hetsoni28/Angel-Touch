import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { FadeIn } from '@/components/atoms/FadeIn'
import { RevealLines } from '@/components/atoms/RevealLines'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { SITE_INFO } from '@/lib/siteInfo'

// Plain facts only — true today and stated elsewhere on the site.
const FACTS = [
  { value: '25', label: 'treatment categories' },
  { value: 'Women-only', label: 'studio' },
  { value: 'Private', label: 'rooms' },
]

/** `placeholder`: used by loading.tsx — renders no <h1> so the page keeps exactly one. */
export function TreatmentsHero({ placeholder = false }: { placeholder?: boolean } = {}) {
  const Heading = placeholder ? 'p' : 'h1'
  return (
    <section className="relative w-full min-h-[62vh] md:min-h-[78vh] flex flex-col justify-center overflow-hidden">
      {/* Full background photo with an ivory wash for legible text */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ayurvedic_shirodhara.jpg"
          alt="Shirodhara warm oil therapy at Angel Touch Ayurvedic salon in Satellite, Ahmedabad"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%] sm:object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f2]/92 via-[#faf8f2]/70 to-[#faf8f2]/10 sm:from-[#faf8f2]/88" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#faf8f2] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-14 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-28">
        <div className="max-w-[660px]">
          <FadeIn>
            <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Treatments' }]} />
            <Heading className="eyebrow mt-3 mb-5">
              Ayurvedic Salon Treatments in Satellite, Ahmedabad
            </Heading>
          </FadeIn>

          {placeholder ? (
            <p
              className="text-[2.5rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.7rem] font-medium text-[#1e2228] leading-[1.02] mb-7"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
            >
              Care,<br />thoughtfully<br />approached.
            </p>
          ) : (
            <RevealLines
              trigger="load"
              delay={0.1}
              className="text-[2.5rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.7rem] font-medium text-[#1e2228] leading-[1.02] mb-7"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
              lines={[
                'Care,',
                <Fragment key="l2"><span className="accent-italic">thoughtfully</span></Fragment>,
                'approached.',
              ]}
            />
          )}

          <FadeIn delay={0.3}>
            <span className="gold-rule mb-7" />
            <p className="text-[15.5px] md:text-[17px] text-[#4a4846] leading-[1.75] max-w-[34rem] mb-9">
              From threading and clean-ups to Shirodhara, hair spa and bridal makeup — the full Angel
              Touch menu, given one guest at a time in private rooms at our women-only studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              <a
                href={generateWhatsAppLink({ type: 'GENERAL', message: 'I would like to book a treatment.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="at-btn"
                aria-label="Book a treatment on WhatsApp (opens in a new tab)"
              >
                Book on WhatsApp <span className="arrow" aria-hidden="true">→</span>
              </a>
              <Link href="#catalogue" className="at-btn-ghost">See the menu</Link>
            </div>

            <dl className="grid grid-cols-3 max-w-[30rem] border-t border-[#1e2228]/15">
              {FACTS.map((f, i) => (
                <div key={f.label} className={`pt-5 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-[#1e2228]/15' : ''}`}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block text-[1.12rem] sm:text-[1.55rem] text-[#1e2228] leading-none mb-1.5 tabular whitespace-nowrap" style={{ fontFamily: 'var(--font-heading)' }}>
                      {f.value}
                    </span>
                    <span className="block text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#4a4846]">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[12px] text-[#4a4846] tabular">
              {SITE_INFO.hours.map((h, i) => (
                <span key={h.days}>
                  {i > 0 && <span className="mx-2 text-[#1e2228]/30" aria-hidden="true">/</span>}
                  {h.days.replace('Monday to Saturday', 'Mon–Sat')}: {h.time.replace(' to ', ' – ')}
                </span>
              ))}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
