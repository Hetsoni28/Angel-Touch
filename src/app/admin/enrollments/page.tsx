import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { client } from '@/sanity/lib/client'

export const instant = false

export default async function AdminEnrollmentsPage() {
  await connection()
  const supabase = await createClient()

  // Fetch enrollments with profile data
  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select(`
      *,
      profiles:user_id(full_name, email)
    `)
    .order('created_at', { ascending: false })

  // Fetch all masterclasses from Sanity to map names
  const masterclasses = await client.fetch(`*[_type == "masterclass"] { _id, title }`)
  const classMap = masterclasses.reduce((acc: any, curr: any) => {
    acc[curr._id] = curr.title
    return acc
  }, {})

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Enrollments</h1>
        <p className="text-[#5c5a58] text-[15px]">View all class and recording purchases.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Class Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments?.map((enrollment) => (
              <tr key={enrollment.id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-semibold text-[#1e2228]">{enrollment.profiles?.full_name || 'Unknown'}</p>
                  <p className="text-[#8a8d87] text-[11px]">{enrollment.profiles?.email}</p>
                </td>
                <td className="px-6 py-4 font-medium">{classMap[enrollment.class_id] || 'Unknown Class'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded ${
                    enrollment.status === 'confirmed' ? 'bg-[#e9f3e9] text-[#1e5f2e]' :
                    enrollment.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {enrollment.status}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(enrollment.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {(!enrollments || enrollments.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">No enrollments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
