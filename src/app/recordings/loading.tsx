import { Skeleton } from '@/components/atoms/Skeleton'
import { CardSkeleton } from '@/components/molecules/CardSkeleton'

export default function RecordingsLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f2]">
      {/* Hero Skeleton */}
      <section className="relative w-full min-h-[420px] sm:min-h-[480px] flex items-center bg-[#1e2228]/5 border-b border-[#dde7dd]/60 px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full py-16 md:py-28">
          <Skeleton className="h-4 w-36 mb-6 bg-[#dde7dd]" />
          <Skeleton className="h-12 w-72 sm:w-96 mb-6 bg-[#dde7dd]" />
          <Skeleton className="h-5 w-full max-w-xl bg-[#dde7dd]" />
        </div>
      </section>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
