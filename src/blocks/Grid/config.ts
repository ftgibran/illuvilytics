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
import { MediaBlock } from '@/blocks/MediaBlock/config'

export const Grid: Block = {
  slug: 'grid',
  interfaceName: 'GridBlock',
  fields: [
    {
      name: 'centralized',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'nroOfColumns',
      type: 'number',
      min: 1,
      max: 12,
      defaultValue: 1,
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
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
                blocks: [Card, MediaBlock, Banner, Code],
              }),
            ],
          }),
        },
      ],
    },
  ],
}
