import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { client } from '@/sanity/lib/client'
import { Eye } from 'lucide-react'
import Link from 'next/link'

export const instant = false

export default async function AdminEnrollmentsPage() {
  await connection()
  const supabase = await createClient()

  // Fetch enrollments with profile data
  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select(`
      id,
      class_id,
      status,
      created_at,
      profiles:user_id(full_name, email)
    `)
    .order('created_at', { ascending: false })

  // Fetch all masterclasses from Sanity to map names and prices
  const masterclasses = await client.fetch(`*[_type == "masterclass"] { _id, title, price }`)
  const classMap = masterclasses.reduce((acc: any, curr: any) => {
    acc[curr._id] = { title: curr.title, price: curr.price }
    return acc
  }, {})

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Class Enrollments</h1>
        <p className="text-[#5c5a58] text-[15px]">Monitor live class registrations and recording purchases.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Purchase Date</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments?.map((enrollment: any) => {
              const sanityData = classMap[enrollment.class_id]
              const title = sanityData?.title || 'Unknown Class'
              const price = sanityData?.price || 0

              return (
                <tr key={enrollment.id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#1e2228]">{enrollment.profiles?.full_name || 'Unknown'}</p>
                    <p className="text-[#8a8d87] text-[11px]">{enrollment.profiles?.email}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#1e2228] max-w-[200px] truncate" title={title}>
                    {title}
                  </td>
                  <td className="px-6 py-4">{new Date(enrollment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-6 py-4">
                    {enrollment.status === 'confirmed' ? (
                      <span className="text-[#1e5f2e] font-semibold">₹{price} Paid</span>
                    ) : (
                      <span className="text-[#8a8d87] italic">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${
                      enrollment.status === 'confirmed' ? 'bg-[#e9f3e9] text-[#1e5f2e]' :
                      enrollment.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="inline-flex items-center text-[#8a8d87] hover:text-[#1e2228] transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
            {(!enrollments || enrollments.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">No enrollments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
