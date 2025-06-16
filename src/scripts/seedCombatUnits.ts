import dotenv from 'dotenv'
dotenv.config()

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import fs from 'fs'
import path from 'path'
import { buildConfig, getPayload } from 'payload'
import { fileURLToPath } from 'url'

import CombatUnits from '@/collections/CombatUnits'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const readJsonFile = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)

    return null
  }
}

const processCombatUnitData = (data: any) => {
  const validateOption = (
    value: string,
    options: string[],
    defaultValue: string,
  ): string => {
    const normalizedValue =
      value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase()

    return options.includes(normalizedValue) ? normalizedValue : defaultValue
  }

  const validClasses = [
    'None',
    'Fighter',
    'Rogue',
    'Bulwark',
    'Psion',
    'Empath',
  ]
  const validElements = ['None', 'Water', 'Earth', 'Fire', 'Nature', 'Air']

  return {
    name: data.DisplayName || 'Unknown',
    description: data.DisplayDescription || '',
    stage: data.Stage || 1,
    class: validateOption(data.CombatClass, validClasses, 'None'),
    element: validateOption(data.CombatAffinity, validElements, 'None'),
    sourceFile: data.sourceFile || null,
    data: data,
  }
}

const seedCombatUnits = async () => {
  try {
    const payload = await getPayload({
      config: buildConfig({
        collections: [CombatUnits],
        db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
        secret: process.env.PAYLOAD_SECRET || '',
      }),
    })

    const existingUnits = await payload.find({
      collection: 'combat-units',
      limit: 1000,
    })

    for (const unit of existingUnits.docs) {
      await payload.delete({
        collection: 'combat-units',
        id: unit.id,
      })
    }

    const dataDir = path.join(__dirname, '../../data/CombatUnitData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    console.log(`Processing ${jsonFiles.length} combat units...`)

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file))

      if (data) {
        try {
          const processedData = processCombatUnitData({
            ...data,
            sourceFile: file,
          })

          await payload.create({
            collection: 'combat-units',
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

    console.log(`Completed! ${processed} combat units processed`)
    process.exit(0)
  } catch (error) {
    console.error('Error seeding combat units:', error)
    process.exit(1)
  }
}

seedCombatUnits()
