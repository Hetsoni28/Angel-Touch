import { client } from '@/sanity/lib/client'
import { ALL_MASTERCLASSES_QUERY } from '@/sanity/lib/queries'
import { Card } from '@/components/molecules/Card'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { EmptyState } from '@/components/molecules/EmptyState'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/atoms/FadeIn'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayurvedic Formulation Masterclasses',
  description:
    'Enrol in Angel Touch live and recorded masterclasses. Learn to formulate authentic Ayurvedic skincare, hair care, and wellness products from scratch under the guidance of Heena Thaker.',
  alternates: { canonical: 'https://angeltouch.in/classes' },
  openGraph: {
    title: 'Ayurvedic Formulation Masterclasses | Angel Touch',
    description:
      'Live and recorded Ayurvedic product-making masterclasses. Learn to craft saffron facial oils, herbal elixirs, and wellness formulations.',
    url: 'https://angeltouch.in/classes',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Angel Touch Ayurvedic Masterclasses' }],
  },
}


export const instant = false // Replaces revalidate in Next.js 16

interface Masterclass {
  _id: string
  title: string
  slug: string
  imageUrl: string
  shortDescription: string
  date: string
  duration: string
  price: number
}

export default async function ClassesPage() {
  const masterclasses: Masterclass[] = (await client.fetch(ALL_MASTERCLASSES_QUERY).catch(() => [])) || []

  const now = new Date()

  // Automatically split based on the date!
  const upcomingClasses = masterclasses.filter(c => new Date(c.date) >= now)
  const recordedClasses = masterclasses.filter(c => new Date(c.date) < now)

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      
      {/* ── 2. Brand-Aligned Hero (Matches TreatmentsHero) ── */}
      <section className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] flex flex-col justify-center overflow-hidden border-b border-[#dde7dd]/60">
        
        {/* Full Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/learning_hero.jpg"
            alt="Ayurvedic Masterclass"
            fill
            sizes="100vw"
            className="object-cover object-[center_30%] sm:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e2228]/85 via-[#1e2228]/60 to-[#1e2228]/30 sm:from-[#1e2228]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-16 pb-16 sm:pt-24 sm:pb-24 md:pt-32 md:pb-32">
          <div className="max-w-[640px]">
            <FadeIn delay={0.1}>
              <div className="text-white/80 [&_*]:text-white/80">
                <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Classes' }]} />
              </div>

              <h1
                className="text-[2.2rem] xs:text-[2.6rem] sm:text-[3.6rem] lg:text-[4rem] xl:text-[4.6rem] font-medium text-white leading-[1.05] mb-6 md:mb-8 drop-shadow-md"
                style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.015em' }}
              >
                Learn the craft<br />behind the ritual.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <span className="gold-rule mb-6 md:mb-8 block drop-shadow-sm" />
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-[15px] md:text-[17px] text-white/95 leading-[1.8] max-w-lg mb-8 md:mb-10 drop-shadow-md font-medium">
                Focused classes designed to teach you how Ayurvedic products are made, guided through the Angel Touch approach.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
                <Link
                  href="/classes#upcoming"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-[#2e7a3a] text-[#1e2228] hover:text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 text-center"
                >
                  Explore Upcoming Classes
                </Link>
                <Link
                  href="/classes#recorded"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-[#1e2228] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 backdrop-blur-sm text-center"
                >
                  Explore Recorded Library
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 3. Editorial Transition ── */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8a8d87] mb-6 block">
          The Angel Touch Learning Experience
        </span>
        <h2 
          className="text-[2.5rem] md:text-[3rem] font-medium text-[#1e2228] mb-8 leading-[1.2]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Learn by making.
        </h2>
        <p className="text-[16px] text-[#5c5a58] leading-[1.9] max-w-2xl mx-auto">
          We believe true understanding comes from working directly with the elements. Our masterclasses are not theoretical lectures—they are practical, hands-on workshops where you learn to formulate, blend, and create authentic Ayurvedic remedies.
        </p>
      </section>

      {/* ── 11. Why Learn With Us (Editorial Principles) ── */}
      <section className="bg-white py-24 border-y border-[#dde7dd]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Hands-on</h3>
              <p className="text-[14px] text-[#5c5a58] leading-[1.8]">Learn through the process of making, measuring, and crafting.</p>
            </div>
            <div>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Focused</h3>
              <p className="text-[14px] text-[#5c5a58] leading-[1.8]">Each class is centered around a specific product-making experience.</p>
            </div>
            <div>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Traditional</h3>
              <p className="text-[14px] text-[#5c5a58] leading-[1.8]">Rooted in authentic Ayurvedic product-making knowledge and heritage.</p>
            </div>
            <div>
              <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Personal</h3>
              <p className="text-[14px] text-[#5c5a58] leading-[1.8]">An intimate learning environment designed for focused attention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Class Experience Steps ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div>
            <span className="text-[11px] font-bold text-[#edc179] tracking-widest block mb-2">01</span>
            <p className="text-[15px] text-[#1e2228] font-medium">Choose a class</p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#edc179] tracking-widest block mb-2">02</span>
            <p className="text-[15px] text-[#1e2228] font-medium">Join the live session</p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#edc179] tracking-widest block mb-2">03</span>
            <p className="text-[15px] text-[#1e2228] font-medium">Learn the process</p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#edc179] tracking-widest block mb-2">04</span>
            <p className="text-[15px] text-[#1e2228] font-medium">Access your recording</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32">

        {/* ── 4 & 5. Upcoming Classes ── */}
        <section id="upcoming">
          <div className="mb-12">
            <h2 
              className="text-[2.5rem] font-medium text-[#1e2228] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Upcoming classes
            </h2>
            <p className="text-[16px] text-[#5c5a58]">
              Join a focused, hands-on learning experience.
            </p>
          </div>

          {upcomingClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {upcomingClasses.map((cls) => {
                const dateObj = new Date(cls.date)
                const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
                const formattedTime = dateObj.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

                return (
                  <Card
                    key={cls._id}
                    title={cls.title}
                    imageUrl={cls.imageUrl || '/images/learning_hero.jpg'}
                    href={`/classes/${cls.slug}`}
                    badge={<Badge variant="live" className="tracking-widest text-[10px]">UPCOMING</Badge>}
                  >
                    <p className="text-[14px] text-[#5c5a58] mb-6 line-clamp-2 leading-[1.6]">
                      {cls.shortDescription || 'Hands-on formulation masterclass taught by Heena Thaker.'}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#dde7dd]">
                      <div className="flex flex-col">
                        <span className="text-[12px] text-[#8a8d87] mb-1">
                          {formattedDate} • {formattedTime}
                        </span>
                        {cls.price ? (
                          <span className="text-[18px] font-medium text-[#1e2228]">
                            ₹{cls.price}
                          </span>
                        ) : (
                          <span className="text-[12px] font-semibold tracking-wider text-[#1e5f2e] uppercase">
                            Live Workshop
                          </span>
                        )}
                      </div>
                      <Link href={`/classes/${cls.slug}`}>
                        <Button variant="outline" size="sm">View Class</Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <EmptyState 
              title="No upcoming classes are available right now." 
              description="Check back soon for new masterclasses." 
            />
          )}
        </section>

        {/* ── 9 & 10. Recorded Library ── */}
        <section id="recorded">
          <div className="mb-12 border-t border-[#dde7dd] pt-24">
            <h2 
              className="text-[2.5rem] font-medium text-[#1e2228] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Continue learning with the recorded library.
            </h2>
            <p className="text-[16px] text-[#5c5a58] max-w-2xl mb-8">
              Explore past class recordings through Angel Touch membership. 
              Live classes are purchased individually, while membership provides access to eligible past class recordings.
            </p>
            <div className="flex gap-4">
              <Link href="/memberships">
                <Button variant="primary">Explore Membership</Button>
              </Link>
            </div>
          </div>

          {recordedClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {recordedClasses.map((cls) => (
                <Card
                  key={cls._id}
                  title={cls.title}
                  imageUrl={cls.imageUrl || '/images/learning_hero.jpg'}
                  href={`/classes/${cls.slug}`}
                  badge={<Badge variant="recorded" className="tracking-widest text-[10px]">RECORDED</Badge>}
                >
                  <p className="text-[14px] text-[#5c5a58] mb-6 line-clamp-2 leading-[1.6]">
                    {cls.shortDescription || 'Recorded formulation masterclass from the Angel Touch archives.'}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#dde7dd]">
                    <span className="text-[12px] text-[#8a8d87] font-medium">Available with Membership</span>
                    <Link href={`/classes/${cls.slug}`}>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="Recorded classes will appear here when available." 
              description="" 
            />
          )}
        </section>

      </div>
    </div>
  )
}
