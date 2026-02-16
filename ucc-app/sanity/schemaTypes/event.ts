import { defineType, defineField } from 'sanity';

/**
 * Event schema for United Community Church.
 *
 * Stores event information for display on the Events page.
 * Required fields: title, date.
 * Optional: time, location, description, image, isRecurring.
 *
 * The image uses hotspot cropping with required alt text
 * for accessibility compliance.
 */
export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  description: 'Upload details about the latest events',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The event name as it will appear on the website.',
      validation: (Rule) =>
        Rule.required().error('An event title is required.'),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'The date of the event.',
      validation: (Rule) => Rule.required().error('An event date is required.'),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'The time of the event (e.g., "10:00 AM - 12:00 PM").',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the event takes place.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A detailed description of the event.',
      validation: (Rule) =>
        Rule.max(500).warning(
          'Consider keeping the description under 500 characters.',
        ),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      description: 'Recommended: 800×600 (4:3)',
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
    defineField({
      name: 'isRecurring',
      title: 'Recurring Event',
      type: 'boolean',
      description: 'Toggle on if this event repeats on a regular schedule.',
      initialValue: false,
    }),
  ],
  // Preview configuration for the Studio sidebar
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
      media: 'image',
    },
    prepare({ title, date, location, media }) {
      const subtitle = [date, location].filter(Boolean).join(' — ');
      return {
        title: title || 'Untitled Event',
        subtitle,
        media,
      };
    },
  },
  // Default ordering: upcoming events first
  orderings: [
    {
      title: 'Date (Upcoming First)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Date (Most Recent First)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
