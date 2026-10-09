import { Skeleton } from '@/components/atoms/Skeleton'

export default function BillingLoading() {
  return (
    <div className="w-full fade-in-up">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-3" />
        <Skeleton className="h-5 w-72" />
      </div>

      {/* Table skeleton */}
      <div className="bg-white border border-[#dde7dd] rounded-sm overflow-hidden">
        {/* Table header */}
        <div className="bg-[#faf8f2] border-b border-[#dde7dd] p-4 flex gap-4">
          <Skeleton className="h-4 w-1/5" />
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-1/5" />
          <Skeleton className="h-4 w-1/5" />
        </div>
        {/* Table rows */}
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="p-4 border-b border-[#dde7dd] flex gap-4">
            <Skeleton className="h-5 w-1/5" />
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-5 w-1/5" />
            <Skeleton className="h-5 w-1/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
