'use client'

import { useActionState, useEffect } from 'react'
import { updateProfileAction } from '@/app/actions/profile'
import { CheckCircle2, Loader2 } from 'lucide-react'

export function ProfileForm({ initialData }: { initialData: { full_name: string | null, phone: string | null, email: string | undefined } }) {
  const [state, action, isPending] = useActionState(updateProfileAction, { success: false })

  return (
    <form action={action} className="bg-white border border-[#dde7dd] p-8 md:p-12">
      <div className="mb-10">
        <h2 className="font-playfair text-2xl text-[#1e2228] mb-2">Personal Information</h2>
        <p className="text-[#5c5a58] text-[14px]">Update your name and contact details.</p>
      </div>

      {state.success && (
        <div className="mb-8 p-4 bg-[#e9f3e9] border border-[#2e7a3a] flex items-center gap-3" role="status" aria-live="polite">
          <CheckCircle2 className="w-5 h-5 text-[#2e7a3a]" aria-hidden="true" />
          <p className="text-[13px] text-[#1e5f2e] font-medium">Profile updated successfully.</p>
        </div>
      )}

      {state.error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-500" role="alert" aria-live="assertive">
          <p className="text-[13px] text-red-700 font-medium">{state.error}</p>
        </div>
      )}

      <div className="flex flex-col gap-8 max-w-xl">
        {/* Email (Read-only) */}
        <div>
          <label htmlFor="user-email" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            Email Address
          </label>
          <input
            id="user-email"
            type="email"
            value={initialData.email || ''}
            disabled
            aria-describedby="email-help"
            className="w-full bg-[#faf8f2] border-b border-[#dde7dd] pb-3 text-[15px] text-[#5c5a58] cursor-not-allowed outline-none"
          />
          <p id="email-help" className="mt-2 text-[11px] text-[#5c5a58]">Email address is managed by authentication and cannot be edited directly.</p>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={initialData.full_name || ''}
            required
            aria-required="true"
            className="w-full bg-transparent border-b border-[#dde7dd] pb-3 text-[15px] text-[#1e2228] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] focus:border-[#2e7a3a] transition-colors rounded-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={initialData.phone || ''}
            placeholder="+91"
            className="w-full bg-transparent border-b border-[#dde7dd] pb-3 text-[15px] text-[#1e2228] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] focus:border-[#2e7a3a] transition-colors rounded-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-4 self-start bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#6b6e68] text-white text-[11px] font-semibold tracking-widest uppercase px-10 min-h-[48px] py-4 transition-colors flex items-center justify-center min-w-[160px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
              <span>Saving...</span>
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  )
}
