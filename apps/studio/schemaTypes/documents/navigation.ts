import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Main Navigation',
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',

      of: [
        {
          type: 'object',

          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },

            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',

              options: {
                list: [
                  {title: 'Page', value: 'page'},
                  {title: 'Custom URL', value: 'custom'},
                ],
                layout: 'radio',
              },

              initialValue: 'page',
            }),

            defineField({
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{type: 'page'}],

              hidden: ({parent}) => parent?.linkType !== 'page',
            }),

            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',

              hidden: ({parent}) => parent?.linkType !== 'custom',

              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
            }),

            defineField({
              name: 'openInNewTab',
              title: 'Open In New Tab',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),
  ],
})
