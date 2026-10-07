import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

export function FinalCTASection() {
  return (
    <section className="relative bg-[#faf8f2] py-28 md:py-40 border-t border-[#dde7dd] overflow-hidden">

      {/* ── FULL-BLEED BOTANICAL BACKGROUND ── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/hero-image.svg"
          alt=""
          className="w-full h-full object-cover object-center opacity-[0.2]"
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">

          <FadeIn delay={0.1}>
            <h2
              className="text-[2rem] md:text-[3rem] lg:text-[3.4rem] font-medium text-[#1e2228] leading-[1.15] mb-8"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
            >
              Begin your<br />Angel Touch journey.
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <span className="gold-rule mb-8 block" />
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-[17px] text-[#5c5a58] leading-relaxed max-w-lg mb-12">
              Explore our curated Ayurvedic products, discover personalised treatments, or join an upcoming product-making masterclass.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              >
                Explore Products
              </Link>
              <Link
                href="/treatments"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-[#dde7dd] bg-white/60 hover:bg-white hover:border-[#2e7a3a] text-[#1e2228] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              >
                Explore Treatments
              </Link>
              <Link
                href="/classes"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-[#dde7dd] bg-white/60 hover:bg-white hover:border-[#2e7a3a] text-[#1e2228] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
              >
                Explore Classes
              </Link>
            </div>
          </FadeIn>

        </div>
      </div>

    </section>
  )
}

