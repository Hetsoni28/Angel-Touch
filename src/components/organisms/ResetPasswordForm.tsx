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
        <div className="mb-6 p-4 bg-red-50 border border-red-500 text-center">
          <p className="text-[12px] text-red-700 font-medium">{state.error}</p>
        </div>
      )}

      <form action={action} className="flex flex-col gap-6">
        <div className="relative">
          <label htmlFor="password" className="block text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] mb-2">
            New Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="w-full bg-transparent border-b border-[#dde7dd] pb-3 text-[15px] text-[#1e2228] focus:border-[#2e7a3a] outline-none transition-colors pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 bottom-3 text-[#8a8d87] hover:text-[#1e2228] transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          {state.fieldErrors?.password && (
            <p className="mt-2 text-[11px] text-red-600">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full bg-[#1e2228] hover:bg-[#2e7a3a] disabled:bg-[#8a8d87] text-white text-[11px] font-semibold tracking-widest uppercase px-10 py-4 transition-colors flex items-center justify-center"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
        </button>
      </form>
    </div>
  )
}
