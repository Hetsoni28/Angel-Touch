import { defineType, defineField } from 'sanity'

/**
 * Reusable SEO settings for any page-like document.
 * Every field is optional — the website falls back to the document's own
 * title, summary and main image when a field is left empty (src/lib/seo.ts).
 */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description:
        'Shown as the blue link in Google. Leave empty to use the name/title. Do not add "| Angel Touch" — it is added automatically. Aim for 30–45 characters.',
      validation: (Rule) =>
        Rule.max(45).warning('Keep under 45 characters — " | Angel Touch" is added after it, and Google cuts titles at ~60.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'The grey text under the link in Google. One or two sentences with the main keyword and a reason to click. 120–160 characters.',
      validation: (Rule) => [
        Rule.max(160).warning('Google cuts descriptions after ~160 characters.'),
        Rule.min(70).warning('Under 70 characters is usually too short to be useful.'),
      ],
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Shown when the page is shared on WhatsApp, Facebook, LinkedIn or X. Best size: 1200 × 630 px.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe what is in the image (max 125 characters).',
          validation: (Rule) => Rule.max(125).warning('Keep alt text under 125 characters.'),
        }),
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (advanced)',
      type: 'url',
      description:
        'Only fill this in if the same content lives at another URL and THAT one should rank. Leave empty in almost every case.',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'Turn ON to keep this page out of Google (e.g. drafts, thin or duplicate pages).',
      initialValue: false,
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Focus Keywords (internal notes)',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'For your own planning — e.g. "shirodhara ahmedabad". Google ignores meta keywords; use these words naturally in the title, description and headings instead.',
      options: { layout: 'tags' },
    }),
  ],
})
