import { FadeIn } from '@/components/ui/FadeIn'

/*
 * SECTION 08 — WHY ANGEL TOUCH
 * A purely typographic editorial layout. No icons. The principles
 * are laid out in a numbered, 2-column grid with generous space.
 */
export function WhyChooseUsSection() {
  const principles = [
    {
      n: '01',
      title: 'Thoughtful',
      body: 'Carefully considered products, treatments and learning experiences — nothing is added without purpose.',
    },
    {
      n: '02',
      title: 'Rooted',
      body: 'Inspired by centuries of Ayurvedic tradition and natural beauty practices that have stood the test of time.',
    },
    {
      n: '03',
      title: 'Personal',
      body: 'A more intentional approach to beauty and learning — recognising that each person\'s journey is different.',
    },
    {
      n: '04',
      title: 'Honest',
      body: 'Clear, straightforward information. We share only what we can genuinely support through practice and tradition.',
    },
  ]

  return (
    <section className="bg-white py-24 md:py-32 border-t border-[#dde7dd]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-10">

          {/* Left — headline */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.1}>
              <h2
                className="text-[2rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                The principles<br />that guide us.
              </h2>
            </FadeIn>
          </div>

          {/* Right — 4 principles in a 2×2 grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-x-14 sm:gap-y-12 lg:pl-10">
            {principles.map((p, index) => (
              <FadeIn key={p.n} delay={0.1 * (index + 2)}>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[#edc179] tracking-[0.2em] mb-4">{p.n}</span>
                  <h3
                    className="text-[1.3rem] font-medium text-[#1e2228] mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-[#5c5a58] leading-relaxed">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

