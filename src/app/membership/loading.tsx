import { MembershipHero } from '@/components/organisms/MembershipHero'
import { Skeleton } from '@/components/atoms/Skeleton'

export default function MembershipLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f2]">
      <MembershipHero />

      {/* Plans Skeleton */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-[#dde7dd] p-8 md:p-10 flex flex-col items-center">
              <Skeleton className="h-4 w-28 mb-3" />
              <Skeleton className="h-8 w-44 mb-4" />
              <Skeleton className="h-10 w-32 mb-8" />
              <div className="w-full space-y-4 mb-10">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
