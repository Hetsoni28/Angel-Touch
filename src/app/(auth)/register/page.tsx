import { RegisterForm } from '@/components/organisms/RegisterForm'
import { getCurrentUser } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account | Angel Touch',
  description: 'Create your Angel Touch account to book classes and access wellness recordings.',
}

export const instant = false

export default async function RegisterPage() {
  // If already logged in, redirect to account
  const user = await getCurrentUser()
  if (user) redirect('/account')

  return <RegisterForm />
}
