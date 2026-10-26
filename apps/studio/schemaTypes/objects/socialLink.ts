import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',

  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',

      validation: (Rule) => Rule.required(),

      options: {
        list: [
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'GitHub', value: 'github'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter / X', value: 'twitter'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Dribbble', value: 'dribbble'},
          {title: 'Behance', value: 'behance'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'Medium', value: 'medium'},
        ],

        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',

      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'icon',
      title: 'Custom Icon',
      type: 'image',

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
      media: 'icon',
    },

    prepare({title, subtitle, media}) {
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Social Link',

        subtitle,
        media,
      }
    },
  },
})
