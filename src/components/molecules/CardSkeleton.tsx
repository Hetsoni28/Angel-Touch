import React from 'react'
import { Skeleton } from '@/components/atoms/Skeleton'

export function CardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white border border-[#dde7dd] overflow-hidden">
      {/* Image Area Skeleton */}
      <div className="relative aspect-[4/3] w-full">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Content Area Skeleton */}
      <div className="p-6 flex flex-col flex-1">
        {/* Subtitle / Category */}
        <Skeleton className="h-3 w-1/3 mb-4" />
        
        {/* Title (2 lines) */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        
        <div className="mt-auto">
          {/* Action Button/Price Skeleton */}
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  )
}
