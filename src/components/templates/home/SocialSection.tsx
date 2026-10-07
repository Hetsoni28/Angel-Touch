import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

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
      src: '/images/ayurvedic_abhyanga.jpg',
      alt: 'Traditional Ayurvedic Abhyanga herbal oil preparation with fresh herbs',
    },
    {
      src: '/images/ayurvedic_herbal_body_scrub_1791405717151.jpg',
      alt: 'Handcrafted herbal scrub in artisanal ceramic vessel',
    },
    {
      src: '/images/ayurvedic_masterclass.jpg',
      alt: 'Hands blending botanical extracts during product-making masterclass',
    },
    {
      src: '/images/ayurvedic_herbal_clay_powder_1791405720188.jpg',
      alt: 'Neem and tulsi cleansing clay with ceramic apothecary jar',
    },
    {
      src: '/images/ayurvedic_hair_elixir.jpg',
      alt: 'Ashwagandha hair elixir with amla, hibiscus, and botanical herbs',
    },
  ]

  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 md:mb-14">
          <FadeIn delay={0.1}>
            <div>
              <h2
                className="text-[1.8rem] md:text-[2.2rem] font-medium text-[#1e2228] leading-[1.2]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Follow the Angel Touch journey.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="at-link self-start sm:self-end shrink-0"
            >
              Follow on Instagram →
            </a>
          </FadeIn>
        </div>

        {/* 5-Image Curated Lookbook Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {gridImages.map((img, i) => (
            <FadeIn key={i} delay={0.1 * (i + 1)}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-[#e9f3e9] border border-[#dde7dd]/60 block"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle hover overlay with Instagram icon */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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

