'use client'

import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'

/** `placeholder`: used by loading.tsx — renders no <h1> so the page keeps exactly one. */
export function ShopHero({ placeholder = false }: { placeholder?: boolean } = {}) {
  const Heading = placeholder ? 'p' : 'h1'
  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] min-h-[380px] sm:min-h-[460px] md:min-h-[500px] flex items-center justify-center border-b border-[#dde7dd]/60 overflow-hidden">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/shop_hero.jpg" 
          alt="Ayurvedic beauty ingredients and products on warm ivory stone"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#faf8f2]/30 backdrop-blur-[0.5px]" />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-between pt-8 pb-12 sm:pt-10 sm:pb-16">
        
        <div className="w-full drop-shadow-sm">
          <DynamicBreadcrumbs className="mb-0" />
        </div>

        <div className="flex flex-col items-center text-center mt-auto mb-auto">

          <FadeIn delay={0.2}>
            <Heading className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-4">
              Handcrafted Ayurvedic Skincare &amp; Hair Care
            </Heading>
            <p 
              className="text-[2.2rem] xs:text-[2.6rem] sm:text-[3.4rem] md:text-[4rem] lg:text-[4.5rem] font-medium text-[#1e2228] leading-[1.1] mb-4 sm:mb-6 drop-shadow-md bg-white/20 sm:bg-transparent px-4 py-2 sm:px-0 sm:py-0 rounded-lg sm:rounded-none"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(255,255,255,0.7)' }}
            >
              Shop the collection.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-[16px] md:text-[18px] text-[#2c2a28] font-medium leading-relaxed max-w-xl mx-auto drop-shadow-sm" style={{ textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
              Explore thoughtfully selected beauty and Ayurvedic products. Crafted to integrate seamlessly into your daily care.
            </p>
          </FadeIn>
        </div>
        
      </div>
    </section>
  )
}

