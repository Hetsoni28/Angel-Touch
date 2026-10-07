import Link from 'next/link'
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

          {}
          <FadeIn delay={0.1} className="flex flex-col h-full">
            <div className="flex flex-col h-full bg-white border border-[#dde7dd]/70 p-6 sm:p-7">
              <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-4/3">
                <img
                  src="/images/ayurvedic_herbal_body_scrub_1791405717151.jpg"
                  alt="Ayurvedic products"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-2">01 — Products</p>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-2.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                Thoughtfully crafted Ayurvedic products.
              </h3>
              <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-6 grow">
                Pure botanical formulations made with traditional methods. Designed to nourish, protect, and restore.
              </p>
              <div className="pt-3 border-t border-[#dde7dd]/50">
                <Link href="/shop" className="at-link">Explore Products →</Link>
              </div>
            </div>
          </FadeIn>

          {}
          <FadeIn delay={0.2} className="flex flex-col h-full">
            <div className="flex flex-col h-full bg-white border border-[#dde7dd]/70 p-6 sm:p-7">
              <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-4/3">
                <img
                  src="/images/ayurvedic_abhyanga.jpg"
                  alt="Ayurvedic treatments"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-2">02 — Treatments</p>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-2.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                Personalised healing and beauty treatments.
              </h3>
              <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-6 grow">
                Rooted in the Angel Touch approach — careful, considered therapies that respect both body and tradition.
              </p>
              <div className="pt-3 border-t border-[#dde7dd]/50">
                <Link href="/treatments" className="at-link">Explore Treatments →</Link>
              </div>
            </div>
          </FadeIn>

          {}
          <FadeIn delay={0.3} className="flex flex-col h-full">
            <div className="flex flex-col h-full bg-white border border-[#dde7dd]/70 p-6 sm:p-7">
              <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-4/3">
                <img
                  src="/images/ayurvedic_cosmetics_workspace_1791405719662.jpg"
                  alt="Ayurvedic product-making classes"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-2">03 — Learning</p>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-2.5 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                Learn the art of Ayurvedic formulation.
              </h3>
              <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-6 grow">
                Focused, intimate product-making classes that give you the knowledge to create your own natural beauty products.
              </p>
              <div className="pt-3 border-t border-[#dde7dd]/50">
                <Link href="/classes" className="at-link">Explore Classes →</Link>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}

