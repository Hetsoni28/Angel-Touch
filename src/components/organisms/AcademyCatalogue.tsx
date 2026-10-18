'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { FadeIn } from '@/components/atoms/FadeIn'
import { Pagination } from '@/components/molecules/Pagination'

export interface SubModule {
  title: string
  topics: string[]
}

export interface AcademyCourse {
  _id: string
  num: string
  name: string
  groupCode: 'B' | 'C' | 'D'
  groupName: string
  categoryKey: string
  shortLabel: string
  duration?: string
  description: string
  syllabus: string[]
  subModules?: SubModule[]
}

export const OFFICIAL_ACADEMY_COURSES: AcademyCourse[] = [
  // ── PART B — NEW ACADEMY PICTURES ──
  {
    _id: 'academy-1',
    num: '1',
    name: 'Naturopathy & Ayurveda for Spa / Body Spa',
    shortLabel: '1. Naturopathy & Spa',
    groupCode: 'B',
    groupName: 'Part B — New Academy Pictures',
    categoryKey: 'naturopathy-ayurveda-spa',
    duration: '2 Days',
    description: 'Natural healing and authentic spa therapies covering mud treatments, moisture belt therapy, client diagnosis, and dietary planning.',
    syllabus: [
      'Naturopathy',
      'Mud Therapy',
      'Moisture Belt Therapy (Applications & Protocols)',
      'Client History & Problem Identification',
      'Diet Chart Formulation',
    ],
  },
  {
    _id: 'academy-2',
    num: '2',
    name: 'Skin Treatment',
    shortLabel: '2. Skin Treatment',
    groupCode: 'B',
    groupName: 'Part B — New Academy Pictures',
    categoryKey: 'academy-skin-treatment',
    duration: 'Clinical Skincare',
    description: 'Comprehensive clinical solutions for acne, pimples scars, open pores, sensitive skin balance, pigmentation, and skin tightening.',
    syllabus: [
      'Pimples & Acnes Management',
      'Pimples Scars & Open Pores',
      'Oily / Dry Skin — Blending',
      'Sensitive Skin Balance',
      'Mature Skin Treatment',
      'Skin Tightening',
      'Pigmentation & Freckles',
      'Rusessia Treatment Protocols',
      'Re-active Skin Blending',
    ],
  },
  {
    _id: 'academy-3',
    num: '3',
    name: 'Machinery',
    shortLabel: '3. Machinery',
    groupCode: 'B',
    groupName: 'Part B — New Academy Pictures',
    categoryKey: 'academy-machinery',
    duration: '2 Days',
    description: 'Complete hands-on training on why we need machines, precautions during use, and mastery of 11+ professional aesthetic devices.',
    syllabus: [
      'Why We Need to Use Machines & Machine Benefits',
      'Precautions During the Use of Machines',
      'Basic / Advance Machines Operation',
      'Galvanic Device Application',
      'High Frequency Device Handling',
      'Brushing Unit & Vibrator Operations',
      'Ultra Sonic Deep Cleansing',
      'Diamond Derma Brasisons',
      'Jeet Peel & Oxy Pee',
      'R F (Radio Frequency) Skin Tightening',
      'Derma Roller Protocols & Safety',
    ],
  },
  {
    _id: 'academy-4',
    num: '4',
    name: 'Chemical for Skin',
    shortLabel: '4. Chemical for Skin',
    groupCode: 'B',
    groupName: 'Part B — New Academy Pictures',
    categoryKey: 'academy-chemical-skin',
    duration: '2 Days',
    description: 'Detailed skin typing, 6 exfoliation modalities, active chemical peel acids, safe usage, and aroma synergy.',
    syllabus: [
      'Skin Types (Detailed Analysis)',
      'Types of Exfoliation (6 Different Types)',
      'Chemical & Skin Interactions',
      'Precautions During Use of Chemicals',
      'Types of Chemical Peels: AHA, Lection, Yellow, BHA, Melic, Selicic, Glyco, Citrus, SL',
      'Combinations of Chemicals & Aroma to Get Best & Safe Result',
    ],
  },
  {
    _id: 'academy-5',
    num: '5',
    name: 'Hair Treatment',
    shortLabel: '5. Hair Treatment',
    groupCode: 'B',
    groupName: 'Part B — New Academy Pictures',
    categoryKey: 'academy-hair-treatment',
    duration: 'Scalp & Root Care',
    description: 'Trichological diagnosis and targeted treatments for hair loss, dandruff, thinning, split ends, and chemically processed hair.',
    syllabus: [
      'Hair Loss & Hair Fall Treatment',
      'Scanty Hair & Hair Thickness Treatment',
      'Dandruff Treatment & Scalp Barrier Repair',
      'Rough Hair & Split Hair Restoration',
      'Processed Hair Care',
      'Chemical Treated Hair Repair',
    ],
  },
  {
    _id: 'academy-6',
    num: '6',
    name: 'Ayurveda',
    shortLabel: '6. Ayurveda',
    groupCode: 'B',
    groupName: 'Part B — New Academy Pictures',
    categoryKey: 'academy-ayurveda',
    duration: 'Traditional Wisdom',
    description: 'Deep understanding of Ayurveda, Tridosha diagnosis, classical Panchakarma therapies (Nasyam, Shirodhara, Vaman, Basti, Abhyanga), and herbal medicines.',
    syllabus: [
      'Detail Understanding of Ayurveda',
      'Tridosha: Vaat Dosha, Pit Dosha, Cough (Kapha) Dosha',
      'Nasyam Therapy',
      'Shirodhara Setup & Pouring Protocol',
      'Vaman & Tarpan Procedures',
      'Basti Preparation & Administration',
      'Abhayangham (Authentic Abhyanga Massage)',
      'Benefits of Ayurveda',
      'Knowledge of Basic Ayurvedic Medicines',
    ],
  },
  {
    _id: 'academy-7',
    num: '7',
    name: 'Aroma Therapy',
    shortLabel: '7. Aroma Therapy',
    groupCode: 'B',
    groupName: 'Part B — New Academy Pictures',
    categoryKey: 'academy-aroma-therapy',
    duration: '3 Days',
    description: 'The complete art and science of essential and carrier oils, dilution ratios, client history diagnosis, problem-solving recipes, and bespoke treatments.',
    syllabus: [
      'What Is Aroma Therapy & Types of Treatment',
      'Precautions During the Use of Aroma Therapy',
      'Measurement & Accurate Dilution Ratios',
      'Detail of Essential Oil & Carrier Oil',
      'Blending of Oils Regarding Client Problem',
      'Problem Solving by Aroma Therapy & Recipes for Common Problems',
      'Maintain Client History Records & Problem Identification',
      'Hair Treatments, Skin Problem — Designing Custom Treatments',
    ],
  },

  // ── PART C — SPARKZ GRAPHICS PDF ──
  {
    _id: 'academy-8',
    num: '8',
    name: 'Aroma Therapy (Sparkz Graphics PDF)',
    shortLabel: '8. Aroma (Sparkz)',
    groupCode: 'C',
    groupName: 'Part C — Sparkz Graphics PDF',
    categoryKey: 'sparkz-aroma-therapy',
    duration: 'Advanced Formulations',
    description: 'Advanced aromatherapy protocols: essential & carrier oil blending, treatment design, problem-solving recipes, and client record keeping.',
    syllabus: [
      'What Is Aroma Therapy?',
      'Types of Treatment by Aroma Therapy',
      'Precautions During the Use of Aroma Therapy',
      'Measurement — Use in It',
      'Detail of Essential Oil & Career Oil',
      'Blending of Oils Regarding Client Problem',
      'Problem Solving by Aroma Therapy',
      'Recipes of Some Common Problem',
      'Maintain Client History Records & Problem Identification',
      'Hair Treatments, Skin Problem — Design the Treatments',
    ],
  },
  {
    _id: 'academy-9',
    num: '9',
    name: 'Skin Treatment (Sparkz Graphics PDF)',
    shortLabel: '9. Skin (Sparkz)',
    groupCode: 'C',
    groupName: 'Part C — Sparkz Graphics PDF',
    categoryKey: 'sparkz-skin-treatment',
    duration: 'Aesthetic Skincare',
    description: 'Targeted corrective skin care for pimples, acne scars, open pores, oily/dry blending, sensitive skin, mature skin tightening, and pigmentation.',
    syllabus: [
      'Pimples & Acnes Management',
      'Pimple Scars & Open Pores Treatment',
      'Oily / Dry Skin — Blending',
      'Sensitive Skin Balance',
      'Mature Skin Treatment',
      'Skin Tightening',
      'Pigmentation & Freckles Removal',
      'Rusessia Protocols',
      'Re-active Skin Blending',
    ],
  },
  {
    _id: 'academy-10',
    num: '10',
    name: 'Chemical for Skin (Sparkz Graphics PDF)',
    shortLabel: '10. Chemical (Sparkz)',
    groupCode: 'C',
    groupName: 'Part C — Sparkz Graphics PDF',
    categoryKey: 'sparkz-chemical-skin',
    duration: 'Clinical Peels',
    description: 'Detailed skin analysis, 6 exfoliation techniques, active chemical peel acids (AHA, BHA, Glyco, Citrus), precautions, and aroma synergy.',
    syllabus: [
      'Skin Type (Detail Analysis)',
      'Types of Exfoliation (6 Different Types)',
      'Chemical & Skin Interaction Science',
      'Precautions During Use of Chemicals',
      'Types of Chemical Peels: AHA, Lection, Yellow, BHA, Melic, Selicic, Glyco, Citrus, SL',
      'Combinations of Chemicals & Aroma to Get Best & Safe Result',
    ],
  },
  {
    _id: 'academy-11',
    num: '11',
    name: 'Machinery (Sparkz Graphics PDF)',
    shortLabel: '11. Machinery (Sparkz)',
    groupCode: 'C',
    groupName: 'Part C — Sparkz Graphics PDF',
    categoryKey: 'sparkz-machinery',
    duration: 'Aesthetic Equipment',
    description: 'Comprehensive salon and clinical device handling: Galvanic, High Frequency, Ultrasonic, Diamond Dermabrasion, Jet Peel, RF, and Derma Roller.',
    syllabus: [
      'Why We Need to Use Machines?',
      'Benefits of Machines & Precautions During Use',
      'Basic / Advance Machines Handling',
      'Galvanic & High Frequency Devices',
      'Brushing Unit & Vibrator Operations',
      'Ultra Sonic Deep Cleansing',
      'Diamond Derma Brasisons',
      'Jeet Peel & Oxy Pee',
      'R F (Radio Frequency)',
      'Derma Roller Protocols',
    ],
  },

  // ── PART D — ADVANCED AESTHETIC COURSE PDF ──
  {
    _id: 'academy-12',
    num: '12',
    name: 'Institute of Cosmetology, Trichology, Aromatherapy & Naturopath',
    shortLabel: '12. Cosmetology & Trichology',
    groupCode: 'D',
    groupName: 'Part D — Advanced Aesthetic Course PDF',
    categoryKey: 'institute-cosmetology',
    duration: 'Institute Diploma',
    description: 'The academy\'s flagship institute qualification under Heena Thaker uniting cosmetology, trichology, aromatherapy, and naturopathic healing.',
    syllabus: [
      'The Official Academy Institute Program under Heena Thaker',
      'Comprehensive Clinical Cosmetology & Advanced Skincare',
      'Integrative Trichology, Scalp Health & Regrowth',
      'Therapeutic Aromatherapy & Essential Oil Blending',
      'Traditional Naturopathy, Mud & Spa Therapy',
      'Professional Certification & Salon Clinic Business Management',
    ],
  },
  {
    _id: 'academy-13',
    num: '13',
    name: 'Advanced Cosmetology',
    shortLabel: '13. Advanced Cosmetology',
    groupCode: 'D',
    groupName: 'Part D — Advanced Aesthetic Course PDF',
    categoryKey: 'advanced-cosmetology',
    duration: '10 Full Modules',
    description: 'Comprehensive 10-module master curriculum covering professional hygiene, anatomy, dermatology, lamps, peels, galvanic devices, and microdermabrasion.',
    syllabus: [
      'Module 1: Professional Standard, Ethics, Hygiene & Client Handling',
      'Module 2: Anatomy, Skin Structure, Physiology & Light Therapy',
      'Module 3: UV & Infrared Lamps, Iontophoresis & Clinical Dermatology',
      'Module 4: Terminology in Cosmetology, Wood Lamp & Dermascope Analysis',
      'Module 5: Sunblock / SPF Science, Steamer, Autoclave & Beauty Studio',
      'Module 6: Facial Masks, Non-Surgical Face Lifting & Anti-Aging',
      'Module 7: Gyratory, High Frequency, Galvanic & Ultrasonic Devices',
      'Module 8: Acne Cauterization, Scar Removal & 6 Chemical Peel Types',
      'Module 9: Cosmetic Chemistry, Epidermis Renewal & Lymphatic Drainage',
      'Module 10: Cosmetological Procedures, Freckles & Microdermabrasion',
    ],
    subModules: [
      {
        title: 'Module 1 — Professional Standard',
        topics: [
          'Professional Ethics',
          'Personal and Centre Hygiene',
          'Sterilization and Sanitization',
          'Hygiene & Bacteriology',
          'AIDS & Hepatitis',
          'Client Handling & People Skills',
        ],
      },
      {
        title: 'Module 2 — Anatomy & Light Therapy',
        topics: [
          'Cells',
          'Anatomy & Physiology',
          'Skin Structure',
          'Analysis of Skin',
          'Electricity & Light Therapy',
        ],
      },
      {
        title: 'Module 3 — Clinical Dermatology & Lamps',
        topics: [
          'Ultraviolet Lamp',
          'Infra Red Lamp',
          'Iontophoresis Face Chubbiness with Ultrasonic & Galvanic',
          'Chemistry',
          'Dermatology — 1',
          'Dermatology — 2',
        ],
      },
      {
        title: 'Module 4 — Skin Analysis Devices',
        topics: [
          'Terminology in Cosmetology',
          'Magnifying Glass',
          'Wood Lamp Analysis for Skin Types',
          'Dermascope',
          'Classification of Skin Types',
        ],
      },
      {
        title: 'Module 5 — Salon & Studio Standards',
        topics: [
          'Knowledge of Sunblock / Sunscreens / TPF / SPF',
          'Steamer',
          'Auto Clave',
          'Beauty Studio Operations',
        ],
      },
      {
        title: 'Module 6 — Advanced Skincare & Anti-Aging',
        topics: [
          'Basic Skin Care',
          'Aloe Vera Applications',
          'Facial Masks',
          'Non-Surgical Face Lifting',
          'Beautician vs Cosmetologists',
          'Anti Aging',
          'Melasma',
        ],
      },
      {
        title: 'Module 7 — Electrical Aesthetic Treatments',
        topics: [
          'Gyratory',
          'Hi Frequency',
          'Galvanic',
          'Faradic Treatment',
          'Interferential',
          'Ultrasonic',
        ],
      },
      {
        title: 'Module 8 — Peels & Mark / Scar Removal',
        topics: [
          'Sebisper',
          'Treatment of Acne',
          'Cauterization',
          'Exfoliation of Marks & Scar Removal',
          'Superficial Peels: Glycolic, Lactic, Salicylic',
          'Medium Peels: Trichloroacetic Acid, Jessener\'s Solution',
          'Deep Peels: Phenol, Retinol, Carbolic, Yellow Peel',
          'Vegetable Peels: Oats, Orange, Papaya, Cucumber',
          'Fruit Peels: Tartaric, Malic, Mandelic Black Peel',
          'Carbon Peels',
          'Pigmentation of Skin',
        ],
      },
      {
        title: 'Module 9 — Exfoliation & Lymphatic Drainage',
        topics: [
          'Chemistry for Cosmetologists',
          'Essential Knowledge of Skin',
          'Exfoliation of the Epidermis',
          'Skin Regenerative Stimulation',
          'Manual Lymphatic Drainage',
        ],
      },
      {
        title: 'Module 10 — Cosmetological Procedures',
        topics: [
          'Cosmetological Procedures',
          'Freckles — Treatments',
          'Beauty & Cosmetology Machines',
          'Microdermabrasion',
          'Treatment According to Skin',
        ],
      },
    ],
  },
]

export const ACADEMY_FILTER_CATEGORIES = [
  { key: 'all', label: 'All Academy Courses', shortLabel: 'All Courses' },
  { key: 'group-b', label: 'Part B: New Pictures (1–7)', shortLabel: 'Part B (1–7)' },
  { key: 'group-c', label: 'Part C: Sparkz Graphics (8–11)', shortLabel: 'Part C (8–11)' },
  { key: 'group-d', label: 'Part D: Advanced Aesthetic (12–13)', shortLabel: 'Part D (12–13)' },
  { key: 'naturopathy-ayurveda-spa', label: '1. Naturopathy & Ayurveda for Spa / Body Spa', shortLabel: '1. Naturopathy & Spa' },
  { key: 'academy-skin-treatment', label: '2. Skin Treatment', shortLabel: '2. Skin Treatment' },
  { key: 'academy-machinery', label: '3. Machinery', shortLabel: '3. Machinery' },
  { key: 'academy-chemical-skin', label: '4. Chemical for Skin', shortLabel: '4. Chemical for Skin' },
  { key: 'academy-hair-treatment', label: '5. Hair Treatment', shortLabel: '5. Hair Treatment' },
  { key: 'academy-ayurveda', label: '6. Ayurveda', shortLabel: '6. Ayurveda' },
  { key: 'academy-aroma-therapy', label: '7. Aroma Therapy', shortLabel: '7. Aroma Therapy' },
  { key: 'sparkz-aroma-therapy', label: '8. Aroma Therapy (Sparkz Graphics PDF)', shortLabel: '8. Aroma (Sparkz)' },
  { key: 'sparkz-skin-treatment', label: '9. Skin Treatment (Sparkz Graphics PDF)', shortLabel: '9. Skin (Sparkz)' },
  { key: 'sparkz-chemical-skin', label: '10. Chemical for Skin (Sparkz Graphics PDF)', shortLabel: '10. Chemical (Sparkz)' },
  { key: 'sparkz-machinery', label: '11. Machinery (Sparkz Graphics PDF)', shortLabel: '11. Machinery (Sparkz)' },
  { key: 'institute-cosmetology', label: '12. Institute of Cosmetology, Trichology, Aromatherapy & Naturopath', shortLabel: '12. Cosmetology & Trichology' },
  { key: 'advanced-cosmetology', label: '13. Advanced Cosmetology', shortLabel: '13. Advanced Cosmetology' },
]

const ITEMS_PER_PAGE = 6

function shuffleCourses(items: AcademyCourse[]): AcademyCourse[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function AcademySyllabusModal({
  course,
  onClose,
}: {
  course: AcademyCourse | null
  onClose: () => void
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (course) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [course, onClose])

  if (!course) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white max-w-2xl w-full max-h-[88vh] flex flex-col rounded-sm border border-[#dde7dd] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#dde7dd] bg-[#faf8f2] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1e5f2e]">
                {course.groupName}
              </span>
              {course.duration && (
                <span className="text-[10px] font-semibold text-[#1e5f2e] bg-[#e9f3e9] px-2 py-0.5 rounded-sm">
                  {course.duration}
                </span>
              )}
            </div>
            <h3
              className="text-[1.35rem] sm:text-[1.55rem] font-medium text-[#1e2228] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[#1e5f2e] mr-1.5 font-semibold">{course.num}.</span>
              {course.name}
            </h3>
            <p className="text-[12.5px] sm:text-[13px] text-[#5c5a58] mt-2 leading-relaxed">
              {course.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#e9f3e9] text-[#1e2228] hover:text-[#1e5f2e] border border-[#dde7dd] flex items-center justify-center text-sm transition-colors shrink-0 cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {course.subModules && course.subModules.length > 0 ? (
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1e5f2e] mb-3">
                Complete 10-Module Curriculum Breakdown:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.subModules.map((sm, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#faf8f2] border border-[#dde7dd]/80 rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-[12px] font-semibold text-[#1e5f2e] mb-2 pb-1 border-b border-[#dde7dd]/60">
                        {sm.title}
                      </h4>
                      <ul className="space-y-1">
                        {sm.topics.map((t, tIdx) => (
                          <li key={tIdx} className="text-[11px] text-[#3c3a38] flex items-start gap-1.5 leading-snug">
                            <span className="text-[#1e5f2e] text-[10px] mt-0.5">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1e5f2e] mb-3">
                Complete Curriculum Topics ({course.syllabus.length} Topics):
              </p>
              <ul className="space-y-2">
                {course.syllabus.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-[#2c2a28] leading-snug">
                    <span className="w-4 h-4 rounded-full bg-[#e9f3e9] text-[#1e5f2e] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#dde7dd] bg-[#faf8f2] flex items-center justify-between gap-3 flex-wrap">
          <span className="text-[11px] text-[#8a8d87]">
            Certified Academy Qualification &middot; Satellite, Ahmedabad
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 border border-[#dde7dd] hover:bg-white text-[#5c5a58] hover:text-[#1e2228] text-[11px] font-semibold tracking-[0.08em] uppercase rounded-sm transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={`https://wa.me/919723179638?text=${encodeURIComponent(
                `Hello Angel Touch! I would like details and admission information for Academy Course ${course.num}: ${course.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1e5f2e] hover:bg-[#164722] text-white text-[11px] font-semibold tracking-[0.1em] uppercase rounded-sm transition-colors shadow-sm"
            >
              <span>Inquire on WhatsApp</span>
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function AcademyCourseCard({
  course,
  globalIndex,
  onOpenModal,
}: {
  course: AcademyCourse
  globalIndex: number
  onOpenModal: (course: AcademyCourse) => void
}) {
  const visibleSyllabus = course.syllabus.slice(0, 3)
  const remainingCount = course.num === '13' ? 10 : course.syllabus.length

  return (
    <article className="group relative flex flex-col justify-between h-full p-5 sm:p-6 bg-white border border-[#dde7dd]/80 hover:border-[#2e7a3a] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(46,122,58,0.08)] rounded-sm">
      <div>
        {/* Header badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-semibold tracking-[0.16em] text-[#1e5f2e] uppercase truncate pr-2">
            {course.groupName.split(' — ')[1] || course.groupName}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {course.duration && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1e5f2e] bg-[#e9f3e9] px-2 py-0.5 rounded-sm">
                <svg className="w-2.5 h-2.5 text-[#1e5f2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
            )}
            <span className="text-[10.5px] font-mono text-[#8a8d87]/70">
              #{String(globalIndex).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Course Number & Name */}
        <h4
          className="text-[1.15rem] sm:text-[1.25rem] font-medium text-[#1e2228] leading-[1.3] mb-2 group-hover:text-[#1e5f2e] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-[#1e5f2e] font-semibold mr-1.5">{course.num}.</span>
          {course.name}
        </h4>

        {/* Description */}
        <p className="text-[12.5px] sm:text-[13px] text-[#5c5a58] leading-[1.65] mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Syllabus Highlights */}
        <div className="pt-3.5 border-t border-[#dde7dd]/60 mb-5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#1e5f2e] uppercase mb-2">
            Syllabus Highlights:
          </p>

          <ul className="space-y-1.5 mb-3">
            {visibleSyllabus.map((item, itemIdx) => (
              <li key={itemIdx} className="flex items-start gap-2 text-[12px] text-[#2c2a28] leading-snug">
                <span className="text-[#1e5f2e] font-bold text-[11px] shrink-0 mt-0.5">✓</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onOpenModal(course)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1e5f2e] hover:text-[#144720] transition-colors cursor-pointer group/btn"
          >
            <span>
              {course.num === '13'
                ? '+ View Full 10 Modules Breakdown'
                : `+ View Full Syllabus (${remainingCount} Topics)`}
            </span>
            <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3.5 border-t border-[#dde7dd]/60 flex items-center justify-between gap-3 mt-auto">
        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#8a8d87]">
          Certified Diploma
        </span>

        <a
          href={`https://wa.me/919723179638?text=${encodeURIComponent(
            `Hello Angel Touch! I would like details and admission information for Academy Course ${course.num}: ${course.name}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1e5f2e] hover:bg-[#164722] text-white text-[10.5px] font-semibold tracking-[0.1em] uppercase rounded-sm transition-all duration-200 shadow-sm shrink-0"
        >
          <span>Inquire</span>
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </article>
  )
}

export function AcademyCatalogue({
  id = 'catalogue',
  initialCourses,
}: {
  id?: string
  initialCourses?: AcademyCourse[]
}) {
  const defaultList = useMemo(() => {
    return initialCourses && initialCourses.length > 0 ? initialCourses : OFFICIAL_ACADEMY_COURSES
  }, [initialCourses])

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState(false)
  const [modalCourse, setModalCourse] = useState<AcademyCourse | null>(null)
  const [coursesList, setCoursesList] = useState<AcademyCourse[]>(defaultList)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const catalogueTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCoursesList(defaultList)
  }, [defaultList])

  // Listen to URL query parameter e.g. /academy?category=academy-skin-treatment
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const catParam = params.get('category')
      if (catParam && (catParam === 'all' || ACADEMY_FILTER_CATEGORIES.some(c => c.key === catParam))) {
        setSelectedCategory(catParam)
        setCurrentPage(1)
      }
    }
  }, [])

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSelectCategory = (catKey: string) => {
    if (catKey === 'all') {
      setCoursesList(shuffleCourses(OFFICIAL_ACADEMY_COURSES))
    }
    setSelectedCategory(catKey)
    setCurrentPage(1)
    setIsOpen(false)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (catKey === 'all') {
        url.searchParams.delete('category')
      } else {
        url.searchParams.set('category', catKey)
      }
      window.history.replaceState({}, '', url.toString())
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    if (catalogueTopRef.current) {
      catalogueTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Active category readable label
  const selectedCategoryLabel = useMemo(() => {
    if (selectedCategory === 'all') return 'All Academy Courses'
    const found = ACADEMY_FILTER_CATEGORIES.find((c) => c.key === selectedCategory)
    return found ? found.label : selectedCategory
  }, [selectedCategory])

  // Filtered courses by active category
  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'all') {
      return coursesList
    }
    if (selectedCategory === 'group-b') {
      return coursesList.filter((c) => c.groupCode === 'B')
    }
    if (selectedCategory === 'group-c') {
      return coursesList.filter((c) => c.groupCode === 'C')
    }
    if (selectedCategory === 'group-d') {
      return coursesList.filter((c) => c.groupCode === 'D')
    }
    return coursesList.filter((c) => c.categoryKey === selectedCategory)
  }, [coursesList, selectedCategory])

  // Pagination calculation
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCourses = useMemo(() => {
    return filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredCourses, startIndex])

  return (
    <section id={id} ref={catalogueTopRef} className="bg-[#faf8f2] py-20 md:py-28 border-t border-[#dde7dd]/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Section Heading & Category Selector (Matches Treatments & Services Exactly) */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[#dde7dd]/80">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[#1e5f2e] uppercase mb-3">
                Official Academy Syllabus
              </p>
              <h2
                className="text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-medium text-[#1e2228] leading-[1.15]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Academy Courses & Categories
              </h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <p className="text-[14px] sm:text-[15px] text-[#5c5a58]">
                  {selectedCategory === 'all'
                    ? `Showing all ${filteredCourses.length} accredited courses across 3 official syllabus groups.`
                    : `Showing all ${filteredCourses.length} courses under ${selectedCategoryLabel}.`}
                </p>
                {selectedCategory === 'all' && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoursesList(shuffleCourses(OFFICIAL_ACADEMY_COURSES))
                      setCurrentPage(1)
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e9f3e9] hover:bg-[#1e5f2e] text-[#1e5f2e] hover:text-white border border-[#1e5f2e]/20 text-[11px] font-semibold tracking-[0.08em] uppercase rounded-sm transition-colors cursor-pointer"
                    title="Shuffle courses order"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Shuffle Random</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dropdown Menu Filter */}
            <div className="relative shrink-0 w-full sm:w-auto" ref={dropdownRef}>
              <label htmlFor="academy-category-dropdown" className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8a8d87] mb-2">
                Filter by Category
              </label>
              <button
                id="academy-category-dropdown"
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="w-full sm:min-w-[320px] flex items-center justify-between gap-4 px-4 py-3 bg-white hover:bg-[#f6fbf6] border border-[#dde7dd] hover:border-[#1e5f2e] focus:outline-none focus:ring-2 focus:ring-[#1e5f2e]/30 transition-all text-left shadow-sm rounded-sm"
              >
                <span className="text-[12px] font-semibold tracking-[0.06em] uppercase text-[#1e2228] truncate">
                  {selectedCategoryLabel}
                </span>
                <svg
                  className={`w-4 h-4 text-[#1e5f2e] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 left-0 sm:left-auto sm:w-[360px] mt-2 bg-white border border-[#dde7dd] shadow-xl z-50 max-h-84 overflow-y-auto py-2 rounded-sm"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedCategory === 'all'}
                    onClick={() => handleSelectCategory('all')}
                    className={`w-full text-left px-4 py-2.5 text-[12px] tracking-[0.04em] flex items-center justify-between transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#e9f3e9] text-[#1e5f2e] font-semibold'
                        : 'text-[#1e2228] hover:bg-[#faf8f2]'
                    }`}
                  >
                    <span>All Academy Courses</span>
                    <span className="text-[11px] text-[#8a8d87]">
                      ({OFFICIAL_ACADEMY_COURSES.length})
                    </span>
                  </button>

                  <div className="my-1 border-t border-[#dde7dd]/60" />

                  {/* Group filters */}
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8a8d87] bg-[#faf8f2]">
                    Filter by Group
                  </div>
                  {[
                    { key: 'group-b', label: 'Part B: New Pictures (1–7)', count: 7 },
                    { key: 'group-c', label: 'Part C: Sparkz Graphics (8–11)', count: 4 },
                    { key: 'group-d', label: 'Part D: Advanced Aesthetic (12–13)', count: 2 },
                  ].map((grp) => {
                    const isSelected = selectedCategory === grp.key
                    return (
                      <button
                        key={grp.key}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectCategory(grp.key)}
                        className={`w-full text-left px-4 py-2 text-[12px] tracking-[0.04em] flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#e9f3e9] text-[#1e5f2e] font-semibold'
                            : 'text-[#1e2228] hover:bg-[#faf8f2]'
                        }`}
                      >
                        <span className="truncate pr-2">{grp.label}</span>
                        <span className={`text-[11px] shrink-0 ${isSelected ? 'text-[#1e5f2e] font-bold' : 'text-[#8a8d87]'}`}>
                          ({grp.count})
                        </span>
                      </button>
                    )
                  })}

                  <div className="my-1 border-t border-[#dde7dd]/60" />

                  {/* Individual Categories 1 to 13 */}
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8a8d87] bg-[#faf8f2]">
                    Individual Courses (1 &ndash; 13)
                  </div>
                  {ACADEMY_FILTER_CATEGORIES.slice(4).map((cat) => {
                    const count = OFFICIAL_ACADEMY_COURSES.filter((c) => c.categoryKey === cat.key).length
                    const isSelected = selectedCategory === cat.key

                    return (
                      <button
                        key={cat.key}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectCategory(cat.key)}
                        className={`w-full text-left px-4 py-2 text-[12px] tracking-[0.04em] flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#e9f3e9] text-[#1e5f2e] font-semibold'
                            : 'text-[#1e2228] hover:bg-[#faf8f2]'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.label}</span>
                        {count > 0 && (
                          <span className={`text-[11px] shrink-0 ${isSelected ? 'text-[#1e5f2e] font-bold' : 'text-[#8a8d87]'}`}>
                            ({count})
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Category Buttons Bar (Horizontal Scrollable for direct 1-click access - Matches Treatments Exactly) */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all rounded-sm border ${
                selectedCategory === 'all'
                  ? 'bg-[#1e5f2e] text-white border-[#1e5f2e] shadow-sm'
                  : 'bg-white text-[#5c5a58] hover:text-[#1e2228] border-[#dde7dd] hover:border-[#1e5f2e]'
              }`}
            >
              All Academy Courses (13)
            </button>

            {/* Group Quick Tabs */}
            <button
              type="button"
              onClick={() => handleSelectCategory('group-b')}
              className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase transition-all rounded-sm border flex items-center gap-1.5 ${
                selectedCategory === 'group-b'
                  ? 'bg-[#1e5f2e] text-white border-[#1e5f2e] shadow-sm'
                  : 'bg-white text-[#5c5a58] hover:text-[#1e2228] border-[#dde7dd] hover:border-[#1e5f2e]'
              }`}
            >
              <span>Part B (1–7)</span>
              <span className={`text-[10px] ${selectedCategory === 'group-b' ? 'text-white/80' : 'text-[#8a8d87]'}`}>(7)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectCategory('group-c')}
              className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase transition-all rounded-sm border flex items-center gap-1.5 ${
                selectedCategory === 'group-c'
                  ? 'bg-[#1e5f2e] text-white border-[#1e5f2e] shadow-sm'
                  : 'bg-white text-[#5c5a58] hover:text-[#1e2228] border-[#dde7dd] hover:border-[#1e5f2e]'
              }`}
            >
              <span>Part C (8–11)</span>
              <span className={`text-[10px] ${selectedCategory === 'group-c' ? 'text-white/80' : 'text-[#8a8d87]'}`}>(4)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectCategory('group-d')}
              className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase transition-all rounded-sm border flex items-center gap-1.5 ${
                selectedCategory === 'group-d'
                  ? 'bg-[#1e5f2e] text-white border-[#1e5f2e] shadow-sm'
                  : 'bg-white text-[#5c5a58] hover:text-[#1e2228] border-[#dde7dd] hover:border-[#1e5f2e]'
              }`}
            >
              <span>Part D (12–13)</span>
              <span className={`text-[10px] ${selectedCategory === 'group-d' ? 'text-white/80' : 'text-[#8a8d87]'}`}>(2)</span>
            </button>

            <span className="w-px h-6 bg-[#dde7dd] shrink-0 mx-1" aria-hidden="true" />

            {/* Individual Category Pills 1 to 13 */}
            {ACADEMY_FILTER_CATEGORIES.slice(4).map((cat) => {
              const isSelected = selectedCategory === cat.key
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleSelectCategory(cat.key)}
                  className={`shrink-0 px-4 py-2 text-[11px] font-semibold tracking-[0.08em] uppercase transition-all rounded-sm border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1e5f2e] text-white border-[#1e5f2e] shadow-sm'
                      : 'bg-white text-[#5c5a58] hover:text-[#1e2228] border-[#dde7dd] hover:border-[#1e5f2e]'
                  }`}
                >
                  <span>{cat.shortLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Sub-heading with page indicator (Matches Treatments) */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#dde7dd]">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#1e5f2e]" aria-hidden="true" />
            <h3
              className="text-[1.3rem] sm:text-[1.6rem] font-medium text-[#1e2228]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {selectedCategoryLabel}
            </h3>
          </div>
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8a8d87]">
            Page {currentPage} of {Math.max(1, totalPages)} &middot; {filteredCourses.length} Courses
          </span>
        </div>

        {/* Grid of Course Cards (Strictly NO IMAGES, Matches Treatments Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedCourses.map((course, idx) => {
            const globalIndex = startIndex + idx + 1
            return (
              <FadeIn key={course._id} delay={Math.min(idx * 0.05, 0.25)}>
                <AcademyCourseCard
                  course={course}
                  globalIndex={globalIndex}
                  onOpenModal={setModalCourse}
                />
              </FadeIn>
            )
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-[#dde7dd] flex flex-col items-center gap-3">
            <p className="text-[12px] tracking-[0.06em] text-[#8a8d87]">
              Showing <span className="font-semibold text-[#1e2228]">{startIndex + 1}&ndash;{Math.min(startIndex + ITEMS_PER_PAGE, filteredCourses.length)}</span> of <span className="font-semibold text-[#1e2228]">{filteredCourses.length}</span> courses
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="py-2"
            />
          </div>
        )}

      </div>

      {/* Full Syllabus Modal */}
      <AcademySyllabusModal
        course={modalCourse}
        onClose={() => setModalCourse(null)}
      />
    </section>
  )
}
