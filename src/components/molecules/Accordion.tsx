'use client'

import { useState, useId } from 'react'

interface AccordionProps {
  title: string
  content: string
  defaultOpen?: boolean
}

export function Accordion({ title, content, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId()
  const headerId = `accordion-header-${id}`
  const panelId = `accordion-panel-${id}`

  return (
    <div className="border-b border-[#dde7dd]/60">
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full min-h-[44px] py-4 flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] focus-visible:ring-offset-2 rounded-sm transition-all"
        >
          <span className="text-[13px] font-semibold tracking-[0.12em] text-[#1e2228] uppercase group-hover:text-[#2e7a3a] transition-colors">
            {title}
          </span>
          <span aria-hidden="true" className="text-[#6b6e68] text-lg font-light leading-none ml-4 transition-transform duration-300">
            {isOpen ? '—' : '+'}
          </span>
        </button>
      </h3>
      
      <div 
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-[14px] text-[#4a4846] leading-[1.8]">
          {content}
        </p>
      </div>
    </div>
  )
}
