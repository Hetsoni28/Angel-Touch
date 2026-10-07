'use client'

import { FadeIn } from '@/components/atoms/FadeIn'

export function ShopHero() {
  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center border-b border-[#dde7dd]/60 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#faf8f2]/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f2]/50 via-transparent to-[#faf8f2] z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/shop_hero.jpg" 
          alt="Ayurvedic beauty ingredients and products on warm ivory stone"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 text-center flex flex-col items-center pt-20 pb-16">
        <FadeIn delay={0.1}>
          <p className="text-[11px] tracking-[0.25em] font-semibold text-[#5c8f60] uppercase mb-5 md:mb-6 drop-shadow-sm">
            Angel Touch · Shop
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h1 
            className="text-[3rem] md:text-[4.2rem] font-medium text-[#1e2228] leading-[1.1] mb-6 max-w-4xl drop-shadow-sm"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
          >
            Beauty, rooted in nature.
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <p className="text-[16px] md:text-[18px] text-[#5c5a58] leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Explore thoughtfully selected beauty and Ayurvedic products from Angel Touch. Crafted to integrate seamlessly into your daily care.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

