import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/organisms/ProfileForm'
import { connection } from 'next/server'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/app/actions/auth'
import { fmtMonthYear } from '@/lib/portal'

export const instant = false

export default async function CustomerProfilePage() {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const name = profile?.full_name?.trim() || user.email?.split('@')[0] || ''
  const initials = name.split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || 'AT'

  return (
    <div className="w-full">
      <div className="mb-5 md:mb-8">
        <h1 className="font-playfair text-[1.65rem] leading-tight md:text-3xl text-[#1e2228] mb-1.5">My <span className="accent-italic">profile</span></h1>
        <p className="text-[#5c5a58] text-[14px] md:text-[15px]">Your name, phone number and email.</p>
      </div>

      {/* Account card — real account details */}
      <div className="flex items-center gap-4 rounded-2xl bg-white border border-[#dde7dd] p-4 sm:p-5 mb-4">
        <span
          aria-hidden="true"
          className="w-14 h-14 shrink-0 rounded-full bg-[#1e5f2e] text-[#f6e7c8] flex items-center justify-center text-[18px] font-semibold"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="text-[17px] text-[#1e2228] font-semibold truncate">{name}</p>
          <p className="text-[13px] text-[#6b6e68] truncate">{user.email}</p>
          {profile?.created_at && (
            <p className="text-[12px] text-[#6b6e68] mt-0.5">With us since {fmtMonthYear(profile.created_at)}</p>
          )}
        </div>
      </div>

      <ProfileForm initialData={{
        full_name: profile?.full_name || null,
        phone: profile?.phone || null,
        email: user.email
      }} />

      {/* Phones: sign out lives here (the tab bar keeps five tabs). Desktop has it in the sidebar. */}
      <form action={logoutAction} className="md:hidden mt-6">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 min-h-[52px] rounded-xl border border-red-200 bg-white text-[15px] font-medium text-red-700 active:bg-red-50"
        >
          <LogOut className="w-[18px] h-[18px]" aria-hidden="true" />
          Sign out
        </button>
      </form>
    </div>
  )
}
