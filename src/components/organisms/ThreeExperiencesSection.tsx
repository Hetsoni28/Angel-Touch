import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'

/*
 * Three Experiences — editorial 3-col grid.
 * Images are fixed-height so columns stay aligned.
 * Light vertical offset on columns 2 & 3 gives editorial rhythm without blowing height.
 */
export function ThreeExperiencesSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">

          {/* Products / Natural Care experience */}
          <FadeIn delay={0.1} className="flex flex-col h-full">
            <div className="flex flex-col h-full bg-white border border-[#dde7dd]/70 p-6 sm:p-7">
              <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-[4/3] relative">
                <Image
                  src="/images/ayurvedic_facial_therapy.jpg"
                  alt="Ayurvedic botanical facial therapy"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-2">01 — Products</p>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-2.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                Thoughtfully crafted Ayurvedic products.
              </h3>
              <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-6 grow">
                Pure botanical formulations made with traditional methods. Designed to nourish, protect, and restore.
              </p>
              <div className="pt-3 border-t border-[#dde7dd]/50">
                <Link 
                  href="/shop" 
                  className="at-link inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                >
                  Explore Products →
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Treatment experience */}
          <FadeIn delay={0.2} className="flex flex-col h-full">
            <div className="flex flex-col h-full bg-white border border-[#dde7dd]/70 p-6 sm:p-7">
              <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-[4/3] relative">
                <Image
                  src="/images/ayurvedic_shirodhara.jpg"
                  alt="Authentic Ayurvedic Shirodhara and wellness treatments"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-2">02 — Treatments</p>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-2.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                Aroma & Ayurvedic healing treatments.
              </h3>
              <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-6 grow">
                Rooted in the Angel Touch approach — restorative aromatherapy, Shirodhara, and therapies that respect both body and tradition.
              </p>
              <div className="pt-3 border-t border-[#dde7dd]/50">
                <Link 
                  href="/treatments" 
                  className="at-link inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                >
                  Explore Treatments →
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Learning experience */}
          <FadeIn delay={0.3} className="flex flex-col h-full">
            <div className="flex flex-col h-full bg-white border border-[#dde7dd]/70 p-6 sm:p-7">
              <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-[4/3] relative">
                <Image
                  src="/images/ayurvedic_academy_workshop.jpg"
                  alt="Ayurvedic beauty academy workshop"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-2">03 — Learning</p>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-2.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                Learn the art of Ayurvedic formulation.
              </h3>
              <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-6 grow">
                Focused, intimate product-making classes that give you the knowledge to create your own natural beauty products.
              </p>
              <div className="pt-3 border-t border-[#dde7dd]/50">
                <Link 
                  href="/classes" 
                  className="at-link inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                >
                  Explore Classes →
                </Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}

