import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { Calendar, PlayCircle, Clock, CheckCircle2 } from 'lucide-react'
import { connection } from 'next/server'
import Link from 'next/link'

export const instant = false

export default async function MyClassesPage() {
  await connection()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/customer/classes')
  }

  // Fetch Class Enrollments
  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select('class_id, created_at')
    .eq('user_id', user.id)
    .eq('status', 'confirmed')

  const confirmedClassIds = (enrollments || []).map(e => e.class_id)

  let enrolledClasses: any[] = []
  if (confirmedClassIds.length > 0) {
    enrolledClasses = await client.fetch(`
      *[_type == "masterclass" && _id in $ids] | order(date asc) {
        _id,
        title,
        slug,
        date,
        time,
        "imageUrl": mainImage.asset->url
      }
    `, { ids: confirmedClassIds })
  }

  const now = new Date()
  const upcomingClasses = enrolledClasses.filter(c => new Date(c.date) >= now)
  const completedClasses = enrolledClasses.filter(c => new Date(c.date) < now).reverse()

  return (
    <div className="w-full">
      <div className="border-b border-[#dde7dd] pb-8 mb-10">
        <h1 className="font-playfair text-3xl md:text-4xl text-[#1e2228] mb-2">
          My Classes
        </h1>
        <p className="text-[#5c5a58] text-[15px]">
          View your upcoming live masterclasses and past class recordings.
        </p>
      </div>

      {enrolledClasses.length === 0 ? (
        <div className="text-center p-12 bg-white border border-dashed border-[#dde7dd]">
          <Calendar className="w-12 h-12 text-[#dde7dd] mx-auto mb-4" />
          <h3 className="text-[#1e2228] font-semibold text-lg mb-2">No classes yet</h3>
          <p className="text-[#5c5a58] text-[14px] mb-6">
            You haven't enrolled in any classes yet.
          </p>
          <Link href="/classes" className="inline-flex items-center justify-center px-6 py-3 bg-[#1e2228] hover:bg-[#2e7a3a] text-white text-[11px] font-semibold tracking-widest uppercase transition-colors">
            Browse Classes
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* UPCOMING CLASSES */}
          <section>
            <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-6 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Upcoming Classes
            </h2>
            
            {upcomingClasses.length === 0 ? (
              <p className="text-[#5c5a58] text-[14px] italic">No upcoming classes scheduled.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {upcomingClasses.map((cls) => (
                  <div key={cls._id} className="bg-white border border-[#dde7dd] p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {cls.imageUrl && (
                      <div className="w-full md:w-48 aspect-video bg-[#faf8f2] flex-shrink-0 relative overflow-hidden">
                        <img src={cls.imageUrl} alt={cls.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-playfair text-xl text-[#1e2228] mb-2">{cls.title}</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#5c5a58] text-[14px]">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(cls.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {cls.time} IST</span>
                      </div>
                    </div>
                    <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-2 border-t md:border-t-0 border-[#dde7dd] pt-4 md:pt-0">
                      <span className="inline-flex items-center px-3 py-1 bg-[#e9f3e9] text-[#1e5f2e] text-[10px] font-bold tracking-widest uppercase rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed
                      </span>
                      <p className="text-[#8a8d87] text-[11px]">Link will be emailed 24h before.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* COMPLETED CLASSES */}
          <section>
            <h2 className="text-[#8a8d87] text-[11px] font-semibold tracking-widest uppercase mb-6 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Completed Classes
            </h2>
            
            {completedClasses.length === 0 ? (
              <p className="text-[#5c5a58] text-[14px] italic">No completed classes yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {completedClasses.map((cls) => (
                  <div key={cls._id} className="bg-white border border-[#dde7dd] p-6 flex flex-col md:flex-row gap-6 items-start md:items-center opacity-80 hover:opacity-100 transition-opacity">
                    {cls.imageUrl && (
                      <div className="w-full md:w-48 aspect-video bg-[#faf8f2] flex-shrink-0 relative overflow-hidden">
                        <img src={cls.imageUrl} alt={cls.title} className="w-full h-full object-cover grayscale opacity-80" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-playfair text-xl text-[#1e2228] mb-2">{cls.title}</h3>
                      <p className="text-[#8a8d87] text-[13px] mb-2">Completed on {new Date(cls.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      <span className="inline-flex items-center text-[#2e7a3a] text-[11px] font-bold tracking-widest uppercase">
                        Recording Available
                      </span>
                    </div>
                    <div className="w-full md:w-auto border-t md:border-t-0 border-[#dde7dd] pt-4 md:pt-0">
                      <Link 
                        href={`/customer/library/${cls.slug.current || cls.slug}`}
                        className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-[#2e7a3a] text-[#2e7a3a] hover:bg-[#2e7a3a] hover:text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors w-full md:w-auto"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Watch Recording
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      )}
    </div>
  )
}
