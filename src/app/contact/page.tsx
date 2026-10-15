import { FadeIn } from '@/components/atoms/FadeIn'
import Image from 'next/image'
import type { Metadata } from 'next'

function generateWhatsAppLink({ type = 'GENERAL' }: { type?: 'GENERAL' | 'MASTERCLASS' | 'TREATMENT' }) {
  const phone = '919723179638'
  let text = 'Hello Angel Touch, I would like to inquire about your services.'
  
  if (type === 'MASTERCLASS') {
    text = 'Hello Angel Touch, I am interested in enrolling in a Masterclass.'
  } else if (type === 'TREATMENT') {
    text = 'Hello Angel Touch, I would like to book an Ayurvedic Treatment.'
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export const metadata: Metadata = {
  title: "Contact & Location | Angel Touch by Heena Thaker — Satellite, Ahmedabad",
  description:
    "Visit our women-only sanctuary at UGF-6 Policlinic Chamber, Opp. Judges Bunglow Road, Satellite, Ahmedabad. Book Ayurvedic treatments, bridal styling, or masterclasses with Heena Thaker.",
  alternates: { canonical: 'https://angeltouch.in/contact' },
  keywords: [
    'Angel Touch address Ahmedabad',
    'Heena Thaker contact number',
    'Ayurvedic salon Satellite Ahmedabad',
    'Judges Bungalow Road salon Ahmedabad',
    'Women salon Satellite contact',
    'Book Ayurvedic treatment Ahmedabad',
  ],
  openGraph: {
    title: "Contact & Location | Angel Touch by Heena Thaker — Satellite, Ahmedabad",
    description:
      'Visit our sanctuary in Satellite, Ahmedabad. Book Ayurvedic treatments, bridal styling, or masterclasses with Heena Thaker.',
    url: 'https://angeltouch.in/contact',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Contact Angel Touch in Satellite Ahmedabad' }],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['BeautySalon', 'DaySpa', 'HealthAndBeautyBusiness'],
  name: 'Angel Touch by Heena Thaker',
  url: 'https://angeltouch.in/contact',
  telephone: '+919723179638',
  priceRange: '₹₹ - ₹₹₹',
  hasMap: 'https://maps.google.com/maps?q=Policlinic+Chamber,+Judges+Bungalow+Road,+Satellite,+Ahmedabad',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'UGF-6, Policlinic Chamber, Opp. Judges Bunglow Road',
    addressLocality: 'Satellite',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.02937,
    longitude: 72.504909,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '16:30',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '184',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.instagram.com/angeltouch_by_heena_thaker/',
    'https://wa.me/919723179638',
  ],
}

export default function ContactPage() {
  return (
    <article className="min-h-screen bg-[#faf8f2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      {/* Editorial Hero */}
      <header className="relative w-full pt-24 pb-12 sm:pt-36 sm:pb-16 md:pt-44 md:pb-24 px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1e5f2e] mb-4 sm:mb-6 block">
              Contact Us
            </span>
            <h1
              className="text-[2.2rem] xs:text-[2.6rem] sm:text-[3.5rem] md:text-[4.5rem] font-medium text-[#1e2228] leading-[1.08] mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
            >
              Let&apos;s start your wellness journey.
            </h1>
            <p className="text-[15px] md:text-[18px] text-[#5c5a58] leading-[1.8] max-w-2xl">
              Whether you are looking to book a holistic treatment, inquire about our raw Ayurvedic products, or enroll in a masterclass, we are here to assist you.
            </p>
          </div>
        </FadeIn>
      </header>

      {/* Pro Split Layout Contact Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-[#dde7dd] overflow-hidden shadow-sm">
          
          {/* Left: Cinematic Image with Map Overlay placeholder */}
          <div className="relative aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full w-full bg-[#e9f3e9]">
            <Image
              src="/images/ayurvedic_hero_editorial_1791405719098.jpg"
              alt="Angel Touch Sanctuary in Satellite Ahmedabad"
              fill
              className="object-cover object-center"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2228]/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
              <FadeIn delay={0.2}>
                <h3 className="text-white text-xl sm:text-2xl font-playfair mb-2">Our Sanctuary</h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm">
                  A tranquil space dedicated exclusively to women&apos;s holistic wellness and beauty education.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Right: Contact Information & Actions */}
          <div className="p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col justify-center bg-white relative">
            
            <FadeIn delay={0.2}>
              <div className="space-y-12">
                
                {/* Location */}
                <div className="group">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5c5a58] mb-4 flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-[#dde7dd] group-hover:bg-[#1e5f2e] transition-colors" aria-hidden="true" />
                    Location
                  </h3>
                  <p className="text-[16px] text-[#1e2228] leading-[1.8] pl-7">
                    UGF-6, Policlinic Chamber,<br />
                    Opp. Judges Bunglow Road,<br />
                    Satellite, Ahmedabad — 380015
                  </p>
                </div>

                <div className="group">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5c5a58] mb-4 flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-[#dde7dd] group-hover:bg-[#1e5f2e] transition-colors" aria-hidden="true" />
                    Hours of Operation
                  </h3>
                  <div className="text-[15px] sm:text-[16px] text-[#1e2228] leading-[1.8] pl-7">
                    <div className="grid grid-cols-[auto_1fr] gap-4 sm:gap-8 max-w-[360px]">
                      <span className="whitespace-nowrap">Monday — Saturday</span>
                      <span className="text-[#5c5a58] text-right whitespace-nowrap">10:00 AM — 8:00 PM</span>
                      
                      <span className="whitespace-nowrap">Sunday</span>
                      <span className="text-[#1e5f2e] font-semibold text-right whitespace-nowrap">10:00 AM — 4:30 PM</span>
                    </div>
                  </div>
                </div>

                {/* Direct Contact */}
                <div className="group">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5c5a58] mb-4 flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-[#dde7dd] group-hover:bg-[#1e5f2e] transition-colors" aria-hidden="true" />
                    Direct Contact
                  </h3>
                  <div className="space-y-4 pl-7">
                    <a 
                      href="tel:+919723179638" 
                      aria-label="Call Angel Touch at +91 97231 79638"
                      className="inline-flex items-center min-h-[44px] gap-3 text-[16px] text-[#1e2228] hover:text-[#1e5f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
                    >
                      <svg className="w-4 h-4 text-[#1e5f2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      +91 97231 79638
                    </a>
                    <br />
                    <a 
                      href="https://instagram.com/angeltouch_by_heena_thaker" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Visit Angel Touch Instagram profile (opens in a new tab)"
                      className="inline-flex items-center min-h-[44px] gap-3 text-[16px] text-[#1e2228] hover:text-[#1e5f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
                    >
                      <svg className="w-4 h-4 text-[#1e5f2e]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      @angeltouch_by_heena_thaker
                    </a>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-8 mt-8 border-t border-[#dde7dd]/50">
                  <a
                    href={generateWhatsAppLink({ type: 'GENERAL' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Send an inquiry on WhatsApp (opens in a new tab)"
                    className="group relative flex items-center justify-center min-h-[48px] gap-3 w-full py-4 bg-[#1e2228] overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2"
                  >
                    <div className="absolute inset-0 bg-[#2e7a3a] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <svg className="relative z-10 w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    <span className="relative z-10 text-white text-[12px] font-semibold tracking-[0.2em] uppercase">
                      Send an Inquiry
                    </span>
                  </a>
                  <p className="text-[11px] text-[#5c5a58] text-center pt-4 tracking-wide uppercase">
                    Average response time: Within 2 hours
                  </p>
                </div>

              </div>
            </FadeIn>
          </div>

        </div>
      </section>

    </article>
  )
}
