import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'

export function AcademyHero() {
  const generalWhatsappUrl =
    'https://wa.me/919723179638?text=' +
    encodeURIComponent(
      'Hello Angel Touch! I would like to inquire about admissions and course details for the Skincare & Beauty Academy.'
    )

  return (
    <section className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[72vh] flex flex-col justify-center overflow-hidden border-b border-[#dde7dd]/70">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ayurvedic_academy_workshop.jpg"
          alt="Angel Touch Beauty & Skincare Academy Workshop"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f2]/95 via-[#faf8f2]/85 to-[#faf8f2]/50 sm:from-[#faf8f2]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="max-w-[680px]">
          <FadeIn delay={0.1}>
            <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Academy' }]} />

            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-4 mt-2">
              Certified Beauty, Cosmetology & Skincare School
            </p>

            <h1
              className="text-[2.2rem] xs:text-[2.6rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.4rem] font-medium text-[#1e2228] leading-[1.08] mb-6 md:mb-8"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
            >
              Learn the craft.<br />
              Master the science of beauty.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <span className="gold-rule mb-6 md:mb-8 block" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-[15px] md:text-[17px] text-[#5c5a58] leading-[1.8] max-w-xl mb-10">
              Founded and personally mentored by Heena Thaker in Satellite, Ahmedabad. Offering certified diplomas and hands-on modules in Cosmetology, Trichology, Clinical Machinery, Chemical Peels, and Pure Aromatherapy.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1e5f2e] hover:bg-[#164722] text-white text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 rounded-sm shadow-sm text-center"
              >
                <span>Inquire for Admissions</span>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href="#catalogue"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#1e2228] bg-white/70 hover:bg-[#1e2228] text-[#1e2228] hover:text-white text-[11px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 rounded-sm text-center"
              >
                Explore Courses (1 &ndash; 13)
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
