import { createClient } from '@/lib/supabase/server'
import { client } from '@/sanity/lib/client'
import { connection } from 'next/server'
import Image from 'next/image'
import { DynamicBreadcrumbs } from '@/components/molecules/DynamicBreadcrumbs'
import { RecordingCard } from '@/components/organisms/RecordingCard'

export const instant = false

export const metadata = {
  title: 'Recorded Library | Angel Touch',
  description: 'Access past masterclasses and exclusive video recordings.',
}

export default async function RecordingsPage() {
  await connection()
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isMember = false
  let purchasedClassIds: string[] = []

  if (user) {
    // Check Membership
    const { data: membership } = await supabase
      .from('memberships')
      .select('status, expires_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    isMember = !!membership && new Date(membership.expires_at) > new Date()

    // Check Class Enrollments
    const { data: enrollments } = await supabase
      .from('class_enrollments')
      .select('class_id')
      .eq('user_id', user.id)
      .eq('status', 'confirmed')

    if (enrollments) {
      purchasedClassIds = enrollments.map(e => e.class_id)
    }
  }

  // Fetch all past masterclasses from Sanity
  const query = `
    *[_type == "masterclass" && date < now()] | order(date desc) {
      _id,
      title,
      slug,
      date,
      price,
      shortDescription,
      "imageUrl": mainImage.asset->url
    }
  `
  const recordings = await client.fetch(query)

  return (
    <div className="min-h-screen bg-[#faf8f2]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/recordings-hero-bg.png"
            alt="Study desk with ayurvedic herbs"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-10 py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="mb-8">
            <DynamicBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Recorded Library' }]} />
          </div>
          
          <div className="max-w-3xl">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#1e2228] mb-6 drop-shadow-sm">
              Recorded Library
            </h1>
            <p className="text-[#3c3a38] text-lg md:text-xl leading-relaxed font-medium drop-shadow-sm">
              Missed a live session? Unlock unlimited wisdom from our past masterclasses. 
              Enjoy complimentary access with an active membership, or purchase recordings individually for lifetime access.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {recordings.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-[#dde7dd]">
            <p className="text-[#5c5a58]">No recordings available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recordings.map((recording: any) => {
              // Determine status
              let status: 'watch' | 'buy' | 'upgrade' = 'buy'

              if (isMember) {
                status = 'watch'
              } else if (purchasedClassIds.includes(recording._id)) {
                status = 'watch'
              } else {
                // Not a member, hasn't purchased
                // We'll prompt them to buy individually or upgrade. The prompt asks for 'upgrade' or 'buy'.
                // If you want them to have both options, the UI supports 'buy' offering both if needed, 
                // but let's default to 'buy' which shows the price, and they can always go to membership.
                // If it's a membership-ONLY recording (e.g., price = 0 or null), we show upgrade.
                if (recording.price === null || recording.price === undefined || recording.price === 0) {
                  status = 'upgrade'
                } else {
                  status = 'buy'
                }
              }

              return (
                <RecordingCard
                  key={recording._id}
                  slug={recording.slug.current || recording.slug}
                  title={recording.title}
                  description={recording.shortDescription || ''}
                  date={recording.date}
                  imageUrl={recording.imageUrl}
                  price={recording.price}
                  status={status}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
