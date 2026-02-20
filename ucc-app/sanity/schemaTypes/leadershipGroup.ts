import { defineType, defineField, defineArrayMember } from 'sanity';

export const leadershipGroup = defineType({
  name: 'leadershipGroup',
  title: 'Leadership Group',
  type: 'document',
  description: 'A group of leaders (e.g., Pastors & Elders, Deacons).',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The title of the group (e.g. "Pastors, Elders & Overseers").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: "Description of this group's role or responsibilities.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this group is displayed (e.g. 1 for top).',
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'leader',
        }),
      ],
      description: 'The leaders belonging to this group.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
