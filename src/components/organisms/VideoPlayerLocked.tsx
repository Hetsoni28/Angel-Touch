import Link from 'next/link'
import { ArrowLeft, Lock, Crown } from 'lucide-react'

interface VideoPlayerLockedProps {
  title: string
  slug: string
  reason?: 'expired_membership' | 'no_access'
  expiresAt?: string
}

export function VideoPlayerLocked({ title, slug, reason, expiresAt }: VideoPlayerLockedProps) {
  const isExpired = reason === 'expired_membership'

  return (
    <div className="w-full max-w-2xl mx-auto py-12" role="status" aria-live="polite">
      <div className="mb-6">
        <Link 
          href="/customer/library" 
          className="inline-flex items-center min-h-[44px] text-[#5c5a58] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back to Library
        </Link>
      </div>
      
      <div className="bg-white border border-[#dde7dd] p-5 sm:p-8 md:p-12 text-center">
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
            ? `Your membership concluded on ${expiresAt ? new Date(expiresAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }) : 'a past date'}. Renew your membership to resume streaming "${title}" and all other recordings.`
            : `You do not currently have access to "${title}". You can unlock it by joining our membership for full library access, or purchasing this single recording.`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/membership" 
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-3.5 bg-[#1e2228] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
          >
            <Crown className="w-4 h-4 mr-2" aria-hidden="true" /> {isExpired ? 'Renew Membership' : 'Join Membership'}
          </Link>
          <Link 
            href={`/classes/${slug}`} 
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-3.5 bg-transparent border border-[#2e7a3a] text-[#1e5f2e] hover:bg-[#2e7a3a] hover:text-white text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
          >
            Purchase Recording
          </Link>
        </div>
      </div>
    </div>
  )
}
