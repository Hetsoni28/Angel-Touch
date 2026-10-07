import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

// Custom SVGs for removed lucide brand icons
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1C2.5 7.1 2 9.5 2 12c0 2.5.5 4.9.5 4.9A2.8 2.8 0 0 0 4.6 19c2.1.6 7.4.6 7.4.6s5.3 0 7.4-.6a2.8 2.8 0 0 0 2.1-2.1c.5-2.4.5-4.9.5-4.9s0-2.5-.5-4.9A2.8 2.8 0 0 0 19.4 5C17.3 4.4 12 4.4 12 4.4s-5.3 0-7.4.6A2.8 2.8 0 0 0 2.5 7.1z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

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
  { href: 'https://instagram.com', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://facebook.com', label: 'Facebook', icon: FacebookIcon },
  { href: 'https://youtube.com', label: 'YouTube', icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer className="bg-heading text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <img src="/logo.svg" alt="Angel Touch" className="h-10 w-auto object-contain brightness-0 invert" />
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
          <p>© 2026 Angel Touch by Heena Thaker. All rights reserved.</p>
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

