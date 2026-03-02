import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'carouselItems',
      title: 'Carousel Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'ctaText',
              title: 'CTA Button Text',
              type: 'string',
            }),
            defineField({
              name: 'ctaLink',
              title: 'CTA Button Link',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'praiseTeamVideoUrl',
      title: 'Praise Team Singing Video URL',
      type: 'url',
      description: 'A URL to a YouTube or Vimeo video, or direct MP4 link.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
        subtitle: 'Global homepage settings',
      };
    },
  },
});
