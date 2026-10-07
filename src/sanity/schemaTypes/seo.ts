import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
    defineField({ name: 'metaKeywords', title: 'Meta Keywords', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'openGraphImage', title: 'Open Graph Image', type: 'image' })
  ]
})