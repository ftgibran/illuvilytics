import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { link } from '@/fields/link'

export const contentFields: Field[] = [
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
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),

        BlocksFeature({
          blocks: [Banner, Code, MediaBlock],
        }),
      ],
    }),
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_data, siblingData) => {
        return !siblingData?.multipleColumns
      },
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    { name: 'centralized', type: 'checkbox', defaultValue: true },
    ...contentFields,
    { name: 'multipleColumns', type: 'checkbox' },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
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
