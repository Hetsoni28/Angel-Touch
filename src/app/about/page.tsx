import { FadeIn } from '@/components/atoms/FadeIn'
import Image from 'next/image'

export const metadata = {
  title: 'About Angel Touch | Our Philosophy & Founder',
  description: 'Discover the story behind Angel Touch by Heena Thaker. Pure, authentic Ayurvedic wellness, treatments, and masterclasses.',
}

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-[#faf8f2]">
      
      {/* Editorial Hero with Cinematic Background */}
      <header className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/ayurvedic_editorial_bg.jpg"
          alt="Ayurvedic Botanicals"
          fill
          className="object-cover object-center absolute inset-0 z-0"
          priority
        />
        <div className="absolute inset-0 bg-[#faf8f2]/80 backdrop-blur-sm z-10" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-20">
          <FadeIn>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5c8f60] mb-8 block">
              Our Story
            </span>
            <h1
              className="text-[3rem] md:text-[4.5rem] font-medium text-[#1e2228] leading-[1.05] mb-8"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
            >
              Rooted in ancient wisdom,<br />crafted for modern wellness.
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#5c5a58] leading-[1.8] max-w-2xl mx-auto">
              Angel Touch is a sanctuary of authentic Ayurvedic healing, dedicated to reviving the pure, unadulterated practices of natural wellness. We believe that true beauty and health begin with a profound connection to nature.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* The Founder Section (Pro Editorial Layout) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-5 relative">
            <FadeIn delay={0.2}>
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 overflow-hidden bg-[#e9f3e9] shadow-xl shadow-[#1e2228]/5">
                <Image
                  src="/images/heena_thaaker.jpg"
                  alt="Heena Thaker, Founder of Angel Touch"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </FadeIn>
            
            {/* Elegant botanical backdrop accent */}
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#e9f3e9] rounded-full mix-blend-multiply blur-3xl -z-10 opacity-70 pointer-events-none" />
          </div>

          <div className="lg:col-span-7">
            <FadeIn delay={0.3}>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-6 block">
                The Visionary
              </span>
              <h2
                className="text-[2.2rem] md:text-[3rem] font-medium text-[#1e2228] leading-[1.15] mb-10"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Meet Heena Thaker
              </h2>
              <div className="space-y-6 text-[16px] text-[#5c5a58] leading-[1.85]">
                <p>
                  With a deep-rooted passion for holistic healing and natural aesthetics, Heena Thaker founded Angel Touch to bridge the gap between traditional Ayurvedic science and contemporary wellness needs.
                </p>
                <p>
                  Having spent years studying the intricate formulations of herbal remedies, Heena envisioned a space where purity is never compromised. Every treatment protocol and product formulation is personally overseen by her, ensuring that the healing energy of the herbs is preserved from root to skin.
                </p>
                <p>
                  Today, beyond offering transformative treatments, Heena is dedicated to sharing her knowledge through the Angel Touch Masterclass platform—empowering others to learn the sacred art of Ayurvedic product making.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <Image
                  src="/logo.svg"
                  alt="Angel Touch Signature"
                  width={140}
                  height={40}
                  className="opacity-40"
                />
                <div className="w-16 h-[1px] bg-[#dde7dd]" />
                <span className="text-[11px] uppercase tracking-widest text-[#8a8d87] font-semibold">Founder</span>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* Philosophy Section (Elevated UI) */}
      <section className="bg-white py-24 md:py-32 border-t border-[#dde7dd]/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-24">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5c8f60] mb-6 block">
                Core Values
              </span>
              <h2
                className="text-[2.5rem] md:text-[3.2rem] font-medium text-[#1e2228] leading-[1.15] mb-6"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
              >
                Our Philosophy
              </h2>
              <p className="text-[16px] text-[#5c5a58] leading-[1.8]">
                We stand against the commercialization of wellness. Our approach is slow, deliberate, and entirely natural.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Pure Ingredients",
                description: "We source only the highest grade botanicals, cold-pressed oils, and raw clays. No synthetics, no parabens, no compromises."
              },
              {
                title: "Handcrafted Formulations",
                description: "Our products are formulated in small, fresh batches to ensure maximum potency and preserving the Prana (life force) of the herbs."
              },
              {
                title: "Holistic Education",
                description: "We believe in empowering you. Our masterclasses are designed to pass down the sacred art of formulating genuine Ayurvedic care."
              }
            ].map((pillar, index) => (
              <FadeIn key={pillar.title} delay={0.2 + index * 0.1}>
                <div className="flex flex-col text-center p-12 bg-[#faf8f2] border border-[#dde7dd]/50 hover:border-[#5c8f60]/30 transition-colors duration-500 h-full">
                  <span className="text-[12px] font-bold tracking-[0.25em] text-[#5c8f60] mb-6 block opacity-80">
                    0{index + 1}
                  </span>
                  <h3 className="text-[1.4rem] font-medium text-[#1e2228] mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                    {pillar.title}
                  </h3>
                  <div className="w-8 h-[1px] bg-[#dde7dd] mx-auto mb-5" />
                  <p className="text-[15px] text-[#5c5a58] leading-[1.8]">
                    {pillar.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </article>
  )
}
