import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: Rule => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'productCategory' }] }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'ingredients', title: 'Ingredients', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'usageDetails', title: 'Usage & Details', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ]
})