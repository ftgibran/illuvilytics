import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { Banner } from '@/blocks/Banner/config'
import { Card } from '@/blocks/Card/config'
import { Code } from '@/blocks/Code/config'
import { Container } from '@/blocks/Container/config'
import { Grid } from '@/blocks/Grid/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

const contentFields: Field[] = [
  {
    name: 'content',
    type: 'richText',
    label: false,
    admin: {
      condition: (_data, siblingData) => {
        return !siblingData?.multipleColumns
      },
    },
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        HeadingFeature(),
        FixedToolbarFeature(),
        InlineToolbarFeature(),

        BlocksFeature({
          blocks: [Container, Grid, Card, MediaBlock, Banner, Code],
        }),
      ],
    }),
  },
]

export const Section: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',
  fields: [
    ...contentFields,
    { name: 'multipleColumns', type: 'checkbox' },
    {
      name: 'columns',
      type: 'array',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.multipleColumns)
        },
      },
      fields: [
        {
          name: 'size',
          type: 'radio',
          defaultValue: 'half',
          options: [
            { label: '2/3', value: 'twoThirds' },
            { label: '1/2', value: 'half' },
            { label: '1/3', value: 'oneThird' },
          ],
        },
        ...contentFields,
      ],
    },
  ],
}
