import dotenv from 'dotenv'
dotenv.config()

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import fs from 'fs'
import path from 'path'
import { buildConfig, getPayload } from 'payload'
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

const seedSuits = async () => {
  try {
    const payload = await getPayload({
      config: buildConfig({
        collections: [Suits],
        db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
        secret: process.env.PAYLOAD_SECRET || '',
      }),
    })

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

          await payload.create({
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
    process.exit(0)
  } catch (error) {
    console.error('Error seeding suits:', error)
    process.exit(1)
  }
}

seedSuits()
