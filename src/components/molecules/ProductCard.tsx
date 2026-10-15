import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'

export interface ProductCardProps {
  imageUrl?: string;
  name?: string;
  category?: string;
  description?: string;
  slug?: string | { current: string };
  [key: string]: unknown;
}

export function ProductCard({ product, index }: { product: ProductCardProps, index: number }) {
  const productSlug = typeof product.slug === 'object' ? product.slug?.current : product.slug
  const productUrl = `/shop/${productSlug}`
  const productName = product.name || 'Ayurvedic product'

  return (
    <FadeIn delay={0.1 * (index % 4 + 1)} className="flex flex-col h-full">
      <article className="group flex flex-col h-full">
        <Link 
          href={productUrl} 
          aria-label={productName}
          className="block overflow-hidden bg-[#faf8f2] border border-[#dde7dd]/60 img-zoom mb-5 aspect-[3/4] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
        >
          <Image
            src={product.imageUrl || '/images/skincare_oil.jpg'}
            alt={productName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
        
        <p className="text-[10px] tracking-[0.22em] text-[#6b6e68] uppercase mb-1.5 font-medium">
          {product.category || 'Product'}
        </p>
        
        <Link 
          href={productUrl}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
        >
          <h3
            className="text-[1.15rem] font-medium text-[#1e2228] mb-2 leading-snug hover:text-[#2e7a3a] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[13px] text-[#4a4846] leading-relaxed mb-5 grow line-clamp-2">
          {product.description}
        </p>
        
        <div className="pt-4 border-t border-[#dde7dd]/50">
          <Link 
            href={productUrl} 
            aria-label={`View details for ${productName}`}
            className="at-link at-link-green min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
          >
            View Details &rarr;
          </Link>
        </div>
      </article>
    </FadeIn>
  )
}

