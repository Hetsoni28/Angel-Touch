import React from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'live' | 'recorded' | 'membership' | 'neutral'
}

export function Badge({ variant = 'neutral', className, children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase'
  
  const variants = {
    live: 'bg-[#e9f3e9] text-[#1e5f2e]',
    recorded: 'bg-[#faf8f2] text-[#4a4e4d] border border-[#dde7dd]',
    membership: 'bg-[#fdf8ee] text-[#8c6218] border border-[#edc179]/40',
    neutral: 'bg-[#f0f0f0] text-[#4a4e4d]',
  }

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {variant === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-[#1e5f2e] mr-1.5 animate-pulse" aria-hidden="true" />}
      {variant === 'recorded' && (
        <svg className="w-2.5 h-2.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {children}
    </span>
  )
}
