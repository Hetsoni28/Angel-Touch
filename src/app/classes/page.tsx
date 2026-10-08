import { client } from '@/sanity/lib/client'
import { ALL_MASTERCLASSES_QUERY } from '@/sanity/lib/queries'
import { Card } from '@/components/molecules/Card'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { EmptyState } from '@/components/molecules/EmptyState'

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
  const masterclasses: Masterclass[] = (await client.fetch(ALL_MASTERCLASSES_QUERY)) || []

  const now = new Date()

  // Automatically split based on the date!
  const upcomingClasses = masterclasses.filter(c => new Date(c.date) >= now)
  const recordedClasses = masterclasses.filter(c => new Date(c.date) < now)

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      
      {/* ── Hero Section ── */}
      <section className="py-24 px-6 text-center border-b border-[#dde7dd] bg-white">
        <h1 
          className="text-[3rem] md:text-[4rem] font-medium text-[#1e2228] leading-[1.1] mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Masterclasses
        </h1>
        <p className="text-[16px] text-[#5c5a58] max-w-2xl mx-auto leading-[1.8]">
          Learn the ancient art of Ayurvedic formulation. Join our live hands-on sessions 
          or explore the recorded library at your own pace.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">

        {/* ── 8.1 Upcoming / Live Classes ── */}
        <section>
          <div className="mb-12">
            <h2 
              className="text-[2rem] font-medium text-[#1e2228] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Upcoming Live Classes
            </h2>
            <p className="text-[15px] text-[#5c5a58]">
              One-time purchase. Attend the live Zoom class and receive permanent access to the recording.
            </p>
          </div>

          {upcomingClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingClasses.map((cls) => {
                const dateObj = new Date(cls.date)
                const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
                const formattedTime = dateObj.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

                return (
                  <Card
                    key={cls._id}
                    title={cls.title}
                    imageUrl={cls.imageUrl}
                    href={`/classes/${cls.slug}`}
                    badge={<Badge variant="live">Live — {formattedDate}</Badge>}
                  >
                    <p className="text-[14px] text-[#5c5a58] mb-6 line-clamp-2">
                      {cls.shortDescription}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#dde7dd]">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-[#8a8d87] tracking-widest uppercase mb-1">
                          {formattedTime} • {cls.duration}
                        </span>
                        <span className="text-[16px] font-medium text-[#2e7a3a]">
                          ₹{cls.price}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">View Class</Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <EmptyState 
              title="No Upcoming Classes" 
              description="We are currently formulating new masterclasses. Check back soon!" 
            />
          )}
        </section>

        {/* ── 8.2 Recorded Learning ── */}
        <section>
          <div className="mb-12 border-t border-[#dde7dd] pt-20">
            <h2 
              className="text-[2rem] font-medium text-[#1e2228] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Recorded Library
            </h2>
            <p className="text-[15px] text-[#5c5a58] max-w-2xl">
              Missed a live session? Unlock the entire vault of past masterclasses instantly with an active Membership.
            </p>
          </div>

          {recordedClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recordedClasses.map((cls) => (
                <Card
                  key={cls._id}
                  title={cls.title}
                  imageUrl={cls.imageUrl}
                  href={`/classes/${cls.slug}`}
                  badge={<Badge variant="recorded">Recorded Vault</Badge>}
                >
                  <p className="text-[14px] text-[#5c5a58] mb-6 line-clamp-2">
                    {cls.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#dde7dd]">
                    <div className="flex items-center space-x-2">
                      <Badge variant="membership">Members Only</Badge>
                    </div>
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="Library Empty" 
              description="Our recorded vault is currently empty. Past classes will automatically appear here." 
            />
          )}
        </section>

      </div>
    </div>
  )
}
