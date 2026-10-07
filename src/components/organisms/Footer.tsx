import Link from 'next/link'

const nav = {
  shop: [
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20">

          {}
          <div className="md:col-span-4 lg:col-span-3">
            <Link href="/" className="block mb-6">
              <img src="/logo.svg" alt="Angel Touch" className="h-8 w-auto" />
            </Link>
            <p className="text-[13px] text-[#5c5a58] leading-relaxed max-w-xs mb-8">
              Natural beauty rooted in Ayurvedic tradition. Products, treatments and masterclasses by Heena Thaker.
            </p>
            {}
            <div className="flex items-center gap-5">
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Facebook', href: 'https://facebook.com' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a8d87] hover:text-[#2e7a3a] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {}
          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-[10px] font-semibold tracking-[0.28em] text-[#1e2228] uppercase mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3.5">
              {nav.shop.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-[#5c5a58] hover:text-[#2e7a3a] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="md:col-span-3">
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

          {}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-[10px] font-semibold tracking-[0.28em] text-[#1e2228] uppercase mb-6">Contact</h4>
            <ul className="flex flex-col gap-3.5 text-[13px] text-[#5c5a58]">
              <li>
                <a href="mailto:hello@angeltouch.in" className="hover:text-[#2e7a3a] transition-colors break-all">
                  hello@angeltouch.in
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-[#2e7a3a] transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>

        </div>

        {}
        <div className="border-t border-[#dde7dd] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8a8d87] tracking-widest uppercase">
          <p>© 2026 Angel Touch by Heena Thaker. All rights reserved.</p>
          <p>Crafted with care in India.</p>
        </div>

      </div>
    </footer>
  )
}
