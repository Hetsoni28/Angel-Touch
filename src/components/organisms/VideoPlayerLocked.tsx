import Link from 'next/link'
import { ArrowLeft, Lock, Crown, MessageCircle } from 'lucide-react'
import { PAYMENTS_ENABLED } from '@/lib/features'
import { generateWhatsAppLink } from '@/utils/whatsapp'
import { fmtDate } from '@/lib/portalFormat'

interface VideoPlayerLockedProps {
  title: string
  slug: string
  reason?: 'expired_membership' | 'no_access'
  expiresAt?: string
}

export function VideoPlayerLocked({ title, slug, reason, expiresAt }: VideoPlayerLockedProps) {
  const isExpired = reason === 'expired_membership'

  return (
    <div className="w-full max-w-2xl mx-auto md:py-12" role="status" aria-live="polite">
      <div className="mb-6">
        <Link 
          href="/customer/library" 
          className="inline-flex items-center gap-1.5 min-h-[44px] pr-2 text-[#1e2228] hover:text-[#2e7a3a] text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
        >
          <ArrowLeft className="w-[18px] h-[18px]" aria-hidden="true" /> Library
        </Link>
      </div>
      
      <div className="rounded-2xl bg-white border border-[#dde7dd] p-5 sm:p-8 md:p-12 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#faf8f2] rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-[#5c5a58]" aria-hidden="true" />
        </div>

        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5c5a58] block mb-2">
          {isExpired ? 'Membership Expired' : 'Protected Vault Content'}
        </span>

        <h1 className="font-playfair text-2xl sm:text-3xl text-[#1e2228] mb-4">
          {isExpired ? 'Membership Access Ended' : 'Recording Locked'}
        </h1>

        <p className="text-[#5c5a58] text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
          {isExpired
            ? `Your membership ended on ${expiresAt ? fmtDate(expiresAt) : 'a past date'}. Renew it to watch "${title}" and every other recording again.`
            : PAYMENTS_ENABLED
              ? `"${title}" isn't in your library yet. Unlock it with a membership, or buy this recording on its own.`
              : `"${title}" isn't in your library yet. Message us on WhatsApp and we'll arrange access for you.`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/membership" 
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl border border-[#dde7dd] bg-white text-[#1e2228] text-[14px] font-medium hover:border-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
          >
            <Crown className="w-4 h-4 text-[#b38538]" aria-hidden="true" /> {isExpired ? 'Renew membership' : PAYMENTS_ENABLED ? 'Join membership' : 'Membership · coming soon'}
          </Link>
          {PAYMENTS_ENABLED ? (
            <Link
              href={`/classes/${slug}`}
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl border border-[#2e7a3a] text-[#1e5f2e] hover:bg-[#2e7a3a] hover:text-white text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
            >
              Buy this recording
            </Link>
          ) : (
            <a
              href={generateWhatsAppLink({ type: 'RECORDING', itemName: title })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#1e5f2e] hover:bg-[#2e7a3a] text-white text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
              aria-label={`Ask about access to ${title} on WhatsApp (opens in a new tab)`}
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> Ask on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
