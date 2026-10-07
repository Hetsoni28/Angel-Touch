import React from 'react'
import Link from 'next/link'
import { ShoppingBag, User } from 'lucide-react'
import { Button } from '../atoms/Button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl text-emerald-800">
              Angel Touch
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/products" className="flex items-center text-sm font-medium text-slate-600 hover:text-emerald-600">
              Products
            </Link>
            <Link href="/treatments" className="flex items-center text-sm font-medium text-slate-600 hover:text-emerald-600">
              Treatments
            </Link>
            <Link href="/classes" className="flex items-center text-sm font-medium text-slate-600 hover:text-emerald-600">
              Classes
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          {/* Note: We aren't doing product cart checkout in Phase 1, but we might have a classes cart later */}
          <Button variant="outline" size="sm">
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
