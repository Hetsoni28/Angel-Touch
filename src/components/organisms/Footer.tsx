import Link from 'next/link'
import { Leaf, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  explore: [
    { href: '/shop', label: 'Shop Products' },
    { href: '/treatments', label: 'Treatments' },
    { href: '/classes', label: 'Live Classes' },
    { href: '/classes/recorded', label: 'Recorded Classes' },
    { href: '/membership', label: 'Membership' },
  ],
  company: [
    { href: '/about', label: 'About Heena Thaker' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/auth/login', label: 'Customer Login' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/refund', label: 'Refund Policy' },
  ],
}

const socials = [
  { href: 'https://instagram.com', label: 'Instagram', icon: Instagram },
  { href: 'https://facebook.com', label: 'Facebook', icon: Facebook },
  { href: 'https://youtube.com', label: 'YouTube', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-heading text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-accent" />
              <span className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Angel Touch
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Natural Beauty. Healthy You. Discover Ayurvedic products, healing treatments, and expert-led classes by Heena Thaker.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full bg-white/10 hover:bg-accent hover:text-heading transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>hello@angeltouch.in</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>India</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Angel Touch by Heena Thaker. All rights reserved.</p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
