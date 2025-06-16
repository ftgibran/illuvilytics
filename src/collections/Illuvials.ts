import { CollectionConfig } from 'payload'

const Illuvials: CollectionConfig = {
  slug: 'illuvials',
  labels: {
    singular: 'Illuvial',
    plural: 'Illuvials',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'affinities',
      type: 'array',
      label: 'Affinities',
      labels: { singular: 'Affinity', plural: 'Affinities' },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: ['Water', 'Fire', 'Earth', 'Air', 'Nature', 'Psi'],
        },
      ],
    },
    {
      name: 'role',
      type: 'select',
      options: ['Bulwark', 'Fighter', 'Rogue', 'Empath', 'Scion'],
    },
    {
      name: 'tier',
      type: 'number',
      min: 1,
      max: 5,
    },
    {
      name: 'skillDescription',
      type: 'textarea',
    },
    {
      name: 'shieldCalculation',
      type: 'text',
    },
    {
      name: 'damageCalculation',
      type: 'text',
    },
    {
      name: 'baseStats',
      type: 'group',
      fields: [
        { name: 'maxHealth', type: 'number' },
        { name: 'attack', type: 'number' },
        { name: 'speed', type: 'number' },
        { name: 'range', type: 'number' },
        { name: 'physRes', type: 'number', label: 'Physical Resistance' },
        { name: 'energyRes', type: 'number', label: 'Energy Resistance' },
        { name: 'critChance', type: 'number', label: 'Crit Chance (%)' },
        { name: 'critAmp', type: 'number', label: 'Crit Amplification (%)' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // certifique-se que a collection 'media' está habilitada
    },
  ],
}

export default Illuvials
