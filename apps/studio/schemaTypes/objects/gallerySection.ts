import {defineField, defineType} from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',

  fields: [
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'reference',
      to: [{type: 'gallery'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'gallery.title',
      media: 'gallery.images.0.image',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title || 'Gallery',
        subtitle: 'Gallery Section',
      }
    },
  },
})
