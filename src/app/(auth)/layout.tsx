/**
 * Shared layout for auth pages: /login, /register, /forgot-password
 * A clean, centered layout with the Angel Touch brand mark.
 */
import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf8f2] flex flex-col">

      {/* Minimal auth header */}
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-[#dde7dd]/60">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Angel Touch"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <Link
          href="/"
          className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors"
        >
          ← Back to site
        </Link>
      </header>

      {/* Page content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-md">

          {/* Gold rule decoration */}
          <span className="gold-rule mb-10 block" />

          {children}

          {/* Footer note */}
          <p className="mt-10 text-center text-[11px] text-[#8a8d87] leading-[1.6]">
            By creating an account, you agree to our{' '}
            <Link href="/privacy" className="underline hover:text-[#2e7a3a] transition-colors">
              Privacy Policy
            </Link>
            .
          </p>

        </div>
      </main>

    </div>
  )
}
