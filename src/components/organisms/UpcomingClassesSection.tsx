import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { client } from '@/sanity/lib/client'
import { ALL_MASTERCLASSES_QUERY } from '@/sanity/lib/queries'
import { format } from 'date-fns'

export async function UpcomingClassesSection() {
  let classes = []
  try {
    const data = await client.fetch(ALL_MASTERCLASSES_QUERY)
    // Get live classes (not recordings) that haven't happened yet
    classes = data
      .filter((c: any) => c.type === 'live' && new Date(c.date) >= new Date())
      .slice(0, 2)

    // Fallback: just show any 2 classes if no upcoming live classes
    if (classes.length === 0) {
      classes = data.slice(0, 2)
    }
  } catch (error) {
    console.error('Failed to fetch masterclasses', error)
  }

  if (classes.length === 0) return null

  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

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
              See full schedule &rarr;
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {classes.map((cls: any, index: number) => {
            const dateObj = cls.date ? new Date(cls.date) : new Date()
            const dateStr = format(dateObj, 'dd MMMM yyyy')
            const timeStr = format(dateObj, 'h:mm a')
            
            const capacity = cls.capacity || 20
            const enrolled = cls.enrolled || 0
            const spotsLeft = capacity - enrolled
            const isFull = spotsLeft <= 0

            return (
              <FadeIn key={cls._id || index} delay={0.1 * (index + 1)} className="flex flex-col h-full">
                <article className="group flex flex-col h-full bg-[#faf8f2] border border-[#dde7dd]/80 p-6 sm:p-8">
                  
                  <div className="overflow-hidden bg-[#e9f3e9] img-zoom mb-6 aspect-[16/10] relative">
                    <img
                      src={cls.imageUrl || '/images/ayurvedic_masterclass.jpg'}
                      alt={cls.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#dde7dd]/80">
                    <div>
                      <p className="text-[11px] tracking-[0.16em] text-[#1e2228] font-medium uppercase">{dateStr}</p>
                      <p className="text-[11px] tracking-[0.14em] text-[#8a8d87] uppercase mt-0.5">{timeStr}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[1.2rem] font-medium text-[#1e2228]">₹{cls.price || '9,999'}</p>
                      <p className={`text-[10px] tracking-[0.14em] font-semibold uppercase mt-0.5 ${isFull ? 'text-red-500' : 'text-[#5c8f60]'}`}>
                        {isFull ? 'Sold out' : `${spotsLeft} of ${capacity} seats left`}
                      </p>
                    </div>
                  </div>

                  <h3
                    className="text-[1.3rem] md:text-[1.45rem] font-medium text-[#1e2228] mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {cls.title}
                  </h3>

                  <p className="text-[14px] text-[#5c5a58] leading-relaxed mb-6 grow line-clamp-3">
                    {cls.shortDescription || cls.description || ''}
                  </p>

                  <div className="pt-2 border-t border-[#dde7dd]/60 flex items-center justify-between">
                    {!isFull ? (
                      <Link href={`/classes/${cls.slug?.current || cls.slug}`} className="at-link at-link-green">
                        View Class &rarr;
                      </Link>
                    ) : (
                      <span className="text-[11px] tracking-[0.18em] uppercase text-[#8a8d87]">
                        Join waitlist &rarr;
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
