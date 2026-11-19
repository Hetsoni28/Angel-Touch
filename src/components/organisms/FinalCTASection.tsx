import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'
import { RevealLines } from '@/components/atoms/RevealLines'
import { SITE_INFO } from '@/lib/siteInfo'
import { generateWhatsAppLink } from '@/utils/whatsapp'

export function FinalCTASection() {
  const bookingLink = generateWhatsAppLink({
    type: 'GENERAL',
    message: 'I would like to book an appointment.',
  })

  return (
    <section className="relative bg-[#faf8f2] py-24 md:py-36 border-t border-[#dde7dd] overflow-hidden">
      {/* Decorative botanical line art */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/hero-image.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.2]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="eyebrow mb-5">Visit the studio</p>
          </FadeIn>
          <RevealLines
            as="h2"
            className="text-[2.2rem] md:text-[3.2rem] lg:text-[3.6rem] font-medium text-[#1e2228] leading-[1.06] mb-8"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
            lines={['Begin your', <Fragment key="l2">Angel Touch <span className="accent-italic">journey</span>.</Fragment>]}
          />
          <FadeIn delay={0.2}>
            <span className="gold-rule mb-8" />
            <p className="text-[16px] md:text-[17px] text-[#4a4846] leading-[1.75] max-w-lg mb-10">
              Tell us what you&apos;d like on WhatsApp, a treatment, a bridal look or a class, and
              we&apos;ll reply with times that work.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-14">
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="at-btn"
                aria-label="Book an appointment on WhatsApp (opens in a new tab)"
              >
                Book on WhatsApp <span className="arrow" aria-hidden="true">→</span>
              </a>
              <Link href="/treatments" className="at-btn-ghost">Explore treatments</Link>
              <Link href="/classes" className="at-btn-ghost">Explore classes</Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 sm:gap-x-8 pt-8 border-t border-[#dde7dd] max-w-3xl">
              <div>
                <dt className="eyebrow !text-[#6b6e68] mb-2">Address</dt>
                <dd className="text-[14px] text-[#1e2228] leading-[1.65]">
                  <Link href="/contact" className="hover:text-[#2e7a3a] transition-colors">
                    UGF-6, Policlinic Chamber,<br />Opp. Judges Bungalow Road,<br />Satellite, Ahmedabad
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[#6b6e68] mb-2">Phone &amp; WhatsApp</dt>
                <dd className="text-[14px] text-[#1e2228] leading-[1.65] tabular">
                  <a href={SITE_INFO.phoneHref} className="inline-flex items-center min-h-[32px] hover:text-[#2e7a3a] transition-colors">
                    {SITE_INFO.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[#6b6e68] mb-2">Hours</dt>
                <dd className="text-[14px] text-[#1e2228] leading-[1.65] tabular">
                  {SITE_INFO.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days.replace('Monday to Saturday', 'Mon–Sat')}: {h.time.replace(' to ', ' – ')}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
