import { defineType, defineField } from 'sanity';

/**
 * Sermon schema for Unity Community Church.
 *
 * Stores sermon metadata for display on the Sermons page.
 * Required fields: title, date, speaker.
 * Optional: scripture reference, video URL, thumbnail image.
 *
 * The thumbnail uses hotspot cropping so editors can control
 * the focal point, and alt text is required for accessibility.
 */
export const sermon = defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The sermon title as it will appear on the website.',
      validation: (Rule) =>
        Rule.required().error('A sermon title is required.'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'The date the sermon was delivered.',
      validation: (Rule) => Rule.required().error('A sermon date is required.'),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      description: 'The name of the person who delivered the sermon.',
      validation: (Rule) =>
        Rule.required().error('A speaker name is required.'),
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture Reference',
      type: 'string',
      description:
        'The Bible passage referenced in the sermon (e.g., "John 3:16").',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Link to the sermon video (YouTube or Facebook).',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Recommended: 1280×720 (16:9)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            'Describe the image for screen readers and accessibility.',
          validation: (Rule) =>
            Rule.required().error('Alt text is required for accessibility.'),
        }),
      ],
    }),
  ],
  // Preview configuration for the Studio sidebar
  preview: {
    select: {
      title: 'title',
      subtitle: 'speaker',
      date: 'date',
      media: 'thumbnail',
    },
    prepare({ title, subtitle, date, media }) {
      return {
        title: title || 'Untitled Sermon',
        subtitle: date ? `${subtitle} — ${date}` : subtitle,
        media,
      };
    },
  },
  // Default ordering: newest sermons first
  orderings: [
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (Oldest First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
});
