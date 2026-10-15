import { defineType, defineField } from 'sanity'

export const treatment = defineType({
  name: 'treatment',
  title: 'Treatment / Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Treatment Name',
      type: 'string',
      description: 'e.g., Shirodhara Therapy, Ayurvedic Hair Spa, or Kesar Radiance Facial',
      validation: (Rule) => Rule.required().error('Please provide a treatment name'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description: 'Click Generate to auto-create from name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Ayurvedic & Spa Therapies', value: 'ayurvedic-spa' },
          { title: 'Facials & Skin Rituals', value: 'facials-skin' },
          { title: 'Hair Rituals & Spa', value: 'hair-care' },
          { title: 'Bridal & Occasion Styling', value: 'bridal-styling' },
          { title: 'Essential Grooming', value: 'grooming' },
        ],
      },
      initialValue: 'facials-skin',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      description: 'e.g., 45, 60, or 90',
    }),
    defineField({
      name: 'price',
      title: 'Price / Rate (Optional)',
      type: 'string',
      description: 'e.g., ₹1,500 or Starting from ₹999',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief 1-2 sentence description of the treatment benefits.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'Turn ON to display this treatment in the featured section on the homepage.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      duration: 'duration',
      price: 'price',
    },
    prepare({ title, category, duration, price }) {
      const details = [
        category ? category.replace('-', ' ') : null,
        duration ? `${duration} mins` : null,
        price || null,
      ].filter(Boolean).join(' • ')

      return {
        title: title || 'Untitled Treatment',
        subtitle: details || 'Service',
      }
    },
  },
})