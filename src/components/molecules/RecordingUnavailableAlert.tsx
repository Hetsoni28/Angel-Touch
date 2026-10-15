import Link from 'next/link'
import { ArrowLeft, Clock, Sparkles } from 'lucide-react'

interface RecordingUnavailableAlertProps {
  title: string
  classDate?: string
}

export function RecordingUnavailableAlert({ title, classDate }: RecordingUnavailableAlertProps) {
  const isFuture = classDate ? new Date(classDate) > new Date() : false

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

      <div className="bg-white border border-[#dde7dd] p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-[#faf8f2] rounded-full flex items-center justify-center mx-auto mb-6 text-[#8c6218]">
          {isFuture ? <Clock className="w-6 h-6 text-[#2e7a3a]" aria-hidden="true" /> : <Sparkles className="w-6 h-6" aria-hidden="true" />}
        </div>

        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5c5a58] block mb-2">
          {isFuture ? 'Live Masterclass Scheduled' : 'Post-Production In Progress'}
        </span>

        <h1 className="font-playfair text-3xl text-[#1e2228] mb-4">
          {isFuture ? 'Live Session Ahead' : 'Recording Being Prepared'}
        </h1>

        <p className="text-[#5c5a58] text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
          {isFuture
            ? `The live workshop for "${title}" is scheduled for ${new Date(classDate!).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}. The masterclass recording will be published here promptly after the live cohort concludes.`
            : `Our editorial team is currently processing the high-definition footage, botanical formulations, and timestamped chapters for "${title}". It will be ready to stream shortly.`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/customer/library"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-3.5 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
          >
            Explore Other Recordings
          </Link>
          <Link
            href="/customer/classes"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-3.5 border border-[#dde7dd] hover:border-[#1e2228] text-[#1e2228] text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors"
          >
            My Live Classes
          </Link>
        </div>
      </div>
    </div>
  )
}
