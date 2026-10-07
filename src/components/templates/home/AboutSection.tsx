import Link from 'next/link'

export function AboutSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Portrait - graceful, controlled size */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[380px]">
              <div className="overflow-hidden aspect-[4/5] max-h-[480px] bg-[#e9f3e9] shadow-sm border border-[#dde7dd]/80 img-zoom">
                <img
                  src="/images/founder_heena_thaker.jpg"
                  alt="Heena Thaker — Founder of Angel Touch"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Subtle gold accent frame */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#edc179]/40 pointer-events-none -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-6">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#5c8f60] uppercase mb-4">
              About & Founder
            </p>
            <h2
              className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.15] mb-5"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
            >
              Beauty with intention.
            </h2>
            <span className="gold-rule mb-7" />
            <div className="flex flex-col gap-4 mb-8 text-[15px] text-[#5c5a58] leading-[1.8] max-w-xl">
              <p>
                Angel Touch was founded by Heena Thaker, whose passion for Ayurvedic wellness and natural beauty stems from years of dedicated study and hands-on practice in traditional formulation.
              </p>
              <p>
                Every product, treatment and class offered at Angel Touch reflects the same intention — to bring ancient Ayurvedic knowledge into everyday life in a form that is honest, accessible and truly effective.
              </p>
            </div>
            <Link href="/about" className="at-link self-start">
              Discover our story →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
