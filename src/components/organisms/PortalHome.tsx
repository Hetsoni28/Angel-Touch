import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, Clock, PlayCircle, ArrowRight, Crown, GraduationCap } from 'lucide-react'
import { slugOf } from '@/sanity/lib/types'
import { PAYMENTS_ENABLED } from '@/lib/features'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { dayParts, fmtDate, fmtMonthYear, fmtTime, fmtWeekday, inr, relativeDay, type PortalClass } from '@/lib/portal'
import { AccentTitle } from '@/components/atoms/AccentTitle'

/* Customer portal home building blocks. Every value shown comes from the
   customer's real Supabase / Sanity data — empty states say so honestly. */

// ── Welcome card ──────────────────────────────────────────────────────────────
export function PortalWelcome({
  greeting, firstName, memberSince, isMember, membershipEnds, stats,
}: {
  greeting: string
  firstName: string
  memberSince?: string | null
  isMember: boolean
  membershipEnds?: string | null
  stats: { label: string; value: number; href: string }[]
}) {
  return (
    <section
      aria-label="Your account at a glance"
      className="relative overflow-hidden rounded-2xl text-white p-5 sm:p-7"
      style={{ background: 'linear-gradient(135deg, #1e5f2e 0%, #2a803f 55%, #1e5f2e 100%)' }}
    >
      {/* soft gold glow — decorative */}
      <div aria-hidden="true" className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-[#edc179]/20 blur-3xl pointer-events-none" />

      <div className="relative">
        <p className="text-[13px] text-white/75">{greeting},</p>
        <h1 className="text-[1.9rem] sm:text-[2.3rem] leading-tight mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
          {firstName}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium ${
              isMember ? 'bg-[#edc179] text-[#1e2228]' : 'bg-white/15 text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" aria-hidden="true" />
            {isMember && membershipEnds
              ? `Member · until ${fmtDate(membershipEnds)}`
              : PAYMENTS_ENABLED ? 'No active membership' : 'Membership coming soon'}
          </span>
          {memberSince && (
            <span className="text-[12px] text-white/70">With us since {fmtMonthYear(memberSince)}</span>
          )}
        </div>

        {/* Real counts — each opens the matching tab */}
        <dl className="grid grid-cols-3 gap-2 mt-6">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 transition-colors px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#edc179]"
            >
              <dd className="text-[1.6rem] leading-none tabular" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</dd>
              <dt className="text-[11px] text-white/75 mt-1.5 leading-tight">{s.label}</dt>
            </Link>
          ))}
        </dl>
      </div>
    </section>
  )
}

// ── Section heading used across the home screen ───────────────────────────────
export function PortalSectionTitle({ id, title, href, linkLabel }: { id?: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-3 mb-3">
      <h2 id={id} className="text-[1.2rem] text-[#1e2228] leading-tight" style={{ fontFamily: 'var(--font-heading)' }}><AccentTitle text={title} /></h2>
      {href && (
        <Link href={href} className="inline-flex items-center gap-1 min-h-[32px] text-[13px] font-medium text-[#1e5f2e] hover:text-[#2e7a3a]">
          {linkLabel ?? 'See all'} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

// ── Next class ────────────────────────────────────────────────────────────────
export function PortalNextClass({ nextClass, now }: { nextClass: PortalClass | null; now: Date }) {
  if (!nextClass) {
    return (
      <div className="rounded-2xl border border-dashed border-[#c9d6c9] bg-white/60 p-5 text-center">
        <span className="mx-auto mb-3 w-11 h-11 rounded-full bg-[#e9f3e9] text-[#1e5f2e] flex items-center justify-center" aria-hidden="true">
          <CalendarDays className="w-5 h-5" />
        </span>
        <p className="text-[15px] text-[#1e2228] font-medium">No upcoming classes booked</p>
        <p className="text-[13px] text-[#6b6e68] mt-1 mb-4">See what Heena is teaching next.</p>
        <Link href="/classes" className="inline-flex items-center justify-center min-h-[44px] px-5 rounded-full bg-[#1e2228] text-white text-[13px] font-medium active:bg-[#2e7a3a]">
          Browse live classes
        </Link>
      </div>
    )
  }

  const { day, month } = dayParts(nextClass.date)
  const when = relativeDay(nextClass.date, now)
  return (
    <Link
      href={`/classes/${slugOf(nextClass.slug)}`}
      className="group flex gap-4 rounded-2xl bg-white border border-[#dde7dd] p-4 sm:p-5 hover:border-[#2e7a3a]/40 active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
    >
      {/* Calendar block */}
      <div className="shrink-0 w-[68px] rounded-xl bg-[#faf8f2] border border-[#dde7dd] text-center overflow-hidden" aria-hidden="true">
        <p className="bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-widest uppercase py-1">{month}</p>
        <p className="text-[1.9rem] leading-none text-[#1e2228] py-2.5 tabular" style={{ fontFamily: 'var(--font-heading)' }}>{day}</p>
      </div>
      <div className="min-w-0 flex-1">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold mb-1.5 ${when === 'Today' || when === 'Tomorrow' ? 'bg-[#edc179] text-[#1e2228]' : 'bg-[#e9f3e9] text-[#1e5f2e]'}`}>
          {when}
        </span>
        <h3 className="text-[16px] sm:text-[17px] text-[#1e2228] font-semibold leading-snug line-clamp-2">{nextClass.title}</h3>
        <p className="text-[13px] text-[#6b6e68] mt-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>
            {fmtWeekday(nextClass.date)} · {nextClass.time || fmtTime(nextClass.date)} IST
            {nextClass.duration ? ` · ${nextClass.duration}` : ''}
          </span>
        </p>
      </div>
      <ArrowRight className="self-center w-5 h-5 text-[#b9c4b6] group-hover:text-[#2e7a3a] transition-colors shrink-0" aria-hidden="true" />
    </Link>
  )
}

// ── Recordings rail (swipe on phones) ─────────────────────────────────────────
export function PortalRecordingsRail({ recordings }: { recordings: PortalClass[] }) {
  if (recordings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#c9d6c9] bg-white/60 p-5 text-center">
        <span className="mx-auto mb-3 w-11 h-11 rounded-full bg-[#e9f3e9] text-[#1e5f2e] flex items-center justify-center" aria-hidden="true">
          <PlayCircle className="w-5 h-5" />
        </span>
        <p className="text-[15px] text-[#1e2228] font-medium">No recordings yet</p>
        <p className="text-[13px] text-[#6b6e68] mt-1">
          {PAYMENTS_ENABLED
            ? 'Recordings of classes you join, or every class with a membership, appear here.'
            : 'Recordings of the classes you join appear here.'}
        </p>
      </div>
    )
  }
  return (
    <ul
      className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Your recordings"
    >
      {recordings.slice(0, 8).map((r) => (
        <li key={r._id} className="snap-start shrink-0 w-[68%] sm:w-[240px]">
          <Link href={`/customer/library/${slugOf(r.slug)}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-xl">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#e9f3e9]">
              {r.imageUrl ? (
                <Image
                  src={r.imageUrl}
                  alt={r.imageAlt || r.title}
                  fill
                  sizes="(max-width: 640px) 70vw, 240px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#e9f3e9] to-[#f6e7c8]" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2228]/55 to-transparent" aria-hidden="true" />
              <PlayCircle className="absolute left-3 bottom-3 w-8 h-8 text-white drop-shadow" aria-hidden="true" />
            </div>
            <p className="mt-2 text-[14px] text-[#1e2228] font-medium leading-snug line-clamp-2">{r.title}</p>
            <p className="text-[12px] text-[#6b6e68] mt-0.5">Recorded {fmtDate(r.date)}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

// ── Membership: coming soon (shown while online payments are off) ─────────────
export function PortalMembershipComingSoon() {
  return (
    <div className="rounded-2xl border border-[#edc179]/60 bg-gradient-to-br from-[#fffaf0] to-white p-5">
      <div className="flex items-start gap-3">
        <span className="w-11 h-11 shrink-0 rounded-full bg-[#f6e7c8] text-[#8c6218] flex items-center justify-center" aria-hidden="true">
          <Crown className="w-5 h-5" />
        </span>
        <div>
          <span className="inline-block rounded-full bg-[#edc179] text-[#1e2228] px-2.5 py-0.5 text-[11px] font-semibold mb-1.5">Coming soon</span>
          <p className="text-[16px] text-[#1e2228] font-semibold leading-snug">Membership opens soon</p>
          <p className="text-[13.5px] text-[#6b6e68] mt-1 leading-relaxed">
            One membership will unlock every past class recording. We&apos;ll message you the day it opens.
          </p>
        </div>
      </div>
      <a
        href={generateWhatsAppLink({ type: 'MEMBERSHIP' })}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center min-h-[46px] rounded-xl bg-[#1e2228] text-white text-[14px] font-medium active:bg-[#2e7a3a]"
        aria-label="Ask to be notified on WhatsApp when membership opens (opens in a new tab)"
      >
        Notify me on WhatsApp
      </a>
    </div>
  )
}

// ── Recent payments ───────────────────────────────────────────────────────────
export function PortalRecentPayments({
  payments,
}: {
  payments: { id: string; amount: number; status: string; created_at?: string; payment_type: string }[]
}) {
  if (payments.length === 0) {
    return <p className="rounded-2xl bg-white border border-[#dde7dd] p-5 text-[14px] text-[#6b6e68]">No payments yet.</p>
  }
  return (
    <ul className="rounded-2xl bg-white border border-[#dde7dd] divide-y divide-[#dde7dd]/80">
      {payments.map((p) => {
        const Icon = p.payment_type === 'membership' ? Crown : GraduationCap
        return (
          <li key={p.id} className="flex items-center gap-3 p-4">
            <span className="w-10 h-10 rounded-full bg-[#faf8f2] border border-[#dde7dd] flex items-center justify-center text-[#1e5f2e] shrink-0" aria-hidden="true">
              <Icon className="w-[18px] h-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] text-[#1e2228] font-medium">{p.payment_type === 'membership' ? 'Membership' : 'Class enrollment'}</p>
              {p.created_at && <p className="text-[12px] text-[#6b6e68]">{fmtDate(p.created_at)}</p>}
            </div>
            <div className="text-right">
              <p className="text-[15px] text-[#1e2228] font-semibold tabular">{inr(p.amount)}</p>
              <p className={`text-[11px] font-semibold capitalize ${p.status === 'succeeded' ? 'text-[#1e5f2e]' : p.status === 'failed' ? 'text-red-700' : 'text-[#6b6e68]'}`}>
                {p.status === 'succeeded' ? 'Paid' : p.status}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

