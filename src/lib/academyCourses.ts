/**
 * Academy course types and helpers. The courses themselves live in Sanity
 * Studio → "Academy Course (Courses 1–13)" and are loaded by getAcademyCourses()
 * (src/lib/academyData.ts). Nothing here is client-only, so server and client
 * code can both import it.
 */

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

/** Sanity `group` value → the group code and the exact group name shown on the site. */
export const ACADEMY_GROUPS: Record<string, { code: AcademyCourse['groupCode']; name: string }> = {
  'group-b': { code: 'B', name: 'Part B — New Academy Pictures' },
  'group-c': { code: 'C', name: 'Part C — Sparkz Graphics PDF' },
  'group-d': { code: 'D', name: 'Part D — Advanced Aesthetic Course PDF' },
}

/** An academy course document as returned by ALL_ACADEMY_COURSES_QUERY. */
export type SanityAcademyCourse = {
  _id: string
  num?: string | null
  name?: string | null
  shortLabel?: string | null
  slug?: string | null
  group?: string | null
  categoryKey?: string | null
  duration?: string | null
  description?: string | null
  syllabus?: string[] | null
  subModules?: { title?: string | null; topics?: string[] | null }[] | null
}

/** Convert a Sanity course into the shape the catalogue renders (same fields as the list below). */
export function courseFromSanity(d: SanityAcademyCourse): AcademyCourse | null {
  if (!d.name || !d.num) return null
  const group = ACADEMY_GROUPS[d.group || ''] ?? ACADEMY_GROUPS['group-b']
  return {
    _id: d._id,
    num: String(d.num).trim(),
    name: d.name,
    shortLabel: d.shortLabel || `${String(d.num).trim()}. ${d.name}`,
    groupCode: group.code,
    groupName: group.name,
    categoryKey: d.categoryKey || d.slug || d._id,
    ...(d.duration ? { duration: d.duration } : {}),
    description: d.description || '',
    syllabus: (d.syllabus ?? []).filter(Boolean),
    ...(d.subModules?.length
      ? { subModules: d.subModules.filter((m) => m.title).map((m) => ({ title: m.title as string, topics: (m.topics ?? []).filter(Boolean) })) }
      : {}),
  }
}
