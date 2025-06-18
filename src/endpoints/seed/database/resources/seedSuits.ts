import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import { Payload } from 'payload'

import { getDirname, readJsonFile } from '../../utils/fileUtils'

const __dirname = getDirname(import.meta.url)

const processSuitData = (data: any) => {
  return {
    name: data.Name || 'Unknown',
    displayName: data.DisplayName || '',
    displayDescription: data.DisplayDescription || '',
    type: data.Type || 'Standard',
    variation: data.Variation || 'Standard',
    tier: data.Tier || 1,
    sourceFile: data.sourceFile || null,
    data: data,
  }
}

export const seedSuits = async (payload: Payload) => {
  try {
    const existingSuits = await payload.find({
      collection: 'suits',
      limit: 1000,
    })

    for (const suit of existingSuits.docs) {
      await payload.delete({
        collection: 'suits',
        id: suit.id,
      })
    }

    const dataDir = path.join(__dirname, '../../../../../data/SuitData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file), payload)

      if (data) {
        try {
          const processedData = processSuitData({
            ...data,
            sourceFile: file,
          })

          await payload.create({
            collection: 'suits',
            data: processedData as never,
          })

          processed++
        } catch (error: any) {
          payload.logger.error(`Error processing ${file}:`, error.message)
        }
      }
    }

    payload.logger.info(`Completed! ${processed} suits processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    payload.logger.error(`Error seeding combat units:\n${error}`)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}
