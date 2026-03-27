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
      title: 'Ministry Page Route (Slug)',
      type: 'string',
      description: 'Select the route this ministry content will appear on.',
      options: {
        list: [
          { title: 'Youth Ministry', value: 'youth' },
          { title: "Children's Ministry", value: 'children' },
          { title: 'Worship Team', value: 'worship' },
          { title: 'Kingdom Komers', value: 'kingdom-komers' },
          { title: 'Project 133', value: 'project-133' },
          { title: 'Daughters of The King', value: 'daughters-of-the-king' },
          { title: 'Men That Bend', value: 'men-that-bend' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().error('A route selection is required'),
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Main hero image displayed prominently at the top of the ministry gallery page.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Short description for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      description:
        'Upload photos for this ministry (up to 20). These appear in the gallery section below the featured image.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Short description for accessibility.',
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.max(20).error('Maximum 20 gallery images allowed.'),
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

