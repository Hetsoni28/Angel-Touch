'use client'

import { useActionState } from 'react'
import { loginAction, type AuthActionResult } from '@/app/actions/auth'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const initialState: AuthActionResult = { success: false }

export function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, initialState)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-playfair text-4xl text-[#1e2228] mb-3">Welcome Back</h1>
        <p className="text-[15px] text-[#5c5a58] leading-relaxed">
          Sign in to access your classes, formulations, and exclusive masterclass vault.
        </p>
      </div>

      {/* Global error */}
      {state.error && (
        <div className="mb-8 px-4 py-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-[13px]">
          {state.error}
        </div>
      )}

      <form action={action} className="flex flex-col gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`w-full bg-transparent border-b pb-3 text-[15px] text-[#1e2228] focus:outline-none transition-colors rounded-none ${state.fieldErrors?.email ? 'border-red-500 focus:border-red-600' : 'border-[#dde7dd] focus:border-[#2e7a3a]'}`}
          />
          {state.fieldErrors?.email && (
            <p className="mt-2 text-[11px] text-red-600 font-medium tracking-wide">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-[10px] font-bold tracking-widest uppercase text-[#8a8d87]">
              Password
            </label>
            <Link href="/forgot-password" className="text-[10px] font-semibold text-[#8a8d87] hover:text-[#2e7a3a] uppercase tracking-widest transition-colors">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`w-full bg-transparent border-b pb-3 text-[15px] text-[#1e2228] focus:outline-none transition-colors rounded-none ${state.fieldErrors?.password ? 'border-red-500 focus:border-red-600' : 'border-[#dde7dd] focus:border-[#2e7a3a]'}`}
          />
          {state.fieldErrors?.password && (
            <p className="mt-2 text-[11px] text-red-600 font-medium tracking-wide">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full group relative flex justify-center items-center py-4 bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#8a8d87] text-white text-[11px] font-semibold tracking-widest uppercase transition-all duration-300"
        >
          {isPending ? 'Authenticating...' : 'Sign In'}
          {!isPending && <ArrowRight className="absolute right-6 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />}
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
