import Image from 'next/image'

export function MembershipHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/membership-hero-bg.png"
          alt="Ayurvedic ingredients background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-10 py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto text-center">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#1e2228] mb-6">
          The Ayurvedic Formulator Vault
        </h1>
        <p className="text-[#3c3a38] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4 font-medium">
          Membership provides exclusive, unlimited access to our <strong>entire library of past recorded Ayurvedic product-making classes.</strong>
        </p>
        <p className="text-[#6a6d67] text-[13px] uppercase tracking-widest font-bold max-w-2xl mx-auto mt-6">
          * Note: Membership does NOT include access to upcoming live interactive masterclasses.
        </p>
      </div>
    </section>
  )
}
