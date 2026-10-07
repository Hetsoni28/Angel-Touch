export function BrandIntroductionSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden border-b border-[#dde7dd]/70">
      
      {/* ── BESPOKE AYURVEDIC TRAVERTINE & BOTANICAL SHADOW BACKGROUND ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img
          src="/images/ayurvedic_editorial_bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Soft ivory veil to keep typography crystal clear and tranquil */}
        <div className="absolute inset-0 bg-[#faf8f2]/88 backdrop-blur-[2px]" />
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Fine vertical gold divider */}
        <div className="w-px h-10 bg-[#edc179] mx-auto mb-8 opacity-80" />

        {/* Eyebrow */}
        <p className="text-[10px] font-semibold tracking-[0.35em] text-[#5c8f60] uppercase mb-6">
          The Philosophy
        </p>

        {/* Statement */}
        <h2
          className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] font-medium text-[#1e2228] leading-[1.2] mb-8"
          style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
        >
          Where traditional knowledge<br className="hidden sm:block" /> meets thoughtful beauty.
        </h2>

        {/* Body */}
        <p className="text-[16px] sm:text-[17px] text-[#5c5a58] leading-[1.85] max-w-2xl mx-auto mb-14">
          At Angel Touch, we believe that true beauty is cultivated through intention — drawing from centuries of Ayurvedic wisdom, selecting only what nature provides, and sharing that knowledge openly. Everything we offer is guided by that principle.
        </p>

        {/* 3 Editorial Hallmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#dde7dd]/80 max-w-3xl mx-auto text-left sm:text-center">
          <div className="bg-white/60 sm:bg-transparent p-4 sm:p-0 rounded border sm:border-0 border-[#dde7dd]/60">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#1e2228] uppercase mb-1">
              Handcrafted Care
            </p>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed">
              Formulated in small, mindful batches
            </p>
          </div>
          <div className="bg-white/60 sm:bg-transparent p-4 sm:p-0 rounded border sm:border-0 border-[#dde7dd]/60">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#1e2228] uppercase mb-1">
              Pure Botanicals
            </p>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed">
              Ethically sourced Ayurvedic herbs
            </p>
          </div>
          <div className="bg-white/60 sm:bg-transparent p-4 sm:p-0 rounded border sm:border-0 border-[#dde7dd]/60">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#1e2228] uppercase mb-1">
              Shared Knowledge
            </p>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed">
              Empowering you to craft at home
            </p>
          </div>
        </div>

      </div>

    </section>
  )
}
