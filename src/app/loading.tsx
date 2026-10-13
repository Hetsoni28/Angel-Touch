export default function RootLoading() {
  return (
    <div className="min-h-[70vh] bg-[#faf8f2] flex flex-col items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#dde7dd]"></div>
        <div className="absolute inset-0 rounded-full border-[3px] border-[#2e7a3a] border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] animate-pulse">
        Loading...
      </p>
    </div>
  )
}
