import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

import { seedCombatUnits } from '@/endpoints/seed/collections/seedCombatUnits'
import { seedSuits } from '@/endpoints/seed/collections/seedSuits'
import { seedSynergies } from '@/endpoints/seed/collections/seedSynergies'
import { seedWeapons } from '@/endpoints/seed/collections/seedWeapons'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Migration code
  await seedCombatUnits(payload)
  await seedSuits(payload)
  await seedSynergies(payload)
  await seedWeapons(payload)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
  await payload.delete({ collection: 'combat-units', where: {} })
  await payload.delete({ collection: 'suits', where: {} })
  await payload.delete({ collection: 'synergies', where: {} })
  await payload.delete({ collection: 'weapons', where: {} })
}
