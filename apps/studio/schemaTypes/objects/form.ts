import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'form',
  title: 'Form',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'fields',
      type: 'array',
      of: [{type: 'formField'}],
    }),
  ],
})
