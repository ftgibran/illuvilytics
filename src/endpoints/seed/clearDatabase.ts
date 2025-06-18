import {
  type CollectionSlug,
  type GlobalSlug,
  Payload,
  type PayloadRequest,
} from 'payload'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  //
  'combat-units',
  'suits',
  'synergies',
  'weapons',
]
const globals: GlobalSlug[] = ['header', 'footer']

export const clearDatabase = async (payload: Payload, req: PayloadRequest) => {
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
}
