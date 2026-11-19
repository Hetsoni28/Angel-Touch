import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { CinematicImage } from '@/components/atoms/CinematicImage'
import { PAYMENTS_ENABLED } from '@/lib/features'
import { generateWhatsAppLink } from '@/utils/whatsapp'

// What we say must match how access actually works right now.
const POINTS = PAYMENTS_ENABLED
  ? [
      'Join a live class and keep its recording for good.',
      'Buy individual recordings of past classes at any time.',
      'Or take a membership for the full recorded library.',
    ]
  : [
      'Every live class is recorded.',
      'Ask us on WhatsApp for access to a past class.',
      'A membership for the full library is coming soon.',
    ]

export function RecordedLearningSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          <FadeIn direction="none">
            <div className="offset-frame mr-3.5 sm:mr-4">
              <CinematicImage
                src="/images/ayurvedic_editorial_desk_1791405721218.jpg"
                alt="Ayurvedic formulation notes and botanical ingredients"
                sizes="(max-width: 1024px) 100vw, 50vw"
                parallax={6}
                reveal
                className="w-full aspect-[4/3] bg-[#e9f3e9]"
              />
            </div>
          </FadeIn>

          <div className="flex flex-col">
            <FadeIn>
              <p className="eyebrow mb-4">Recorded classes</p>
              <h2
                className="text-[1.9rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.12] mb-6"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                Keep learning, <span className="accent-italic">after</span> the class.
              </h2>
              <span className="gold-rule mb-8" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <ol className="mb-10 border-t border-[#dde7dd]">
                {POINTS.map((point, i) => (
                  <li key={point} className="flex items-baseline gap-5 py-4 border-b border-[#dde7dd]">
                    <span
                      className="text-[1.05rem] italic text-[#b38538] tabular w-6 shrink-0"
                      style={{ fontFamily: 'var(--font-heading)' }}
                      aria-hidden="true"
                    >
                      {i + 1}.
                    </span>
                    <p className="text-[15px] text-[#4a4846] leading-[1.7]">{point}</p>
                  </li>
                ))}
              </ol>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-8 gap-y-4">
                {PAYMENTS_ENABLED ? (
                  <>
                    <Link href="/recordings" className="at-link min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm">
                      Browse recordings <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                    <Link href="/membership" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4a4846] hover:text-[#2e7a3a] min-h-[44px] inline-flex items-center transition-colors">
                      View membership
                    </Link>
                  </>
                ) : (
                  <>
                    <a
                      href={generateWhatsAppLink({ type: 'GENERAL', message: 'I would like access to a recorded class.' })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="at-link min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                      aria-label="Ask about recorded classes on WhatsApp (opens in a new tab)"
                    >
                      Ask about recordings <span className="arrow" aria-hidden="true">→</span>
                    </a>
                    <Link href="/recordings" className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4a4846] hover:text-[#2e7a3a] min-h-[44px] inline-flex items-center transition-colors">
                      See past classes
                    </Link>
                  </>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}
