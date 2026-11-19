import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { CinematicImage } from '@/components/atoms/CinematicImage'

const services = [
  'Advanced Aesthetic Skin Treatments & Aroma Facials',
  'Aromatherapy & Wellness Therapies',
  'Hair Spa, Hair Smoothening, Keratin & Re-moulding',
  'Hair Colouring – Chemical & Natural Methods',
  'Shirodhara (Ayurvedic Oil-Pouring Therapy)',
  'Bridal & Bridesmaid Makeup, Hair Styling',
  'Destination Wedding Makeup',
  'Manicure, Pedicure & Full Nail Art Services',
  'Skincare Academy – Levels 1, 2 & 3',
  'Aromatherapy & Beauty School',
]

export function AboutSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Treatment Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
            <FadeIn direction="none" fullWidth className="max-w-sm">
              <div className="offset-frame mr-3.5 sm:mr-4">
              <CinematicImage
                src="/images/treatment_shirodhara.jpg"
                alt="Shirodhara Ayurvedic oil therapy at Angel Touch salon in Satellite, Ahmedabad"
                sizes="(max-width: 1024px) 100vw, 400px"
                parallax={6}
                reveal
                className="w-full aspect-[4/5] bg-[#e9f3e9]"
              />
              </div>
            </FadeIn>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <FadeIn>
              <p className="eyebrow mb-4">The full menu</p>
              <h2
                className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.12] mb-6"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                Everything we offer, <span className="accent-italic">at a glance</span>.
              </h2>
              <span className="gold-rule mb-7 block" />
            </FadeIn>

            <FadeIn delay={0.08}>
              <p className="text-[15.5px] text-[#4a4846] leading-[1.8] mb-8 max-w-xl">
                Advanced aesthetic skin treatments, aromatherapy, hair care, bridal makeup and
                traditional Ayurvedic therapies, all given in private rooms at our women-only studio
                in Satellite, Ahmedabad.
              </p>
            </FadeIn>

            <FadeIn delay={0.14}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-9 max-w-xl border-t border-[#dde7dd]">
                {services.map((s) => (
                  <li key={s} className="flex items-start gap-3 py-3 border-b border-[#dde7dd] text-[13.5px] text-[#4a4846] leading-snug">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[#b38538] shrink-0" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Link
                href="/treatments"
                className="at-link self-start min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
              >
                See the treatment menu <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  )
}
