import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

import { seed } from '@/endpoints/seed'
import { clearDatabase } from '@/endpoints/seed/clearDatabase'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Migration code
  await seed({ payload, req })
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
  await clearDatabase(payload, req)
}
