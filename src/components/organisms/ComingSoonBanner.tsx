import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

interface ComingSoonBannerProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  /** WhatsApp (or other external) link for the main action */
  primary: { label: string; href: string; ariaLabel: string }
  secondary?: { label: string; href: string }
  note?: string
}

/**
 * Full-page "opening soon" banner, used by /shop (until products are added
 * in Sanity) and /membership (until online payments are switched on).
 * The arched photo echoes a jharokha window; it is the one moving element.
 */
export function ComingSoonBanner({
  title,
  description,
  imageSrc,
  imageAlt,
  primary,
  secondary,
  note,
}: ComingSoonBannerProps) {
  return (
    <section className="bg-[#faf8f2] min-h-[calc(100svh-80px)] sm:min-h-[calc(100svh-88px)] flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20 items-center">
        {/* Text */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-[#1e5f2e] mb-4 sm:mb-7">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#2e7a3a] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2e7a3a]" />
            </span>
            Opening soon
          </p>

          <h1
            className="text-[2.3rem] sm:text-[3.4rem] lg:text-[4.2rem] font-medium text-[#1e2228] leading-[1.04] mb-5 sm:mb-7"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[#4a4846] leading-[1.7] max-w-[34rem] mb-8 sm:mb-10">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={primary.ariaLabel}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[52px] bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-widest uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f2]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {primary.label}
            </a>
            {secondary && (
              <Link href={secondary.href} className="at-link self-start sm:self-auto">
                {secondary.label}
              </Link>
            )}
          </div>

          {note && (
            <p className="mt-12 pt-6 border-t border-[#dde7dd] text-[14px] text-[#6b6e68] leading-[1.7] max-w-[34rem]">
              {note}
            </p>
          )}
        </div>

        {/* Arched photo with an offset gold outline */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-[min(62vw,260px)] sm:w-[340px] lg:w-[min(100%,440px)]">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-t-full border border-[#edc179]"
              aria-hidden="true"
            />
            <div className="coming-soon-arch relative aspect-[4/5] max-h-[32svh] sm:max-h-[42svh] lg:max-h-[72svh] w-full rounded-t-full overflow-hidden bg-[#e9f3e9] mx-auto">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 360px, 440px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
