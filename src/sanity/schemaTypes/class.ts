import { defineType, defineField } from 'sanity'

export const liveClass = defineType({
  name: 'liveClass',
  title: 'Class (Live)',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'time', title: 'Time', type: 'string' }),
    defineField({ name: 'capacity', title: 'Capacity', type: 'number' }),
    defineField({ name: 'enrolled', title: 'Enrolled', type: 'number', initialValue: 0 }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'details', title: 'Details', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ]
})