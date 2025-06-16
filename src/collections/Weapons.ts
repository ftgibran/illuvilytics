import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Weapons: CollectionConfig = {
  slug: 'weapons',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'class', 'element', 'type'],
    description: 'Weapons available in the game',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the weapon',
      },
    },
    {
      name: 'type',
      type: 'text',
      required: true,
      admin: {
        description: 'Type of weapon',
      },
    },
    {
      name: 'class',
      type: 'select',
      required: true,
      options: [
        { label: 'None', value: 'None' },
        { label: 'Fighter', value: 'Fighter' },
        { label: 'Rogue', value: 'Rogue' },
        { label: 'Bulwark', value: 'Bulwark' },
        { label: 'Psion', value: 'Psion' },
        { label: 'Empath', value: 'Empath' },
      ],
      admin: {
        description: 'Weapon class',
      },
    },
    {
      name: 'element',
      type: 'select',
      required: true,
      options: [
        { label: 'None', value: 'None' },
        { label: 'Water', value: 'Water' },
        { label: 'Earth', value: 'Earth' },
        { label: 'Fire', value: 'Fire' },
        { label: 'Nature', value: 'Nature' },
        { label: 'Air', value: 'Air' },
      ],
      admin: {
        description: 'Weapon element',
      },
    },
    {
      name: 'tier',
      type: 'number',
      required: true,
      admin: {
        description: 'Tier of the weapon',
      },
    },
    {
      name: 'variation',
      type: 'text',
      admin: {
        description: 'Variation of the weapon',
      },
    },
    {
      name: 'displayName',
      type: 'text',
      admin: {
        description: 'Display name of the weapon',
      },
    },
    {
      name: 'displayDescription',
      type: 'textarea',
      admin: {
        description: 'Display description of the weapon',
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
        description: 'Complete weapon data from source file',
      },
    },
  ],
}

export default Weapons
