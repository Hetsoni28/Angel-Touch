'use client'

import { useActionState } from 'react'
import { updateProfileAction } from '@/app/actions/profile'
import { CheckCircle2, Loader2, Lock } from 'lucide-react'

const field =
  'w-full h-[52px] px-4 rounded-xl bg-white border border-[#dde7dd] text-[16px] text-[#1e2228] placeholder-[#a3a69f] focus:outline-none focus:border-[#2e7a3a] focus:ring-2 focus:ring-[#2e7a3a]/20 transition'
const label = 'block text-[13px] font-medium text-[#4a4846] mb-1.5'

/** Profile details form — app-style fields (16px text so iOS doesn't zoom on focus). */
export function ProfileForm({ initialData }: { initialData: { full_name: string | null; phone: string | null; email: string | undefined } }) {
  const [state, action, isPending] = useActionState(updateProfileAction, { success: false })

  return (
    <form action={action} className="rounded-2xl bg-white/60 md:bg-white border border-[#dde7dd] p-4 sm:p-6 md:p-8">
      <h2 className="text-[1.2rem] text-[#1e2228] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Personal details</h2>

      {state.success && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#e9f3e9] border border-[#2e7a3a]/40 flex items-center gap-2.5" role="status" aria-live="polite">
          <CheckCircle2 className="w-5 h-5 text-[#2e7a3a] shrink-0" aria-hidden="true" />
          <p className="text-[14px] text-[#1e5f2e] font-medium">Your details are saved.</p>
        </div>
      )}
      {state.error && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-300" role="alert" aria-live="assertive">
          <p className="text-[14px] text-red-700 font-medium">{state.error}</p>
        </div>
      )}

      <div className="flex flex-col gap-5 max-w-xl">
        <div>
          <label htmlFor="fullName" className={label}>Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            defaultValue={initialData.full_name || ''}
            required
            aria-required="true"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="phone" className={label}>Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={initialData.phone || ''}
            placeholder="+91 98765 43210"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="user-email" className={label}>Email</label>
          <div className="relative">
            <input
              id="user-email"
              type="email"
              value={initialData.email || ''}
              readOnly
              aria-describedby="email-help"
              className={`${field} bg-[#faf8f2] text-[#6b6e68] pr-11 cursor-default`}
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a69f]" aria-hidden="true" />
          </div>
          <p id="email-help" className="mt-1.5 text-[12.5px] text-[#6b6e68]">This is your sign-in email and can&apos;t be changed here.</p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-1 w-full md:w-auto md:self-start md:px-10 h-[52px] rounded-xl bg-[#1e5f2e] hover:bg-[#2e7a3a] disabled:bg-[#6b6e68] text-white text-[15px] font-medium flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2"
        >
          {isPending ? (<><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Saving…</>) : 'Save changes'}
        </button>
      </div>
    </form>
  )
}
