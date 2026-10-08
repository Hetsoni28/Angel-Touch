import { FadeIn } from '@/components/atoms/FadeIn'
import Link from 'next/link'

export function InquiryCTA() {
  return (
    <section className="bg-white py-20 md:py-32 border-t border-[#dde7dd]/60">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        
        <FadeIn>
          <span className="w-10 h-px bg-[#5c8f60] block mx-auto mb-8" />
          <h2
            className="text-[2rem] md:text-[2.8rem] font-medium text-[#1e2228] leading-[1.15] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to find the right treatment?
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] max-w-2xl mx-auto mb-10">
            Tell us what you&apos;re looking for and we&apos;ll help you explore the right Angel Touch experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 w-full sm:w-auto"
            >
              Make an Inquiry
            </Link>
            <Link
              href="/classes"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#dde7dd] hover:border-[#2e7a3a] text-[#1e2228] hover:text-[#2e7a3a] bg-transparent text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 w-full sm:w-auto"
            >
              Explore Classes
            </Link>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
