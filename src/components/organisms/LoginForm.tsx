'use client'

import { useState, useActionState } from 'react'
import { loginAction, type AuthActionResult } from '@/app/actions/auth'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const initialState: AuthActionResult = { success: false }

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()

  const reason = searchParams.get('reason')
  const reset = searchParams.get('reset')
  const redirectUrl = searchParams.get('redirect')

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-playfair text-3xl sm:text-4xl text-[#1e2228] mb-3">Welcome Back</h1>
        <p className="text-[15px] text-[#5c5a58] leading-relaxed">
          Sign in to access your classes, formulations, and exclusive masterclass vault.
        </p>
      </div>

      {/* Session Expired Notice */}
      {reason === 'expired' && (
        <div role="status" className="mb-8 p-4 bg-[#faf8f2] border-l-2 border-[#edc179] text-[#735118] text-[13px] flex items-start gap-3">
          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#b38538]" aria-hidden="true" />
          <span>Your session has expired. For your security, please sign in again to continue.</span>
        </div>
      )}

      {/* Unauthenticated Access Notice */}
      {reason === 'unauthenticated' && (
        <div role="status" className="mb-8 p-4 bg-[#faf8f2] border-l-2 border-[#2e7a3a] text-[#1e2228] text-[13px] flex items-start gap-3">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2e7a3a]" aria-hidden="true" />
          <span>Please sign in with your credentials to access that protected page.</span>
        </div>
      )}

      {/* Password Reset Success */}
      {reset === 'success' && (
        <div role="status" className="mb-8 p-4 bg-[#f0f9f0] border-l-2 border-[#2e7a3a] text-[#1e5f2e] text-[13px] flex items-start gap-3">
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2e7a3a]" aria-hidden="true" />
          <span>Your password has been reset successfully. Please sign in with your new credentials.</span>
        </div>
      )}

      {/* Global / Wrong password error */}
      {state.error && (
        <div role="alert" aria-live="assertive" className="mb-8 p-4 bg-[#fef2f2] border-l-2 border-red-500 text-red-700 text-[13px] flex flex-col gap-2">
          <span>{state.error}</span>
          {state.error.toLowerCase().includes('invalid') && (
            <Link
              href="/forgot-password"
              className="text-[11px] font-bold text-red-700 hover:text-red-900 uppercase tracking-wider inline-flex items-center gap-1 mt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 rounded-sm"
            >
              Forgot your password? Reset it here &rarr;
            </Link>
          )}
        </div>
      )}

      <form action={action} className="flex flex-col gap-6" noValidate>
        <input type="hidden" name="redirect" value={redirectUrl || ''} />
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
            className={`w-full bg-transparent border-b pb-3 text-[15px] text-[#1e2228] focus:outline-none transition-colors rounded-none focus-visible:border-[#2e7a3a] focus-visible:ring-1 focus-visible:ring-[#2e7a3a] ${state.fieldErrors?.email ? 'border-red-500 focus:border-red-600' : 'border-[#dde7dd] focus:border-[#2e7a3a]'}`}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" role="alert" className="mt-2 text-[11px] text-red-600 font-medium tracking-wide">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d]">
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="text-[11px] font-semibold text-[#6b6e68] hover:text-[#2e7a3a] uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] rounded-sm py-0.5 px-1"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              aria-required="true"
              aria-invalid={Boolean(state.fieldErrors?.password)}
              aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
              className={`w-full bg-transparent border-b pb-3 pr-12 text-[15px] text-[#1e2228] focus:outline-none transition-colors rounded-none focus-visible:border-[#2e7a3a] focus-visible:ring-1 focus-visible:ring-[#2e7a3a] ${state.fieldErrors?.password ? 'border-red-500 focus:border-red-600' : 'border-[#dde7dd] focus:border-[#2e7a3a]'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 bottom-1 my-auto w-11 h-11 flex items-center justify-center text-[#6b6e68] hover:text-[#1e2228] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
          {state.fieldErrors?.password && (
            <p id="password-error" role="alert" className="mt-2 text-[11px] text-red-600 font-medium tracking-wide">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-6 w-full min-h-[48px] group relative flex justify-center items-center py-4 bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#8a8d87] text-white text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 rounded-sm transition-all duration-300"
        >
          {isPending ? 'Authenticating...' : 'Sign In'}
          {!isPending && <ArrowRight className="absolute right-6 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" aria-hidden="true" />}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-10 mb-8 flex items-center gap-4">
        <span className="flex-1 h-px bg-[#dde7dd]" />
        <span className="text-[10px] text-[#8a8d87] uppercase tracking-widest font-semibold">New to Angel Touch?</span>
        <span className="flex-1 h-px bg-[#dde7dd]" />
      </div>

      {/* Register link */}
      <Link 
        href="/register" 
        className="block w-full py-4 text-center border border-[#1e2228] text-[#1e2228] hover:bg-[#faf8f2] text-[11px] font-semibold tracking-widest uppercase transition-colors"
      >
        Create an Account
      </Link>

    </div>
  )
}
