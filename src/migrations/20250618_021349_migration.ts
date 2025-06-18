import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

import { seed } from '@/endpoints/seed'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Migration code
  await seed({ payload, req })
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
  await payload.delete({ collection: 'combat-units', where: {} })
  await payload.delete({ collection: 'suits', where: {} })
  await payload.delete({ collection: 'synergies', where: {} })
  await payload.delete({ collection: 'weapons', where: {} })
}
