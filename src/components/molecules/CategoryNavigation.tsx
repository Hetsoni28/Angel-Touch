'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export interface CategoryProps {
  _id: string;
  slug: string;
  name: string;
  [key: string]: unknown;
}

function CategoryNavContent({ categories }: { categories: CategoryProps[] }) {
  const searchParams = useSearchParams()
  const currentCat = searchParams.get('category') || 'all'

  return (
    <nav aria-label="Product categories" className="flex items-center gap-6 md:gap-10 overflow-x-auto pb-4 no-scrollbar">
      <Link
        href="/shop"
        aria-current={currentCat === 'all' ? 'page' : undefined}
        className={`shrink-0 min-h-[44px] flex items-center text-[12px] font-medium tracking-[0.14em] uppercase pb-2 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm ${
          currentCat === 'all'
            ? 'text-[#2e7a3a] border-[#2e7a3a] font-semibold'
            : 'text-[#4a4846] border-transparent hover:text-[#1e2228]'
        }`}
      >
        All Products
      </Link>
      {categories.map((cat) => {
        const isActive = currentCat === cat.slug
        return (
          <Link
            key={cat._id}
            href={`/shop?category=${cat.slug}`}
            aria-current={isActive ? 'page' : undefined}
            className={`shrink-0 min-h-[44px] flex items-center text-[12px] font-medium tracking-[0.14em] uppercase pb-2 border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] rounded-sm ${
              isActive
                ? 'text-[#2e7a3a] border-[#2e7a3a] font-semibold'
                : 'text-[#4a4846] border-transparent hover:text-[#1e2228]'
            }`}
          >
            {cat.name}
          </Link>
        )
      })}
    </nav>
  )
}

export function CategoryNavigation({ categories }: { categories: CategoryProps[] }) {
  if (!categories || categories.length === 0) return null

  return (
    <section className="bg-white border-b border-[#dde7dd]/60 pt-6 px-6 md:px-10 sticky top-[72px] z-30">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<div className="h-8" />}>
          <CategoryNavContent categories={categories} />
        </Suspense>
      </div>
    </section>
  )
}

