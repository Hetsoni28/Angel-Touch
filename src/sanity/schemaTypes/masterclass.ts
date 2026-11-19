import { defineField, defineType } from 'sanity'
import { slugOptions } from './fields'

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
      options: slugOptions('title'),
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
      name: 'image',
      title: 'Main Image',
      type: 'image',
      description: 'Shown at the top of the class page and when the page is shared. Landscape works best.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text (for Google & screen readers)',
          type: 'string',
          description:
            'Describe what is in the photo, naturally including the topic — e.g. "Saffron face oil being blended in an Ayurvedic formulation class". Max 125 characters.',
          validation: (Rule) => Rule.max(125).warning('Keep alt text under 125 characters.'),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Full Description (Optional)',
      type: 'blockContent',
      description: 'Longer write-up shown on the class page. Use "H3" for sub-headings.',
    }),
    defineField({
      name: 'whatYouWillLearn',
      title: 'What You Will Learn (Optional)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'whatIsIncluded',
      title: 'What Is Included (Optional)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'type',
      title: 'Class Type',
      type: 'string',
      options: {
        list: [
          { title: 'Live class', value: 'live' },
          { title: 'Recording only', value: 'recording' },
        ],
        layout: 'radio',
      },
      initialValue: 'live',
    }),
    defineField({
      name: 'price',
      title: 'Price in ₹ (Optional)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'time',
      title: 'Display Time (Optional)',
      type: 'string',
      description: 'e.g., 11:00 AM',
    }),
    defineField({
      name: 'capacity',
      title: 'Seats Available (Optional)',
      type: 'number',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'isCancelled',
      title: 'Cancelled',
      type: 'boolean',
      initialValue: false,
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
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
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
