import { defineType, defineField } from 'sanity';

/**
 * Announcement schema for United Community Church.
 *
 * Stores announcements displayed on the homepage.
 * Required fields: title, publishDate.
 * Optional: body (rich text), expiryDate, priority.
 *
 * The expiryDate field controls automatic content hiding —
 * the frontend GROQ query filters out documents past their expiry.
 * Priority (1–5) determines display order on the homepage.
 */
export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The announcement headline.',
      validation: (Rule) =>
        Rule.required().error('An announcement title is required.'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description:
        'The full announcement content. Supports rich text formatting.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      description:
        'When this announcement should start appearing on the website.',
      validation: (Rule) =>
        Rule.required().error('A publish date is required.'),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'datetime',
      description:
        'Content is automatically hidden from the website after this date. Leave empty to display indefinitely.',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description:
        'Display priority (1 = lowest, 5 = highest). Higher priority announcements appear first.',
      validation: (Rule) =>
        Rule.min(1)
          .max(5)
          .integer()
          .warning('Priority should be between 1 and 5.'),
      initialValue: 3,
    }),
  ],
  // Preview configuration for the Studio sidebar
  preview: {
    select: {
      title: 'title',
      publishDate: 'publishDate',
      expiryDate: 'expiryDate',
      priority: 'priority',
    },
    prepare({ title, publishDate, expiryDate, priority }) {
      const priorityLabel = priority ? `Priority ${priority}` : '';
      const dateLabel = publishDate
        ? new Date(publishDate).toLocaleDateString()
        : 'No date';
      const expiryLabel = expiryDate
        ? ` → Expires ${new Date(expiryDate).toLocaleDateString()}`
        : '';

      return {
        title: title || 'Untitled Announcement',
        subtitle: `${priorityLabel} | ${dateLabel}${expiryLabel}`,
      };
    },
  },
  // Default ordering: highest priority first, then newest
  orderings: [
    {
      title: 'Priority (Highest First)',
      name: 'priorityDesc',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: 'publishDate', direction: 'desc' },
      ],
    },
    {
      title: 'Publish Date (Newest First)',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
});
