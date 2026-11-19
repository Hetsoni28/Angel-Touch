import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

const serviceCategories = [
  {
    number: '01',
    label: 'Skin & Aroma',
    title: 'Advanced skin treatments & aroma facials',
    description:
      'Aroma facials, botanical skincare and advanced aesthetic therapies, from the same team that teaches skincare Levels 1, 2 and 3 at our academy.',
    href: '/treatments?category=facial',
  },
  {
    number: '02',
    label: 'Clean-up & D-Tan',
    title: 'Clean-ups & tan removal',
    description: 'Fruit-enzyme clean-ups and herbal de-tan treatments that clear congested pores and even out skin tone.',
    href: '/treatments?category=clean-up',
  },
  {
    number: '03',
    label: 'Hair Care & Spa',
    title: 'Ayurvedic hair spa & rituals',
    description: 'Herbal hair spa, deep conditioning and styling, with time set aside for each guest.',
    href: '/treatments?category=hair-spa',
  },
  {
    number: '04',
    label: 'Shirodhara',
    title: 'Shirodhara oil therapy',
    description: 'A steady stream of warm oil poured across the forehead: the classic Ayurvedic therapy for deep rest and a quieter mind.',
    href: '/treatments?category=shirodhara',
  },
  {
    number: '05',
    label: 'Bridal & Makeup',
    title: 'Bridal, bridesmaid & ceremony makeup',
    description: 'Traditional and HD bridal makeup, saree draping and hair styling for weddings and family ceremonies.',
    href: '/treatments?category=bridal-makeup',
  },
  {
    number: '06',
    label: 'Nails',
    title: 'Nail art, manicure & pedicure',
    description: 'Manicures, pedicures and detailed nail art, done in a comfortable private room.',
    href: '/treatments?category=nail-art',
  },
]

export function ServicesSection() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-end gap-6 mb-12 md:mb-16">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Our services</p>
              <h2
                className="text-[1.9rem] md:text-[2.6rem] font-medium text-[#1e2228] leading-[1.12]"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                Skin, hair and bridal care, <span className="accent-italic">under one roof</span>.
              </h2>
              <p className="mt-5 text-[15.5px] text-[#4a4846] leading-[1.75] max-w-xl">
                From aroma facials and Shirodhara to bridal makeup and nail art, every service is
                given in a private room at our women-only studio in Satellite, Ahmedabad.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} direction="none">
            <Link href="/treatments" className="at-link shrink-0 min-h-[44px]">
              View the full menu <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </FadeIn>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#dde7dd]/70 border border-[#dde7dd]/70">
          {serviceCategories.map((s, i) => (
            <li key={s.number} className="bg-[#faf8f2]">
              <FadeIn delay={0.04 * i} className="h-full">
                <Link
                  href={s.href}
                  className="group flex flex-col h-full p-7 md:p-9 bg-[#faf8f2] hover:bg-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2e7a3a]"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <span
                      className="text-[1.6rem] leading-none text-[#b38538] italic tabular"
                      style={{ fontFamily: 'var(--font-heading)' }}
                      aria-hidden="true"
                    >
                      {s.number}
                    </span>
                    <span className="text-[#b9c4b6] group-hover:text-[#2e7a3a] group-hover:translate-x-1 transition-all duration-300 text-lg leading-none" aria-hidden="true">
                      →
                    </span>
                  </div>
                  <p className="eyebrow !text-[#5c8f60] mb-3">{s.label}</p>
                  <h3
                    className="text-[1.2rem] md:text-[1.3rem] font-medium text-[#1e2228] leading-snug mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-[#4a4846] leading-[1.7] grow">{s.description}</p>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
