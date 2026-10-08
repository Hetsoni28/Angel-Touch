import React from 'react'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/utils/cn'

interface ErrorStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "We encountered an unexpected error while loading this content.", 
  actionLabel = "Try Again", 
  onAction,
  className 
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center bg-[#fffcfc] border border-[#f5e6e6] rounded-lg", className)}>
      <div className="w-16 h-16 bg-[#fce8e8] rounded-full flex items-center justify-center text-[#d35f5f] mb-6">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h3 
        className="text-[1.3rem] font-medium text-[#1e2228] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h3>
      
      <p className="text-[14px] text-[#5c5a58] max-w-sm mx-auto mb-8">
        {description}
      </p>

      {onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
