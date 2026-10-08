import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

export function AboutSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <FadeIn delay={0.1}>
              <div className="w-full max-w-85 aspect-4/5 overflow-hidden bg-[#e9f3e9] border border-[#dde7dd] shadow-sm img-zoom">
                <img
                  src="/images/founder_heena_thaker.jpg"
                  alt="Heena Thaker — Founder of Angel Touch"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </FadeIn>
          </div>

          {}
          <div className="lg:col-span-7 flex flex-col">
            <FadeIn delay={0.2}>
              <h2
                className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.15] mb-5"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
              >
                Beauty with intention.
              </h2>
              <span className="gold-rule mb-6 block" />
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col gap-4 mb-8 text-[15px] text-[#5c5a58] leading-[1.8] max-w-xl">
                <p>
                  Angel Touch is a women-only salon and wellness centre in Satellite, Ahmedabad — founded by Heena Thaker, a specialist in advanced skin treatments, Ayurvedic therapies and natural formulation.
                </p>
                <p>
                  From aroma facials and Shirodhara to bridal styling and skincare academy courses, every service at Angel Touch is delivered in private individual rooms with genuine care. Our in-house products — crafted using traditional Ayurvedic methods — extend that same intention into your home ritual.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link href="/about" className="at-link self-start">
                Discover our story →
              </Link>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  )
}

