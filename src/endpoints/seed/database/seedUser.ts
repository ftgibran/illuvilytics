import { Payload } from 'payload'

export const seedUser = async (payload: Payload) => {
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
}
