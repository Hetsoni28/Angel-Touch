'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1)
  }

  return (
    <nav aria-label="Pagination Navigation" className={cn("flex items-center justify-center space-x-4 py-8", className)}>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="min-w-[100px]"
      >
        Previous
      </Button>
      
      <span className="text-[12px] font-medium text-[#4a4846] tracking-[0.1em] uppercase" aria-live="polite" aria-atomic="true">
        Page {currentPage} of {totalPages}
      </span>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="min-w-[100px]"
      >
        Next
      </Button>
    </nav>
  )
}
