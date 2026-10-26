import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectsSection',
  title: 'Projects Section',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'mode',
      type: 'string',
      options: {
        list: [
          {title: 'All Projects', value: 'all'},
          {title: 'Featured Projects', value: 'featured'},
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
  ],
})
