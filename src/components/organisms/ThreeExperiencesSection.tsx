import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { CinematicImage } from '@/components/atoms/CinematicImage'

const EXPERIENCES = [
  {
    n: '01',
    label: 'Products',
    title: 'Small-batch Ayurvedic products.',
    body: 'Face oils, hair elixirs and herbal clays made by hand in small batches, using traditional infusion methods.',
    href: '/shop',
    cta: 'See the products',
    image: '/images/ayurvedic_facial_therapy.jpg',
    alt: 'Ayurvedic aroma facial therapy at Angel Touch salon, Satellite, Ahmedabad',
  },
  {
    n: '02',
    label: 'Treatments',
    title: 'Aroma & Ayurvedic treatments.',
    body: 'Shirodhara, aroma facials and restorative therapies, given one guest at a time in a private room.',
    href: '/treatments',
    cta: 'Explore treatments',
    image: '/images/ayurvedic_shirodhara.jpg',
    alt: 'Shirodhara and Ayurvedic wellness treatment at Angel Touch, Ahmedabad',
  },
  {
    n: '03',
    label: 'Learning',
    title: 'Learn to make it yourself.',
    body: 'Small live classes on formulating Ayurvedic skincare from scratch, taught personally by Heena Thaker.',
    href: '/classes',
    cta: 'Explore classes',
    image: '/images/ayurvedic_academy_workshop.jpg',
    alt: 'Hands-on beauty and cosmetology workshop at Angel Touch Academy, Ahmedabad',
  },
]

export function ThreeExperiencesSection() {
  return (
    <section className="bg-[#faf8f2] py-20 md:py-28" aria-label="Products, treatments and learning">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {EXPERIENCES.map((x, i) => (
            <FadeIn key={x.n} delay={0.08 * i} className="flex flex-col h-full">
              <article className="at-card group relative flex flex-col h-full bg-white p-5 sm:p-6">
                <CinematicImage
                  src={x.image}
                  alt={x.alt}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  parallax={0}
                  reveal
                  className="img-zoom bg-[#e9f3e9] mb-7 aspect-[4/3]"
                />
                <p className="eyebrow mb-3 tabular">
                  {x.n} <span className="text-[#c9cfc4] mx-1" aria-hidden="true">/</span> {x.label}
                </p>
                <h3
                  className="text-[1.35rem] font-medium text-[#1e2228] mb-3 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {x.title}
                </h3>
                <p className="text-[14px] text-[#4a4846] leading-[1.7] mb-7 grow">{x.body}</p>
                <div className="pt-4 border-t border-[#dde7dd]/70">
                  {/* The stretched link makes the whole card clickable while keeping one focus stop. */}
                  <Link
                    href={x.href}
                    className="at-link min-h-[44px] after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
                  >
                    {x.cta} <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
