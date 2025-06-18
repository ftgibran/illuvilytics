import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import { Payload } from 'payload'

import { getDirname, readJsonFile } from '../utils/fileUtils'

const __dirname = getDirname(import.meta.url)

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

export const seedSynergies = async (payload: Payload) => {
  try {
    const existingSynergies = await payload.find({
      collection: 'synergies',
      limit: 1000,
    })

    for (const synergy of existingSynergies.docs) {
      await payload.delete({
        collection: 'synergies',
        id: synergy.id,
      })
    }

    const dataDir = path.join(__dirname, '../../../../data/SynergyData')
    const jsonFiles = fs
      .readdirSync(dataDir)
      .filter((file) => file.endsWith('.json'))
    let processed = 0

    for (const file of jsonFiles) {
      const data = readJsonFile(path.join(dataDir, file), payload)

      if (data) {
        try {
          const processedData = processSynergyData({
            ...data,
            sourceFile: file,
          })

          await payload.create({
            collection: 'synergies',
            data: processedData as never,
          })

          processed++
        } catch (error: any) {
          payload.logger.error(`Error processing ${file}:`, error.message)
        }
      }
    }

    payload.logger.info(`Completed! ${processed} synergies processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    payload.logger.error('Error seeding synergies:', error)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}
