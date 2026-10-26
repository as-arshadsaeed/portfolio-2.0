import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',

  fields: [
    defineField({
      name: 'layout',
      title: 'Layout Type',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Landing Page', value: 'landing'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'default',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional. If empty, the page title will be used.',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'pageType',
      type: 'string',
      options: {
        list: [
          {title: 'Page', value: 'page'},
          {title: 'Work', value: 'work'},
          {title: 'Contact', value: 'contact'},
        ],
      },
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (value !== 'work') {
            return true
          }
          const client = context.getClient({
            apiVersion: '2025-01-01',
          })
          const documentId = context.document?._id?.replace(/^drafts\./, '')
          const existing = await client.fetch(
            `
            count(*[
              _type == "page" &&
              pageType == "work" &&
              !(_id in [$id, "drafts." + $id])
            ])
            `,
            {
              id: documentId,
            },
          )
          return existing === 0 ? true : 'Only one Work page is allowed'
        }),
    }),

    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'textSection'},
        {type: 'imageSection'},
        {type: 'serviceSection'},
        {type: 'gallerySection'},
        {type: 'projectsSection'},
        {type: 'formSection'},
      ],
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
