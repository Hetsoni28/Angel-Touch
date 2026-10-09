import { FadeIn } from '@/components/atoms/FadeIn'
import Link from 'next/link'
import Image from 'next/image'

export function BrandIntroductionSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden border-b border-[#dde7dd]/70 bg-[#FAF8F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Founder Image */}
          <div className="order-2 lg:order-1 relative">
            <FadeIn delay={0.2} direction="right">
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none lg:mx-0 overflow-hidden shadow-sm">
                <Image
                  src="/images/heena_thaaker.jpg"
                  alt="Heena Thaker - Founder"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            
            {/* Decorative organic shadow/leaf element floating over the image */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#E9F3E9] rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none" />
          </div>

          {/* Founder Message */}
          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left">
            <FadeIn delay={0.1}>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4">
                A Message from the Founder
              </p>
              
              <h2
                className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] font-medium text-[#1e2228] leading-[1.15] mb-8"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
              >
                "Where traditional Ayurvedic knowledge meets thoughtful, modern beauty."
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[15px] sm:text-[16px] text-[#5c5a58] leading-[1.85] mb-6">
                Hello, I am Heena Thaker. Welcome to Angel Touch. 
              </p>
              <p className="text-[15px] sm:text-[16px] text-[#5c5a58] leading-[1.85] mb-10">
                I believe that true beauty is cultivated through intention—drawing from centuries of Ayurvedic wisdom, selecting only what nature provides, and sharing that knowledge openly. My life's work is empowering women through pure botanicals, advanced aesthetic treatments, and the open sharing of formulation secrets through our academy.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col items-center lg:items-start">
                <p className="font-playfair text-2xl text-[#1E5F2E] mb-2 italic">Heena Thaker</p>
                <p className="text-[11px] font-bold tracking-widest text-[#8a8d87] uppercase mb-10">
                  Founder & Master Formulator
                </p>
                <Link href="/about" className="at-link">
                  Read My Full Story &rarr;
                </Link>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}
