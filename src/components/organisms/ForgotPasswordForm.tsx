'use client'

import { useActionState } from 'react'
import { forgotPasswordAction } from '@/app/actions/auth'
import { Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, { success: false })

  if (state.success) {
    return (
      <div className="text-center fade-in-up">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-4">Check your email</h1>
        <p className="text-[#5c5a58] text-[15px] leading-relaxed mb-8">
          {state.message}
        </p>
        <Link
          href="/login"
          className="inline-flex items-center text-[12px] font-semibold tracking-widest uppercase text-[#2e7a3a] hover:text-[#1e5f2e] transition-colors group"
        >
          Return to login
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-3">Reset Password</h1>
        <p className="text-[#5c5a58] text-[14px]">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-500 text-center">
          <p className="text-[12px] text-red-700 font-medium">{state.error}</p>
        </div>
      )}

      <form action={action} className="flex flex-col gap-6">
        <div>
          <label htmlFor="email" className="block text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-transparent border-b border-[#dde7dd] pb-3 text-[15px] text-[#1e2228] focus:border-[#2e7a3a] outline-none transition-colors"
          />
          {state.fieldErrors?.email && (
            <p className="mt-2 text-[11px] text-red-600">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#8a8d87] text-white text-[11px] font-semibold tracking-widest uppercase px-10 py-4 transition-colors flex items-center justify-center"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-[12px] font-semibold tracking-widest uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors"
        >
          Back to login
        </Link>
      </div>
    </div>
  )
}
