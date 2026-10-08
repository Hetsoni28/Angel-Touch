import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  title: string
  subtitle?: string
  imageUrl?: string
  href?: string
  children?: React.ReactNode
  badge?: React.ReactNode
}

export function Card({ title, subtitle, imageUrl, href, children, badge }: CardProps) {
  const content = (
    <div className="group flex flex-col h-full bg-white border border-[#dde7dd] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#2e7a3a]/30">
      {/* Image Area */}
      <div className="relative aspect-[4/3] w-full bg-[#faf8f2] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#dde7dd]">No Image</span>
          </div>
        )}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            {badge}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        {subtitle && (
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#8a8d87] mb-2">
            {subtitle}
          </span>
        )}
        <h3 
          className="text-[1.2rem] font-medium text-[#1e2228] leading-[1.3] mb-4 group-hover:text-[#2e7a3a] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
        
        <div className="mt-auto">
          {children}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    )
  }

  return content
}
