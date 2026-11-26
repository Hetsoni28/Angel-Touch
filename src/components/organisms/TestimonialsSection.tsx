import { FadeIn } from '@/components/atoms/FadeIn'
import { GUEST_REVIEWS } from '@/lib/reviews'
import { SITE_INFO } from '@/lib/siteInfo'

/*
 * Guest reviews — real Google reviews (src/lib/reviews.ts), quoted word for word.
 * Large serif quotes, no stars or avatars. Phones: a swipeable row; desktop: a grid.
 */
export function TestimonialsSection() {
  if (GUEST_REVIEWS.length === 0) return null

  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]" aria-labelledby="reviews-title">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 mb-10 md:mb-14">
          <FadeIn>
            <div className="max-w-xl">
              <p className="eyebrow mb-4">Guest reviews</p>
              <h2
                id="reviews-title"
                className="text-[1.9rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.12]"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                In our guests&rsquo; <span className="accent-italic">words</span>.
              </h2>
              <p className="mt-4 text-[15.5px] text-[#4a4846] leading-[1.75]">
                From the reviews women have left for us on Google.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} direction="none">
            <a
              href={SITE_INFO.google.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="at-link shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
            >
              Read all reviews on Google <span className="arrow" aria-hidden="true">→</span>
            </a>
          </FadeIn>
        </div>

        <ul
          className="-mx-6 px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-6 pb-2 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Guest reviews"
        >
          {GUEST_REVIEWS.map((r, i) => (
            <li key={r.name} className="snap-start shrink-0 w-[84%] sm:w-[60%] md:w-auto">
              <FadeIn delay={0.06 * (i % 3)} className="h-full">
                <figure className="at-card h-full flex flex-col bg-[#faf8f2] p-6 sm:p-7">
                  <span className="text-[3.25rem] text-[#edc179] leading-none h-8 mb-3 select-none" style={{ fontFamily: 'var(--font-heading)' }} aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote
                    className="text-[1.05rem] md:text-[1.1rem] text-[#1e2228] leading-[1.6] grow"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-[#dde7dd] flex items-baseline justify-between gap-3">
                    <span className="text-[12px] font-semibold tracking-[0.16em] text-[#1e2228] uppercase whitespace-nowrap">{r.name}</span>
                    <span className="text-[11px] tracking-[0.12em] text-[#1e5f2e] uppercase text-right">{r.service}</span>
                  </figcaption>
                </figure>
              </FadeIn>
            </li>
          ))}
        </ul>

        <p className="md:hidden mt-3 text-[12px] text-[#6b6e68]" aria-hidden="true">Swipe to read more →</p>
      </div>
    </section>
  )
}
