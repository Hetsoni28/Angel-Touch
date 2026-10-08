'use client'

import { useActionState } from 'react'
import { registerAction, type AuthActionResult } from '@/app/actions/auth'
import Link from 'next/link'

const initialState: AuthActionResult = { success: false }

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, initialState)

  // ── Success: email confirmation sent ──
  if (state.success && state.message) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#e9f3e9] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#2e7a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <h2
          className="text-[1.8rem] font-medium text-[#1e2228] leading-[1.1] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Check your inbox
        </h2>
        <p className="text-[14px] text-[#5c5a58] leading-[1.8] mb-8">
          {state.message}
        </p>
        <p className="text-[12px] text-[#8a8d87]">
          Didn&apos;t receive it? Check your spam folder, or{' '}
          <button onClick={() => window.location.reload()} className="text-[#2e7a3a] underline">
            try again
          </button>.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4">
          Create Account
        </p>
        <h1
          className="text-[2.2rem] font-medium text-[#1e2228] leading-[1.1] mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Join Angel Touch
        </h1>
        <p className="text-[14px] text-[#5c5a58] leading-[1.7]">
          Create your account to book classes, access recordings, and manage your wellness journey.
        </p>
      </div>

      {/* Global error */}
      {state.error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[13px] leading-[1.6]">
          {state.error}
        </div>
      )}

      <form action={action} className="flex flex-col gap-5">
        
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5c5a58] mb-2"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            className="w-full px-4 py-3 bg-white border border-[#dde7dd] text-[14px] text-[#1e2228] placeholder-[#a8a8a8] focus:outline-none focus:border-[#2e7a3a] transition-colors"
            placeholder="Heena Thaker"
          />
          {state.fieldErrors?.fullName && (
            <p className="mt-1.5 text-[12px] text-red-600">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5c5a58] mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 bg-white border border-[#dde7dd] text-[14px] text-[#1e2228] placeholder-[#a8a8a8] focus:outline-none focus:border-[#2e7a3a] transition-colors"
            placeholder="you@example.com"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1.5 text-[12px] text-red-600">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5c5a58] mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="w-full px-4 py-3 bg-white border border-[#dde7dd] text-[14px] text-[#1e2228] placeholder-[#a8a8a8] focus:outline-none focus:border-[#2e7a3a] transition-colors"
            placeholder="Minimum 8 characters"
          />
          {state.fieldErrors?.password && (
            <p className="mt-1.5 text-[12px] text-red-600">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] disabled:bg-[#5c8f60] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200"
        >
          {isPending ? 'Creating account…' : 'Create Account'}
        </button>

      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <span className="flex-1 h-px bg-[#dde7dd]" />
        <span className="text-[11px] text-[#8a8d87] tracking-wide">or</span>
        <span className="flex-1 h-px bg-[#dde7dd]" />
      </div>

      {/* Login link */}
      <p className="text-center text-[13px] text-[#5c5a58]">
        Already have an account?{' '}
        <Link href="/login" className="text-[#2e7a3a] font-semibold hover:underline">
          Sign in
        </Link>
      </p>

    </div>
  )
}
