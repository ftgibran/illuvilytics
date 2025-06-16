import dotenv from 'dotenv'
dotenv.config()

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig, getPayload } from 'payload'

import CombatUnits from '@/collections/CombatUnits'
import DroneAugments from '@/collections/DroneAugments'
import Suits from '@/collections/Suits'
import Synergies from '@/collections/Synergies'
import Weapons from '@/collections/Weapons'

import { seedCombatUnits } from './seeds/seedCombatUnits'
import { seedSuits } from './seeds/seedSuits'
import { seedSynergies } from './seeds/seedSynergies'
import { seedWeapons } from './seeds/seedWeapons'

const seedAll = async () => {
  try {
    console.log('Starting complete seed process...')

    // Payload configuration
    const payload = await getPayload({
      config: buildConfig({
        collections: [CombatUnits, DroneAugments, Suits, Synergies, Weapons],
        db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
        secret: process.env.PAYLOAD_SECRET || '',
      }),
    })

    // Running all seeds sequentially
    console.log('\n=== Running Combat Units seed ===')
    await seedCombatUnits(payload)

    console.log('\n=== Running Suits seed ===')
    await seedSuits(payload)

    console.log('\n=== Running Synergies seed ===')
    await seedSynergies(payload)

    console.log('\n=== Running Weapons seed ===')
    await seedWeapons(payload)

    console.log('\n✅ Complete seed process finished successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during complete seed process:', error)
    process.exit(1)
  }
}

seedAll()
