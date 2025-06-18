import dotenv from 'dotenv'
dotenv.config()

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import fs from 'fs'
import path from 'path'
import { buildConfig, getPayload, Payload } from 'payload'
import { fileURLToPath } from 'url'

import Synergies from '@/collections/Synergies'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const readJsonFile = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)

    return null
  }
}

const processSynergyData = (data: any) => {
  return {
    name: data.DisplayName || 'Unknown',
    description: data.DisplayDescription || '',
    type: data.Type || 'Standard',
    tier: data.Tier || 1,
    requiredUnits: data.RequiredUnits || 0,
    effects: Array.isArray(data.Effects)
      ? data.Effects.map((effect: any) => ({
          name: effect.Name || 'Unknown Effect',
          description: effect.Description || '',
        }))
      : [],
    sourceFile: data.sourceFile || null,
    data: data,
  }
}

export const seedSynergies = async (payload?: Payload) => {
  try {
    // Use provided payload or create a new one
    const payloadClient =
      payload ||
      (await getPayload({
        config: buildConfig({
          collections: [Synergies],
          db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
          secret: process.env.PAYLOAD_SECRET || '',
        }),
      }))

    const existingSynergies = await payloadClient.find({
      collection: 'synergies',
      limit: 1000,
    })

    for (const synergy of existingSynergies.docs) {
      await payloadClient.delete({
        collection: 'synergies',
        id: synergy.id,
      })
    }

    const dataDir = path.join(__dirname, '../../../../data/SynergyData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    console.log(`Processing ${jsonFiles.length} synergies...`)

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file))

      if (data) {
        try {
          const processedData = processSynergyData({
            ...data,
            sourceFile: file,
          })

          await payloadClient.create({
            collection: 'synergies',
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

    console.log(`Completed! ${processed} synergies processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    console.error('Error seeding synergies:', error)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}
