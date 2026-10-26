import {defineType, defineField} from 'sanity'

export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Form Submissions',
  type: 'document',

  fields: [
    defineField({
      name: 'form',
      type: 'reference',
      to: [{type: 'form'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'key', type: 'string'},
            {name: 'value', type: 'string'},
          ],
        },
      ],
    }),

    defineField({
      name: 'submittedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      formTitle: 'form.title',
      submittedAt: 'submittedAt',
      values: 'values',
    },
    prepare({formTitle, submittedAt, values}) {
      const map = Object.fromEntries((values || []).map((v: any) => [v.key, v.value]))

      const name = map.name || 'No name'
      const email = map.email || 'No email'

      return {
        title: formTitle || 'Form Submission',
        subtitle: `${name} • ${email} • ${new Date(submittedAt).toLocaleString()}`,
      }
    },
  },
})
