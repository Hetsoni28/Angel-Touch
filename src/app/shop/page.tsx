import { client } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { ShopHero } from '@/components/organisms/ShopHero'
import { CategoryNavigation } from '@/components/molecules/CategoryNavigation'
import { ProductGrid } from '@/components/organisms/ProductGrid'
import { FeaturedProduct } from '@/components/organisms/FeaturedProduct'
import { BrandPhilosophy } from '@/components/organisms/BrandPhilosophy'
import { ShopCTA } from '@/components/organisms/ShopCTA'
import { ComingSoonBanner } from '@/components/organisms/ComingSoonBanner'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/atoms/JsonLd'
import { breadcrumbJsonLd, absoluteUrl } from '@/lib/seo'

export const instant = false

export const metadata: Metadata = pageMetadata({
  title: 'Ayurvedic Skincare & Hair Care Products',
  description:
    'Handcrafted Ayurvedic skincare, hair oils and wellness products by Heena Thaker, made with saffron, herbs and botanicals. Enquire on WhatsApp to order.',
  path: '/shop',
  image: {
    url: '/images/shop_hero.jpg',
    alt: 'Handcrafted Angel Touch Ayurvedic oils, balms and herbal skincare products',
  },
})


export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    client.fetch(ALL_PRODUCTS_QUERY).catch(() => []),
    client.fetch(ALL_CATEGORIES_QUERY).catch(() => [])
  ])

  // Until the first product is published in Sanity, the shop is a full-page "opening soon" banner.
  // It switches to the catalogue automatically once products exist.
  if (!products || products.length === 0) {
    return (
      <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Shop', path: '/shop' }])} />
      <ComingSoonBanner
        title="The shop is almost ready."
        description="Heena Thaker's handmade oils, elixirs and herbal clays are being readied for online browsing. Until the shop opens, tell us what you need on WhatsApp and we'll arrange it for you."
        imageSrc="/images/featured_lifestyle.jpg"
        imageAlt="Handmade Ayurvedic oils and balms with saffron, turmeric and fresh leaves"
        primary={{
          label: 'Order on WhatsApp',
          href: generateWhatsAppLink({ type: 'GENERAL', message: 'I would like to order an Angel Touch product.' }),
          ariaLabel: 'Order a product on WhatsApp (opens in a new window)',
        }}
        secondary={{ label: 'Explore treatments', href: '/treatments' }}
        note="Every product is made in small batches. Ask us about ingredients, sizes and availability before you order."
      />
      </>
    )
  }

  const featuredProduct = products?.find((p: { featured?: boolean }) => p.featured)

  return (
    <div className="bg-[#faf8f2] min-h-screen">
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Shop', path: '/shop' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Angel Touch Ayurvedic products',
            itemListElement: (products as { name: string; slug: string }[]).map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(`/shop/${p.slug}`),
              name: p.name,
            })),
          },
        ]}
      />
      <ShopHero />
      <CategoryNavigation categories={categories} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[1.5rem] text-[#1e2228] font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
              Explore the <span className="accent-italic">collection</span>.
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
