import { Payload } from 'payload'

import { homePage } from '@/endpoints/seed/pages/static/homePage'

export const seedPages = async (payload: Payload) => {
  return await Promise.all([
    payload.create({ collection: 'pages', depth: 2, data: homePage }),
  ])
}
