import {defineField, defineType} from 'sanity'

export const imageSection = defineType({
  name: 'imageSection',
  title: 'Image Section',
  type: 'object',

  fields: [
    defineField({
      name: 'pageStyle',
      title: 'Page Style',
      type: 'string',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'Work', value: 'work'},
          {title: 'About', value: 'about'},
          {title: 'Contact', value: 'contact'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'imageDirection',
      title: 'Image Direction',
      type: 'string',

      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'heading',
    },
  },
})
