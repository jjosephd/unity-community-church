import { defineType, defineField } from 'sanity';

/**
 * Site Settings schema for United Community Church.
 *
 * This is a SINGLETON document — only one instance should exist.
 * Singleton enforcement is handled in sanity.config.ts via the
 * structure builder, which:
 *   1. Removes the "Create new" button
 *   2. Auto-opens the single document when clicked
 *   3. Uses a fixed document ID ("siteSettings")
 *
 * Fields store global church information used across the frontend
 * (footer, contact page, etc.).
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'churchName',
      title: 'Church Name',
      type: 'string',
      description: 'The official name of the church as shown on the website.',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Full street address of the church.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Main contact phone number.',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Main contact email address.',
      validation: (Rule) =>
        Rule.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
          name: 'email',
          invert: false,
        }).warning("This doesn't look like a valid email address."),
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      description: 'Regular worship service schedule.',
      of: [
        {
          type: 'object',
          name: 'serviceTime',
          title: 'Service Time',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              description: 'Day of the week (e.g., "Sunday").',
              validation: (Rule) => Rule.required().error('A day is required.'),
            }),
            defineField({
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'Service time (e.g., "10:00 AM").',
              validation: (Rule) =>
                Rule.required().error('A time is required.'),
            }),
          ],
          preview: {
            select: {
              day: 'day',
              time: 'time',
            },
            prepare({ day, time }) {
              return {
                title: `${day || 'Day'} — ${time || 'Time'}`,
              };
            },
          },
        },
      ],
    }),
  ],
  // Preview configuration
  preview: {
    select: {
      title: 'churchName',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
      };
    },
  },
});
