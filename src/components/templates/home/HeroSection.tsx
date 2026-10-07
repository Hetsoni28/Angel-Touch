import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-72px)] bg-[#faf8f2] flex flex-col justify-center overflow-hidden border-b border-[#dde7dd]/60">
      
      {/* ── FULL SCREEN 2-COLUMN SPLIT ── */}
      <div className="w-full min-h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-12 items-stretch">

        {/* ── LEFT: Text Content ── */}
        <div className="lg:col-span-6 xl:col-span-6 relative z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-12">
          
          {/* Eyebrow */}
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] text-[#5c8f60] uppercase mb-6 md:mb-7">
            Angel Touch by Heena Thaker
          </p>

          {/* Headline */}
          <h1
            className="text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.4rem] font-medium text-[#1e2228] leading-[1.08] mb-6 md:mb-7"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
          >
            Beauty,<br />rooted in nature.
          </h1>

          {/* Gold rule */}
          <span className="gold-rule mb-6 md:mb-7 block" />

          {/* Body */}
          <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] max-w-lg mb-8 md:mb-9">
            A thoughtful approach to natural beauty — handcrafted Ayurvedic products, personalised treatments, and expert-led product-making classes rooted in tradition and curated by Heena Thaker.
          </p>

          {/* CTAs */}
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

          {/* Trust line */}
          <p className="text-[11px] text-[#8a8d87] tracking-[0.16em] uppercase">
            Ayurvedic tradition · Natural ingredients · Expert guidance
          </p>
        </div>

        {/* ── RIGHT: Full Height Hero Image ── */}
        <div className="lg:col-span-6 xl:col-span-6 relative min-h-[45vh] lg:min-h-full bg-[#e9f3e9]">
          <img
            src="/images/ayurvedic_hero_editorial_1791405719098.jpg"
            alt="Ayurvedic botanical ingredients arranged on ivory stone"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: '60% center' }}
          />
          {/* Subtle left blend into the ivory column */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#faf8f2] to-transparent pointer-events-none" />
        </div>

      </div>

    </section>
  )
}
