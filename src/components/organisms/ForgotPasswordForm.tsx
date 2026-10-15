'use client'

import { useActionState } from 'react'
import { forgotPasswordAction } from '@/app/actions/auth'
import { Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, { success: false })

  if (state.success) {
    return (
      <div className="text-center fade-in-up" role="status" aria-live="polite">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-4">Check your email</h1>
        <p className="text-[#5c5a58] text-[15px] leading-relaxed mb-8">
          {state.message}
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center min-h-[44px] text-[12px] font-semibold tracking-widest uppercase text-[#2e7a3a] hover:text-[#1e5f2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors group"
        >
          Return to login
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-3">Reset Password</h1>
        <p className="text-[#5c5a58] text-[14px]">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-500 text-center" role="alert" aria-live="assertive">
          <p className="text-[12px] text-red-700 font-medium">{state.error}</p>
        </div>
      )}

      <form action={action} className="flex flex-col gap-6" noValidate>
        <div>
          <label htmlFor="email" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className={`w-full bg-transparent border-b pb-3 text-[15px] text-[#1e2228] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] transition-colors rounded-none ${
              state.fieldErrors?.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-[#dde7dd] focus:border-[#2e7a3a]'
            }`}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" role="alert" className="mt-2 text-[11px] text-red-600 font-medium">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-2 w-full bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#6b6e68] text-white text-[11px] font-semibold tracking-widest uppercase px-10 min-h-[48px] py-4 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
              <span>Sending Link...</span>
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="inline-flex items-center justify-center min-h-[44px] text-[12px] font-semibold tracking-widest uppercase text-[#5c5a58] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
        >
          Back to login
        </Link>
      </div>
    </div>
  )
}
