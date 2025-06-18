import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import { Payload } from 'payload'

import { getDirname, readJsonFile } from '../utils/fileUtils'

const __dirname = getDirname(import.meta.url)

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

export const seedWeapons = async (payload: Payload) => {
  try {
    const existingWeapons = await payload.find({
      collection: 'weapons',
      limit: 1000,
    })

    for (const weapon of existingWeapons.docs) {
      await payload.delete({
        collection: 'weapons',
        id: weapon.id,
      })
    }

    const dataDir = path.join(__dirname, '../../../../data/WeaponData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file), payload)

      if (data) {
        try {
          const processedData = processWeaponData({
            ...data,
            sourceFile: file,
          })

          await payload.create({
            collection: 'weapons',
            data: processedData as never,
          })

          processed++
        } catch (error: any) {
          payload.logger.error(`Error processing ${file}:`, error.message)
        }
      }
    }

    payload.logger.info(`Completed! ${processed} weapons processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    payload.logger.error('Error seeding weapons:', error)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}
