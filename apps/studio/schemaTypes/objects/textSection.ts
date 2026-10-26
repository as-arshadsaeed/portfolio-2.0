import {defineField, defineType} from 'sanity'

export const textSection = defineType({
  name: 'textSection',
  title: 'Text Section',
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
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
        }),
        defineField({
          name: 'href',
          type: 'string',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heading',
    },
  },
})
