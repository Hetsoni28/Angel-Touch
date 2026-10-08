import { FadeIn } from '@/components/atoms/FadeIn'
import Image from 'next/image'

export const metadata = {
  title: 'About Angel Touch | Our Philosophy & Founder',
  description: 'Discover the story behind Angel Touch by Heena Thaker. Pure, authentic Ayurvedic wellness, treatments, and masterclasses.',
}

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-[#faf8f2]">
      
      {/* Editorial Hero */}
      <header className="relative w-full pt-40 pb-20 md:pt-48 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto">
        <FadeIn>
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#5c8f60] mb-6 block">
              Our Story
            </span>
            <h1
              className="text-[2.5rem] md:text-[4rem] font-medium text-[#1e2228] leading-[1.1] mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Rooted in ancient wisdom, crafted for modern wellness.
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#5c5a58] leading-[1.8]">
              Angel Touch is a sanctuary of authentic Ayurvedic healing, dedicated to reviving the pure, unadulterated practices of natural wellness. We believe that true beauty and health begin with a profound connection to nature.
            </p>
          </div>
        </FadeIn>
      </header>

      {/* The Founder Section (Split Layout) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <FadeIn delay={0.2}>
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0">
              <Image
                src="/images/heena_thaaker.jpg"
                alt="Heena Thaker, Founder of Angel Touch"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e9f3e9] -z-10" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-6 block">
                The Founder
              </span>
              <h2
                className="text-[2rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.2] mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Meet Heena Thaker
              </h2>
              <div className="prose prose-lg prose-p:text-[#5c5a58] prose-p:leading-[1.8] max-w-none">
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
              <div className="mt-10">
                <Image
                  src="/logo.svg"
                  alt="Angel Touch Signature"
                  width={140}
                  height={40}
                  className="opacity-40"
                />
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white py-24 md:py-32 border-t border-[#dde7dd]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2
                className="text-[2rem] md:text-[2.8rem] font-medium text-[#1e2228] leading-[1.15] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Our Philosophy
              </h2>
              <p className="text-[15px] md:text-[16px] text-[#5c5a58] leading-[1.8]">
                We stand against the commercialization of wellness. Our approach is slow, deliberate, and entirely natural.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
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
                <div className="text-center p-8 bg-[#faf8f2] h-full">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#5c8f60] mb-4 block">0{index + 1}</span>
                  <h3 className="text-[1.2rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] text-[#5c5a58] leading-[1.7]">
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
