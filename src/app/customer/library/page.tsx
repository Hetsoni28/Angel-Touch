import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { PlayCircle, Hourglass, Crown, Video } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPortalData, fmtDate } from '@/lib/portal'
import { slugOf } from '@/sanity/lib/types'
import { PAYMENTS_ENABLED } from '@/lib/features'

export const instant = false

/**
 * Customer portal — Library.
 * Same access rule as the video player: members see every past class, everyone
 * else the classes they joined. Shows honestly whether each recording is ready.
 */
export default async function VideoLibraryPage() {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/customer/library')

  const { isMember, recordings } = await getPortalData(user.id)
  const ready = recordings.filter((r) => r.hasRecording).length

  return (
    <div className="w-full">
      <div className="mb-5 md:mb-8">
        <h1 className="font-playfair text-[1.65rem] leading-tight md:text-4xl text-[#1e2228] mb-1.5">Your <span className="accent-italic">library</span></h1>
        <p className="text-[#5c5a58] text-[14px] md:text-[15px]">
          {recordings.length > 0
            ? `${ready} recording${ready === 1 ? '' : 's'} ready to watch${isMember ? ' with your membership' : ''}.`
            : 'Recordings of your classes appear here.'}
        </p>
      </div>

      {recordings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#c9d6c9] bg-white/60 px-5 py-10 text-center">
          <span className="mx-auto mb-3 w-12 h-12 rounded-full bg-[#e9f3e9] text-[#1e5f2e] flex items-center justify-center" aria-hidden="true">
            <Video className="w-5 h-5" />
          </span>
          <p className="text-[16px] text-[#1e2228] font-medium">No recordings yet</p>
          <p className="text-[13.5px] text-[#6b6e68] mt-1 mb-5 max-w-xs mx-auto">
            {isMember
              ? 'New class recordings will appear here as they are added.'
              : PAYMENTS_ENABLED
                ? 'Join a live class to get its recording, or a membership for the whole library.'
                : 'Join a live class to get its recording. A membership for the whole library is coming soon.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link href="/classes" className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full bg-[#1e2228] text-white text-[14px] font-medium active:bg-[#2e7a3a]">
              Browse live classes
            </Link>
            {!isMember && (
              <Link href="/membership" className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-full border border-[#dde7dd] bg-white text-[14px] text-[#1e2228] font-medium">
                <Crown className="w-4 h-4 text-[#b38538]" aria-hidden="true" /> {PAYMENTS_ENABLED ? 'About membership' : 'Membership · coming soon'}
              </Link>
            )}
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
          {recordings.map((r) => (
            <li key={r._id}>
              <Link
                href={`/customer/library/${slugOf(r.slug)}`}
                className="group block rounded-2xl bg-white border border-[#dde7dd] overflow-hidden hover:border-[#2e7a3a]/40 active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
              >
                <div className="relative aspect-video bg-[#e9f3e9]">
                  {r.imageUrl ? (
                    <Image src={r.imageUrl} alt={r.imageAlt || r.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e9f3e9] to-[#f6e7c8]" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2228]/55 via-transparent to-transparent" aria-hidden="true" />
                  <span
                    className={`absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                      r.hasRecording ? 'bg-white text-[#1e5f2e]' : 'bg-[#1e2228]/70 text-white'
                    }`}
                  >
                    {r.hasRecording ? <PlayCircle className="w-4 h-4" aria-hidden="true" /> : <Hourglass className="w-3.5 h-3.5" aria-hidden="true" />}
                    {r.hasRecording ? 'Watch' : 'Coming soon'}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="text-[16px] text-[#1e2228] font-semibold leading-snug line-clamp-2">{r.title}</h2>
                  <p className="text-[12.5px] text-[#6b6e68] mt-1">Recorded {fmtDate(r.date)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
