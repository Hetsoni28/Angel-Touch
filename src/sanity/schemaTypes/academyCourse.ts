import { defineType, defineField } from 'sanity'

export const academyCourse = defineType({
  name: 'academyCourse',
  title: 'Academy Course (Courses 1–13)',
  type: 'document',
  fields: [
    defineField({
      name: 'num',
      title: 'Course Number',
      type: 'string',
      description: 'e.g., 1, 2, 3, ..., 13',
      validation: (Rule) => Rule.required().error('Please enter the course number (1 to 13)'),
    }),
    defineField({
      name: 'name',
      title: 'Course / Module Name',
      type: 'string',
      description: 'e.g., Naturopathy & Ayurveda for Spa / Body Spa, Skin Treatment, Machinery, etc.',
      validation: (Rule) => Rule.required().error('Please enter the course name'),
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
      name: 'group',
      title: 'Syllabus Group',
      type: 'string',
      options: {
        list: [
          { title: 'Part B — New Academy Pictures (Courses 1–7)', value: 'group-b' },
          { title: 'Part C — Sparkz Graphics PDF (Courses 8–11)', value: 'group-c' },
          { title: 'Part D — Advanced Aesthetic Course PDF (Courses 12–13)', value: 'group-d' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'group-b',
    }),
    defineField({
      name: 'categoryKey',
      title: 'Category Identifier',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Course Duration / Time',
      type: 'string',
      description: 'e.g., 2 Days, 3 Days, Clinical Skincare, 10 Full Modules',
    }),
    defineField({
      name: 'description',
      title: 'Course Description',
      type: 'text',
      rows: 3,
      description: 'Short summary of what students will learn in this module.',
    }),
    defineField({
      name: 'syllabus',
      title: 'Syllabus & Training Topics',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List each topic covered in this course (as shown on the poster/PDF).',
    }),
    defineField({
      name: 'price',
      title: 'Course Fee / Price in ₹ (Optional)',
      type: 'number',
      description: 'Leave empty for "By Inquiry / Admission"',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Course Number (Ascending)',
      name: 'numAsc',
      by: [{ field: 'num', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      num: 'num',
      name: 'name',
      group: 'group',
      duration: 'duration',
    },
    prepare({ num, name, group, duration }) {
      const groupLabel = group === 'group-b' ? 'Part B' : group === 'group-c' ? 'Part C' : group === 'group-d' ? 'Part D' : ''
      const parts = [groupLabel, duration].filter(Boolean).join(' • ')
      return {
        title: num ? `Course ${num}: ${name || 'Untitled Course'}` : name || 'Untitled Course',
        subtitle: parts || 'Academy Course',
      }
    },
  },
})
