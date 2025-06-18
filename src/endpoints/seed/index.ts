import type {
  CollectionSlug,
  GlobalSlug,
  Payload,
  PayloadRequest,
} from 'payload'

import { seedCombatUnits } from '@/endpoints/seed/collections/seedCombatUnits'
import { seedSuits } from '@/endpoints/seed/collections/seedSuits'
import { seedSynergies } from '@/endpoints/seed/collections/seedSynergies'
import { seedWeapons } from '@/endpoints/seed/collections/seedWeapons'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]
const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('🚀 Seeding database...')

  await seedCombatUnits(payload)
  await seedSuits(payload)
  await seedSynergies(payload)
  await seedWeapons(payload)

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`🧹 Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) =>
      payload.db.deleteMany({ collection, req, where: {} }),
    ),
  )

  await Promise.all(
    collections
      .filter((collection) =>
        Boolean(payload.collections[collection].config.versions),
      )
      .map((collection) =>
        payload.db.deleteVersions({ collection, req, where: {} }),
      ),
  )

  payload.logger.info(`👤 Seeding demo author and user...`)

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@illuvium.io' } },
  })

  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        name: 'Admin',
        email: 'admin@illuvium.io',
        password: 'admin123',
      },
    })
  }

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
