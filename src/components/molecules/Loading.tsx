import React from 'react'
import { cn } from '@/utils/cn'

interface LoadingProps {
  text?: string
  fullScreen?: boolean
  className?: string
}

export function Loading({ text = "Loading...", fullScreen = false, className }: LoadingProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-4",
      fullScreen ? "fixed inset-0 z-50 bg-[#faf8f2]" : "py-16 w-full",
      className
    )}>
      {/* Custom elegant spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#dde7dd]"></div>
        <div className="absolute inset-0 rounded-full border-[3px] border-[#2e7a3a] border-t-transparent animate-spin"></div>
      </div>
      
      {text && (
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}
