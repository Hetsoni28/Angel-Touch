export function BrandIntroductionSection() {
  return (
    <section className="bg-white py-28 md:py-36 lg:py-44">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="max-w-[780px]">
          {/* Gold rule */}
          <span className="gold-rule mb-10 block" />

          {/* Statement */}
          <h2
            className="text-[1.9rem] md:text-[2.6rem] lg:text-[3rem] font-medium text-[#1e2228] leading-[1.25] mb-8"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.005em' }}
          >
            Where traditional knowledge<br className="hidden md:block" /> meets thoughtful beauty.
          </h2>

          {/* Body */}
          <p className="text-[17px] text-[#5c5a58] leading-[1.8] max-w-[600px]">
            At Angel Touch, we believe that true beauty is cultivated through intention — drawing from centuries of Ayurvedic wisdom, selecting only what nature provides, and sharing that knowledge openly. Everything we offer is guided by that principle.
          </p>
        </div>
      </div>
    </section>
  )
}
