'use client'

import { FadeIn } from '@/components/atoms/FadeIn'

export function ShopHero() {
  return (
    <section className="bg-[#faf8f2] border-b border-[#dde7dd]/60 pt-6 pb-12 md:pt-10 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div className="flex flex-col justify-center max-w-xl order-2 lg:order-1">
            <FadeIn delay={0.1}>
              <p className="text-[10px] tracking-[0.2em] font-semibold text-[#5c8f60] uppercase mb-4 md:mb-6">
                Angel Touch · Shop
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 
                className="text-[2.5rem] md:text-[3.2rem] lg:text-[3.6rem] font-medium text-[#1e2228] leading-[1.1] mb-5 md:mb-6"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
              >
                Beauty, rooted in nature.
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-relaxed max-w-md">
                Explore thoughtfully selected beauty and Ayurvedic products from Angel Touch. Crafted to integrate seamlessly into your daily care.
              </p>
            </FadeIn>
          </div>

          <div className="order-1 lg:order-2">
            <FadeIn direction="none" delay={0.1} className="w-full">
              <div className="relative w-full aspect-16/9 lg:aspect-[21/10] bg-[#e9f3e9] overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/shop_hero.jpg" 
                  alt="Ayurvedic beauty ingredients and products on warm ivory stone"
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

