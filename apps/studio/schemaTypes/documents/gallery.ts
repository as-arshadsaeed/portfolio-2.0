import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',

  fields: [
    defineField({
      name: 'orderRank',
      type: 'string',
      hidden: true,
    }),

    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'speed',
      title: 'Speed',
      type: 'number',
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',

      of: [{type: 'galleryImage'}],

      validation: (Rule) => Rule.required().min(1).max(4),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
    },
  },
})
