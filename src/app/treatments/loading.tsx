import { TreatmentsHero } from '@/components/organisms/TreatmentsHero'
import { Skeleton } from '@/components/atoms/Skeleton'
import { CardSkeleton } from '@/components/molecules/CardSkeleton'

export default function TreatmentsLoading() {
  return (
    <>
      <TreatmentsHero />
      <section className="py-24 bg-[#faf8f2]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Filters skeleton */}
          <div className="flex flex-wrap gap-4 mb-16 justify-center">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
