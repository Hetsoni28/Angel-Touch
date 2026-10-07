'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, User, Leaf } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/treatments', label: 'Treatments' },
  { href: '/classes', label: 'Classes' },
  { href: '/membership', label: 'Membership' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img src="/logo.svg" alt="Angel Touch" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-body transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-1.5" />
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-body rounded-md hover:bg-primary-light"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-5 pt-3 shadow-md">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-body hover:text-primary hover:bg-primary-light rounded-md px-3 py-2 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
            <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-center">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="sm" className="w-full justify-center">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
