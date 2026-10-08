import { connection } from 'next/server'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export const instant = false

export default async function AdminRecordingsPage() {
  await connection()

  const masterclasses = await client.fetch(`
    *[_type == "masterclass"] | order(date desc) {
      _id,
      title,
      date,
      price,
      recordingUrl,
      "imageUrl": mainImage.asset->url
    }
  `)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Recordings & Classes</h1>
          <p className="text-[#5c5a58] text-[15px]">View your library. Content is managed in Sanity CMS.</p>
        </div>
        <Link 
          href="/studio"
          className="inline-flex items-center px-4 py-2 bg-[#1e2228] text-white text-[11px] font-semibold tracking-widest uppercase rounded hover:bg-[#2e7a3a] transition-colors"
        >
          Manage in Sanity <ExternalLink className="w-3 h-3 ml-2" />
        </Link>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Recording URL</th>
            </tr>
          </thead>
          <tbody>
            {masterclasses?.map((cls: any) => {
              const isPast = new Date(cls.date) < new Date()
              return (
                <tr key={cls._id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                  <td className="px-6 py-4">
                    {cls.imageUrl ? (
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <img src={cls.imageUrl} alt={cls.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#1e2228]">{cls.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${
                      isPast ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {isPast ? 'Recorded Vault' : 'Upcoming Live'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(cls.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">₹{cls.price}</td>
                  <td className="px-6 py-4">
                    {cls.recordingUrl ? (
                      <a href={cls.recordingUrl} target="_blank" rel="noopener noreferrer" className="text-[#2e7a3a] hover:underline flex items-center">
                        Link <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      <span className="text-[#8a8d87] italic">Not uploaded</span>
                    )}
                  </td>
                </tr>
              )
            })}
            {(!masterclasses || masterclasses.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">No classes found in Sanity.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
