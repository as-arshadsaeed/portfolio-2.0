import {defineField, defineType} from 'sanity'

export const serviceSection = defineType({
  name: 'serviceSection',
  title: 'Service Section',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceItem',

          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
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
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Service Section',
      }
    },
  },
})
