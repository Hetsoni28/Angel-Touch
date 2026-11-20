'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play } from 'lucide-react'
import { fmtDate } from '@/lib/portalFormat'

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
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
        <Link 
          href="/customer/library" 
          className="inline-flex items-center gap-1.5 min-h-[44px] pr-2 text-[#1e2228] hover:text-[#2e7a3a] text-[14px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors"
        >
          <ArrowLeft className="w-[18px] h-[18px]" aria-hidden="true" /> Library
        </Link>
        <span className="inline-flex items-center bg-[#e9f3e9] text-[#1e5f2e] text-[12px] px-3 py-1 font-semibold rounded-full">
          {accessReason === 'Membership' ? 'Membership' : 'Your class'}
        </span>
      </div>

      <div className="bg-black aspect-video -mx-4 sm:mx-0 sm:rounded-2xl overflow-hidden shadow-xl mb-5 sm:mb-8 relative group">
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
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

            {/* Play Button Facade */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-white/95 group-hover:bg-white text-[#2e7a3a] shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Play className="w-8 h-8 ml-1 fill-[#2e7a3a]" aria-hidden="true" />
            </div>

            <div className="absolute bottom-3 left-3 z-10 bg-black/65 px-3 py-1.5 rounded-full text-white text-[12px] font-medium">
              Tap to play
            </div>
          </button>
        )}
      </div>

      <div className="rounded-2xl bg-white border border-[#dde7dd] p-4 sm:p-7">
        <h1 className="font-playfair text-[1.4rem] sm:text-3xl leading-snug text-[#1e2228] mb-1.5">{title}</h1>
        <p className="text-[#6b6e68] text-[13px] mb-4">Recorded {fmtDate(date)}</p>
        <p className="text-[14px] text-[#4a4846] leading-relaxed">
          {accessReason === 'Membership'
            ? 'Included with your membership — watch it as often as you like while your membership is active.'
            : 'Part of a class you joined — this recording stays in your library.'}
        </p>
      </div>
    </div>
  )
}
