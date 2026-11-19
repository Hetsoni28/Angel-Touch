import { defineType, defineField } from 'sanity'
import { slugOptions } from './fields'

export const membershipPlan = defineType({
  name: 'membershipPlan',
  title: 'Membership Plan',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: slugOptions('name') }),
    defineField({ name: 'price', title: 'Price', type: 'string' }),
    defineField({ name: 'billingPeriod', title: 'Billing Period', type: 'string', options: { list: ['Monthly', 'Yearly'] } }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ]
})