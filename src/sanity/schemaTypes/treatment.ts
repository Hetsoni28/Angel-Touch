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
      title: 'Menu Category',
      type: 'string',
      options: {
        list: [
          { title: '1. Threading', value: 'threading' },
          { title: '2. Bleach / D-Tan', value: 'bleach-dtan' },
          { title: '3. Clean Up', value: 'clean-up' },
          { title: '4. Waxing', value: 'waxing' },
          { title: '5. Facial & Aroma Therapy', value: 'facial' },
          { title: '6. Skin', value: 'skin' },
          { title: '7. Shirodhara', value: 'shirodhara' },
          { title: '8. Hair Cut', value: 'hair-cut' },
          { title: '9. Scalp Analysis & Hair Regrowth', value: 'scalp-analysis-hair-regrowth' },
          { title: '10. Hair Treatments', value: 'hair-treatments' },
          { title: '11. Technical & Style Services', value: 'technical-style-services' },
          { title: '12. Special Hair Care', value: 'special-hair-care' },
          { title: '13. Hair Care & Style', value: 'hair-care-style' },
          { title: '14. Hair Spa', value: 'hair-spa' },
          { title: '15. Body Scrub', value: 'body-scrub' },
          { title: '16. Body Wrap', value: 'body-wrap' },
          { title: '17. Steam Bath', value: 'steam-bath' },
          { title: '18. Hand & Feet Care', value: 'hand-feet-care' },
          { title: '19. Body Care & Spa', value: 'body-care-spa' },
          { title: '20. Body Spa', value: 'body-spa' },
          { title: '21. All Family Makeup Services', value: 'family-makeup' },
          { title: '22. Engagement / Ring Ceremony / Baby Shower Makeup Services', value: 'occasion-makeup' },
          { title: '23. Bridal Makeup Services', value: 'bridal-makeup' },
          { title: '24. Bridal Packages', value: 'bridal-packages' },
          { title: '25. Nail Art Services', value: 'nail-art' },
        ],
      },
      initialValue: 'facial',
    }),
    defineField({
      name: 'duration',
      title: 'Duration / Time (Optional)',
      type: 'string',
      description: 'e.g., 45 Mins, 60 Mins, 90 Mins, or 2 Hours',
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 2,
      description: 'Optional short summary of this service. If left empty, a default salon note will be displayed.',
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
    },
    prepare({ title, category, duration }) {
      const parts = [
        category ? category.replace('-', ' ') : null,
        duration || null,
      ].filter(Boolean).join(' • ')
      return {
        title: title || 'Untitled Treatment',
        subtitle: parts || 'Service',
      }
    },
  },
})