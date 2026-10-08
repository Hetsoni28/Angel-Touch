import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#faf8f2] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        
        {/* Status Code */}
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5c8f60] mb-6">
          403 — Access Forbidden
        </p>

        {/* Heading */}
        <h1
          className="text-[3rem] md:text-[4rem] font-medium text-[#1e2228] leading-[1.1] mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          This area is restricted.
        </h1>

        {/* Description */}
        <p className="text-[15px] text-[#5c5a58] leading-[1.8] mb-10">
          You are authenticated, but your account does not have permission to access this area. 
          If you believe this is a mistake, please contact the administrator.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-[#dde7dd] mx-auto mb-10" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/account"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#2e7a3a] hover:bg-[#1e5f2e] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
          >
            Go to My Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#dde7dd] hover:border-[#2e7a3a] text-[#1e2228] text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors"
          >
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  )
}
