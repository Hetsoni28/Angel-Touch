/**
 * India-time date/currency formatting for the customer portal.
 * No server imports, so client components (e.g. the video player) can use it too.
 */
// ── India-time formatting (servers run in UTC; classes are scheduled in IST) ──
const IST = 'Asia/Kolkata'
export const fmtDate = (d: string | Date) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: IST, day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d))
export const fmtDayMonth = (d: string | Date) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: IST, day: 'numeric', month: 'long' }).format(new Date(d))
export const fmtWeekday = (d: string | Date) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: IST, weekday: 'long' }).format(new Date(d))
export const fmtTime = (d: string | Date) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: IST, hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(d))
export const fmtMonthYear = (d: string | Date) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: IST, month: 'long', year: 'numeric' }).format(new Date(d))
export const dayParts = (d: string | Date) => {
  const parts = new Intl.DateTimeFormat('en-IN', { timeZone: IST, day: 'numeric', month: 'short' }).formatToParts(new Date(d))
  return { day: parts.find((p) => p.type === 'day')?.value ?? '', month: parts.find((p) => p.type === 'month')?.value ?? '' }
}
export const inr = (n: number) => n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

/** Calendar days from `now` to `target`, both in India time. */
export function daysUntil(target: string | Date, now: Date) {
  const key = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: IST }).format(d) // YYYY-MM-DD
  const a = Date.parse(key(now)), b = Date.parse(key(new Date(target)))
  return Math.round((b - a) / 86_400_000)
}
export const relativeDay = (target: string | Date, now: Date) => {
  const n = daysUntil(target, now)
  return n <= 0 ? 'Today' : n === 1 ? 'Tomorrow' : `In ${n} days`
}

/** Greeting for the current hour in India. */
export function greeting(now: Date) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: IST, hour: 'numeric', hour12: false }).format(now))
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
}
