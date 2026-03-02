import { defineType, defineField } from 'sanity';

export const ministry = defineType({
  name: 'ministry',
  title: 'Ministry',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ministry Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description for the ministry list.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'detailedContent',
      title: 'Detailed Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full description/details for individual ministry pages.',
    }),
    defineField({
      name: 'meetingTimes',
      title: 'Meeting Times',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'coverImage',
    },
  },
});
