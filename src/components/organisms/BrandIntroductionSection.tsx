import { FadeIn } from '@/components/atoms/FadeIn'
import Link from 'next/link'
import { CinematicImage } from '@/components/atoms/CinematicImage'

export function BrandIntroductionSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-36 overflow-hidden border-b border-[#dde7dd]/70 bg-[#FAF8F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">

          {/* Founder portrait */}
          <FadeIn direction="none" className="order-2 lg:order-1">
            <figure className="max-w-md mx-auto lg:max-w-none lg:mx-0 mr-3.5 sm:mr-4 lg:mr-4">
              {/* The gold offset frame wraps the photo only — not the caption */}
              <div className="offset-frame">
                <CinematicImage
                  src="/images/heena_thaaker.jpg"
                  alt="Heena Thaker, founder of Angel Touch Ayurvedic salon and beauty academy"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  parallax={5}
                  reveal
                  className="w-full aspect-[4/5] bg-[#e9f3e9]"
                  imageClassName="object-cover object-top"
                />
              </div>
              {/* mt clears the frame, which sits 14px below the photo */}
              <figcaption className="mt-9 text-[11px] tracking-[0.16em] uppercase text-[#6b6e68]">
                Heena Thaker <span className="text-[#c9cfc4] mx-1.5" aria-hidden="true">/</span> Founder
              </figcaption>
            </figure>
          </FadeIn>

          {/* Founder message */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left">
            <FadeIn>
              <p className="eyebrow mb-6">A note from the founder</p>

              <h2
                className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-medium text-[#1e2228] leading-[1.14] mb-9"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                &ldquo;Traditional Ayurvedic knowledge, practised with{' '}
                <span className="accent-italic">modern</span> care.&rdquo;
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-[15.5px] sm:text-[16.5px] text-[#4a4846] leading-[1.85] max-w-[36rem] mx-auto lg:mx-0 mb-10">
                <p>I&apos;m Heena Thaker, and Angel Touch is my studio.</p>
                <p>
                  I believe good skin and hair care starts with intention: centuries of Ayurvedic
                  practice, ingredients chosen from nature, and knowledge that is shared rather than
                  kept secret. That is why the same studio offers botanical and aromatherapy
                  treatments, advanced aesthetic care, and an academy where I teach how it is done.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="flex flex-col items-center lg:items-start">
                <p
                  className="text-[1.75rem] text-[#1E5F2E] leading-none mb-2 italic"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Heena Thaker
                </p>
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#6b6e68] uppercase mb-9">
                  Founder &amp; Master Formulator
                </p>
                <Link
                  href="/about"
                  className="at-link min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                >
                  Read my full story <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}
