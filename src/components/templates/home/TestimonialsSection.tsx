/*
 * TESTIMONIALS — per brief, only shown when real content is supplied.
 * Section is deliberately minimal — large serif quotes, no stars, no avatars.
 */
export function TestimonialsSection() {
  // Leave empty — the brief says "only show if genuine testimonials supplied"
  // Wire this to Sanity and conditionally render when testimonials.length > 0
  const testimonials: { quote: string; name: string; role: string }[] = []

  if (testimonials.length === 0) return null

  return (
    <section className="bg-white py-24 md:py-32 border-t border-[#dde7dd]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-[#5c8f60] uppercase mb-16">
          Client Words
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 max-w-5xl">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col">
              <span
                className="text-[4rem] text-[#edc179] font-serif leading-none mb-4"
                aria-hidden="true"
              >"</span>
              <blockquote
                className="text-[1.25rem] md:text-[1.4rem] text-[#1e2228] font-medium leading-[1.5] mb-8 flex-grow"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t.quote}
              </blockquote>
              <footer>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#1e2228] uppercase">{t.name}</p>
                <p className="text-[11px] tracking-[0.14em] text-[#8a8d87] uppercase mt-1">{t.role}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
