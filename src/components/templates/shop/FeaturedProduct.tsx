import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { type ProductCardProps } from '@/components/molecules/ProductCard'

export function FeaturedProduct({ product }: { product: ProductCardProps }) {
  if (!product) return null

  return (
    <section className="bg-white border-y border-[#dde7dd]/60 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="order-2 lg:order-1 lg:col-span-5 lg:col-start-1 xl:col-start-2 flex flex-col justify-center">
            <FadeIn delay={0.1}>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-[#5c8f60] uppercase mb-4 md:mb-6">
                Featured
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h2 
                className="text-[2.2rem] md:text-[2.8rem] font-medium text-[#1e2228] leading-[1.1] mb-5 md:mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                A ritual worth making time for.
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <h3 className="text-[1.2rem] font-medium text-[#1e2228] mb-3">
                {product.name}
              </h3>
              <p className="text-[15px] text-[#5c5a58] leading-relaxed mb-8">
                {product.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link href={`/shop/${typeof product.slug === 'object' ? product.slug?.current : product.slug}`} className="at-link at-link-green">
                View Product &rarr;
              </Link>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
            <FadeIn direction="none" delay={0.2} className="w-full relative mx-auto max-w-md lg:max-w-none">
              <div className="relative w-full aspect-4/5 bg-[#faf8f2] overflow-hidden rounded-sm border border-[#dde7dd]/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.imageUrl || '/images/featured_lifestyle.jpg'} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </FadeIn>
          </div>
          
        </div>
      </div>
    </section>
  )
}

