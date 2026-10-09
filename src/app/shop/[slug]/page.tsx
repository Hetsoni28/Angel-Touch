import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { FadeIn } from '@/components/atoms/FadeIn'
import { ProductCard } from '@/components/molecules/ProductCard'
import { generateWhatsAppLink } from '@/utils/whatsapp'

import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'

const PRODUCT_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    "category": category->name,
    "images": images[].asset->url,
    "description": description[0].children[0].text,
    "ingredients": ingredients[0].children[0].text,
    "usage": usageDetails[0].children[0].text
  }
`

const RELATED_QUERY = groq`
  *[_type == "product" && slug.current != $slug][0...4] {
    _id,
    name,
    "slug": slug.current,
    "category": category->name,
    "imageUrl": images[0].asset->url,
    "description": description[0].children[0].text
  }
`

export const instant = false

// Fallback data if Sanity is empty
const fallbackProducts = {
  'kesar-radiance-oil': {
    name: 'Kesar Radiance Oil',
    category: 'Skin Care',
    images: ['/images/skincare_oil.jpg'],
    description: 'A lightweight facial oil blending pure saffron and sandalwood to restore natural luminosity. Crafted through traditional Ayurvedic cold-infusion methods.',
    ingredients: 'Pure Kashmiri Saffron, Sandalwood Oil, Cold-pressed Almond Oil, Jojoba Oil, Vitamin E, Rose Extract.',
    usage: 'Gently massage 2-3 drops onto cleansed and toned skin morning and evening. Allow to absorb fully before applying makeup.'
  },
  'ashwagandha-hair-elixir': {
    name: 'Ashwagandha Hair Elixir',
    category: 'Hair Care',
    images: ['/images/hair_elixir.jpg'],
    description: 'A deeply nourishing botanical blend to strengthen roots, condition strands, and soothe the scalp.',
    ingredients: 'Ashwagandha Root Extract, Amla, Bhringraj, Virgin Coconut Oil, Sesame Seed Oil.',
    usage: 'Warm oil slightly before use. Massage deeply into the scalp and along hair lengths. Leave for at least 2 hours or overnight before washing.'
  },
  'neem-tulsi-cleansing-clay': {
    name: 'Neem & Tulsi Cleansing Clay',
    category: 'Body Care',
    images: ['/images/green_clay.jpg'],
    description: 'A purifying green clay formulated with wildcrafted herbs for gentle, mindful daily use.',
    ingredients: 'Neem Powder, Tulsi Powder, Multani Mitti (Fuller\'s Earth), French Green Clay, Licorice Root.',
    usage: 'Mix 1 tablespoon of clay with rose water or yogurt to form a paste. Apply to face and neck. Leave for 10-15 minutes, then rinse gently.'
  },
  'lotus-botanical-face-mask': {
    name: 'Lotus Botanical Face Mask',
    category: 'Skin Care',
    images: ['/images/face_mask.jpg'],
    description: 'An elegant frosted glass jar filled with a revitalizing lotus and rose petal botanical paste.',
    ingredients: 'Pink Lotus Petals, Rose Powder, Sandalwood, Raw Honey, Saffron strands.',
    usage: 'Apply a thin layer to clean skin. Leave on for 20 minutes before gently rinsing with lukewarm water.'
  }
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let product = await client.fetch(PRODUCT_QUERY, { slug: params.slug }).catch(() => null)
  let relatedProducts = await client.fetch(RELATED_QUERY, { slug: params.slug }).catch(() => [])

  // TODO: Remove fallback once CMS is populated
  if (!product) {
    product = (fallbackProducts as Record<string, { name: string; category: string; images: string[]; description: string; ingredients: string; usage: string }>)[params.slug]
  }
  
  if (relatedProducts.length === 0) {
    relatedProducts = Object.values(fallbackProducts).filter(p => p.name !== product?.name).map(p => ({
      _id: p.name,
      name: p.name,
      slug: p.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'),
      category: p.category,
      imageUrl: p.images[0],
      description: p.description
    }))
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-[#faf8f2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Product not found
          </h2>
          <Link href="/shop" className="at-link">Return to Shop &rarr;</Link>
        </div>
      </div>
    )
  }

  const mainImage = product.images?.[0] || '/images/featured_lifestyle.jpg'
  const galleryImages = product.images?.slice(1) || []

  return (
    <div className="bg-[#faf8f2] min-h-screen pt-8 pb-20 md:pt-12 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* 2. BREADCRUMBS */}
        <DynamicBreadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            ...(product.category ? [{ label: product.category, href: `/shop?category=${product.category.toLowerCase()}` }] : []),
            { label: product.name }
          ]} 
        />
        
        {/* 3. PRODUCT HERO */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start mb-24 md:mb-32">
          
          {/* LEFT: 55% Width Image Gallery */}
          <div className="w-full lg:w-[55%]">
            <FadeIn>
              <div className="relative w-full aspect-4/5 bg-[#e9f3e9] overflow-hidden border border-[#dde7dd]/50 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={mainImage} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {galleryImages.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mainImage} alt="thumbnail" className="w-20 h-24 shrink-0 bg-[#e9f3e9] border border-[#2e7a3a] object-cover cursor-pointer opacity-100" />
                  {galleryImages.map((img: string, i: number) => (
                    <div key={i} className="relative w-20 h-24 shrink-0 bg-[#e9f3e9] border border-[#dde7dd]/50 cursor-pointer hover:opacity-80 transition-opacity">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={img} alt={`${product.name} detail`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </FadeIn>
          </div>

          {/* RIGHT: 45% Width Product Information */}
          <div className="w-full lg:w-[45%] flex flex-col pt-2 lg:pt-8 max-w-125 lg:max-w-none lg:sticky lg:top-32">
            
            <FadeIn delay={0.1}>
              <p className="text-[10px] tracking-[0.25em] font-semibold text-[#5c8f60] uppercase mb-4">
                {product.category || 'Product'}
              </p>
              
              <h1 
                className="text-[2.2rem] md:text-[2.8rem] font-medium text-[#1e2228] leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {product.name}
              </h1>
              
              <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] mb-8">
                {product.description}
              </p>
              
              <div className="w-full h-px bg-[#dde7dd]/60 mb-10"></div>
            </FadeIn>

            <FadeIn delay={0.2}>
              {/* PRIMARY CTA */}
              <a
                href={generateWhatsAppLink({
                  type: 'PRODUCT',
                  itemName: product.name,
                  itemUrl: `https://angeltouch.com/shop/${slug}`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-10 py-5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[12px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 shadow-sm"
              >
                Enquire About Product
              </a>

              {/* TRUST / INFORMATION AREA */}
              <div className="mt-8 pt-6 border-t border-[#dde7dd]/40 text-center lg:text-left">
                <p className="text-[13px] text-[#5c5a58] mb-2 font-medium">
                  Have a question about this product?
                </p>
                <p className="text-[13px] text-[#8a8d87] mb-3">
                  Ask us before you decide.
                </p>
                <Link href="/contact" className="text-[12px] tracking-widest text-[#1e2228] uppercase font-semibold hover:text-[#2e7a3a] border-b border-[#1e2228] hover:border-[#2e7a3a] pb-0.5 transition-colors">
                  Make an Inquiry
                </Link>
              </div>
            </FadeIn>
          </div>
          
        </div>

        {/* 4. PRODUCT STORY */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 md:mb-32">
            <div className="order-2 md:order-1">
              <h2 className="text-[2rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.15] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Thoughtfully chosen for your ritual.
              </h2>
              <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8]">
                {product.description} We believe that a thoughtful product deserves a thoughtful presentation. Rooted in traditional Ayurvedic practices, this creation is designed to elevate your daily self-care into a restorative experience.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative w-full aspect-4/3 bg-[#e9f3e9] overflow-hidden border border-[#dde7dd]/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={mainImage} 
                  alt="Product Lifestyle"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 5. INGREDIENTS / DETAILS */}
        {product.ingredients && (
          <FadeIn>
            <div className="mb-20 md:mb-24">
              <div className="border-t border-[#dde7dd] pt-12 md:pt-16 max-w-3xl">
                <h3 className="text-[1.5rem] md:text-[1.8rem] font-medium text-[#1e2228] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  What&apos;s inside
                </h3>
                <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8]">
                  {product.ingredients}
                </p>
              </div>
            </div>
          </FadeIn>
        )}

        {/* 6. HOW TO USE */}
        {product.usage && (
          <FadeIn>
            <div className="mb-24 md:mb-32">
              <div className="border-t border-[#dde7dd] pt-12 md:pt-16 max-w-3xl">
                <h3 className="text-[1.5rem] md:text-[1.8rem] font-medium text-[#1e2228] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  How to use
                </h3>
                <div className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8]">
                  {product.usage}
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* 8. RELATED PRODUCTS */}
        {relatedProducts && relatedProducts.length > 0 && (
          <FadeIn>
            <div className="mb-24 md:mb-32 border-t border-[#dde7dd] pt-16 md:pt-24">
              <h2 className="text-[2rem] font-medium text-[#1e2228] mb-12 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                You may also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p: { _id?: string, name?: string, category?: string, imageUrl?: string, description?: string, slug?: string }, idx: number) => (
                  <ProductCard key={p._id || idx} product={p} index={idx} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* 9. FINAL CTA */}
        <FadeIn>
          <div className="bg-[#e9f3e9]/30 border border-[#dde7dd]/50 px-8 py-16 md:py-24 text-center">
            <h2 className="text-[2rem] md:text-[2.5rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Looking for something specific?
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#5c5a58] max-w-2xl mx-auto mb-10">
              Tell us what you&apos;re looking for and we&apos;ll help you find the right Angel Touch product.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[12px] font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                Make an Inquiry
              </Link>
              <Link
                href="/shop"
                className="text-[12px] tracking-[0.15em] font-semibold text-[#1e2228] uppercase hover:text-[#2e7a3a] border-b border-[#1e2228] hover:border-[#2e7a3a] pb-1 transition-colors"
              >
                Explore All Products
              </Link>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  )
}
