import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Site Settings',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'General Settings',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'logoTitle',
      title: 'Logo Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'footerTitle',
      title: 'Footer Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'footerCta',
      title: 'Footer CTA',
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

    defineField({
      name: 'contact',
      title: 'Contact Info',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          validation: (Rule) =>
            Rule.min(7)
              .max(20)
              .regex(/^\+?[0-9\s\-()]+$/, {
                name: 'phone number',
                invert: false,
              }),
        }),

        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        }),
      ],
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',

      of: [
        {
          type: 'socialLink',
        },
      ],
    }),
  ],
})
