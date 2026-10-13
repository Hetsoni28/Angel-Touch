import { ShopHero } from '@/components/organisms/ShopHero'
import { Skeleton } from '@/components/atoms/Skeleton'
import { CardSkeleton } from '@/components/molecules/CardSkeleton'

export default function ShopLoading() {
  return (
    <div className="bg-[#faf8f2] min-h-screen">
      <ShopHero />

      {/* Category Pills Skeleton */}
      <div className="border-b border-[#dde7dd]/70 bg-white py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
