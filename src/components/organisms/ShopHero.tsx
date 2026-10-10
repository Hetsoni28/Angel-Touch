'use client'

import { FadeIn } from '@/components/atoms/FadeIn'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'

export function ShopHero() {
  return (
    <section className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center border-b border-[#dde7dd]/60 overflow-hidden">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/shop_hero.jpg" 
          alt="Ayurvedic beauty ingredients and products on warm ivory stone"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-between pt-10 pb-16">
        
        <div className="w-full drop-shadow-sm">
          <DynamicBreadcrumbs className="mb-0" />
        </div>

        <div className="flex flex-col items-center text-center mt-auto mb-auto">

          <FadeIn delay={0.2}>
            <h1 
              className="text-[3rem] md:text-[4rem] lg:text-[4.5rem] font-medium text-[#1e2228] leading-[1.1] mb-6 drop-shadow-md bg-white/10 backdrop-blur-[1px] px-4 py-2 rounded-xl sm:bg-transparent sm:backdrop-blur-none sm:px-0 sm:py-0"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(255,255,255,0.7)' }}
            >
              Shop the collection.
            </h1>
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

