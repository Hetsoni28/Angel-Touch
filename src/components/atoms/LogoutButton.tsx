'use client'

import { logoutAction } from '@/app/actions/auth'

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        aria-label="Sign out of your account"
        className="min-h-[44px] inline-flex items-center justify-center px-3 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#4a4846] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
      >
        Sign Out
      </button>
    </form>
  )
}
