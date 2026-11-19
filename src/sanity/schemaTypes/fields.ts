import { defineField, type SlugOptions, type SlugRule } from 'sanity'

/**
 * SEO-friendly slug: lowercase words joined by hyphens, "&" → "and",
 * no punctuation, max 96 characters.
 *   "Neem & Tulsi Cleansing Clay" → "neem-and-tulsi-cleansing-clay"
 */
export function seoSlugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
    .replace(/-+$/, '')
}

export function slugOptions(source: string): SlugOptions {
  return { source, maxLength: 96, slugify: seoSlugify }
}

/** Rule for slug fields: required, lowercase-hyphen format, short enough to read. */
export function slugValidation(Rule: SlugRule) {
  return Rule.required().custom((value) => {
    const slug = value?.current
    if (!slug) return true
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return 'Use lowercase letters, numbers and single hyphens only (click "Generate").'
    }
    return true
  })
}

/** Alt text sub-field for image fields — used by Google Images and screen readers. */
export const altField = defineField({
  name: 'alt',
  title: 'Alt text (for Google & screen readers)',
  type: 'string',
  description:
    'Describe what is in the image and include the topic naturally — e.g. "Kesar radiance oil in an amber glass dropper bottle with saffron strands". Max 125 characters. Leave empty only for purely decorative images.',
  validation: (Rule) => Rule.max(125).warning('Keep alt text under 125 characters.'),
})
