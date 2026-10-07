import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

export function HeroSection() {
  return (
    <section className="relative w-full bg-[#faf8f2] flex flex-col justify-center overflow-hidden border-b border-[#dde7dd]/60 pt-16 pb-20 md:pt-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <div className="relative z-10 flex flex-col justify-center">
          <FadeIn delay={0.1}>
            <h1
              className="text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.4rem] font-medium text-[#1e2228] leading-[1.08] mb-6 md:mb-7"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
            >
              Beauty,<br />rooted in nature.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="gold-rule mb-6 md:mb-7 block" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] max-w-lg mb-8 md:mb-9">
              A thoughtful approach to natural beauty — handcrafted Ayurvedic products, personalised treatments, and expert-led product-making classes rooted in tradition and curated by Heena Thaker.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 mb-9">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              >
                Explore Products
              </Link>
              <Link
                href="/classes"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-[#dde7dd] bg-white/70 hover:bg-white hover:border-[#2e7a3a] text-[#1e2228] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              >
                Explore Classes
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="text-[11px] text-[#8a8d87] tracking-[0.16em] uppercase">
              Ayurvedic tradition · Natural ingredients · Expert guidance
            </p>
          </FadeIn>
        </div>

        <div className="relative w-full aspect-4/5 sm:aspect-square lg:aspect-4/5 bg-[#e9f3e9] overflow-hidden rounded-sm">
          <FadeIn direction="none" delay={0.3} className="w-full h-full">
            <img
              src="/images/ayurvedic_hero_editorial_1791405719098.jpg"
              alt="Ayurvedic botanical ingredients arranged on ivory stone"
              className="w-full h-full object-cover object-center"
            />
          </FadeIn>
        </div>

      </div>
    </section>
  )
}

