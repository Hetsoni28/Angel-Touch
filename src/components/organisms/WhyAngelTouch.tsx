import { FadeIn } from '@/components/atoms/FadeIn'

const principles = [
  {
    title: 'Women-Only Sanctuary',
    description: 'A safe, private environment where women can fully relax and experience treatments in dedicated individual rooms.',
  },
  {
    title: 'Expert Led',
    description: 'Founded by Heena Thaaker, combining years of advanced aesthetic skin treatment expertise with a certified beauty academy.',
  },
  {
    title: 'Ayurvedic Tradition',
    description: 'We respect time-tested natural formulation and therapies, offering genuine Shirodhara and aromatherapy rituals.',
  },
]

export function WhyAngelTouch() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-32 border-t border-[#dde7dd]/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <FadeIn>
          <div className="text-center mb-16 md:mb-20">
            <h2
              className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The Angel Touch Difference
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 * (i + 1)}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#e9f3e9] flex items-center justify-center mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5c8f60]" />
                </div>
                <h3
                  className="text-[1.2rem] font-medium text-[#1e2228] leading-snug mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {p.title}
                </h3>
                <p className="text-[14px] text-[#5c5a58] leading-[1.7] max-w-sm">
                  {p.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
