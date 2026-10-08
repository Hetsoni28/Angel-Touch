'use client'

import { logoutAction } from '@/app/actions/auth'

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors"
      >
        Sign Out
      </button>
    </form>
  )
}
