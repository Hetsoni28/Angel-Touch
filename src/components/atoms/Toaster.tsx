'use client'

import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-[#faf8f2] group-[.toaster]:text-[#1e2228] group-[.toaster]:border-[#dde7dd] group-[.toaster]:shadow-xl group-[.toaster]:rounded-none',
          description: 'group-[.toast]:text-[#5c5a58]',
          actionButton: 'group-[.toast]:bg-[#2e7a3a] group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-[#f0f0f0] group-[.toast]:text-[#5c5a58]',
          error: 'group-[.toaster]:bg-[#fffcfc] group-[.toaster]:text-[#d35f5f] group-[.toaster]:border-[#f5e6e6]',
          success: 'group-[.toaster]:bg-[#e9f3e9] group-[.toaster]:text-[#1e5f2e] group-[.toaster]:border-[#dde7dd]',
        },
        style: {
          fontFamily: 'var(--font-body)',
        }
      }}
    />
  )
}
