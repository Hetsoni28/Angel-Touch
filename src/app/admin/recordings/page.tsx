import { createClient } from '@/lib/supabase/server'
import { connection } from 'next/server'
import { client } from '@/sanity/lib/client'
import { Eye } from 'lucide-react'

export const instant = false

export default async function AdminRecordingsPage() {
  await connection()
  const supabase = await createClient()

  // 1. Fetch all masterclasses from Sanity (the "Recordings")
  const masterclasses = await client.fetch(`
    *[_type == "masterclass"] | order(date desc) {
      _id,
      title,
      date
    }
  `)

  // 2. Fetch Active Memberships count (these users have access to ALL recordings)
  const { count: activeMembersCount } = await supabase
    .from('memberships')
    .select('user_id', { count: 'exact', head: true })
    .eq('status', 'active')
    .gt('expires_at', new Date().toISOString())

  const membershipAccess = activeMembersCount || 0

  // 3. Fetch all confirmed individual enrollments
  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select('class_id, user_id')
    .eq('status', 'confirmed')

  // Group enrollments by class_id
  const enrollmentsByClass: Record<string, Set<string>> = {}
  if (enrollments) {
    for (const e of enrollments) {
      if (!enrollmentsByClass[e.class_id]) {
        enrollmentsByClass[e.class_id] = new Set()
      }
      enrollmentsByClass[e.class_id].add(e.user_id)
    }
  }

  // 4. Also fetch active membership user IDs to calculate exact distinct total eligible users
  const { data: activeMembers } = await supabase
    .from('memberships')
    .select('user_id')
    .eq('status', 'active')
    .gt('expires_at', new Date().toISOString())

  const activeMemberIds = new Set((activeMembers as any[])?.map((m: any) => m.user_id) || [])

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-[#1e2228] mb-2">Recording Access Control</h1>
        <p className="text-[#5c5a58] text-[15px]">Monitor exactly who has access to which video recordings.</p>
      </div>

      <div className="bg-white border border-[#dde7dd] overflow-x-auto">
        <table className="w-full text-left text-[13px] text-[#5c5a58]">
          <thead className="text-[10px] font-bold tracking-widest uppercase text-[#8a8d87] bg-[#faf8f2] border-b border-[#dde7dd]">
            <tr>
              <th className="px-6 py-4">Recording</th>
              <th className="px-6 py-4">Total Eligible Users</th>
              <th className="px-6 py-4">Individual Purchases</th>
              <th className="px-6 py-4">Membership Access</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {masterclasses?.map((cls: any) => {
              const individualUserIds = enrollmentsByClass[cls._id] || new Set()
              const individualPurchases = individualUserIds.size
              
              // Calculate distinct users (union of individual purchases + active members)
              const combinedUsers = new Set([...Array.from(individualUserIds), ...Array.from(activeMemberIds)])
              const totalEligible = combinedUsers.size

              return (
                <tr key={cls._id} className="border-b border-[#dde7dd] hover:bg-[#faf8f2] transition-colors">
                  <td className="px-6 py-4 font-semibold text-[#1e2228] max-w-[250px] truncate" title={cls.title}>
                    {cls.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 bg-[#1e2228] text-white text-[11px] font-bold rounded-full">
                      {totalEligible}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#1e2228]">{individualPurchases} Users</td>
                  <td className="px-6 py-4 font-medium text-[#1e5f2e]">{membershipAccess} Active Members</td>
                  <td className="px-6 py-4">
                    <button className="inline-flex items-center text-[#8a8d87] hover:text-[#1e2228] transition-colors" title="Inspect Access List">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
            {(!masterclasses || masterclasses.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center">No recordings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
