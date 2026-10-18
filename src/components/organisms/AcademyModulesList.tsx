import { FadeIn } from '@/components/atoms/FadeIn'

export const ACADEMY_GROUPS = [
  {
    groupCode: 'B',
    groupTitle: 'B. Academy Courses — New Pictures',
    badge: 'Core Clinical & Holistic Modules',
    description: 'Hands-on practical modules covering traditional naturopathy, clinical skincare diagnosis, aesthetic machinery handling, and pure aromatherapy.',
    modules: [
      {
        num: '26',
        title: 'Naturopathy & Ayurveda for Spa / Body Spa',
        description: 'Comprehensive natural spa healing, traditional body therapies, herbal wraps, and holistic wellness protocols.',
      },
      {
        num: '27',
        title: 'Skin Treatment',
        description: 'Clinical skincare diagnosis, deep pore extraction, acne control, anti-pigmentation, and radiant skin rejuvenation.',
      },
      {
        num: '28',
        title: 'Machinery',
        description: 'Hands-on training with professional salon & clinical skin machinery: high-frequency, ultrasonic, and galvanic devices.',
      },
      {
        num: '29',
        title: 'Chemical for Skin',
        description: 'Safe application of active skincare acids, glycolic, salicylic, lactic peels, pH control, and neutralization.',
      },
      {
        num: '30',
        title: 'Hair Treatment',
        description: 'Hair anatomy, scalp barrier repair, botanical hair spa, deep conditioning, and herbal hair regrowth protocols.',
      },
      {
        num: '31',
        title: 'Ayurveda',
        description: 'Ancient Ayurvedic wisdom applied to modern beauty: Vata, Pitta, Kapha balancing, herb selection, and dietary lifestyle.',
      },
      {
        num: '32',
        title: 'Aroma Therapy',
        description: 'Therapeutic essential oil extraction, dilution ratios, emotional calming, and custom aromatic skin facial protocols.',
      },
    ],
  },
  {
    groupCode: 'C',
    groupTitle: 'C. Academy Courses — Sparkz Graphics PDF',
    badge: 'Specialized Aesthetic & Clinical Practice',
    description: 'Targeted clinical curriculum covering advanced essential oil chemistry, corrective skin procedures, chemical peeling, and machine handling.',
    modules: [
      {
        num: '33',
        title: 'Aroma Therapy',
        description: 'Specialized aromatic formulations, carrier oil selection, synergy blending, and stress-relieving massage sequences.',
      },
      {
        num: '34',
        title: 'Skin Treatment',
        description: 'Advanced aesthetic skin analysis, lymphatic drainage massage, enzyme exfoliation, and clinical glow treatments.',
      },
      {
        num: '35',
        title: 'Chemical for Skin',
        description: 'Clinical peel management, active serum layering, post-peel barrier repair, and client safety guidelines.',
      },
      {
        num: '36',
        title: 'Machinery',
        description: 'Device sterilization, machine settings for diverse skin tones, microcurrent techniques, and treatment safety.',
      },
    ],
  },
  {
    groupCode: 'D',
    groupTitle: 'D. Academy Courses — Advanced Aesthetic Course PDF',
    badge: 'Master Diploma & Comprehensive Institute Training',
    description: 'Our most comprehensive professional credentials covering cosmetology science, trichology, aromatherapy, and clinic mastery.',
    modules: [
      {
        num: '37',
        title: 'Institute of Cosmetology, Trichology, Aromatherapy & Naturopath',
        description: 'Comprehensive institute diploma combining cosmetology science, clinical trichology, aromatic healing, and naturopathy.',
      },
      {
        num: '38',
        title: 'Advanced Cosmetology',
        description: 'Master-level professional cosmetology: advanced aesthetics, salon business management, and professional mastery.',
      },
    ],
  },
]

export function AcademyModulesList() {
  return (
    <section id="categories" className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#dde7dd]/80 mb-12">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-3">
              Official Course Categories
            </p>
            <h2
              className="text-[2rem] sm:text-[2.6rem] font-medium text-[#1e2228] leading-[1.15]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              All 13 Academy Categories (26 &ndash; 38)
            </h2>
          </div>
          <p className="text-[14px] text-[#5c5a58] max-w-md">
            Organized across 3 official syllabus groups. Available as individual certified modules or as part of a complete professional diploma.
          </p>
        </div>

        <div className="space-y-12">
          {ACADEMY_GROUPS.map((grp, gIdx) => (
            <FadeIn key={grp.groupCode} delay={gIdx * 0.1}>
              <div className="bg-white p-7 sm:p-9 border border-[#dde7dd]/80 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                
                {/* Group Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#dde7dd]/70 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#1e5f2e] text-white flex items-center justify-center text-[11px] font-bold">
                        {grp.groupCode}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-[#1e5f2e] uppercase bg-[#e9f3e9] px-2 py-0.5 rounded-sm">
                        {grp.badge}
                      </span>
                    </div>
                    <h3
                      className="text-[1.35rem] sm:text-[1.55rem] font-medium text-[#1e2228]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {grp.groupTitle}
                    </h3>
                  </div>
                  <p className="text-[13px] text-[#5c5a58] max-w-md sm:text-right">
                    {grp.description}
                  </p>
                </div>

                {/* Modules Grid inside Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {grp.modules.map((m) => (
                    <div
                      key={m.num + m.title}
                      className="flex flex-col justify-between p-5 bg-[#faf8f2] border border-[#dde7dd]/80 hover:border-[#1e5f2e] rounded-sm transition-all duration-300 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(30,95,46,0.06)] group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="w-7 h-7 rounded-full bg-[#1e5f2e] text-white flex items-center justify-center text-[11px] font-bold font-mono">
                            {m.num}
                          </span>
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#1e5f2e] bg-[#e9f3e9] px-2 py-0.5 rounded-sm">
                            Module {m.num}
                          </span>
                        </div>

                        <h4
                          className="text-[1.15rem] font-medium text-[#1e2228] mb-2 leading-snug group-hover:text-[#1e5f2e] transition-colors"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {m.title}
                        </h4>

                        <p className="text-[13px] text-[#5c5a58] leading-relaxed mb-4">
                          {m.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#dde7dd]/70 mt-auto flex items-center justify-between">
                        <span className="text-[11px] text-[#8a8d87] font-medium">Certified Category</span>
                        <a
                          href={`https://wa.me/919723179638?text=${encodeURIComponent(
                            `Hello Angel Touch! I would like details and pricing for Academy Module ${m.num}: ${m.title}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1e5f2e] hover:bg-[#164722] text-white text-[10px] font-semibold tracking-wider uppercase rounded-sm transition-colors shadow-sm"
                        >
                          <span>Inquire</span>
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
