import dotenv from 'dotenv'
dotenv.config()

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import fs from 'fs'
import path from 'path'
import { buildConfig, getPayload, Payload } from 'payload'
import { fileURLToPath } from 'url'

import Suits from '@/collections/Suits'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const readJsonFile = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)

    return null
  }
}

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

export const seedSuits = async (payload?: Payload) => {
  try {
    // Use provided payload or create a new one
    const payloadClient =
      payload ||
      (await getPayload({
        config: buildConfig({
          collections: [Suits],
          db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
          secret: process.env.PAYLOAD_SECRET || '',
        }),
      }))

    const existingSuits = await payloadClient.find({
      collection: 'suits',
      limit: 1000,
    })

    for (const suit of existingSuits.docs) {
      await payloadClient.delete({
        collection: 'suits',
        id: suit.id,
      })
    }

    const dataDir = path.join(__dirname, '../../../data/SuitData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    console.log(`Processing ${jsonFiles.length} suits...`)

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file))

      if (data) {
        try {
          const processedData = processSuitData({
            ...data,
            sourceFile: file,
          })

          await payloadClient.create({
            collection: 'suits',
            data: processedData as never,
          })
          processed++

          if (processed % 10 === 0) {
            console.log(`Progress: ${processed}/${jsonFiles.length}`)
          }
        } catch (error: any) {
          console.error(`Error processing ${file}:`, error.message)
        }
      }
    }

    console.log(`Completed! ${processed} suits processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    console.error('Error seeding suits:', error)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}

// Execute directly if this file is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedSuits()
}
