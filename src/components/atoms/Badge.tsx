import React from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'live' | 'recorded' | 'membership' | 'neutral'
}

export function Badge({ variant = 'neutral', className, children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase'
  
  const variants = {
    live: 'bg-[#e9f3e9] text-[#2e7a3a]',       // Soft Green bg, Primary Green text
    recorded: 'bg-[#faf8f2] text-[#8a8d87] border border-[#dde7dd]', // Ivory bg, Muted text, Border
    membership: 'bg-[#edc179]/10 text-[#c2964b]', // Gold tint bg, dark gold text
    neutral: 'bg-[#f0f0f0] text-[#5c5a58]',
  }

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {variant === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-[#2e7a3a] mr-1.5 animate-pulse" />}
      {variant === 'recorded' && (
        <svg className="w-2.5 h-2.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      {children}
    </span>
  )
}
