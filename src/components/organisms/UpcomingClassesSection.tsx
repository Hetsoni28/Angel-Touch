import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'
import { client } from '@/sanity/lib/client'
import { ALL_MASTERCLASSES_QUERY } from '@/sanity/lib/queries'
import { slugOf, type MasterclassListItem, type SanitySlug } from '@/sanity/lib/types'
import { generateWhatsAppLink } from '@/utils/whatsapp'

type UpcomingClass = Omit<MasterclassListItem, 'slug'> & {
  slug?: SanitySlug | string | null
  capacity?: number
  duration?: string
  isCancelled?: boolean
}

// Class times are entered in India time; format them in India time too,
// whatever time zone the server happens to run in.
const IST = 'Asia/Kolkata'
const dateFmt = new Intl.DateTimeFormat('en-IN', { timeZone: IST, day: 'numeric', month: 'long', year: 'numeric' })
const weekdayFmt = new Intl.DateTimeFormat('en-IN', { timeZone: IST, weekday: 'long' })
const timeFmt = new Intl.DateTimeFormat('en-IN', { timeZone: IST, hour: 'numeric', minute: '2-digit', hour12: true })
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

/**
 * The next two real, future, live classes. No invented fallbacks: if Sanity has
 * nothing scheduled (or can't be reached) this returns [] and the section says so.
 */
async function getUpcomingClasses(): Promise<UpcomingClass[]> {
  try {
    const data = await client.fetch<UpcomingClass[]>(ALL_MASTERCLASSES_QUERY)
    const now = Date.now()
    return (data ?? [])
      .filter((c) => (c.type ?? 'live') === 'live' && !c.isCancelled && c.date && new Date(c.date).getTime() >= now)
      .slice(0, 2)
  } catch {
    return []
  }
}

export async function UpcomingClassesSection() {
  const classes = await getUpcomingClasses()

  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 mb-12 md:mb-16">
          <FadeIn>
            <div className="max-w-xl">
              <p className="eyebrow mb-4">Live classes</p>
              <h2
                className="text-[1.9rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.12]"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                Learn how it&apos;s <span className="accent-italic">made</span>.
              </h2>
              <p className="mt-4 text-[15.5px] text-[#4a4846] leading-[1.75]">
                Small live sessions where Heena Thaker shows, step by step, how Ayurvedic skincare
                and hair care is formulated from scratch.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} direction="none">
            <Link
              href="/classes"
              className="at-link shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
            >
              Full schedule <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </FadeIn>
        </div>

        {classes.length === 0 ? (
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center bg-[#faf8f2] border border-[#dde7dd]/80 p-7 md:p-10">
              <div>
                <p
                  className="text-[1.35rem] md:text-[1.55rem] text-[#1e2228] leading-snug mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  The next class dates are being planned.
                </p>
                <p className="text-[14.5px] text-[#4a4846] leading-[1.7] max-w-xl">
                  Send us a message and we&apos;ll tell you as soon as registration opens. Past classes
                  are also available as recordings.
                </p>
              </div>
              <a
                href={generateWhatsAppLink({ type: 'GENERAL', message: 'Please let me know when the next live class is scheduled.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="at-btn"
                aria-label="Ask about the next class date on WhatsApp (opens in a new tab)"
              >
                Notify me <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {classes.map((cls, index) => {
              const when = new Date(cls.date)
              const href = `/classes/${slugOf(cls.slug)}`
              return (
                <FadeIn key={cls._id} delay={0.08 * index} className="flex flex-col h-full">
                  <article className="at-card group relative flex flex-col h-full bg-[#faf8f2] p-5 sm:p-7">
                    <div className="img-zoom relative overflow-hidden bg-[#e9f3e9] mb-7 aspect-[16/10]">
                      <Image
                        src={cls.imageUrl || '/images/ayurvedic_masterclass.jpg'}
                        alt={cls.imageAlt || `${cls.title} – Ayurvedic formulation masterclass with Heena Thaker`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-[center_35%]"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex items-end justify-between gap-4 mb-5 pb-5 border-b border-[#dde7dd]/80">
                      <div>
                        <p className="eyebrow !text-[#6b6e68] mb-1.5">{weekdayFmt.format(when)}</p>
                        <p className="text-[1.05rem] text-[#1e2228] tabular" style={{ fontFamily: 'var(--font-heading)' }}>
                          <time dateTime={cls.date}>{dateFmt.format(when)}</time>
                          <span className="text-[#6b6e68]"> · {cls.time || timeFmt.format(when)}</span>
                        </p>
                      </div>
                      {(cls.price || cls.capacity || cls.duration) && (
                        <div className="text-right shrink-0">
                          {cls.price ? (
                            <p className="text-[1.15rem] text-[#1e2228] tabular" style={{ fontFamily: 'var(--font-heading)' }}>
                              {inr.format(cls.price)}
                            </p>
                          ) : null}
                          <p className="text-[10px] tracking-[0.16em] font-semibold uppercase text-[#1e5f2e] mt-1">
                            {[cls.duration, cls.capacity ? `${cls.capacity} seats` : null].filter(Boolean).join(' · ')}
                          </p>
                        </div>
                      )}
                    </div>

                    <h3
                      className="text-[1.35rem] md:text-[1.5rem] font-medium text-[#1e2228] mb-3 leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {cls.title}
                    </h3>
                    {cls.shortDescription && (
                      <p className="text-[14.5px] text-[#4a4846] leading-[1.7] mb-6 grow line-clamp-3">
                        {cls.shortDescription}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-[#dde7dd]/70">
                      <Link
                        href={href}
                        className="at-link at-link-green min-h-[44px] after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                        aria-label={`View class details: ${cls.title}`}
                      >
                        View class <span className="arrow" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </FadeIn>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
