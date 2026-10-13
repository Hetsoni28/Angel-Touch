import Link from 'next/link'
import { AlertCircle, CheckCircle2, Users, Clock, ArrowRight } from 'lucide-react'

export type ClassEdgeCaseStatus = 'full' | 'already_enrolled' | 'cancelled' | 'past'

interface ClassStatusAlertProps {
  status: ClassEdgeCaseStatus
  classTitle?: string
  date?: string
}

export function ClassStatusAlert({ status, classTitle, date }: ClassStatusAlertProps) {
  if (status === 'already_enrolled') {
    return (
      <div className="bg-[#f0f9f0] border border-[#2e7a3a]/40 p-6 md:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#e9f3e9] flex items-center justify-center flex-shrink-0 text-[#2e7a3a]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2e7a3a] block mb-1">
              Confirmed Reservation
            </span>
            <h4 className="font-playfair text-xl text-[#1e2228] mb-1">
              You&apos;re Already Enrolled
            </h4>
            <p className="text-[14px] text-[#5c5a58] leading-relaxed max-w-md">
              You hold a confirmed seat for {classTitle || 'this masterclass'}. Access details and preparation notes are available in your portal.
            </p>
          </div>
        </div>
        <Link
          href="/customer/classes"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors flex-shrink-0"
        >
          View in My Classes <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    )
  }

  if (status === 'full') {
    return (
      <div className="bg-[#faf8f2] border border-[#edc179]/60 p-6 md:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#fdf8ee] flex items-center justify-center flex-shrink-0 text-[#b38538]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#b38538] block mb-1">
              Intimate Cohort Full
            </span>
            <h4 className="font-playfair text-xl text-[#1e2228] mb-1">
              Masterclass at Capacity
            </h4>
            <p className="text-[14px] text-[#5c5a58] leading-relaxed max-w-md">
              To preserve personalized hands-on guidance, live seats for this cohort are closed. The complete HD recording will be available in the vault following the session.
            </p>
          </div>
        </div>
        <Link
          href="/membership"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors flex-shrink-0"
        >
          Join Membership <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    )
  }

  if (status === 'cancelled') {
    return (
      <div className="bg-[#fef2f2] border border-red-300 p-6 md:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-700">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-700 block mb-1">
              Session Cancelled
            </span>
            <h4 className="font-playfair text-xl text-[#1e2228] mb-1">
              Masterclass Schedule Notice
            </h4>
            <p className="text-[14px] text-[#5c5a58] leading-relaxed max-w-md">
              This scheduled live session has been cancelled. Any existing enrollments are automatically refunded in full to the original payment method.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/919723179638?text=Hello%2C%20I%20have%20a%20question%20regarding%20a%20cancelled%20masterclass"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors flex-shrink-0"
        >
          Contact Concierge
        </a>
      </div>
    )
  }

  // status === 'past'
  return (
    <div className="bg-[#faf8f2] border border-[#dde7dd] p-6 md:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#8a8d87]">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8a8d87] block mb-1">
            Live Session Ended
          </span>
          <h4 className="font-playfair text-xl text-[#1e2228] mb-1">
            Available in Recorded Vault
          </h4>
          <p className="text-[14px] text-[#5c5a58] leading-relaxed max-w-md">
            This live workshop took place on {date || 'a previous date'}. You can stream the complete recorded session immediately via membership.
          </p>
        </div>
      </div>
      <Link
        href="/membership"
        className="inline-flex items-center justify-center px-6 py-3.5 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors flex-shrink-0"
      >
        View Membership <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  )
}
