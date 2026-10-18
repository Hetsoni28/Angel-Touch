import { FadeIn } from '@/components/atoms/FadeIn'

const hallmarks = [
  {
    num: '01',
    title: '100% Hands-On',
    description: 'Real client case studies, live chemical peel applications, and genuine machinery handling.',
  },
  {
    num: '02',
    title: 'Private Room Mentorship',
    description: 'Learn in quiet individual rooms with personalized 1-on-1 guidance from Heena Thaker.',
  },
  {
    num: '03',
    title: 'Certified Diploma',
    description: 'Official Angel Touch certification recognized for professional salon and clinic practice.',
  },
  {
    num: '04',
    title: 'Women-Only Sanctuary',
    description: 'An exclusive, safe, and comfortable learning environment for female students and practitioners.',
  },
]

export function AcademyHallmarks() {
  return (
    <section className="bg-white py-16 md:py-20 border-b border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hallmarks.map((h, i) => (
            <FadeIn key={h.num} delay={0.08 * (i + 1)}>
              <div className="flex flex-col">
                <span className="w-8 h-8 rounded-full bg-[#e9f3e9] text-[#1e5f2e] flex items-center justify-center text-[12px] font-bold mb-4 font-mono">
                  {h.num}
                </span>
                <h3 className="text-[1.2rem] font-medium text-[#1e2228] mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                  {h.title}
                </h3>
                <p className="text-[13px] text-[#5c5a58] leading-relaxed">
                  {h.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
