import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { connection } from 'next/server'
import Link from 'next/link'
import { VideoPlayerLocked } from '@/components/organisms/VideoPlayerLocked'
import { VideoPlayerUnlocked } from '@/components/organisms/VideoPlayerUnlocked'

import { RecordingUnavailableAlert } from '@/components/molecules/RecordingUnavailableAlert'

export const instant = false

// Helper to extract YouTube ID
function getYouTubeId(url: string) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function VideoPlayerPage({ params }: PageProps) {
  await connection()
  const resolvedParams = await params
  const { slug } = resolvedParams
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/customer/library/' + slug)
  }

  // 1. Fetch Class from Sanity
  const query = `
    *[_type == "masterclass" && slug.current == $slug][0] {
      _id,
      title,
      date,
      recordingUrl
    }
  `
  const masterclass = await client.fetch(query, { slug })

  if (!masterclass) {
    return (
      <div className="w-full text-center py-20">
        <h1 className="text-2xl font-playfair text-[#1e2228] mb-4">Class not found</h1>
        <Link href="/customer/library" className="text-[#2e7a3a] text-sm hover:underline">
          &larr; Back to Library
        </Link>
      </div>
    )
  }

  // Ensure this is actually a past class that has a recording
  const isPast = new Date(masterclass.date) < new Date()
  if (!isPast || !masterclass.recordingUrl) {
    return <RecordingUnavailableAlert title={masterclass.title} classDate={masterclass.date} />
  }

  // 2. Check Access Permissions
  let hasAccess = false
  let accessReason = ''

  // A. Check Membership
  const { data: membership } = await supabase
    .from('memberships')
    .select('status, expires_at')
    .eq('user_id', user.id)
    .maybeSingle()

  const isMember = membership?.status === 'active' && !!membership?.expires_at && new Date(membership.expires_at) > new Date()
  const wasExpiredMember = !!membership?.expires_at && new Date(membership.expires_at) <= new Date()

  if (isMember) {
    hasAccess = true
    accessReason = 'Membership'
  } else {
    // B. Check Individual Purchase (class_enrollments)
    const { data: enrollment } = await supabase
      .from('class_enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('class_id', masterclass._id)
      .eq('status', 'confirmed')
      .maybeSingle()
      
    if (enrollment) {
      hasAccess = true
      accessReason = 'Purchased'
    }
  }

  // 3. Render
  if (!hasAccess) {
    return (
      <VideoPlayerLocked 
        title={masterclass.title} 
        slug={slug} 
        reason={wasExpiredMember ? 'expired_membership' : 'no_access'}
        expiresAt={membership?.expires_at || undefined}
      />
    )
  }

  const youtubeId = getYouTubeId(masterclass.recordingUrl)

  return (
    <VideoPlayerUnlocked 
      title={masterclass.title}
      date={masterclass.date}
      youtubeId={youtubeId}
      accessReason={accessReason}
    />
  )
}
