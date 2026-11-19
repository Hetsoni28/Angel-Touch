import { RegisterForm } from '@/components/organisms/RegisterForm'
import { getCurrentUser } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// Account pages are not useful in search results.
export const metadata: Metadata = pageMetadata({
  title: 'Create Account',
  description: 'Create your Angel Touch account to join live Ayurvedic masterclasses and access your class recordings.',
  path: '/register',
  noindex: true,
})

export const instant = false

export default async function RegisterPage() {
  // If already logged in, redirect to account
  const user = await getCurrentUser()
  if (user) redirect('/account')

  return <RegisterForm />
}
