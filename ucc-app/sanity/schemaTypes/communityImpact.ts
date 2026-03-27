import { defineType, defineField } from 'sanity';

/**
 * Community Impact — singleton document for the homepage impact cards.
 *
 * Non-technical editors manage the cards shown in the "Our Community Impact"
 * section on the homepage. Each card has an image, title, and short description.
 * Maximum 4 cards are allowed.
 */
export const communityImpact = defineType({
  name: 'communityImpact',
  title: 'Community Impact',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Impact Cards',
      description:
        'Add up to 4 community impact cards for the homepage. Each card needs a photo, title, and short description.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'impactCard',
          title: 'Impact Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Card headline (e.g. "Youth Ministry").',
              validation: (Rule) =>
                Rule.required().error('A title is required.'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'A brief description of the impact (1–2 sentences).',
              validation: (Rule) =>
                Rule.required().error('A description is required.'),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              description:
                'A landscape photo representing this impact area (at least 800px wide).',
              validation: (Rule) =>
                Rule.required().error('An image is required.'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.max(4).error(
          'You can add a maximum of 4 community impact cards.',
        ),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      const count = items?.length ?? 0;
      return {
        title: 'Community Impact',
        subtitle: `${count} card${count === 1 ? '' : 's'}`,
      };
    },
  },
});
