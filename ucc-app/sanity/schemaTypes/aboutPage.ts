import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slideshowImages',
      title: 'Slideshow Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description:
        'Photos that will be displayed in the welcome slideshow component.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
        subtitle: 'Global about page settings',
      };
    },
  },
});
