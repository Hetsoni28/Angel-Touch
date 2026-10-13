import { Skeleton } from '@/components/atoms/Skeleton'
import { CardSkeleton } from '@/components/molecules/CardSkeleton'

export default function ClassesLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f2]">
      {/* Hero Skeleton */}
      <section className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] flex flex-col justify-center bg-[#1e2228]/5 border-b border-[#dde7dd]/60 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full py-20">
          <Skeleton className="h-4 w-32 mb-6 bg-[#dde7dd]/80" />
          <Skeleton className="h-12 w-80 sm:w-96 mb-6 bg-[#dde7dd]/80" />
          <Skeleton className="h-5 w-full max-w-lg mb-8 bg-[#dde7dd]/80" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-44 bg-[#dde7dd]/80" />
            <Skeleton className="h-12 w-44 bg-[#dde7dd]/80" />
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="flex items-center justify-between mb-12">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
