import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const CombatUnits: CollectionConfig = {
  slug: 'combat-units',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'stage', 'class', 'element'],
    description: 'Combat units available in the game',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the combat unit',
      },
    },
    {
      name: 'stage',
      type: 'number',
      required: true,
      min: 1,
      max: 3,
      admin: {
        description: 'Evolution stage (1-3)',
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
        description: 'Combat unit class',
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
        description: 'Combat unit element',
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
        description: 'Complete unit data from source file',
      },
    },
  ],
}

export default CombatUnits
