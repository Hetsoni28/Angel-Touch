import Image from 'next/image'
import { FadeIn } from '@/components/atoms/FadeIn'

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export function SocialSection() {
  const gridImages = [
    {
      src: '/images/treatment_shirodhara.jpg',
      alt: 'Traditional Ayurvedic Shirodhara therapy in our quiet sanctuary',
    },
    {
      src: '/images/ayurvedic_facial_therapy.jpg',
      alt: 'Restorative botanical facial therapy with kansa ritual',
    },
    {
      src: '/images/ayurvedic_academy_workshop.jpg',
      alt: 'Hands-on beauty formulation academy masterclass with students',
    },
    {
      src: '/images/treatment_aroma_facial.jpg',
      alt: 'Soothing aroma facial massage with pure botanical oils',
    },
    {
      src: '/images/hero_ayurvedic_wellness.jpg',
      alt: 'Holistic Ayurvedic wellness and natural beauty at Angel Touch',
    },
  ]

  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-end gap-6 mb-10 md:mb-12">
          <FadeIn>
            <div>
              <p className="eyebrow mb-4">@angeltouch_by_heena_thaker</p>
              <h2
                className="text-[1.9rem] md:text-[2.5rem] font-medium text-[#1e2228] leading-[1.12]"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                From the studio, <span className="accent-italic">day to day</span>.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} direction="none">
            <a
              href="https://www.instagram.com/angeltouch_by_heena_thaker/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Angel Touch on Instagram (opens in a new tab)"
              className="at-link self-start sm:self-end shrink-0 inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
            >
              Follow on Instagram <span className="arrow" aria-hidden="true">→</span>
            </a>
          </FadeIn>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-4">
          {gridImages.map((img, i) => (
            // 5th photo only on desktop, so no row is ever left with a single orphan
            <FadeIn key={i} delay={0.05 * i} className={i === 4 ? 'hidden lg:block' : ''}>
              <a
                href="https://www.instagram.com/angeltouch_by_heena_thaker/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on Instagram: ${img.alt} (opens in a new tab)`}
                className="img-zoom group relative aspect-square overflow-hidden bg-[#e9f3e9] block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 36vw" /* square cells of landscape photos: drawn ~1.8x the cell width */
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#1e2228]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <InstagramIcon className="w-6 h-6 text-white" />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}

