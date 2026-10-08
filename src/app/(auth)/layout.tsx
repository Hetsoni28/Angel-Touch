/**
 * Pro-Level Beast UI Shared layout for auth pages: /login, /register, /forgot-password
 * A 50/50 split-screen layout with an elegant editorial image on the left, and the form centered on the right.
 */
import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf8f2] flex flex-col md:flex-row">

      {/* Left Column: Image (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#1e2228] items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/ayurvedic_hero_editorial_1791405719098.jpg" // Using an elegant editorial image
          alt="Ayurvedic Wellness"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e2228]/40 via-transparent to-[#1e2228]/80"></div>
        
        {/* Subtle decorative text over image */}
        <div className="absolute bottom-16 left-16 right-16">
          <p className="text-[#faf8f2] font-playfair text-4xl mb-4 leading-snug tracking-wide">
            "Nature's purest ingredients, crafted into exquisite formulas for your holistic wellbeing."
          </p>
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#faf8f2]/60"></span>
            <span className="text-[#faf8f2]/80 text-[11px] font-semibold tracking-widest uppercase">
              Heena Thaker
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 flex flex-col relative w-full md:w-1/2">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Angel Touch"
              width={140}
              height={45}
              className="h-10 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors flex items-center gap-2"
          >
            ← Back to site
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
          <div className="w-full max-w-[420px] fade-in-up">
            
            {/* The child forms (LoginForm / RegisterForm) will render here */}
            {children}

            {/* Footer note */}
            <p className="mt-12 text-center text-[12px] text-[#8a8d87] leading-relaxed">
              By proceeding, you agree to Angel Touch's <br className="hidden sm:block"/>
              <Link href="/privacy" className="underline hover:text-[#2e7a3a] transition-colors">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="underline hover:text-[#2e7a3a] transition-colors">Terms of Service</Link>.
            </p>
          </div>
        </main>
      </div>

    </div>
  )
}
