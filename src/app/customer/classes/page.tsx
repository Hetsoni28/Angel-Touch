import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import { CalendarDays, Clock, CheckCircle2, PlayCircle, Hourglass, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPortalData, dayParts, fmtDate, fmtTime, fmtWeekday, relativeDay } from '@/lib/portal'
import { slugOf } from '@/sanity/lib/types'

export const instant = false

/** Customer portal — My classes. Upcoming / Past tabs (via ?tab=past, no client JS needed). */
export default async function MyClassesPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/customer/classes')

  const { tab } = await searchParams
  const { now, upcoming, past } = await getPortalData(user.id)
  const showPast = tab === 'past'
  const list = showPast ? past : upcoming

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: upcoming.length, href: '/customer/classes' },
    { key: 'past', label: 'Past', count: past.length, href: '/customer/classes?tab=past' },
  ]

  return (
    <div className="w-full">
      <div className="mb-5 md:mb-8">
        <h1 className="font-playfair text-[1.65rem] leading-tight md:text-4xl text-[#1e2228] mb-1.5">My <span className="accent-italic">classes</span></h1>
        <p className="text-[#5c5a58] text-[14px] md:text-[15px]">Live classes you&apos;ve joined, and their recordings.</p>
      </div>

      {/* Segmented control */}
      <nav aria-label="Class list" className="grid grid-cols-2 p-1 mb-5 rounded-full bg-white border border-[#dde7dd] max-w-sm">
        {tabs.map((t) => {
          const active = (t.key === 'past') === showPast
          return (
            <Link
              key={t.key}
              href={t.href}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center justify-center gap-2 h-10 rounded-full text-[14px] transition-colors ${
                active ? 'bg-[#1e5f2e] text-white font-semibold' : 'text-[#4a4846] hover:text-[#1e2228]'
              }`}
            >
              {t.label}
              <span className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] flex items-center justify-center tabular ${active ? 'bg-white/20' : 'bg-[#faf8f2] border border-[#dde7dd]'}`}>
                {t.count}
              </span>
            </Link>
          )
        })}
      </nav>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#c9d6c9] bg-white/60 px-5 py-10 text-center">
          <span className="mx-auto mb-3 w-12 h-12 rounded-full bg-[#e9f3e9] text-[#1e5f2e] flex items-center justify-center" aria-hidden="true">
            <CalendarDays className="w-5 h-5" />
          </span>
          <p className="text-[16px] text-[#1e2228] font-medium">{showPast ? 'No past classes yet' : 'No upcoming classes'}</p>
          <p className="text-[13.5px] text-[#6b6e68] mt-1 mb-5 max-w-xs mx-auto">
            {showPast ? 'Classes you join will appear here after they take place.' : 'Join a live class and it will appear here with its date and time.'}
          </p>
          <Link href="/classes" className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full bg-[#1e2228] text-white text-[14px] font-medium active:bg-[#2e7a3a]">
            Browse live classes
          </Link>
        </div>
      ) : showPast ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
          {past.map((c) => (
            <li key={c._id} className="rounded-2xl bg-white border border-[#dde7dd] overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-[#e9f3e9]">
                {c.imageUrl ? (
                  <Image src={c.imageUrl} alt={c.imageAlt || c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e9f3e9] to-[#f6e7c8]" aria-hidden="true" />
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-[16px] text-[#1e2228] font-semibold leading-snug">{c.title}</h2>
                <p className="text-[12.5px] text-[#6b6e68] mt-1">Took place {fmtDate(c.date)}</p>
                <div className="mt-auto pt-4">
                  {c.hasRecording ? (
                    <Link
                      href={`/customer/library/${slugOf(c.slug)}`}
                      className="flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-[#1e5f2e] text-white text-[14px] font-medium active:bg-[#2e7a3a]"
                    >
                      <PlayCircle className="w-[18px] h-[18px]" aria-hidden="true" /> Watch recording
                    </Link>
                  ) : (
                    <p className="flex items-center justify-center gap-2 min-h-[46px] rounded-xl bg-[#faf8f2] border border-[#dde7dd] text-[13.5px] text-[#6b6e68]">
                      <Hourglass className="w-4 h-4" aria-hidden="true" /> Recording coming soon
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-3">
          {upcoming.map((c) => {
            const { day, month } = dayParts(c.date)
            const when = relativeDay(c.date, now)
            return (
              <li key={c._id}>
                <Link
                  href={`/classes/${slugOf(c.slug)}`}
                  className="group flex gap-4 rounded-2xl bg-white border border-[#dde7dd] p-4 hover:border-[#2e7a3a]/40 active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
                >
                  <div className="shrink-0 w-[64px] rounded-xl bg-[#faf8f2] border border-[#dde7dd] text-center overflow-hidden" aria-hidden="true">
                    <p className="bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-widest uppercase py-1">{month}</p>
                    <p className="text-[1.75rem] leading-none text-[#1e2228] py-2.5 tabular" style={{ fontFamily: 'var(--font-heading)' }}>{day}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${when === 'Today' || when === 'Tomorrow' ? 'bg-[#edc179] text-[#1e2228]' : 'bg-[#e9f3e9] text-[#1e5f2e]'}`}>{when}</span>
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-[#faf8f2] border border-[#dde7dd] text-[#1e5f2e]">
                        <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Confirmed
                      </span>
                    </div>
                    <h2 className="text-[16px] text-[#1e2228] font-semibold leading-snug">{c.title}</h2>
                    <p className="text-[13px] text-[#6b6e68] mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      {fmtWeekday(c.date)} · {c.time || fmtTime(c.date)} IST{c.duration ? ` · ${c.duration}` : ''}
                    </p>
                  </div>
                  <ArrowRight className="self-center w-5 h-5 text-[#b9c4b6] group-hover:text-[#2e7a3a] transition-colors shrink-0" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
