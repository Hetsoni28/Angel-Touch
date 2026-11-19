import { Fragment } from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { RevealLines } from '@/components/atoms/RevealLines'
import { CinematicImage } from '@/components/atoms/CinematicImage'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { SITE_INFO } from '@/lib/siteInfo'
import { OFFICIAL_ACADEMY_COURSES } from '@/lib/academyCourses'

// Plain facts only — every one of these is true today and stated elsewhere on the site.
const FACTS = [
  { value: 'Women-only', label: 'studio' },
  { value: 'Private', label: 'treatment rooms' },
  { value: String(OFFICIAL_ACADEMY_COURSES.length), label: 'academy courses' },
]

export function HeroSection() {
  const bookingLink = generateWhatsAppLink({
    type: 'GENERAL',
    message: 'I would like to book an appointment.',
  })

  return (
    <section className="relative w-full bg-[#faf8f2] flex flex-col justify-center overflow-hidden border-b border-[#dde7dd]/60 pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 bg-[url('/images/hero_background.png')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">

        <div className="relative z-10 flex flex-col justify-center">
          <FadeIn>
            <h1 className="eyebrow mb-5">
              Ayurvedic Salon &amp; Beauty Academy in Satellite, Ahmedabad
            </h1>
          </FadeIn>
          <RevealLines
            trigger="load"
            delay={0.15}
            className="text-[2.6rem] sm:text-[3.6rem] lg:text-[4.1rem] xl:text-[4.6rem] font-medium text-[#1e2228] leading-[1.02] mb-7"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.025em' }}
            lines={[
              'Beauty,',
              <Fragment key="l2">rooted in <span className="accent-italic">nature</span>.</Fragment>,
            ]}
          />
          <FadeIn delay={0.35}>
            <span className="gold-rule mb-7" />
            <p className="text-[15.5px] md:text-[17px] text-[#4a4846] leading-[1.75] max-w-[30rem] mb-9">
              Aroma facials, Shirodhara, hair spa and bridal makeup in private rooms at
              Heena Thaker&apos;s women-only studio, alongside an academy that teaches the
              methods behind every treatment.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-11">
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="at-btn"
                aria-label="Book an appointment on WhatsApp (opens in a new tab)"
              >
                Book on WhatsApp <span className="arrow" aria-hidden="true">→</span>
              </a>
              <Link href="/treatments" className="at-btn-ghost">
                Explore treatments
              </Link>
            </div>

            <dl className="grid grid-cols-3 max-w-[30rem] border-t border-[#dde7dd]">
              {FACTS.map((f, i) => (
                <div key={f.label} className={`pt-5 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-[#dde7dd]' : ''}`}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span
                      className="block text-[1.35rem] sm:text-[1.6rem] text-[#1e2228] leading-none mb-1.5 tabular"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {f.value}
                    </span>
                    <span className="block text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#6b6e68]">
                      {f.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-[12px] text-[#6b6e68] leading-relaxed tabular">
              {SITE_INFO.hours.map((h, i) => (
                <span key={h.days}>
                  {i > 0 && <span className="mx-2 text-[#c9cfc4]" aria-hidden="true">/</span>}
                  {h.days.replace('Monday to Saturday', 'Mon–Sat')}: {h.time.replace(' to ', ' – ')}
                </span>
              ))}
            </p>
          </FadeIn>
        </div>

        <FadeIn direction="none" delay={0.1} className="relative w-full">
          <div className="relative offset-frame mr-3.5 sm:mr-4">
            {/* Main photo: loads immediately (no wipe) and drifts slowly as you scroll */}
            <CinematicImage
              src="/images/hero_ayurvedic_wellness.jpg"
              alt="Serene woman embracing holistic Ayurvedic wellness and natural beauty at Angel Touch"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              parallax={5}
              className="w-full aspect-[4/5] sm:aspect-[5/5.4] lg:aspect-[4/5] bg-[#e9f3e9]"
              imageClassName="object-cover object-center"
            >
              <div className="absolute right-0 top-0 bg-[#faf8f2]/92 backdrop-blur-[2px] px-4 py-3 sm:px-5 sm:py-3.5 text-right">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#1e5f2e] font-semibold">
                  Satellite, Ahmedabad
                </p>
                <p className="text-[12px] text-[#4a4846] mt-0.5">Opp. Judges Bungalow Road</p>
              </div>
            </CinematicImage>

            {/* Layered second photo: overlaps the corner and moves at a different speed for depth */}
            <div className="hidden sm:block absolute -left-8 lg:-left-14 -bottom-10 w-[42%] max-w-[240px] z-10 border-[6px] border-[#faf8f2] shadow-[0_24px_50px_-28px_rgba(30,34,40,0.45)]">
              <CinematicImage
                src="/images/treatment_aroma_facial.jpg"
                alt="Ayurvedic aroma facial with a gentle head massage at Angel Touch"
                // landscape photo in a 4:5 frame: drawn ~630px wide (cover crop + parallax zoom)
                sizes="640px"
                parallax={9}
                reveal
                className="w-full aspect-[4/5] bg-[#e9f3e9]"
                imageClassName="object-cover object-[62%_center]"
              />
              <p className="bg-[#faf8f2] pt-2.5 text-[10px] tracking-[0.2em] uppercase text-[#6b6e68]">
                Aroma facial
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
