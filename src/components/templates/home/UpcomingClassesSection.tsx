import Link from 'next/link'

// TODO: Replace with Sanity CMS query
const placeholderClasses = [
  {
    id: '1',
    title: 'Traditional Kumkumadi Formulation',
    date: '15 November 2026',
    time: '11:00 AM IST',
    capacity: 20,
    enrolled: 18,
    price: '₹1,499',
    slug: 'kumkumadi-formulation',
    image: 'https://images.unsplash.com/photo-1611079830811-865ff4428d17?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Botanical Hair Elixirs Workshop',
    date: '02 December 2026',
    time: '2:00 PM IST',
    capacity: 15,
    enrolled: 8,
    price: '₹1,999',
    slug: 'botanical-hair-elixirs',
    image: '/images/ayurvedic_herbal_body_scrub_1791405717151.jpg',
  },
]

export function UpcomingClassesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-14">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#5c8f60] uppercase mb-3">Live Masterclasses</p>
          <h2
            className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Learn the craft behind the ritual.
          </h2>
          <p className="text-[15px] text-[#5c5a58] leading-relaxed">
            Focused, intimate live sessions teaching the authentic methods of formulating Ayurvedic beauty products from scratch.
          </p>
        </div>

        {/* Class list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl">
          {placeholderClasses.map((cls) => {
            const spotsLeft = cls.capacity - cls.enrolled
            const isFull = spotsLeft <= 0
            return (
              <article key={cls.id} className="group flex flex-col">
                {/* Fixed height image */}
                <div className="overflow-hidden bg-[#faf8f2] img-zoom mb-5" style={{ height: '220px' }}>
                  <img src={cls.image} alt={cls.title} className="w-full h-full object-cover" />
                </div>

                {/* Meta row */}
                <div className="flex items-start justify-between mb-3 pb-3 border-b border-[#dde7dd]">
                  <div>
                    <p className="text-[11px] tracking-[0.16em] text-[#5c5a58] uppercase">{cls.date}</p>
                    <p className="text-[11px] tracking-[0.14em] text-[#8a8d87] uppercase mt-0.5">{cls.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[17px] font-medium text-[#1e2228]">{cls.price}</p>
                    <p className={`text-[10px] tracking-[0.14em] uppercase mt-0.5 ${isFull ? 'text-red-500' : 'text-[#5c8f60]'}`}>
                      {isFull ? 'Sold out' : `${spotsLeft} / ${cls.capacity} seats`}
                    </p>
                  </div>
                </div>

                <h3
                  className="text-[1.1rem] font-medium text-[#1e2228] mb-3 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {cls.title}
                </h3>

                {!isFull ? (
                  <Link href={`/classes/${cls.slug}`} className="at-link at-link-green">
                    View Class →
                  </Link>
                ) : (
                  <span className="text-[11px] tracking-[0.18em] uppercase text-[#8a8d87]">Join waitlist →</span>
                )}
              </article>
            )
          })}
        </div>

        <div className="mt-10">
          <Link href="/classes" className="at-link">See full schedule →</Link>
        </div>

      </div>
    </section>
  )
}
