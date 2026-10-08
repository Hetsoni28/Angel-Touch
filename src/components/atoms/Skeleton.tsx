import { cn } from '@/utils/cn'
import React from 'react'

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#e9f3e9]/50', className)}
      {...props}
    />
  )
}
