'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play } from 'lucide-react'

interface VideoPlayerUnlockedProps {
  title: string
  date: string
  youtubeId: string | null
  accessReason: string
}

export function VideoPlayerUnlocked({ title, date, youtubeId, accessReason }: VideoPlayerUnlockedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <Link 
          href="/customer/library" 
          className="inline-flex items-center min-h-[44px] text-[#5c5a58] hover:text-[#2e7a3a] text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back to Library
        </Link>
        <span className="inline-flex items-center self-start sm:self-auto bg-[#e9f3e9] text-[#1e5f2e] text-[10px] px-3 py-1.5 font-bold tracking-widest uppercase rounded">
          Unlocked via {accessReason}
        </span>
      </div>

      <div className="bg-black aspect-video w-full rounded-lg overflow-hidden shadow-xl mb-8 relative group">
        {!youtubeId ? (
          <div className="w-full h-full flex items-center justify-center text-white" role="alert">
            <p>Invalid video URL provided.</p>
          </div>
        ) : isPlaying ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`Masterclass Recording: ${title}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play masterclass recording: ${title}`}
            className="w-full h-full relative flex items-center justify-center cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2"
          >
            <Image
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

            {/* Play Button Facade */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-white/95 group-hover:bg-white text-[#2e7a3a] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 ml-1 fill-[#2e7a3a]" aria-hidden="true" />
            </div>

            <div className="absolute bottom-4 left-4 z-10 bg-black/70 px-3 py-1.5 rounded text-white text-[11px] font-medium tracking-wide">
              Click to Play Masterclass
            </div>
          </button>
        )}
      </div>

      <div className="bg-white border border-[#dde7dd] p-5 sm:p-8">
        <h1 className="font-playfair text-2xl sm:text-3xl text-[#1e2228] mb-2">{title}</h1>
        <p className="text-[#5c5a58] text-[12px] font-semibold tracking-widest uppercase mb-8">
          Recorded on {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <div className="prose prose-sm max-w-none text-[#5c5a58]">
          <p>We hope you enjoy this recording. You have unlimited access as long as your membership is active or via your lifetime purchase.</p>
        </div>
      </div>
    </div>
  )
}
