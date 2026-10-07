import Link from 'next/link'

// TODO: Replace with Sanity CMS query
const placeholderTreatments = [
  {
    id: '1',
    name: 'Abhyanga Herbal Massage',
    duration: '60 min',
    description:
      'A warm herbal oil full-body massage following Ayurvedic technique, designed to nourish the skin, ease muscle tension, and support the body\'s natural cleansing process.',
    slug: 'abhyanga',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    name: 'Shirodhara Oil Therapy',
    duration: '45 min',
    description:
      'A continuous, rhythmic flow of warm medicated oil over the forehead — a deeply calming Ayurvedic experience traditionally used to support mental clarity and reduce accumulated stress.',
    slug: 'shirodhara',
    image: 'https://images.unsplash.com/photo-1559567890-4f2c8f29ca0a?w=900&auto=format&fit=crop&q=80',
  },
]

export function FeaturedTreatmentsSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14 md:mb-16">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#5c8f60] uppercase mb-3">Treatments</p>
            <h2
              className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Personal care, thoughtfully approached.
            </h2>
          </div>
          <div className="flex flex-col lg:justify-end">
            <p className="text-[15px] text-[#5c5a58] leading-relaxed mb-4">
              Each treatment at Angel Touch is a considered, personalised experience drawing on authentic Ayurvedic practice.
            </p>
            <Link href="/treatments" className="at-link self-start">View all treatments →</Link>
          </div>
        </div>

        {/* Treatment items — editorial service menu */}
        <div className="flex flex-col border-t border-[#dde7dd]">
          {placeholderTreatments.map((t) => (
            <div key={t.id} className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 border-b border-[#dde7dd] py-10 md:py-12 items-start">
              {/* Image — fixed height */}
              <div className="md:col-span-3 overflow-hidden bg-[#e9f3e9] img-zoom" style={{ height: '180px' }}>
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>

              {/* Text */}
              <div className="md:col-span-8 md:col-start-5 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-2">
                  <h3
                    className="text-[1.3rem] md:text-[1.5rem] font-medium text-[#1e2228] leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t.name}
                  </h3>
                  <span className="shrink-0 text-[10px] tracking-[0.14em] text-[#8a8d87] uppercase border border-[#dde7dd] px-2.5 py-1">
                    {t.duration}
                  </span>
                </div>
                <p className="text-[14px] text-[#5c5a58] leading-relaxed mb-5 max-w-xl">
                  {t.description}
                </p>
                <Link href={`/treatments/${t.slug}#enquire`} className="at-link at-link-green self-start">
                  Enquire / Book →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
