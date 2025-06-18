import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import { Payload } from 'payload'

import { getDirname, readJsonFile } from '../utils/fileUtils'

const __dirname = getDirname(import.meta.url)

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

export const seedCombatUnits = async (payload: Payload) => {
  try {
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

    const dataDir = path.join(__dirname, '../../../../data/CombatUnitData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file), payload)

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
        } catch (error: any) {
          payload.logger.error(`Error processing ${file}:`, error.message)
        }
      }
    }

    payload.logger.info(`Completed! ${processed} combat units processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    payload.logger.error('Error seeding combat units:', error)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}
