import dotenv from 'dotenv'
dotenv.config()

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import fs from 'fs'
import path from 'path'
import { buildConfig, getPayload, Payload } from 'payload'
import { fileURLToPath } from 'url'

import Weapons from '@/collections/Weapons'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const readJsonFile = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)

    return null
  }
}

const processWeaponData = (data: any) => {
  const validateOption = (
    value: string,
    options: string[],
    defaultValue: string,
  ): string => {
    const normalizedValue =
      value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase()

    return options.includes(normalizedValue) ? normalizedValue : defaultValue
  }

  const validElements = ['None', 'Water', 'Earth', 'Fire', 'Nature', 'Air']
  const validClasses = [
    'None',
    'Fighter',
    'Rogue',
    'Bulwark',
    'Psion',
    'Empath',
  ]

  return {
    name: data.Name || 'Unknown',
    displayName: data.DisplayName || '',
    displayDescription: data.DisplayDescription || '',
    type: data.Type || 'Standard',
    variation: data.Variation || '',
    tier: data.Tier || 1,
    class: validateOption(data.Class, validClasses, 'None'),
    element: validateOption(data.Element, validElements, 'None'),
    sourceFile: data.sourceFile || null,
    data: data,
  }
}

export const seedWeapons = async (payload?: Payload) => {
  try {
    // Use provided payload or create a new one
    const payloadClient =
      payload ||
      (await getPayload({
        config: buildConfig({
          collections: [Weapons],
          db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
          secret: process.env.PAYLOAD_SECRET || '',
        }),
      }))

    const existingWeapons = await payloadClient.find({
      collection: 'weapons',
      limit: 1000,
    })

    for (const weapon of existingWeapons.docs) {
      await payloadClient.delete({
        collection: 'weapons',
        id: weapon.id,
      })
    }

    const dataDir = path.join(__dirname, '../../../data/WeaponData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    console.log(`Processing ${jsonFiles.length} weapons...`)

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file))

      if (data) {
        try {
          const processedData = processWeaponData({
            ...data,
            sourceFile: file,
          })

          await payloadClient.create({
            collection: 'weapons',
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

    console.log(`Completed! ${processed} weapons processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    console.error('Error seeding weapons:', error)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}

// Execute directly if this file is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedWeapons()
}
