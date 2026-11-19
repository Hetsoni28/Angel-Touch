import { ForgotPasswordForm } from '@/components/organisms/ForgotPasswordForm'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// Account pages are not useful in search results.
export const metadata: Metadata = pageMetadata({
  title: 'Forgot Password',
  description: 'Reset the password for your Angel Touch account. We will email you a secure link.',
  path: '/forgot-password',
  noindex: true,
})

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
