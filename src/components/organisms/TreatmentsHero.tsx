import { FadeIn } from '@/components/atoms/FadeIn'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import Link from 'next/link'

export function TreatmentsHero() {
  return (
    <section className="relative w-full min-h-[75vh] flex flex-col justify-center overflow-hidden border-b border-[#dde7dd]/60">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ayurvedic_shirodhara.jpg"
          alt="Angel Touch Treatments"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f2] via-[#faf8f2]/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 pb-24 md:pt-32 md:pb-32">
        <div className="max-w-[640px]">
          <FadeIn delay={0.1}>
            <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Treatments' }]} />

            <h1
              className="text-[2.8rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.6rem] font-medium text-[#1e2228] leading-[1.05] mb-6 md:mb-8"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
            >
              Care,<br />thoughtfully<br />approached.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="gold-rule mb-6 md:mb-8 block" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-[15px] md:text-[17px] text-[#5c5a58] leading-[1.8] max-w-lg mb-10">
              Discover personalised beauty and wellness treatments inspired by the Angel Touch approach.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Link
              href="#catalogue"
              className="inline-flex self-start items-center justify-center px-9 py-4 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
            >
              Explore Treatments
            </Link>
          </FadeIn>
        </div>
      </div>

    </section>
  )
}
