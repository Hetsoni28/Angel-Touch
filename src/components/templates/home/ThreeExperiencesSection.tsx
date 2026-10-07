import Link from 'next/link'

/*
 * Three Experiences — editorial 3-col grid.
 * Images are fixed-height so columns stay aligned.
 * Light vertical offset on columns 2 & 3 gives editorial rhythm without blowing height.
 */
export function ThreeExperiencesSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Section label */}
        <p className="text-[10px] font-semibold tracking-[0.3em] text-[#5c8f60] uppercase mb-14 md:mb-16">
          The Angel Touch Collection
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* 01: PRODUCTS */}
          <div className="flex flex-col">
            <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6" style={{ height: '320px' }}>
              <img
                src="/images/ayurvedic_herbal_body_scrub_1791405717151.jpg"
                alt="Ayurvedic products"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-2">01 — Products</p>
            <h3 className="text-[1.2rem] font-medium text-[#1e2228] mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
              Thoughtfully crafted Ayurvedic products.
            </h3>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-5">
              Pure botanical formulations made with traditional methods. Designed to nourish, protect, and restore.
            </p>
            <Link href="/shop" className="at-link">Explore Products →</Link>
          </div>

          {/* 02: TREATMENTS — slightly taller image for rhythm */}
          <div className="flex flex-col md:pt-8">
            <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6" style={{ height: '300px' }}>
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&auto=format&fit=crop&q=80"
                alt="Ayurvedic treatments"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-2">02 — Treatments</p>
            <h3 className="text-[1.2rem] font-medium text-[#1e2228] mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
              Personalised healing and beauty treatments.
            </h3>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-5">
              Rooted in the Angel Touch approach — careful, considered therapies that respect both body and tradition.
            </p>
            <Link href="/treatments" className="at-link">Explore Treatments →</Link>
          </div>

          {/* 03: LEARNING */}
          <div className="flex flex-col md:pt-16">
            <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6" style={{ height: '280px' }}>
              <img
                src="/images/ayurvedic_cosmetics_workspace_1791405719662.jpg"
                alt="Ayurvedic product-making classes"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-2">03 — Learning</p>
            <h3 className="text-[1.2rem] font-medium text-[#1e2228] mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
              Learn the art of Ayurvedic formulation.
            </h3>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-5">
              Focused, intimate product-making classes that give you the knowledge to create your own natural beauty products.
            </p>
            <Link href="/classes" className="at-link">Explore Classes →</Link>
          </div>

        </div>
      </div>
    </section>
  )
}
