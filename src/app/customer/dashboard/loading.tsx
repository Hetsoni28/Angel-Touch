import { Skeleton } from '@/components/atoms/Skeleton'

export default function DashboardLoading() {
  return (
    <div className="w-full fade-in-up">
      {/* Header skeleton */}
      <div className="mb-10">
        <Skeleton className="h-10 w-64 mb-3" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <Skeleton className="w-full h-[220px] rounded-sm" />
        <Skeleton className="w-full h-[220px] rounded-sm" />
      </div>

      {/* List skeleton */}
      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full rounded-sm" />
          <Skeleton className="h-16 w-full rounded-sm" />
          <Skeleton className="h-16 w-full rounded-sm" />
        </div>
      </div>
    </div>
  )
}
