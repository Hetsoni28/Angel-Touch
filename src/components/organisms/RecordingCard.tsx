import Link from 'next/link'
import Image from 'next/image'
import { PlayCircle, Crown, ShoppingBag, MessageCircle } from 'lucide-react'
import { generateWhatsAppLink } from '@/utils/whatsapp'

interface RecordingCardProps {
  slug: string
  title: string
  imageUrl?: string
  description: string
  date: string
  price: number
  /** 'inquire' = inquiry mode (online payments off): ask for access on WhatsApp */
  status: 'watch' | 'buy' | 'upgrade' | 'inquire'
}

export function RecordingCard({ slug, title, imageUrl, description, date, price, status }: RecordingCardProps) {
  return (
    <div className="bg-white border border-[#dde7dd] overflow-hidden group hover:border-[#2e7a3a]/30 transition-all duration-300 flex flex-col h-full">
      <div className="aspect-video bg-[#faf8f2] relative overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#dde7dd]/50" />
        )}
        
        {/* Overlay for Watch state */}
        {status === 'watch' && (
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <PlayCircle className="w-6 h-6 text-[#2e7a3a]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8a8d87] mb-2">
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <h3 className="font-playfair text-xl text-[#1e2228] mb-3 line-clamp-2">{title}</h3>
        <p className="text-[#5c5a58] text-[13px] line-clamp-3 mb-6 flex-1">{description}</p>
        
        <div className="pt-4 border-t border-[#dde7dd] mt-auto">
          {status === 'watch' && (
            <Link 
              href={`/customer/library/${slug}`} 
              aria-label={`Watch recording: ${title}`}
              className="flex items-center justify-between w-full min-h-[44px] text-[#1e2228] hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors group/btn"
            >
              <span className="text-[11px] font-semibold tracking-widest uppercase">Watch Recording</span>
              <PlayCircle className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          )}

          {status === 'upgrade' && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] text-[#6b6e68] font-semibold tracking-widest uppercase">Available with Membership</span>
              <Link 
                href="/membership" 
                aria-label={`View membership options to access ${title}`}
                className="flex items-center justify-center w-full min-h-[44px] px-4 py-3 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-widest uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors rounded-sm"
              >
                <Crown className="w-4 h-4 mr-2" aria-hidden="true" /> View Membership
              </Link>
            </div>
          )}

          {status === 'inquire' && (
            <div className="flex gap-2">
              <Link 
                href={`/classes/${slug}`} 
                aria-label={`View details for ${title}`}
                className="flex-1 flex items-center justify-center min-h-[44px] px-4 py-3 bg-transparent border border-[#2e7a3a] text-[#2e7a3a] hover:bg-[#2e7a3a] hover:text-white text-[11px] font-semibold tracking-[0.18em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] transition-colors rounded-sm"
              >
                Details
              </Link>
              <a 
                href={generateWhatsAppLink({ type: 'RECORDING', itemName: title })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about the recording of ${title} on WhatsApp (opens in a new window)`}
                className="flex-1 flex items-center justify-center min-h-[44px] px-4 py-3 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors rounded-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" /> Enquire
              </a>
            </div>
          )}

          {status === 'buy' && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] text-[#6b6e68] font-semibold tracking-widest uppercase">Available for ₹{price}</span>
              <div className="flex gap-2">
                <Link 
                  href={`/classes/${slug}`} 
                  aria-label={`View details for ${title}`}
                  className="flex-1 flex items-center justify-center min-h-[44px] px-4 py-3 bg-transparent border border-[#2e7a3a] text-[#2e7a3a] hover:bg-[#2e7a3a] hover:text-white text-[11px] font-semibold tracking-[0.18em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] transition-colors rounded-sm"
                >
                  Details
                </Link>
                <Link 
                  href={`/classes/${slug}/checkout`} 
                  aria-label={`Purchase recording: ${title} for ₹${price}`}
                  className="flex-1 flex items-center justify-center min-h-[44px] px-4 py-3 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-[0.18em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 transition-colors rounded-sm"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" aria-hidden="true" /> Purchase
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
