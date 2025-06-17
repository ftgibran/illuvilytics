import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { Banner } from '@/blocks/Banner/config'
import { Card } from '@/blocks/Card/config'
import { Code } from '@/blocks/Code/config'
import { Grid } from '@/blocks/Grid/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

export const Container: Block = {
  slug: 'container',
  interfaceName: 'ContainerBlock',
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'sm',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: false,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),

          BlocksFeature({
            blocks: [Grid, Card, MediaBlock, Banner, Code],
          }),
        ],
      }),
    },
  ],
}
