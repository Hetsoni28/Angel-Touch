import Link from 'next/link'

// TODO: Replace with Sanity CMS query
const placeholderProducts = [
  {
    id: '1',
    name: 'Kesar Radiance Oil',
    category: 'Skin Care',
    description: 'A lightweight facial oil blending pure saffron and sandalwood to restore natural luminosity.',
    slug: 'kesar-radiance-oil',
    image: '/images/kesar_radiance_oil.jpg',
  },
  {
    id: '2',
    name: 'Ashwagandha Hair Elixir',
    category: 'Hair Care',
    description: 'A deeply nourishing botanical blend to strengthen roots, condition strands, and soothe the scalp.',
    slug: 'ashwagandha-hair-elixir',
    image: '/images/ayurvedic_hair_elixir.jpg',
  },
  {
    id: '3',
    name: 'Neem & Tulsi Cleansing Clay',
    category: 'Body Care',
    description: 'A purifying green clay formulated with wildcrafted herbs for gentle, mindful daily use.',
    slug: 'neem-tulsi-clay',
    image: '/images/ayurvedic_herbal_clay_powder_1791405720188.jpg',
  },
]

export function FeaturedProductsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#5c8f60] uppercase mb-3">The Shop</p>
            <h2
              className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Made for your ritual.
            </h2>
            <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed max-w-md">
              Formulated from botanical ingredients drawn from Ayurvedic tradition. Crafted to integrate into your daily care.
            </p>
          </div>
          <Link href="/shop" className="at-link shrink-0">View all products →</Link>
        </div>

        {/* Product grid — all same height, controlled proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {placeholderProducts.map((product) => (
            <article key={product.id} className="group flex flex-col">
              {/* Fixed-height image container */}
              <div className="overflow-hidden bg-[#faf8f2] border border-[#dde7dd]/60 img-zoom mb-5 aspect-[4/3] max-h-[250px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] tracking-[0.22em] text-[#8a8d87] uppercase mb-1.5">{product.category}</p>
              <h3
                className="text-[1.1rem] font-medium text-[#1e2228] mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {product.name}
              </h3>
              <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-4 flex-grow">
                {product.description}
              </p>
              <Link href={`/shop/${product.slug}#enquire`} className="at-link at-link-green">
                Enquire About Product →
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
