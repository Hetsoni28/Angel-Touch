import { FadeIn } from '@/components/atoms/FadeIn'
import Image from 'next/image'

const principles = [
  {
    title: 'Women-only, private rooms',
    description: 'Every treatment is given in its own private room, at a studio that is for women only.',
  },
  {
    title: 'Led by Heena Thaker',
    description: 'Founded by Heena Thaker, who also runs the Angel Touch beauty academy and teaches its skincare and cosmetology courses.',
  },
  {
    title: 'Ayurveda & aromatherapy',
    description: 'Shirodhara, aroma facials and botanical therapies sit alongside modern skin, hair and bridal services on the same menu.',
  },
]

export function WhyAngelTouch() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/angel-touch-difference-bg.png"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        
        <FadeIn>
          <div className="text-center mb-14 md:mb-20 drop-shadow-md">
            <p className="eyebrow mb-4">Why guests choose us</p>
            <h2
              className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)', textShadow: '0 2px 10px rgba(255,255,255,0.7)' }}
            >
              The Angel Touch <span className="accent-italic">difference</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          {principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.1 * (i + 1)}>
              <div className="flex flex-col items-center text-center">
                <span
                  className="text-[1.6rem] leading-none italic text-[#b38538] mb-5 tabular"
                  style={{ fontFamily: 'var(--font-heading)', textShadow: '0 1px 4px rgba(255,255,255,0.9)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
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
