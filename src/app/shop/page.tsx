import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { ShopHero } from '@/components/templates/shop/ShopHero'
import { CategoryNavigation } from '@/components/molecules/CategoryNavigation'
import { ProductGrid } from '@/components/organisms/ProductGrid'
import { FeaturedProduct } from '@/components/templates/shop/FeaturedProduct'
import { BrandPhilosophy } from '@/components/templates/shop/BrandPhilosophy'
import { ShopCTA } from '@/components/templates/shop/ShopCTA'

export const instant = false

// Fallback data if Sanity is empty (to showcase the design until client populates CMS)
const fallbackProducts = [
  {
    _id: 'fallback-1',
    name: 'Kesar Radiance Oil',
    slug: 'kesar-radiance-oil',
    category: 'Skin Care',
    imageUrl: '/images/skincare_oil.jpg',
    description: 'A lightweight facial oil blending pure saffron and sandalwood to restore natural luminosity.',
    featured: true
  },
  {
    _id: 'fallback-2',
    name: 'Ashwagandha Hair Elixir',
    slug: 'ashwagandha-hair-elixir',
    category: 'Hair Care',
    imageUrl: '/images/hair_elixir.jpg',
    description: 'A deeply nourishing botanical blend to strengthen roots, condition strands, and soothe the scalp.',
    featured: false
  },
  {
    _id: 'fallback-3',
    name: 'Neem & Tulsi Cleansing Clay',
    slug: 'neem-tulsi-cleansing-clay',
    category: 'Body Care',
    imageUrl: '/images/green_clay.jpg',
    description: 'A purifying green clay formulated with wildcrafted herbs for gentle, mindful daily use.',
    featured: false
  },
  {
    _id: 'fallback-4',
    name: 'Lotus Botanical Face Mask',
    slug: 'lotus-botanical-face-mask',
    category: 'Skin Care',
    imageUrl: '/images/face_mask.jpg',
    description: 'An elegant frosted glass jar filled with a revitalizing lotus and rose petal botanical paste.',
    featured: false
  }
]

const fallbackCategories = [
  { _id: 'cat-1', name: 'Skin Care', slug: 'skin-care' },
  { _id: 'cat-2', name: 'Hair Care', slug: 'hair-care' },
  { _id: 'cat-3', name: 'Body Care', slug: 'body-care' }
]

export default async function ShopPage() {
  let [products, categories] = await Promise.all([
    client.fetch(ALL_PRODUCTS_QUERY).catch(() => []),
    client.fetch(ALL_CATEGORIES_QUERY).catch(() => [])
  ])

  // TODO: Remove fallbacks once Sanity CMS is populated by client
  if (!products || products.length === 0) {
    products = fallbackProducts
    categories = fallbackCategories
  }

  const featuredProduct = products.find((p: { featured?: boolean }) => p.featured)

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
