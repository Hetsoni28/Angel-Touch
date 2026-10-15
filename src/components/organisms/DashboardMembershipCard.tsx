import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

interface DashboardMembershipCardProps {
  isMember: boolean
  expiresAt?: string
  status?: string
}

export function DashboardMembershipCard({ isMember, expiresAt, status }: DashboardMembershipCardProps) {
  const isExpired = status === 'expired' || (!isMember && !!expiresAt)
  const isCancelled = status === 'cancelled'
  const isPaused = status === 'paused'

  return (
    <section className="bg-white border border-[#dde7dd] p-8 relative overflow-hidden" aria-label="Membership Status">
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h2 className="text-[#5c5a58] text-[11px] font-semibold tracking-widest uppercase mb-1">
            Membership Status
          </h2>
          <h3 className="font-playfair text-2xl text-[#1e2228]">
            {isMember && !isCancelled
              ? 'Active Member'
              : isCancelled && isMember
              ? 'Cancelled (Active)'
              : isCancelled
              ? 'Membership Cancelled'
              : isPaused
              ? 'Renewal Paused'
              : isExpired
              ? 'Membership Expired'
              : 'No Active Membership'}
          </h3>
        </div>
        <Star
          aria-hidden="true"
          className={`w-8 h-8 ${
            isMember ? 'text-[#8c6218]' : isExpired ? 'text-[#8c6218]/40' : 'text-[#dde7dd]'
          }`}
        />
      </div>

      {isPaused ? (
        <>
          <p className="text-amber-900 bg-amber-50 border border-amber-300 p-3 text-[13px] mb-6 relative z-10" role="alert">
            Your latest membership renewal could not be processed. Please update your billing method to restore continuous access.
          </p>
          <Link
            href="/customer/billing"
            className="inline-flex items-center min-h-[44px] text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors relative z-10"
          >
            Review Billing History <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
        </>
      ) : isCancelled ? (
        <>
          <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
            {expiresAt && isMember
              ? `Your membership renewal is cancelled, but your access remains active until ${new Date(expiresAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}.`
              : 'Your membership is cancelled. You can reactivate whenever you are ready.'}
          </p>
          <div className="flex flex-wrap items-center gap-6 relative z-10">
            {isMember && (
              <Link
                href="/customer/library"
                className="inline-flex items-center min-h-[44px] text-[12px] font-semibold tracking-wider uppercase text-[#1e5f2e] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm"
              >
                Access Library
              </Link>
            )}
            <Link
              href="/membership"
              className="inline-flex items-center min-h-[44px] text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
            >
              Reactivate Plan <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </>
      ) : isExpired ? (
        <>
          <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
            Your membership expired on{' '}
            {expiresAt
              ? new Date(expiresAt).toLocaleDateString('en-IN', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'a past date'}
            . Renew now to restore full access to all recordings.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center min-h-[44px] text-[12px] font-bold tracking-wider uppercase text-[#1e5f2e] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors relative z-10"
          >
            Renew Membership <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
        </>
      ) : isMember && expiresAt ? (
        <>
          <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
            Your membership is active until{' '}
            {new Date(expiresAt).toLocaleDateString('en-IN', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            .
          </p>
          <Link
            href="/customer/library"
            className="inline-flex items-center min-h-[44px] text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors relative z-10"
          >
            Access Video Library <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
        </>
      ) : (
        <>
          <p className="text-[#5c5a58] text-[14px] mb-6 relative z-10">
            Join our membership to get unlimited access to all past class recordings and exclusive Ayurvedic content.
          </p>
          <Link
            href="/membership"
            className="inline-flex items-center min-h-[44px] text-[12px] font-semibold tracking-wider uppercase text-[#1e2228] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors relative z-10"
          >
            Explore Membership <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
        </>
      )}
    </section>
  )
}
