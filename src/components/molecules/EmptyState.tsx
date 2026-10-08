import React from 'react'
import { Button } from '@/components/atoms/Button'
import Link from 'next/link'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  icon?: React.ReactNode
}

export function EmptyState({ title, description, actionLabel, actionHref, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border border-[#dde7dd] border-dashed rounded-lg">
      <div className="w-16 h-16 bg-[#faf8f2] rounded-full flex items-center justify-center text-[#8a8d87] mb-6">
        {icon || (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4M12 20V4" />
          </svg>
        )}
      </div>
      
      <h3 
        className="text-[1.5rem] font-medium text-[#1e2228] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h3>
      
      <p className="text-[15px] text-[#5c5a58] max-w-md mx-auto mb-8">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="primary">{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}
