import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'

export async function FeaturedProductsSection() {
  // Fetch real data from Sanity
  let products = []
  try {
    const data = await client.fetch(ALL_PRODUCTS_QUERY)
    products = data.filter((p: any) => p.featured).slice(0, 3)
    if (products.length === 0) {
      products = data.slice(0, 3)
    }
  } catch (error) {
    console.error('Failed to fetch featured products', error)
  }

  if (products.length === 0) return null

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <FadeIn delay={0.1}>
            <h2
              className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Made for your ritual.
            </h2>
            <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed max-w-md">
              Formulated from botanical ingredients drawn from Ayurvedic tradition. Crafted to integrate into your daily care.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            <Link href="/shop" className="at-link shrink-0">View all products &rarr;</Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {products.map((product: any, index: number) => (
            <FadeIn key={product._id || index} delay={0.1 * (index + 1)} className="flex flex-col h-full">
              <article className="group flex flex-col h-full">
                <div className="overflow-hidden bg-[#faf8f2] border border-[#dde7dd]/60 img-zoom mb-5 aspect-[4/3] relative">
                  <img
                    src={product.imageUrl || '/images/ayurvedic_hero_editorial_1791405719098.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
                <p className="text-[10px] tracking-[0.22em] text-[#8a8d87] uppercase mb-1.5">{product.category || 'Product'}</p>
                <h3
                  className="text-[1.1rem] font-medium text-[#1e2228] mb-2 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {product.name}
                </h3>
                <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-4 grow line-clamp-3">
                  {product.description || product.shortDescription || ''}
                </p>
                <Link href={`/shop/${product.slug}`} className="at-link at-link-green">
                  View Product &rarr;
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
