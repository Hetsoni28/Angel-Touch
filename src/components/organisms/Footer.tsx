import Link from 'next/link'

const nav = {
  explore: [
    { label: 'Shop', href: '/shop' },
    { label: 'Treatments', href: '/treatments' },
    { label: 'Classes', href: '/classes' },
    { label: 'Recorded Classes', href: '/classes/recorded' },
    { label: 'Membership', href: '/membership' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Refund & Cancellation', href: '/refund' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#dde7dd] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="block mb-6">
              <img src="/logo.svg" alt="Angel Touch" className="h-16 w-auto" />
            </Link>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed max-w-xs mb-4">
              Women-only salon & wellness centre in Satellite, Ahmedabad. Products, treatments and skincare academy courses by Heena Thaker.
            </p>
            <p className="text-[12px] text-[#5c8f60] font-medium mb-6 leading-relaxed">
              Mon – Sat: 10:00 AM – 8:00 PM<br />
              Sun: 10:00 AM – 4:30 PM
            </p>
            <a
              href="https://www.instagram.com/angeltouch_by_heena_thaker/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors"
            >
              Instagram ↗
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-[10px] font-semibold tracking-[0.28em] text-[#1e2228] uppercase mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3.5">
              {nav.explore.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-[#5c5a58] hover:text-[#2e7a3a] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-semibold tracking-[0.28em] text-[#1e2228] uppercase mb-6">Support</h4>
            <ul className="flex flex-col gap-3.5">
              {nav.support.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-[#5c5a58] hover:text-[#2e7a3a] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-semibold tracking-[0.28em] text-[#1e2228] uppercase mb-6">Visit Us</h4>
            <ul className="flex flex-col gap-4 text-[13px] text-[#5c5a58]">
              <li className="leading-relaxed">
                UGF-6, Policlinic Chamber,<br />
                Opp. Judges Bunglow Road,<br />
                Satellite, Ahmedabad – 380015
              </li>
              <li>
                <a href="tel:+919723179638" className="hover:text-[#2e7a3a] transition-colors font-medium">
                  +91 97231 79638
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#dde7dd] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8a8d87] tracking-widest uppercase">
          <p>© 2025 Angel Touch by Heena Thaker. All rights reserved.</p>
          <p>Satellite, Ahmedabad, Gujarat</p>
        </div>

      </div>
    </footer>
  )
}
