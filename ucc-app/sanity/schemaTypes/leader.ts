import { defineType, defineField } from 'sanity';

export const leader = defineType({
  name: 'leader',
  title: 'Leader',
  type: 'object',
  description: 'An individual member of a leadership group.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('A name is required.'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'The title or role of the leader (e.g. Senior Pastor).',
      validation: (Rule) => Rule.required().error('A role is required.'),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      description: 'Optional profile image of the leader.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility.',
          // Alt text is only really required if an image is provided,
          // but we can enforce it if the image is populated.
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'A short biography of the leader. Optional.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});
