'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface DynamicBreadcrumbsProps {
  /** If provided, overrides the automatic path generation */
  items?: BreadcrumbItem[]
  /** Optional class name */
  className?: string
}

export function DynamicBreadcrumbs({ items, className = "mb-8 md:mb-12" }: DynamicBreadcrumbsProps) {
  const pathname = usePathname()
  
  if (!pathname || pathname === '/') return null

  // Generate items from path if not provided
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const segments = pathname.split('/').filter(Boolean)
    const generated: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]
    
    segments.forEach((segment, index) => {
      const label = decodeURIComponent(segment).replace(/-/g, ' ')
      generated.push({
        label,
        href: '/' + segments.slice(0, index + 1).join('/')
      })
    })
    
    return generated
  })()

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center text-[11px] font-medium tracking-widest uppercase text-[#4a4846]">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-[#6b6e68]" aria-hidden="true">/</span>}
              {isLast || !item.href ? (
                <span className="text-[#1e2228] font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-[#2e7a3a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2e7a3a] rounded-sm transition-colors py-0.5 px-0.5"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

