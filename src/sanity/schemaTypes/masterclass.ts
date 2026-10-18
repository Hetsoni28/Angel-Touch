import { defineField, defineType } from 'sanity'

export const masterclassType = defineType({
  name: 'masterclass',
  title: 'Masterclass / Class',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Class Title / Name',
      type: 'string',
      description: 'e.g., Ayurvedic Facial Oil Formulation or Herbal Hair Spa Workshop',
      validation: (Rule) => Rule.required().error('Please enter the class title'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Click Generate to auto-create from title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date and Time',
      type: 'datetime',
      description: 'Scheduled date and time for the live workshop or class session.',
      validation: (Rule) => Rule.required().error('Please select the class date and time'),
    }),
    defineField({
      name: 'category',
      title: 'Academy Course Category (Optional)',
      type: 'string',
      options: {
        list: [
          { title: '1. Naturopathy & Ayurveda for Spa / Body Spa', value: 'naturopathy-ayurveda-spa' },
          { title: '2. Skin Treatment', value: 'academy-skin-treatment' },
          { title: '3. Machinery', value: 'academy-machinery' },
          { title: '4. Chemical for Skin', value: 'academy-chemical-skin' },
          { title: '5. Hair Treatment', value: 'academy-hair-treatment' },
          { title: '6. Ayurveda', value: 'academy-ayurveda' },
          { title: '7. Aroma Therapy', value: 'academy-aroma-therapy' },
          { title: '8. Aroma Therapy (Sparkz Graphics PDF)', value: 'sparkz-aroma-therapy' },
          { title: '9. Skin Treatment (Sparkz Graphics PDF)', value: 'sparkz-skin-treatment' },
          { title: '10. Chemical for Skin (Sparkz Graphics PDF)', value: 'sparkz-chemical-skin' },
          { title: '11. Machinery (Sparkz Graphics PDF)', value: 'sparkz-machinery' },
          { title: '12. Institute of Cosmetology, Trichology, Aromatherapy & Naturopath', value: 'institute-cosmetology' },
          { title: '13. Advanced Cosmetology', value: 'advanced-cosmetology' },
        ],
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'Optional short summary of what will be taught in this masterclass.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration / Time (Optional)',
      type: 'string',
      description: 'e.g., 2 Hours, 90 Mins, or 1 Day Workshop',
    }),
    defineField({
      name: 'recordingUrl',
      title: 'YouTube Unlisted Recording URL (Optional)',
      type: 'url',
      description: 'Paste the YouTube Unlisted link here AFTER the live class is finished to provide recording access.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      duration: 'duration',
    },
    prepare({ title, date, duration }) {
      const isPast = date ? new Date(date) < new Date() : false
      const dateStr = date 
        ? `${new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} (${isPast ? 'Recorded Vault' : 'Upcoming Live'})`
        : 'No date set'
      return {
        title: title || 'Untitled Class',
        subtitle: duration ? `${dateStr} • ${duration}` : dateStr,
      }
    },
  },
})
