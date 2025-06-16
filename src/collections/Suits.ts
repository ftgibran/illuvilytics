import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Suits: CollectionConfig = {
  slug: 'suits',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'variation'],
    description: 'Suits available in the game',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the suit',
      },
    },
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        description: 'Type of suit',
      },
    },
    {
      name: 'variation',
      type: 'text',
      required: true,
      admin: {
        description: 'Variation of the suit',
      },
    },
    {
      name: 'tier',
      type: 'number',
      required: true,
      admin: {
        description: 'Tier of the suit',
      },
    },
    {
      name: 'displayName',
      type: 'text',
      admin: {
        description: 'Display name of the suit',
      },
    },
    {
      name: 'displayDescription',
      type: 'textarea',
      admin: {
        description: 'Display description of the suit',
      },
    },
    {
      name: 'sourceFile',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Original JSON file name',
      },
    },
    {
      name: 'data',
      type: 'json',
      admin: {
        description: 'Complete suit data from source file',
      },
    },
  ],
}

export default Suits
