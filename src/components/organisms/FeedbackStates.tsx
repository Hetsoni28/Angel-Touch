'use client'

import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { generateWhatsAppLink } from '@/utils/whatsapp'

// ─── 1. Payment Failure ──────────────────────────────────────────────────────
interface PaymentFailureProps {
  onRetry?: () => void
  className?: string
}

export function PaymentFailure({ onRetry, className }: PaymentFailureProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center bg-[#fffcfc] border border-[#f5e6e6] ${className ?? ''}`}>
      <div className="w-16 h-16 bg-[#fce8e8] flex items-center justify-center text-[#d35f5f] mb-6">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>

      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d35f5f] mb-3 block">
        Payment Failed
      </span>

      <h3
        className="text-[1.5rem] font-medium text-[#1e2228] mb-3 leading-[1.2]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Payment could not be completed.
      </h3>

      <p className="text-[14px] text-[#5c5a58] max-w-sm mx-auto mb-8 leading-[1.7]">
        Your card was not charged. This could be due to insufficient funds, an incorrect card number, or a temporary issue with your bank.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        )}
        <a
          href={generateWhatsAppLink({ type: 'GENERAL' })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">Contact Support on WhatsApp</Button>
        </a>
      </div>
    </div>
  )
}

// ─── 2. Access Denied (Recording) ────────────────────────────────────────────
interface AccessDeniedProps {
  className?: string
}

export function AccessDenied({ className }: AccessDeniedProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 px-6 text-center bg-[#faf8f2] border border-[#dde7dd] ${className ?? ''}`}>
      <div className="w-20 h-20 bg-white border border-[#dde7dd] flex items-center justify-center text-[#8a8d87] mb-8">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>

      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8a8d87] mb-4 block">
        Access Denied
      </span>

      <h3
        className="text-[2rem] font-medium text-[#1e2228] mb-4 leading-[1.15]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        You don&apos;t have access to this recording.
      </h3>

      <p className="text-[15px] text-[#5c5a58] max-w-md mx-auto mb-10 leading-[1.8]">
        This recording is available exclusively to students who attended the live class, or to active Premium Members. Unlock the full recorded library with a membership.
      </p>

      <div className="w-full max-w-xs space-y-4">
        <Link href="/memberships" className="block">
          <Button variant="primary" size="lg" className="w-full">
            View Membership Plans
          </Button>
        </Link>
        <Link href="/classes" className="block">
          <Button variant="outline" size="lg" className="w-full">
            Browse Upcoming Classes
          </Button>
        </Link>
      </div>

      <div className="mt-10 pt-8 border-t border-[#dde7dd] w-full max-w-xs">
        <p className="text-[12px] text-[#8a8d87] mb-3">Already a member or enrolled?</p>
        <Link href="/login" className="text-[12px] font-semibold text-[#2e7a3a] hover:text-[#1e5f2e] tracking-[0.1em] uppercase underline underline-offset-4">
          Sign In to your account
        </Link>
      </div>
    </div>
  )
}

// ─── 3. Classes Empty State ───────────────────────────────────────────────────
export function NoClassesPurchased() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border border-[#dde7dd] border-dashed">
      <div className="w-16 h-16 bg-[#faf8f2] flex items-center justify-center text-[#8a8d87] mb-6">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <h3
        className="text-[1.5rem] font-medium text-[#1e2228] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        No classes purchased yet.
      </h3>

      <p className="text-[14px] text-[#5c5a58] max-w-sm mx-auto mb-8 leading-[1.7]">
        Browse our upcoming Ayurvedic product-making masterclasses and enroll to get started on your learning journey.
      </p>

      <Link href="/classes">
        <Button variant="primary">Explore Masterclasses</Button>
      </Link>
    </div>
  )
}

// ─── 4. Generic Something Went Wrong ─────────────────────────────────────────
interface SomethingWentWrongProps {
  onRetry?: () => void
  message?: string
}

export function SomethingWentWrong({
  onRetry,
  message = 'We encountered an unexpected error. Please try again, or contact support if the problem persists.'
}: SomethingWentWrongProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white border border-[#dde7dd]">
      <div className="w-14 h-14 bg-[#faf8f2] flex items-center justify-center text-[#8a8d87] mb-6">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h3
        className="text-[1.3rem] font-medium text-[#1e2228] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Something went wrong.
      </h3>

      <p className="text-[14px] text-[#5c5a58] max-w-sm mx-auto mb-8 leading-[1.7]">
        {message}
      </p>

      {onRetry && (
        <Button variant="outline" onClick={onRetry}>Please try again.</Button>
      )}
    </div>
  )
}
