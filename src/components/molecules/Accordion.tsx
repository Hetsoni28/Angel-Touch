'use client'

import { useState } from 'react'

interface AccordionProps {
  title: string
  content: string
  defaultOpen?: boolean
}

export function Accordion({ title, content, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[#dde7dd]/60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-[13px] font-semibold tracking-[0.12em] text-[#1e2228] uppercase group-hover:text-[#2e7a3a] transition-colors">
          {title}
        </span>
        <span className="text-[#8a8d87] text-lg font-light leading-none ml-4 transition-transform duration-300">
          {isOpen ? '—' : '+'}
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[14px] text-[#5c5a58] leading-[1.8]">
          {content}
        </p>
      </div>
    </div>
  )
}
