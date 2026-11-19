import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

// Account pages are not useful in search results.
export const metadata: Metadata = pageMetadata({
  title: 'Reset Password',
  description: 'Choose a new password for your Angel Touch account.',
  path: '/reset-password',
  noindex: true,
})

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
