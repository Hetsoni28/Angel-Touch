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
      name: 'shortDescription',
      title: 'Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'Optional short summary of what will be taught in this masterclass.',
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
    },
    prepare({ title, date }) {
      const isPast = date ? new Date(date) < new Date() : false
      return {
        title: title || 'Untitled Class',
        subtitle: date 
          ? `${new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} (${isPast ? 'Recorded Vault' : 'Upcoming Live'})`
          : 'No date set',
      }
    },
  },
})
