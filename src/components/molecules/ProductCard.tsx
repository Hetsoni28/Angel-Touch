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
  return (
    <FadeIn delay={0.1 * (index % 4 + 1)} className="flex flex-col h-full">
      <article className="group flex flex-col h-full">
        <Link href={`/shop/${typeof product.slug === 'object' ? product.slug?.current : product.slug}`} className="block overflow-hidden bg-[#faf8f2] border border-[#dde7dd]/60 img-zoom mb-5 aspect-[3/4] relative">
          <Image
            src={product.imageUrl || '/images/skincare_oil.jpg'}
            alt={product.name || 'Ayurvedic product'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
        
        <p className="text-[10px] tracking-[0.22em] text-[#8a8d87] uppercase mb-1.5">
          {product.category || 'Product'}
        </p>
        
        <Link href={`/shop/${typeof product.slug === 'object' ? product.slug?.current : product.slug}`}>
          <h3
            className="text-[1.15rem] font-medium text-[#1e2228] mb-2 leading-snug hover:text-[#2e7a3a] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-5 grow line-clamp-2">
          {product.description}
        </p>
        
        <div className="pt-4 border-t border-[#dde7dd]/50">
          <Link href={`/shop/${typeof product.slug === 'object' ? product.slug?.current : product.slug}`} className="at-link at-link-green">
            View Details &rarr;
          </Link>
        </div>
      </article>
    </FadeIn>
  )
}

