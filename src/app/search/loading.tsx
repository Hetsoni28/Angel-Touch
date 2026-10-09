import { Skeleton } from '@/components/atoms/Skeleton'
import { CardSkeleton } from '@/components/molecules/CardSkeleton'

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header Skeleton */}
        <div className="mb-12 border-b border-[#dde7dd] pb-8 text-center max-w-2xl mx-auto">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>

      </div>
    </div>
  )
}
