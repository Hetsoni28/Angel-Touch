import { requireAuth } from '@/lib/supabase/auth'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '@/components/atoms/LogoutButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account | Angel Touch',
}

export const instant = false

export default async function AccountPage() {
  // requireAuth redirects to /login if not authenticated
  const user = await requireAuth()

  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, is_admin, created_at')
    .eq('id', user.id)
    .single()

  const role = profile?.is_admin ? 'ADMIN' : 'CUSTOMER'

  return (
    <section className="min-h-screen bg-[#faf8f2] pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-10">

        <div className="mb-12">
          <p className="text-[10px] font-semibold tracking-[0.28em] text-[#5c8f60] uppercase mb-4">
            My Account
          </p>
          <h1
            className="text-[2.4rem] font-medium text-[#1e2228] leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Welcome, {profile?.full_name ?? 'there'}
          </h1>
        </div>

        <span className="gold-rule mb-10 block" />

        {/* Profile summary */}
        <div className="bg-white border border-[#dde7dd]/60 p-8 md:p-10 mb-6">
          <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-6">
            Account Details
          </h2>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <dt className="text-[10px] tracking-[0.14em] uppercase text-[#8a8d87] mb-1">Name</dt>
              <dd className="text-[15px] text-[#1e2228]">{profile?.full_name ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.14em] uppercase text-[#8a8d87] mb-1">Email</dt>
              <dd className="text-[15px] text-[#1e2228]">{user.email}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.14em] uppercase text-[#8a8d87] mb-1">Role</dt>
              <dd>
                <span className={`inline-block px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase ${
                  role === 'ADMIN'
                    ? 'bg-[#1e2228] text-white'
                    : 'bg-[#e9f3e9] text-[#2e7a3a]'
                }`}>
                  {role}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.14em] uppercase text-[#8a8d87] mb-1">Member Since</dt>
              <dd className="text-[15px] text-[#1e2228]">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                  : '—'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Sign out */}
        <div className="flex justify-end">
          <LogoutButton />
        </div>

      </div>
    </section>
  )
}
