'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ProductCard } from '@/components/molecules/ProductCard'

function GridContent({ products }: { products: any[] }) {
  const searchParams = useSearchParams()
  const currentCat = searchParams.get('category') || 'all'

  const filtered = currentCat === 'all' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === currentCat.toLowerCase())

  if (filtered.length === 0) {
    return (
      <div className="py-24 text-center bg-white border border-[#dde7dd]/60 col-span-full">
        <h3 className="text-[1.25rem] font-medium text-[#1e2228] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          No products in this category.
        </h3>
        <p className="text-[14px] text-[#5c5a58]">
          Please try selecting a different category.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
      {filtered.map((product, idx) => (
        <ProductCard key={product._id} product={product} index={idx} />
      ))}
    </div>
  )
}

export function ProductGrid({ products }: { products: any[] }) {
  return (
    <Suspense fallback={<div className="min-h-[40vh]" />}>
      <GridContent products={products} />
    </Suspense>
  )
}

