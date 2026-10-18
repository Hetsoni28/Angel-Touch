import { FadeIn } from '@/components/atoms/FadeIn'

const academyPrograms = [
  {
    code: 'Program 01',
    badge: 'Advanced Aesthetics & Master Diploma',
    title: 'Institute of Cosmetology & Advanced Aesthetics',
    modules: 'Modules 37 & 38',
    description:
      'Our most advanced clinical diploma curriculum for aspiring salon owners, aesthetic practitioners, and clinical cosmetologists.',
    whatYouLearn: [
      'Advanced Cosmetology & Clinical Facial Aesthetics (Module 38)',
      'Institute-grade Trichology & Intensive Scalp Health Science (Module 37)',
      'Clinical Machinery operation & high-frequency aesthetic equipment (Module 28 & 36)',
      'Chemical for Skin: Deep dive into AHA/BHA peels & active skin resurfacing (Module 29 & 35)',
      'Sterilization, client diagnosis, and launching your professional clinic',
    ],
  },
  {
    code: 'Program 02',
    badge: 'Holistic Spa & Natural Healing',
    title: 'Naturopathy, Ayurveda & Body Spa',
    modules: 'Modules 26, 30 & 31',
    description:
      'Master traditional holistic healing encompassing authentic Ayurvedic principles, Panchakarma spa therapies, and natural hair restoration.',
    whatYouLearn: [
      'Naturopathy & Ayurveda for Spa / Body Spa rituals (Module 26)',
      'Ayurvedic foundational principles, Prakriti & Dosha diagnosis (Module 31)',
      'Ayurvedic Hair Treatments, herbal oil formulation & root rejuvenation (Module 30)',
      'Traditional Shirodhara setup, herbal steam bath, and restorative body wraps',
      'Blending customized Ayurvedic therapeutic oils for individual clients',
    ],
  },
  {
    code: 'Program 03',
    badge: 'Clinical Aromatherapy & Specialized Peels',
    title: 'Aroma Therapy, Skin Treatments & Machinery',
    modules: 'Modules 27, 32, 33, 34, 35 & 36',
    description:
      'The comprehensive synergy of therapeutic essential oils, clinical corrective facials, and modern aesthetic machine handling.',
    whatYouLearn: [
      'Therapeutic Aroma Therapy & essential oil blending chemistry (Modules 32 & 33)',
      'Clinical Skin Treatments for stubborn acne, pigmentation & anti-aging (Modules 27 & 34)',
      'Chemical for Skin: Safe concentration, pH balancing & recovery care (Modules 29 & 35)',
      'Machinery: Galvanic, ultrasonic, and specialized facial infusion devices (Modules 28 & 36)',
      'Creating personalized aroma skincare regimens for diverse skin types',
    ],
  },
]

export function AcademyCurriculum() {
  return (
    <section id="curriculum" className="py-20 md:py-28 max-w-7xl mx-auto px-6 md:px-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#dde7dd]/80 mb-12">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-3">
            Comprehensive Pathways
          </p>
          <h2
            className="text-[2rem] sm:text-[2.6rem] font-medium text-[#1e2228] leading-[1.15]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What You Will Learn
          </h2>
        </div>
        <p className="text-[14px] text-[#5c5a58] max-w-md">
          Choose a full diploma program or enroll in specific targeted modules tailored to your career aspirations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {academyPrograms.map((prog, idx) => (
          <FadeIn key={prog.code} delay={idx * 0.1} className="flex flex-col h-full">
            <div className="flex flex-col justify-between h-full p-8 bg-white border border-[#dde7dd]/80 hover:border-[#1e5f2e] transition-all duration-300 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(30,95,46,0.08)] group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#1e5f2e] bg-[#e9f3e9] px-2.5 py-1 rounded-sm uppercase">
                    {prog.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-[#5c5a58] bg-[#faf8f2] border border-[#dde7dd] px-2 py-0.5 rounded-sm">
                    {prog.modules}
                  </span>
                </div>

                <h3
                  className="text-[1.4rem] font-medium text-[#1e2228] mb-3 leading-snug group-hover:text-[#1e5f2e] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {prog.title}
                </h3>

                <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-6">
                  {prog.description}
                </p>

                <div className="w-full h-px bg-[#dde7dd]/80 mb-6" />

                <h4 className="text-[10px] font-semibold tracking-[0.2em] text-[#1e5f2e] uppercase mb-4">
                  Key Syllabus Inclusions:
                </h4>
                <ul className="space-y-3 mb-8">
                  {prog.whatYouLearn.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-[13px] text-[#2c2a28] leading-snug">
                      <span className="w-4 h-4 rounded-full bg-[#e9f3e9] text-[#1e5f2e] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[#dde7dd]/60 mt-auto">
                <a
                  href={`https://wa.me/919723179638?text=${encodeURIComponent(
                    `Hello Angel Touch! I would like to inquire about ${prog.title} (${prog.modules}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#faf8f2] hover:bg-[#1e5f2e] border border-[#dde7dd] hover:border-[#1e5f2e] text-[#1e2228] hover:text-white text-[11px] font-semibold tracking-[0.14em] uppercase transition-all rounded-sm shadow-sm"
                >
                  <span>Inquire for Admission</span>
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
