import Link from 'next/link'

export function RecordedLearningSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        
        {/* ── ALIGNED TOP: items-start lines up image and text horizontally ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Image */}
          <div className="overflow-hidden bg-[#e9f3e9] border border-[#dde7dd] shadow-sm img-zoom aspect-[4/3] max-h-[340px]">
            <img
              src="/images/ayurvedic_editorial_desk_1791405721218.jpg"
              alt="Ayurvedic formulation notes and botanical ingredients"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col pt-1">
            <h2
              className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2] mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Keep learning,<br />beyond the classroom.
            </h2>
            <span className="gold-rule mb-7" />
            <div className="flex flex-col gap-4 mb-8">
              {[
                'Purchase a live class and receive permanent access to its recording.',
                'Eligible recordings can also be purchased individually, anytime.',
                'An active Membership provides access to the full eligible recorded library.',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-px h-5 bg-[#edc179] shrink-0 mt-1" />
                  <p className="text-[14px] text-[#5c5a58] leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/classes/recorded" className="at-link">Explore Recorded Classes →</Link>
              <Link href="/membership" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors">
                View Membership
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
