import { FadeIn } from '@/components/atoms/FadeIn'
import Link from 'next/link'

export function TreatmentsHero() {
  return (
    <section className="relative w-full bg-[#faf8f2] flex flex-col justify-center overflow-hidden border-b border-[#dde7dd]/60 pt-16 pb-20 md:pt-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left Content */}
        <div className="relative z-10 flex flex-col justify-center">
          <FadeIn delay={0.1}>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4">
              Angel Touch · Treatments
            </p>
            <h1
              className="text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.4rem] font-medium text-[#1e2228] leading-[1.08] mb-6 md:mb-7"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
            >
              Care, thoughtfully<br />approached.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="gold-rule mb-6 md:mb-7 block" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] max-w-lg mb-8 md:mb-9">
              Discover personalised beauty and wellness treatments inspired by the Angel Touch approach.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Link
              href="#catalogue"
              className="inline-flex self-start items-center justify-center px-8 py-3.5 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
            >
              Explore Treatments
            </Link>
          </FadeIn>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 bg-[#e9f3e9] overflow-hidden rounded-sm">
          <FadeIn direction="none" delay={0.3} className="w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ayurvedic_shirodhara.jpg"
              alt="Authentic Angel Touch Ayurvedic Treatment Environment"
              className="w-full h-full object-cover object-center"
            />
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
