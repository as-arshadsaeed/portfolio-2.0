import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'formSection',
  title: 'Form Section',
  type: 'object',

  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'form',
      title: 'Select Form',
      type: 'reference',
      to: [{type: 'form'}],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      formTitle: 'form.title',
    },
    prepare({title, formTitle}) {
      return {
        title: title || 'Form Section',
        subtitle: formTitle,
      }
    },
  },
})
