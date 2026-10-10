import { FadeIn } from '@/components/atoms/FadeIn'
import Image from 'next/image'

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
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/angel-touch-difference-bg.png"
          alt="Angel Touch Difference Background"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        
        <FadeIn>
          <div className="text-center mb-16 md:mb-20 drop-shadow-md">
            <h2
              className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)', textShadow: '0 2px 10px rgba(255,255,255,0.7)' }}
            >
              The Angel Touch Difference
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 * (i + 1)}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/90 shadow-sm flex items-center justify-center mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2e7a3a]" />
                </div>
                <h3
                  className="text-[1.2rem] font-medium text-[#1e2228] leading-snug mb-3 drop-shadow-sm"
                  style={{ fontFamily: 'var(--font-heading)', textShadow: '0 1px 4px rgba(255,255,255,0.9)' }}
                >
                  {p.title}
                </h3>
                <p 
                  className="text-[15px] text-[#2c2a28] font-medium leading-[1.7] max-w-sm drop-shadow-sm"
                  style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9)' }}
                >
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
