import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Synergies: CollectionConfig = {
  slug: 'synergies',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'tier'],
    description: 'Synergies available in the game',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the synergy',
      },
    },
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        description: 'Type of synergy',
      },
    },
    {
      name: 'tier',
      type: 'number',
      required: true,
      admin: {
        description: 'Tier of the synergy',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of the synergy',
      },
    },
    {
      name: 'requiredUnits',
      type: 'number',
      admin: {
        description: 'Number of units required for the synergy',
      },
    },
    {
      name: 'effects',
      type: 'array',
      admin: {
        description: 'Effects of the synergy',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Name of the effect',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Description of the effect',
          },
        },
      ],
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
        description: 'Complete synergy data from source file',
      },
    },
  ],
}

export default Synergies
