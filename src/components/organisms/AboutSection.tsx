import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

const services = [
  'Advanced Aesthetic Skin Treatments & Aroma Facials',
  'Aromatherapy & Wellness Therapies',
  'Hair Spa, Hair Smoothening, Keratin & Re-moulding',
  'Hair Colouring — Chemical & Natural Methods',
  'Shirodhara (Ayurvedic Oil-Pouring Therapy)',
  'Bridal & Bridesmaid Makeup, Hair Styling',
  'Destination Wedding Makeup',
  'Manicure, Pedicure & Full Nail Art Services',
  'Skincare Academy — Levels 1, 2 & 3',
  'Aromatherapy & Beauty School',
]

export function AboutSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Founder Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <FadeIn delay={0.1}>
              <div className="w-full max-w-sm overflow-hidden bg-[#e9f3e9] border border-[#dde7dd] shadow-sm img-zoom">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/heena_thaaker.jpg"
                  alt="Heena Thaaker — Founder of Angel Touch"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </FadeIn>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 flex flex-col">
            <FadeIn delay={0.2}>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4">
                Angel Touch by Heena Thaaker
              </p>
              <h2
                className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.15] mb-5"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
              >
                Beauty with intention.
              </h2>
              <span className="gold-rule mb-6 block" />
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-[15px] text-[#5c5a58] leading-[1.8] mb-6 max-w-xl">
                We provide the best beauty services with advanced aesthetic skin treatments, aromatherapy, professional haircare and traditional Ayurvedic wellness — all offered in private individual rooms at our women-only centre in Satellite, Ahmedabad.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 max-w-xl">
                {services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[13px] text-[#5c5a58] leading-snug">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#5c8f60] shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link href="/about" className="at-link self-start">
                Discover our story →
              </Link>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  )
}
