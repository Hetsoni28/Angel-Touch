import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'

const serviceCategories = [
  {
    number: '01',
    label: 'Skin & Aesthetics',
    title: 'Advanced Aesthetic Skin Treatments',
    description: 'Expert facials, advanced skin therapies and aroma facials delivering visible, lasting results. Backed by a certified skincare academy offering Level 1, 2 & 3 courses.',
    href: '/treatments',
  },
  {
    number: '02',
    label: 'Aromatherapy',
    title: 'Aromatherapy & Wellness',
    description: 'Deeply restorative aromatherapy treatments blending pure botanical oils to calm the nervous system, restore balance and revive your natural energy.',
    href: '/treatments',
  },
  {
    number: '03',
    label: 'Hair Care',
    title: 'Hair Spa, Smoothening & Colouring',
    description: 'Full range of professional hair services — hair spa, Keratin, hair re-moulding, chemical and natural colouring — delivered by skilled specialists.',
    href: '/treatments',
  },
  {
    number: '04',
    label: 'Shirodhara',
    title: 'Shirodhara Oil Therapy',
    description: 'Traditional Ayurvedic Shirodhara — a continuous warm oil flow over the forehead — for deep mental relaxation, clarity and stress relief.',
    href: '/treatments',
  },
  {
    number: '05',
    label: 'Bridal & Makeup',
    title: 'Bridal, Siders & Destination Wedding',
    description: 'Flawless bridal and bridesmaid makeup with complete hair styling. Available for salon appointments and destination weddings across India.',
    href: '/treatments',
  },
  {
    number: '06',
    label: 'Nail Services',
    title: 'Nail Art, Manicure & Pedicure',
    description: 'Full-range nail care including manicures, pedicures, gel nails and intricate nail art — all in private, comfortable treatment rooms.',
    href: '/treatments',
  },
]

export function ServicesSection() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <FadeIn delay={0.1}>
            <div className="max-w-xl">
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-3">
                Our Services
              </p>
              <h2
                className="text-[1.8rem] md:text-[2.4rem] font-medium text-[#1e2228] leading-[1.2]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Everything a woman deserves,<br className="hidden md:block" /> all in one place.
              </h2>
              <p className="mt-3 text-[15px] text-[#5c5a58] leading-relaxed">
                From advanced skin treatments and Ayurvedic therapies to bridal styling and a beauty school — Angel Touch brings world-class services to Satellite, Ahmedabad.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            <Link href="/treatments" className="at-link shrink-0">
              View all services →
            </Link>
          </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#dde7dd]/40">
          {serviceCategories.map((s, i) => (
            <FadeIn key={s.number} delay={0.05 * i}>
              <Link
                href={s.href}
                className="group flex flex-col bg-[#faf8f2] hover:bg-white p-7 md:p-8 h-full transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase">
                    {s.number} — {s.label}
                  </span>
                  <span className="text-[#dde7dd] group-hover:text-[#5c8f60] transition-colors text-lg leading-none">
                    →
                  </span>
                </div>
                <h3
                  className="text-[1.1rem] md:text-[1.2rem] font-medium text-[#1e2228] leading-snug mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {s.title}
                </h3>
                <p className="text-[13px] text-[#5c5a58] leading-relaxed grow">
                  {s.description}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
