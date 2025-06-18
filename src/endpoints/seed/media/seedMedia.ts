import path from 'path'
import { Payload } from 'payload'

import { collectThemAllWebp } from '@/endpoints/seed/media/static/collectThemAllWebp'
import { iconAnalyticsWebp } from '@/endpoints/seed/media/static/iconAnalyticsWebp'
import { iconCommunityWebp } from '@/endpoints/seed/media/static/iconCommunityWebp'
import { iconStrategyWebp } from '@/endpoints/seed/media/static/iconStrategyWebp'
import { iconTierWebp } from '@/endpoints/seed/media/static/iconTierWebp'
import { fetchFileByURL, getDirname } from '@/endpoints/seed/utils/fileUtils'

const __dirname = getDirname(import.meta.url)

export const seedMedia = async (payload: Payload) => {
  const images = await Promise.all([
    fetchFileByURL(path.join(__dirname, './static/collect_them_all.webp')),
    fetchFileByURL(path.join(__dirname, './static/icon_analytics.webp')),
    fetchFileByURL(path.join(__dirname, './static/icon_community.webp')),
    fetchFileByURL(path.join(__dirname, './static/icon_strategy.webp')),
    fetchFileByURL(path.join(__dirname, './static/icon_tier.webp')),
  ])

  return await Promise.all([
    payload.create({
      collection: 'media',
      data: collectThemAllWebp,
      file: images[0],
    }),
    payload.create({
      collection: 'media',
      data: iconAnalyticsWebp,
      file: images[1],
    }),
    payload.create({
      collection: 'media',
      data: iconCommunityWebp,
      file: images[2],
    }),
    payload.create({
      collection: 'media',
      data: iconStrategyWebp,
      file: images[3],
    }),
    payload.create({
      collection: 'media',
      data: iconTierWebp,
      file: images[4],
    }),
  ])
}
