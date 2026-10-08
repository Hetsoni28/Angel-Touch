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
            <a
              href="https://wa.me/919723179638?text=Hello%20Angel%20Touch%2C%20I%20would%20like%20to%20make%20a%20general%20inquiry%20about%20your%20treatments."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 w-full sm:w-auto"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Make an Inquiry
            </a>
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
