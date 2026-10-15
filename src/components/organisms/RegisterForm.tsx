'use client'

import { useState, useActionState } from 'react'
import { registerAction, type AuthActionResult } from '@/app/actions/auth'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react'

const initialState: AuthActionResult = { success: false }

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, initialState)
  const [showPassword, setShowPassword] = useState(false)

  // Success State (Check your inbox)
  if (state.success && state.message) {
    return (
      <div className="w-full text-center fade-in-up" role="status" aria-live="polite">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#e9f3e9] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#2e7a3a]" aria-hidden="true" />
          </div>
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl text-[#1e2228] mb-4">
          Check your inbox
        </h2>
        <p className="text-[15px] text-[#5c5a58] leading-relaxed mb-10">
          {state.message}
        </p>
        <div className="pt-8 border-t border-[#dde7dd]">
          <p className="text-[12px] text-[#5c5a58]">
            Didn&apos;t receive the email? Check your spam folder, or{' '}
            <button 
              onClick={() => window.location.reload()} 
              className="text-[#1e2228] font-semibold underline underline-offset-2 hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
            >
              click here to try again
            </button>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-playfair text-3xl sm:text-4xl text-[#1e2228] mb-3">Join Angel Touch</h1>
        <p className="text-[15px] text-[#5c5a58] leading-relaxed">
          Create an account to book live masterclasses and unlock the recorded formulation vault.
        </p>
      </div>

      {/* Global error */}
      {state.error && (
        <div 
          className="mb-8 px-4 py-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-[13px]" 
          role="alert" 
          aria-live="assertive"
        >
          {state.error}
        </div>
      )}

      <form action={action} className="flex flex-col gap-6" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(state.fieldErrors?.fullName)}
            aria-describedby={state.fieldErrors?.fullName ? "fullName-error" : undefined}
            className={`w-full bg-transparent border-b pb-3 text-[15px] text-[#1e2228] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] transition-colors rounded-none ${
              state.fieldErrors?.fullName 
                ? 'border-red-500 focus:border-red-600 focus-visible:ring-red-500' 
                : 'border-[#dde7dd] focus:border-[#2e7a3a]'
            }`}
          />
          {state.fieldErrors?.fullName && (
            <p id="fullName-error" role="alert" className="mt-2 text-[11px] text-red-600 font-medium tracking-wide">
              {state.fieldErrors.fullName[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
            className={`w-full bg-transparent border-b pb-3 text-[15px] text-[#1e2228] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] transition-colors rounded-none ${
              state.fieldErrors?.email 
                ? 'border-red-500 focus:border-red-600 focus-visible:ring-red-500' 
                : 'border-[#dde7dd] focus:border-[#2e7a3a]'
            }`}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" role="alert" className="mt-2 text-[11px] text-red-600 font-medium tracking-wide">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              aria-required="true"
              aria-invalid={Boolean(state.fieldErrors?.password)}
              aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
              className={`w-full bg-transparent border-b pb-3 pr-12 text-[15px] text-[#1e2228] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] transition-colors rounded-none ${
                state.fieldErrors?.password 
                  ? 'border-red-500 focus:border-red-600 focus-visible:ring-red-500' 
                  : 'border-[#dde7dd] focus:border-[#2e7a3a]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 bottom-2 my-auto min-w-[44px] min-h-[44px] flex items-center justify-center text-[#5c5a58] hover:text-[#1e2228] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
          {state.fieldErrors?.password && (
            <p id="password-error" role="alert" className="mt-2 text-[11px] text-red-600 font-medium tracking-wide">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-6 w-full group relative flex justify-center items-center min-h-[48px] py-4 bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#6b6e68] text-white text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-all duration-300"
        >
          {isPending ? 'Creating Account...' : 'Create Account'}
          {!isPending && <ArrowRight className="absolute right-6 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" aria-hidden="true" />}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-10 mb-8 flex items-center gap-4">
        <span className="flex-1 h-px bg-[#dde7dd]" aria-hidden="true" />
        <span className="text-[10px] text-[#5c5a58] uppercase tracking-widest font-semibold">Already registered?</span>
        <span className="flex-1 h-px bg-[#dde7dd]" aria-hidden="true" />
      </div>

      {/* Login link */}
      <Link 
        href="/login" 
        className="flex items-center justify-center w-full min-h-[48px] py-4 text-center border border-[#1e2228] text-[#1e2228] hover:bg-[#faf8f2] text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
      >
        Sign in instead
      </Link>

    </div>
  )
}
