import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { Video } from 'lucide-react'
import { connection } from 'next/server'
import Link from 'next/link'

export const instant = false

export default async function VideoLibraryPage() {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/customer/library')
  }

  // 1. Check Membership
  const { data: membership } = await supabase
    .from('memberships')
    .select('status, expires_at')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  const isMember = !!membership && new Date(membership.expires_at) > new Date()

  // 2. Fetch Class Enrollments (if they are not a member, they can only watch what they bought)
  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select('class_id')
    .eq('user_id', user.id)
    .eq('status', 'confirmed')

  const confirmedClassIds = (enrollments || []).map(e => e.class_id)

  // 3. Fetch Available Videos from Sanity
  // If member, fetch all past classes. If not, fetch only the ones they enrolled in.
  const query = isMember
    ? `*[_type == "masterclass" && date < now()] | order(date desc) { _id, title, slug, "imageUrl": mainImage.asset->url, date }`
    : `*[_type == "masterclass" && _id in $ids && date < now()] | order(date desc) { _id, title, slug, "imageUrl": mainImage.asset->url, date }`

  const videos = await client.fetch(query, { ids: confirmedClassIds })

  return (
    <div className="w-full">
      <div className="border-b border-[#dde7dd] pb-8 mb-10">
        <h1 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-2">
          Video Library
        </h1>
        <p className="text-[#5c5a58] text-[15px]">
          Watch recordings of your purchased classes and membership exclusives.
        </p>
      </div>

      {!videos || videos.length === 0 ? (
        <div className="text-center p-12 bg-white border border-[#dde7dd]">
          <Video className="w-12 h-12 text-[#dde7dd] mx-auto mb-4" />
          <h3 className="text-[#1e2228] font-semibold text-lg mb-2">No videos available</h3>
          <p className="text-[#5c5a58] text-[14px]">
            {isMember 
              ? "We are currently uploading new class recordings. Check back soon!" 
              : "You haven't unlocked any recorded classes yet. Join our membership or purchase a past class to start watching."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: any) => (
            <Link key={video._id} href={`/customer/library/${video.slug.current || video.slug}`} className="group block bg-white border border-[#dde7dd] overflow-hidden hover:border-[#2e7a3a]/30 hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-[#faf8f2] relative overflow-hidden">
                {video.imageUrl ? (
                  <img src={video.imageUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-[#dde7dd]" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#2e7a3a] border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8a8d87] mb-2">
                  {new Date(video.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="font-playfair text-lg text-[#1e2228] line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
