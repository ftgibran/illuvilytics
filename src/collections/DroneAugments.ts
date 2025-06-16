import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const DroneAugments: CollectionConfig = {
  slug: 'drone-augments',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier'],
    description: 'Drone augments available in the game',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the drone augment',
      },
    },
    {
      name: 'tier',
      type: 'number',
      required: true,
      admin: {
        description: 'Tier of the drone augment',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of the drone augment',
      },
    },
    {
      name: 'effect',
      type: 'text',
      admin: {
        description: 'Effect of the drone augment',
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
        description: 'Complete drone augment data from source file',
      },
    },
  ],
}

export default DroneAugments
