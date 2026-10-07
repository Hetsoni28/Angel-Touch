import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

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
    description: 'Learn the sacred, multi-stage process of infusing pure Kashmiri saffron, sandalwood, and botanical extracts into golden Ayurvedic face oil.',
    image: '/images/ayurvedic_masterclass.jpg',
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
    description: 'Master the art of cold-infusing amla, bhringraj, and hibiscus into intensive hair and scalp conditioning oils for everyday hair wellness.',
    image: '/images/ayurvedic_cosmetics_workspace_1791405719662.jpg',
  },
]

export function UpcomingClassesSection() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <FadeIn delay={0.1}>
            <div className="max-w-xl">
              <h2
                className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Learn the craft behind the ritual.
              </h2>
              <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed">
                Focused, intimate live sessions teaching the authentic methods of formulating Ayurvedic beauty products from scratch — led by Heena Thaker.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            <Link href="/classes" className="at-link shrink-0">
              See full schedule →
            </Link>
          </FadeIn>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {placeholderClasses.map((cls, index) => {
            const spotsLeft = cls.capacity - cls.enrolled
            const isFull = spotsLeft <= 0
            return (
              <FadeIn key={cls.id} delay={0.1 * (index + 1)} className="flex flex-col h-full">
                <article className="group flex flex-col h-full bg-[#faf8f2] border border-[#dde7dd]/80 p-6 sm:p-8">
                  {}
                  <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-16/10">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {}
                  <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#dde7dd]/80">
                    <div>
                      <p className="text-[11px] tracking-[0.16em] text-[#1e2228] font-medium uppercase">{cls.date}</p>
                      <p className="text-[11px] tracking-[0.14em] text-[#8a8d87] uppercase mt-0.5">{cls.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[1.2rem] font-medium text-[#1e2228]">{cls.price}</p>
                      <p className={`text-[10px] tracking-[0.14em] font-semibold uppercase mt-0.5 ${isFull ? 'text-red-500' : 'text-[#5c8f60]'}`}>
                        {isFull ? 'Sold out' : `${spotsLeft} of ${cls.capacity} seats left`}
                      </p>
                    </div>
                  </div>

                  {}
                  <h3
                    className="text-[1.3rem] md:text-[1.45rem] font-medium text-[#1e2228] mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cls.title}
                  </h3>

                  {}
                  <p className="text-[14px] text-[#5c5a58] leading-relaxed mb-6 grow">
                    {cls.description}
                  </p>

                  {}
                  <div className="pt-2 border-t border-[#dde7dd]/60 flex items-center justify-between">
                    {!isFull ? (
                      <Link href={`/classes/${cls.slug}`} className="at-link at-link-green">
                        View Class →
                      </Link>
                    ) : (
                      <span className="text-[11px] tracking-[0.18em] uppercase text-[#8a8d87]">
                        Join waitlist →
                      </span>
                    )}
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>

      </div>
    </section>
  )
}

