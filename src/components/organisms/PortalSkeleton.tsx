/**
 * Instant loading placeholders for the customer portal.
 * Each portal page wraps its data in <Suspense fallback={<PortalSkeleton … />}>,
 * so a tap on the tab bar shows the new screen's shape immediately while the
 * customer's data streams in (Next.js instant navigation).
 */

const Block = ({ className = '' }: { className?: string }) => (
  <div className={`rounded-xl bg-[#e9ece4] animate-pulse ${className}`} />
)

export function PortalSkeleton({ variant }: { variant: 'home' | 'list' | 'grid' | 'form' | 'video' }) {
  return (
    <div className="w-full" role="status" aria-live="polite" aria-label="Loading">
      <span className="sr-only">Loading…</span>

      {variant === 'home' && (
        <div className="space-y-7">
          <div className="rounded-2xl bg-[#d7e3d6] animate-pulse h-[230px] sm:h-[250px]" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => <Block key={i} className="h-[118px]" />)}
          </div>
          <div className="space-y-3"><Block className="h-5 w-40" /><Block className="h-[104px]" /></div>
          <div className="space-y-3">
            <Block className="h-5 w-44" />
            <div className="flex gap-3 overflow-hidden">{[0, 1].map((i) => <Block key={i} className="h-[150px] w-[68%] sm:w-[240px] shrink-0" />)}</div>
          </div>
        </div>
      )}

      {variant !== 'home' && (
        <div className="mb-5 md:mb-8 space-y-2.5">
          <Block className="h-8 w-48 md:h-10 md:w-64" />
          <Block className="h-4 w-64 max-w-full" />
        </div>
      )}

      {variant === 'list' && (
        <div className="space-y-3">
          <Block className="h-10 w-full max-w-sm rounded-full" />
          {[0, 1, 2].map((i) => <Block key={i} className="h-[104px]" />)}
        </div>
      )}

      {variant === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-[#dde7dd] bg-white overflow-hidden">
              <div className="aspect-video bg-[#e9ece4] animate-pulse" />
              <div className="p-4 space-y-2"><Block className="h-4 w-3/4" /><Block className="h-3 w-1/3" /></div>
            </div>
          ))}
        </div>
      )}

      {variant === 'form' && (
        <div className="space-y-4">
          <Block className="h-[88px] rounded-2xl" />
          <div className="rounded-2xl border border-[#dde7dd] bg-white/60 p-4 sm:p-6 space-y-5">
            {[0, 1, 2].map((i) => <div key={i} className="space-y-2"><Block className="h-3.5 w-24" /><Block className="h-[52px]" /></div>)}
            <Block className="h-[52px] bg-[#d7e3d6]" />
          </div>
        </div>
      )}

      {variant === 'video' && (
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="aspect-video -mx-4 sm:mx-0 sm:rounded-2xl bg-[#d9dcd4] animate-pulse" />
          <Block className="h-[110px] rounded-2xl" />
        </div>
      )}
    </div>
  )
}
