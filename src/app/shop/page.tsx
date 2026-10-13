import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { ShopHero } from '@/components/organisms/ShopHero'
import { CategoryNavigation } from '@/components/molecules/CategoryNavigation'
import { ProductGrid } from '@/components/organisms/ProductGrid'
import { FeaturedProduct } from '@/components/organisms/FeaturedProduct'
import { BrandPhilosophy } from '@/components/organisms/BrandPhilosophy'
import { ShopCTA } from '@/components/organisms/ShopCTA'
import type { Metadata } from 'next'

export const instant = false

export const metadata: Metadata = {
  title: 'Shop Ayurvedic Beauty Products',
  description:
    'Browse Angel Touch\'s handcrafted Ayurvedic skincare, hair care, and wellness products. Formulated by Heena Thaker using traditional cold-infusion methods and wildcrafted botanicals.',
  alternates: { canonical: 'https://angeltouch.in/shop' },
  openGraph: {
    title: 'Shop Ayurvedic Beauty Products | Angel Touch',
    description:
      'Handcrafted Ayurvedic skincare, hair care, and wellness products. Saffron facial oils, herbal elixirs, cleansing clays, and more.',
    url: 'https://angeltouch.in/shop',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Angel Touch Ayurvedic Products' }],
  },
}


export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    client.fetch(ALL_PRODUCTS_QUERY).catch(() => []),
    client.fetch(ALL_CATEGORIES_QUERY).catch(() => [])
  ])

  const featuredProduct = products?.find((p: { featured?: boolean }) => p.featured)

  return (
    <div className="bg-[#faf8f2] min-h-screen">
      <ShopHero />
      <CategoryNavigation categories={categories} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[1.5rem] text-[#1e2228] font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
              Explore the collection.
            </h2>
            <p className="text-[14px] text-[#5c5a58] mt-2">
              Discover our botanical formulations.
            </p>
          </div>
          {products.length > 0 && (
            <p className="text-[12px] font-semibold tracking-widest text-[#8a8d87] uppercase">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="py-24 text-center bg-white border border-[#dde7dd]/60">
            <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              No products in this collection yet.
            </h3>
            <p className="text-[14px] text-[#5c5a58]">
              We are currently curating our collection. Please check back soon.
            </p>
          </div>
        )}
      </div>

      {featuredProduct && <FeaturedProduct product={featuredProduct} />}
      
      <BrandPhilosophy />
      <ShopCTA />
    </div>
  )
}
