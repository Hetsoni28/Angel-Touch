'use client'

import { useActionState } from 'react'
import { loginAction, type AuthActionResult } from '@/app/actions/auth'
import Link from 'next/link'

const initialState: AuthActionResult = { success: false }

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState)

  return (
    <div className="w-full max-w-md mx-auto">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4">
          Welcome Back
        </p>
        <h1
          className="text-[2.2rem] font-medium text-[#1e2228] leading-[1.1] mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Sign in to Angel Touch
        </h1>
        <p className="text-[14px] text-[#5c5a58] leading-[1.7]">
          Access your bookings, recordings, and membership details.
        </p>
      </div>

      {/* Global error */}
      {state.error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[13px] leading-[1.6]">
          {state.error}
        </div>
      )}

      <form action={action} className="flex flex-col gap-5">

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
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5c5a58]"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-[#5c8f60] hover:text-[#2e7a3a] transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 bg-white border border-[#dde7dd] text-[14px] text-[#1e2228] placeholder-[#a8a8a8] focus:outline-none focus:border-[#2e7a3a] transition-colors"
            placeholder="Your password"
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
          {isPending ? 'Signing in…' : 'Sign In'}
        </button>

      </form>

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <span className="flex-1 h-px bg-[#dde7dd]" />
        <span className="text-[11px] text-[#8a8d87] tracking-wide">or</span>
        <span className="flex-1 h-px bg-[#dde7dd]" />
      </div>

      {/* Register link */}
      <p className="text-center text-[13px] text-[#5c5a58]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#2e7a3a] font-semibold hover:underline">
          Create one
        </Link>
      </p>

    </div>
  )
}
