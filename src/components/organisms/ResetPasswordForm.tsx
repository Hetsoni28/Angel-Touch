'use client'

import { useActionState, useState } from 'react'
import { resetPasswordAction } from '@/app/actions/auth'
import { Loader2, Eye, EyeOff } from 'lucide-react'

export function ResetPasswordForm() {
  const [state, action, isPending] = useActionState(resetPasswordAction, { success: false })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-3">Set New Password</h1>
        <p className="text-[#5c5a58] text-[14px]">
          Enter your new password below.
        </p>
      </div>

      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-500 text-center" role="alert" aria-live="assertive">
          <p className="text-[12px] text-red-700 font-medium">{state.error}</p>
        </div>
      )}

      <form action={action} className="flex flex-col gap-6" noValidate>
        <div>
          <label htmlFor="password" className="block text-[11px] font-bold tracking-widest uppercase text-[#4a4e4d] mb-2">
            New Password
          </label>
          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              aria-required="true"
              aria-invalid={Boolean(state.fieldErrors?.password)}
              aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
              className={`w-full bg-transparent border-b pb-3 pr-12 text-[15px] text-[#1e2228] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] transition-colors rounded-none ${
                state.fieldErrors?.password ? 'border-red-500 focus-visible:ring-red-500' : 'border-[#dde7dd] focus:border-[#2e7a3a]'
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
            <p id="password-error" role="alert" className="mt-2 text-[11px] text-red-600 font-medium">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="mt-4 w-full bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#6b6e68] text-white text-[11px] font-semibold tracking-widest uppercase px-10 min-h-[48px] py-4 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
              <span>Updating Password...</span>
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </form>
    </div>
  )
}
