import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {codeInput} from '@sanity/code-input'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {colorInput} from '@sanity/color-input'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId || !dataset) {
  throw new Error('Missing Sanity Studio env variables')
}

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects',
              S,
              context,
            }),

            orderableDocumentListDeskItem({
              type: 'gallery',
              title: 'Galleries',
              S,
              context,
            }),

            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'project' && item.getId() !== 'gallery',
            ),
          ]),
    }),
    visionTool(),
    codeInput(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
