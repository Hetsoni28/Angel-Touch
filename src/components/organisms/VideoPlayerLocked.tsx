import Link from 'next/link'
import { ArrowLeft, Lock, Crown } from 'lucide-react'

interface VideoPlayerLockedProps {
  title: string
  slug: string
}

export function VideoPlayerLocked({ title, slug }: VideoPlayerLockedProps) {
  return (
    <div className="w-full max-w-2xl mx-auto py-12">
      <div className="mb-6">
        <Link href="/customer/library" className="inline-flex items-center text-[#8a8d87] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-widest uppercase transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
        </Link>
      </div>
      
      <div className="bg-white border border-[#dde7dd] p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-[#faf8f2] rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-[#8a8d87]" />
        </div>
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-4">Recording Locked</h1>
        <p className="text-[#5c5a58] text-[15px] mb-8 max-w-md mx-auto">
          You do not have access to the recording for <strong>{title}</strong>. 
          You can unlock it by purchasing the class recording or joining our membership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/membership" className="inline-flex items-center justify-center px-6 py-4 bg-[#1e2228] text-white text-[11px] font-semibold tracking-widest uppercase hover:bg-[#2e7a3a] transition-colors">
            <Crown className="w-4 h-4 mr-2" /> Join Membership
          </Link>
          <Link href={`/classes/${slug}`} className="inline-flex items-center justify-center px-6 py-4 bg-transparent border border-[#2e7a3a] text-[#2e7a3a] hover:bg-[#2e7a3a] hover:text-white text-[11px] font-semibold tracking-widest uppercase transition-colors">
            Purchase Recording
          </Link>
        </div>
      </div>
    </div>
  )
}
