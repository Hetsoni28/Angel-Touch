import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { ArrowRight, Search as SearchIcon } from 'lucide-react'

export const instant = false // Dynamic route

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''

  let results: any[] = []

  if (query.trim().length > 0) {
    // Search masterclasses in Sanity where title or description matches
    results = await client.fetch(`
      *[_type == "masterclass" && (title match $term || description match $term)] {
        _id,
        title,
        description,
        date,
        price,
        "imageUrl": mainImage.asset->url
      }
    `, { term: `*${query}*` })
  }

  return (
    <div className="min-h-[70vh] bg-[#faf8f2] px-6 py-24 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto fade-in-up">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#5c8f60] mb-4">
            Search Results
          </p>
          <h1 className="font-playfair text-4xl text-[#1e2228] mb-6">
            {query ? `Results for "${query}"` : 'Search Angel Touch'}
          </h1>
          
          <form action="/search" method="GET" className="max-w-md mx-auto relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search classes, recordings..."
              className="w-full bg-transparent border-b-2 border-[#1e2228] py-4 pr-12 text-[18px] text-[#1e2228] placeholder-[#a8a8a8] focus:outline-none transition-colors rounded-none"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1e2228] hover:text-[#2e7a3a] transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Results */}
        {query && results.length > 0 && (
          <div className="flex flex-col gap-8">
            {results.map((item) => (
              <div key={item._id} className="group bg-white border border-[#dde7dd] flex flex-col sm:flex-row hover:shadow-xl hover:shadow-[#2e7a3a]/5 transition-all duration-300">
                {item.imageUrl && (
                  <div className="w-full sm:w-1/3 aspect-[4/3] relative overflow-hidden bg-[#faf8f2]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-[#f4f1eb] text-[10px] uppercase tracking-widest font-bold text-[#8a8d87] mb-3">
                      Masterclass
                    </span>
                    <h3 className="font-playfair text-2xl text-[#1e2228] mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-[14px] text-[#5c5a58] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Link href={`/classes`} className="inline-flex items-center text-[11px] font-semibold tracking-widest uppercase text-[#2e7a3a] hover:text-[#1e5f2e] transition-colors">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {query && results.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#f4f1eb] rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-6 h-6 text-[#8a8d87]" />
            </div>
            <h3 className="font-playfair text-2xl text-[#1e2228] mb-3">No results found</h3>
            <p className="text-[15px] text-[#5c5a58]">
              We couldn't find any classes matching your search. Please try a different term.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
