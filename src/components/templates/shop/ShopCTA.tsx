import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

export function ShopCTA() {
  return (
    <section className="bg-white border-t border-[#dde7dd]/60 py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center flex flex-col items-center justify-center">
        
        <FadeIn delay={0.1}>
          <h2 
            className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Found something you'd like to know more about?
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p className="text-[15px] text-[#5c5a58] mb-10 max-w-lg mx-auto">
            Ask us about a product and our team will be happy to help you find the right formulation for your needs.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
            >
              Make an Inquiry
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#dde7dd] bg-[#faf8f2] hover:bg-white hover:border-[#2e7a3a] text-[#1e2228] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
            >
              Explore Treatments
            </Link>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}

