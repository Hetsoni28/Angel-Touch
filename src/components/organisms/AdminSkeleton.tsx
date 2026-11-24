/**
 * Instant loading placeholders for the admin console. Each admin route has a
 * loading.tsx that renders one of these, so a click in the sidebar switches
 * screens immediately while the page's data loads.
 */

const Block = ({ className = '' }: { className?: string }) => (
  <div className={`bg-[#e9ece4] animate-pulse ${className}`} />
)

export function AdminSkeleton({ variant }: { variant: 'dashboard' | 'table' }) {
  return (
    <div className={`w-full mx-auto ${variant === 'dashboard' ? 'max-w-6xl' : 'max-w-7xl'}`} role="status" aria-live="polite" aria-label="Loading">
      <span className="sr-only">Loading…</span>

      <div className="mb-8 space-y-3">
        <Block className="h-9 w-56 rounded-md" />
        <Block className="h-4 w-80 max-w-full rounded" />
      </div>

      {variant === 'dashboard' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[#dde7dd] p-6 flex flex-col items-center gap-3">
                <Block className="h-10 w-10 rounded-full" />
                <Block className="h-7 w-16 rounded" />
                <Block className="h-3 w-24 rounded" />
              </div>
            ))}
          </div>
          <div className="bg-white border border-[#dde7dd] p-6 space-y-4">
            <Block className="h-5 w-40 rounded" />
            {[0, 1, 2].map((i) => <Block key={i} className="h-12 w-full rounded" />)}
          </div>
        </>
      ) : (
        <div className="bg-white border border-[#dde7dd] overflow-hidden">
          <div className="bg-[#faf8f2] border-b border-[#dde7dd] p-4 flex gap-4">
            {['w-1/5', 'w-2/5', 'w-1/5', 'w-1/5'].map((w, i) => <Block key={i} className={`h-4 rounded ${w}`} />)}
          </div>
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <div key={r} className="p-4 border-b border-[#dde7dd] last:border-b-0 flex gap-4">
              {['w-1/5', 'w-2/5', 'w-1/5', 'w-1/5'].map((w, i) => <Block key={i} className={`h-5 rounded ${w}`} />)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
