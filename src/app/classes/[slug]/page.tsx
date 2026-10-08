import { client } from '@/sanity/lib/client'
import { MASTERCLASS_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export const instant = false // Replaces revalidate in Next.js 16

interface Props {
  params: Promise<{ slug: string }>
}

export default async function MasterclassDetailPage({ params }: Props) {
  // Await params as required by Next.js 16 / Turbopack
  const resolvedParams = await params
  
  const masterclass = await client.fetch(MASTERCLASS_BY_SLUG_QUERY, {
    slug: resolvedParams.slug,
  })

  if (!masterclass) {
    notFound()
  }

  const dateObj = new Date(masterclass.date)
  const isPast = dateObj < new Date()
  const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const formattedTime = dateObj.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

  // Custom styling for Sanity block content
  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => <p className="text-[15px] text-[#5c5a58] leading-[1.8] mb-6">{children}</p>,
      h3: ({ children }: any) => <h3 className="text-[1.5rem] font-medium text-[#1e2228] mt-10 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{children}</h3>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-8 text-[#5c5a58] space-y-2">{children}</ul>,
    },
  }

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      
      {/* ── 1. Class Hero ── */}
      <section className="relative w-full h-[60vh] min-h-[400px] bg-[#1e2228]">
        <Image
          src={masterclass.imageUrl}
          alt={masterclass.title}
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2228]/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <Badge variant={isPast ? 'recorded' : 'live'} className="mb-6 bg-white/10 text-white border-white/20">
              {isPast ? 'Recorded Vault' : 'Upcoming Live Class'}
            </Badge>
            <h1 
              className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-medium text-white leading-[1.1] max-w-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {masterclass.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ── 2. Content & Sidebar Grid ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-7 xl:col-span-8">
            
            <div className="prose prose-lg max-w-none">
              {masterclass.description ? (
                <PortableText value={masterclass.description} components={portableTextComponents} />
              ) : (
                <p className="text-[15px] text-[#5c5a58] leading-[1.8]">No description available.</p>
              )}
            </div>

            {/* What You'll Learn */}
            {masterclass.whatYouWillLearn && masterclass.whatYouWillLearn.length > 0 && (
              <div className="mt-16 pt-16 border-t border-[#dde7dd]">
                <h3 
                  className="text-[2rem] font-medium text-[#1e2228] mb-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  What You'll Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {masterclass.whatYouWillLearn.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e9f3e9] flex items-center justify-center mr-4 mt-0.5">
                        <svg className="w-3 h-3 text-[#2e7a3a]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-[15px] text-[#5c5a58] leading-[1.6]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What Is Included */}
            {masterclass.whatIsIncluded && masterclass.whatIsIncluded.length > 0 && (
              <div className="mt-16 pt-16 border-t border-[#dde7dd]">
                <h3 
                  className="text-[2rem] font-medium text-[#1e2228] mb-8"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  What Is Included
                </h3>
                <ul className="space-y-4">
                  {masterclass.whatIsIncluded.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center text-[15px] text-[#5c5a58]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#edc179] mr-4" />
                      {item}
                    </li>
                  ))}
                  {/* Always included */}
                  <li className="flex items-center text-[15px] text-[#5c5a58]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#edc179] mr-4" />
                    Permanent access to the class recording
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (Right) */}
          <div className="lg:col-span-5 xl:col-span-4 relative">
            <div className="sticky top-32 bg-white border border-[#dde7dd] p-8 shadow-sm">
              
              <div className="mb-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-2">Enrollment Fee</p>
                <p className="text-[2.5rem] font-medium text-[#2e7a3a]" style={{ fontFamily: 'var(--font-heading)' }}>
                  ₹{masterclass.price}
                </p>
              </div>

              <div className="space-y-6 mb-8 border-y border-[#dde7dd] py-6">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#8a8d87]">Date</span>
                  <span className="text-[14px] font-medium text-[#1e2228]">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#8a8d87]">Time</span>
                  <span className="text-[14px] font-medium text-[#1e2228]">{formattedTime} IST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#8a8d87]">Duration</span>
                  <span className="text-[14px] font-medium text-[#1e2228]">{masterclass.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-[#8a8d87]">Location</span>
                  <span className="text-[14px] font-medium text-[#1e2228]">Online (Zoom)</span>
                </div>
              </div>

              {isPast ? (
                <div>
                  <div className="bg-[#faf8f2] p-4 text-center mb-4 border border-[#dde7dd]">
                    <p className="text-[13px] text-[#5c5a58] leading-[1.6]">
                      This live class has ended. You can access the recording instantly by subscribing to our Membership.
                    </p>
                  </div>
                  <Link href="/memberships">
                    <Button variant="primary" size="lg" className="w-full">
                      View Membership Plans
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href={`/classes/${masterclass.slug}/checkout`}>
                  <Button variant="primary" size="lg" className="w-full">
                    Join This Class
                  </Button>
                </Link>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
