import { FadeIn } from '@/components/atoms/FadeIn'

export function BrandPhilosophy() {
  return (
    <section className="bg-[#faf8f2] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <FadeIn delay={0.1}>
          <span className="gold-rule mx-auto mb-8 block" />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h2 
            className="text-[2rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.2] mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Thoughtfully selected.<br className="hidden sm:block" /> Naturally inspired.
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] max-w-2xl mx-auto">
            At Angel Touch, we believe in the power of botanical ingredients and traditional Ayurvedic practices. 
            Our products are carefully formulated to nourish and restore, using authentic methods passed down through generations.
            We prioritize natural integrity, ensuring every blend respects both your skin and the environment.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

