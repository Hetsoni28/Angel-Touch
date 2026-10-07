import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { FadeIn } from '@/components/atoms/FadeIn'

const PRODUCT_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "category": category->name,
    "images": images[].asset->url,
    "description": description[0].children[0].text,
    "ingredients": ingredients[0].children[0].text,
    "usage": usageDetails[0].children[0].text
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

  // TODO: Remove fallback once CMS is populated
  if (!product) {
    product = (fallbackProducts as any)[params.slug]
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

  return (
    <div className="bg-[#faf8f2] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <Link href="/shop" className="at-link mb-10 md:mb-16">
          &larr; Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="order-1">
            <FadeIn>
              <div className="relative w-full aspect-[4/5] bg-[#e9f3e9] overflow-hidden rounded-sm border border-[#dde7dd]/50">
                <img 
                  src={mainImage} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </FadeIn>
          </div>

          <div className="order-2 flex flex-col pt-4 lg:pt-10">
            <FadeIn delay={0.1}>
              <p className="text-[11px] tracking-[0.2em] font-semibold text-[#5c8f60] uppercase mb-4">
                {product.category || 'Product'}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 
                className="text-[2.2rem] md:text-[2.8rem] font-medium text-[#1e2228] leading-[1.1] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {product.name}
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8] mb-10">
                {product.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="border-t border-[#dde7dd] pt-6 mb-10">
                <Link
                  href="/contact"
                  id="enquire"
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[12px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
                >
                  Enquire About Product
                </Link>
              </div>
            </FadeIn>

            {(product.ingredients || product.usage) && (
              <FadeIn delay={0.5}>
                <div className="flex flex-col gap-8 pt-8 border-t border-[#dde7dd]/50">
                  {product.ingredients && (
                    <div>
                      <h3 className="text-[12px] font-semibold text-[#1e2228] tracking-[0.14em] uppercase mb-3">
                        Key Ingredients
                      </h3>
                      <p className="text-[14px] text-[#5c5a58] leading-relaxed">
                        {product.ingredients}
                      </p>
                    </div>
                  )}
                  {product.usage && (
                    <div>
                      <h3 className="text-[12px] font-semibold text-[#1e2228] tracking-[0.14em] uppercase mb-3">
                        Usage Details
                      </h3>
                      <p className="text-[14px] text-[#5c5a58] leading-relaxed">
                        {product.usage}
                      </p>
                    </div>
                  )}
                </div>
              </FadeIn>
            )}
            
          </div>
          
        </div>
      </div>
    </div>
  )
}
