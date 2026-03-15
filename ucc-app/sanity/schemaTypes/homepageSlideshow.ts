import { defineType, defineField } from 'sanity';

/**
 * Homepage Slideshow — singleton document for hero carousel images.
 *
 * Non-technical editors manage the rotating images that appear in the
 * hero section of the homepage. Maximum 6 images are allowed.
 */
export const homepageSlideshow = defineType({
  name: 'homepageSlideshow',
  title: 'Homepage Slideshow',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Slideshow Images',
      description:
        'Upload up to 6 images that rotate in the homepage banner area. For best results, use landscape-oriented photos at least 1200px wide.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description:
                'A short description of the image (used for accessibility).',
              validation: (Rule) =>
                Rule.required().error('Alt text is required for accessibility.'),
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.max(6).error(
          'You can upload a maximum of 6 images for the homepage slideshow.',
        ),
    }),
    defineField({
      name: 'praiseTeamVideoUrl',
      title: 'Praise Team Singing Video URL',
      type: 'url',
      description: 'A URL to a YouTube or Vimeo video, or direct MP4 link.',
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      const count = images?.length ?? 0;
      return {
        title: 'Homepage Slideshow',
        subtitle: `${count} image${count === 1 ? '' : 's'} uploaded`,
      };
    },
  },
});
