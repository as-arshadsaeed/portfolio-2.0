import {defineType, defineField} from 'sanity'

export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',

  fields: [
    defineField({
      name: 'fieldname',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          if (!value) return true

          const regex = /^[a-z0-9_-]+$/
          if (!regex.test(value)) {
            return 'Only lowercase letters, numbers, - and _ are allowed'
          }

          const document = context.document as any

          if (!document?.fields) return true

          const currentField = context.parent as any

          const duplicates = document.fields.filter(
            (field: any) => field.fieldname === value && field._key !== currentField?._key,
          )

          if (duplicates.length > 0) {
            return `Field name "${value}" already exists`
          }

          return true
        }),
    }),
    defineField({
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Text', value: 'text'},
          {title: 'Email', value: 'email'},
          {title: 'Number', value: 'number'},
          {title: 'Textarea', value: 'textarea'},
          {title: 'Select', value: 'select'},
          {title: 'Phone', value: 'phone'},
        ],
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const allowed = ['text', 'email', 'number', 'textarea', 'select', 'phone']

          return allowed.includes(value || '') ? true : 'Invalid field type'
        }),
    }),

    defineField({
      name: 'validation',
      type: 'object',
      fields: [
        defineField({
          name: 'required',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'minLength',
          type: 'number',
        }),
        defineField({
          name: 'maxLength',
          type: 'number',
        }),
      ],
    }),

    defineField({
      name: 'options',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({parent}) => parent?.type !== 'select',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'name',
    },
  },
})
