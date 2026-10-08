import { defineField, defineType } from 'sanity'

export const masterclassType = defineType({
  name: 'masterclass',
  title: 'Masterclass',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Class Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Class Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary for the class card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'blockContent',
      description: 'The detailed description for the class page.',
    }),
    defineField({
      name: 'whatYouWillLearn',
      title: "What You'll Learn",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'whatIsIncluded',
      title: 'What Is Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'date',
      title: 'Date and Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "2 Hours", "90 Minutes"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (in INR)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'recordingUrl',
      title: 'YouTube Unlisted Recording URL',
      type: 'url',
      description: 'Paste the YouTube Unlisted link here AFTER the live class is finished.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      date: 'date',
    },
    prepare({ title, media, date }) {
      const isPast = date ? new Date(date) < new Date() : false
      return {
        title,
        subtitle: isPast ? 'Recorded Vault' : 'Upcoming Live',
        media,
      }
    },
  },
})
