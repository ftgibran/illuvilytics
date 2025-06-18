import type { Payload, PayloadRequest } from 'payload'

import { clearDatabase } from '@/endpoints/seed/clearDatabase'
import { seedCombatUnits } from '@/endpoints/seed/database/resources/seedCombatUnits'
import { seedSuits } from '@/endpoints/seed/database/resources/seedSuits'
import { seedSynergies } from '@/endpoints/seed/database/resources/seedSynergies'
import { seedWeapons } from '@/endpoints/seed/database/resources/seedWeapons'
import { seedUser } from '@/endpoints/seed/database/seedUser'

export interface SeedOptions {
  payload: Payload
  req: PayloadRequest
}

/**
 * Represents a function to seed the database with initial data.
 *
 * This function is meant to populate the database with predefined collections, globals, media,
 * and user data. It ensures the database is cleared before seeding to avoid duplicate or
 * conflicting entries. Typically used during setup or to reset the database state.
 *
 * @param {SeedOptions} param0 - The options for seeding, containing the payload and request objects.
 * @param {Payload} param0.payload - The Payload object used for database operations and logging.
 * @param {Request} param0.req - The Request object representing the current HTTP request context.
 * @returns {Promise<void>} Resolves when the database has been seeded successfully.
 */
export const seed = async ({ payload, req }: SeedOptions): Promise<void> => {
  payload.logger.info(`🧹 Clearing collections and globals...`)

  await clearDatabase(payload, req)

  payload.logger.info('🚀 Seeding database...')

  await seedCombatUnits(payload)
  await seedSuits(payload)
  await seedSynergies(payload)
  await seedWeapons(payload)

  payload.logger.info(`👤 Seeding demo author and user...`)

  await seedUser(payload)

  payload.logger.info(`📸 Seeding media...`)

  //

  payload.logger.info(`📝 Seeding contact form...`)

  //

  payload.logger.info(`📄 Seeding pages...`)

  //

  payload.logger.info(`🌐 Seeding globals...`)

  //

  payload.logger.info('✅ Seeded database successfully!')
}
