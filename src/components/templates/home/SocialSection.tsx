/*
 * SOCIAL / INSTAGRAM — minimal visual grid.
 * Note: images should be replaced with real social content from the client.
 */
export function SocialSection() {
  // These are editorial placeholder images — replace with real Instagram feed
  const gridImages = [
    { src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop&q=80', alt: 'Botanical products' },
    { src: '/images/ayurvedic_herbal_body_scrub_1791405717151.jpg', alt: 'Herbal scrub' },
    { src: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=500&auto=format&fit=crop&q=80', alt: 'Learning class' },
    { src: '/images/ayurvedic_herbal_clay_powder_1791405720188.jpg', alt: 'Herbal clay' },
    { src: '/images/ayurvedic_hero_editorial_1791405719098.jpg', alt: 'Ayurvedic ingredients' },
    { src: 'https://images.unsplash.com/photo-1611079830811-865ff4428d17?w=500&auto=format&fit=crop&q=80', alt: 'Class workshop' },
  ]

  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#5c8f60] uppercase mb-3">Instagram</p>
            <h2
              className="text-[1.8rem] md:text-[2rem] font-medium text-[#1e2228]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Follow the Angel Touch journey.
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="at-link self-start sm:self-end shrink-0"
          >
            Follow on Instagram →
          </a>
        </div>

        {/* 6-image grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {gridImages.map((img, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden bg-[#e9f3e9] img-zoom block"
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
