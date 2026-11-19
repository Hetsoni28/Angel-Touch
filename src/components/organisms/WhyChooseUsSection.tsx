import { FadeIn } from '@/components/atoms/FadeIn'

/*
 * WHY ANGEL TOUCH — a typographic, two-column layout (no icons).
 * Each point is a concrete, checkable fact about the studio rather than a
 * generic adjective.
 */
const principles = [
  {
    n: '01',
    title: 'For women, in private rooms',
    body: 'Angel Touch is a women-only studio, and every treatment is given in its own private room.',
  },
  {
    n: '02',
    title: 'Ayurveda at the centre',
    body: 'Ayurvedic and aromatherapy practice shapes everything here: the treatments, the products and what we teach.',
  },
  {
    n: '03',
    title: 'Taught by the formulator',
    body: 'Classes and academy courses are taught by Heena Thaker, who also formulates the Angel Touch products.',
  },
  {
    n: '04',
    title: 'Straight answers first',
    body: 'Ask us anything on WhatsApp before you book: ingredients, timings, or what is likely to suit your skin or hair.',
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-[#dde7dd]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-10">

          <div className="lg:col-span-1">
            <FadeIn>
              <p className="eyebrow mb-4">Why Angel Touch</p>
              <h2
                className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.1]"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                What makes us <span className="accent-italic">different</span>.
              </h2>
              <span className="gold-rule mt-8" />
            </FadeIn>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-14 lg:pl-10 border-t border-[#dde7dd] sm:border-t-0">
            {principles.map((p, index) => (
              <FadeIn key={p.n} delay={0.06 * index}>
                <div className={`flex flex-col py-8 border-b border-[#dde7dd] ${index < 2 ? 'sm:border-t' : ''}`}>
                  <span
                    className="text-[1.5rem] leading-none italic text-[#b38538] mb-5 tabular"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    aria-hidden="true"
                  >
                    {p.n}
                  </span>
                  <h3
                    className="text-[1.3rem] font-medium text-[#1e2228] mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[14.5px] text-[#4a4846] leading-[1.75]">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
