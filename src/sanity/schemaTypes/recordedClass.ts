import { defineType, defineField } from 'sanity'

export const recordedClass = defineType({
  name: 'recordedClass',
  title: 'Recorded Class',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'url' }),
    defineField({ name: 'duration', title: 'Duration (minutes)', type: 'number' }),
    defineField({ name: 'details', title: 'Details', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ]
})