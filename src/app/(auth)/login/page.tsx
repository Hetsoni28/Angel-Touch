import { LoginForm } from '@/components/organisms/LoginForm'
import { getCurrentUser } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sign In | Angel Touch',
  description: 'Sign in to your Angel Touch account.',
}

export const instant = false

export default async function LoginPage() {
  // If already logged in, redirect to account
  const user = await getCurrentUser()
  if (user) redirect('/account')

  return (
    <Suspense fallback={<div className="py-12 text-center text-xs tracking-widest uppercase text-[#8a8d87]">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
