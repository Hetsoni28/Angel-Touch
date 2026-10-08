import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface VideoPlayerUnlockedProps {
  title: string
  date: string
  youtubeId: string | null
  accessReason: string
}

export function VideoPlayerUnlocked({ title, date, youtubeId, accessReason }: VideoPlayerUnlockedProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/customer/library" className="inline-flex items-center text-[#8a8d87] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-widest uppercase transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
        </Link>
        <span className="inline-flex items-center bg-[#e9f3e9] text-[#1e5f2e] text-[10px] px-3 py-1 font-bold tracking-widest uppercase rounded">
          Unlocked via {accessReason}
        </span>
      </div>

      <div className="bg-black aspect-video w-full rounded-lg overflow-hidden shadow-xl mb-8">
        {youtubeId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>Invalid video URL provided.</p>
          </div>
        )}
      </div>

      <div className="bg-white border border-[#dde7dd] p-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">{title}</h1>
        <p className="text-[#8a8d87] text-[12px] font-semibold tracking-widest uppercase mb-8">
          Recorded on {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <div className="prose prose-sm max-w-none text-[#5c5a58]">
          <p>We hope you enjoy this recording. You have unlimited access as long as your membership is active or via your lifetime purchase.</p>
        </div>
      </div>
    </div>
  )
}
