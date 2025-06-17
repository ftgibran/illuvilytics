import dotenv from 'dotenv'
dotenv.config()

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import fs from 'fs'
import path from 'path'
import { buildConfig, getPayload, Payload } from 'payload'
import { fileURLToPath } from 'url'

import { Faq } from '@/collections/Faq'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const parseCSV = (csvContent: string): string[][] => {
  const rows = csvContent.split('\n')

  return rows.map((row) => {
    // Special handling for columns with commas inside quotes
    const cells: string[] = []
    let currentCell = ''
    let insideQuotes = false

    for (let i = 0; i < row.length; i++) {
      const char = row[i]

      if (char === '"') {
        insideQuotes = !insideQuotes
        currentCell += char
      } else if (char === ',' && !insideQuotes) {
        cells.push(currentCell.trim())
        currentCell = ''
      } else {
        currentCell += char
      }
    }

    cells.push(currentCell.trim())

    return cells
  })
}

const processFAQData = (rows: string[][]) => {
  const faqItems = []

  // Skip header rows
  let i = 3

  while (i < rows.length) {
    try {
      // Process question and answer in column 1 (index 1)
      if (rows[i] && rows[i]?.[1] && rows[i]?.[1]?.includes('Question:')) {
        const question = rows[i]?.[1]?.replace('Question:', '').trim()

        // Check if there's an answer in the following rows
        let j = i + 1

        while (j < rows.length && j < i + 5) {
          if (rows[j] && rows[j]?.[1] && rows[j]?.[1]?.includes('Answer:')) {
            const answer = rows[j]?.[1]?.replace('Answer:', '').trim()

            faqItems.push({
              question,
              answer: answer,
              order: faqItems.length,
              active: true,
              category: 'Gauntlet FAQ',
            })
            break
          }

          j++
        }
      }

      // Process question and answer in column 8 (index 8)
      if (rows[i] && rows[i]?.[8] && rows[i]?.[8]?.includes('Question:')) {
        const question = rows[i]?.[8]?.replace('Question:', '').trim()

        // Check if there's an answer in the following rows
        let j = i + 1

        while (j < rows.length && j < i + 5) {
          if (rows[j] && rows[j]?.[8] && rows[j]?.[8]?.includes('Answer:')) {
            const answer = rows[j]?.[8]?.replace('Answer:', '').trim()

            faqItems.push({
              question,
              answer: answer,
              order: faqItems.length,
              active: true,
              category: 'Gauntlet FAQ',
            })
            break
          }

          j++
        }
      }
    } catch (error) {
      console.error(`Error processing row ${i}:`, error)
    }

    i++
  }

  return faqItems
}

export const seedFAQ = async (payload?: Payload) => {
  try {
    // Use provided payload or create a new one
    const payloadClient =
      payload ||
      (await getPayload({
        config: buildConfig({
          collections: [Faq],
          db: mongooseAdapter({ url: process.env.DATABASE_URI || '' }),
          secret: process.env.PAYLOAD_SECRET || '',
        }),
      }))

    // Clear existing FAQs
    const existingFaqs = await payloadClient.find({
      collection: 'faqs',
      limit: 1000,
    })

    for (const faq of existingFaqs.docs) {
      await payloadClient.delete({
        collection: 'faqs',
        id: faq.id,
      })
    }

    // Read CSV file
    const csvFilePath = path.join(
      __dirname,
      '../../../data/Illuvium Gauntlet Public Info Document - FAQ.csv',
    )
    const csvData = fs.readFileSync(csvFilePath, 'utf-8')

    // Convert CSV to matrix
    const rows = parseCSV(csvData).filter((row) =>
      row.some((cell) => cell.trim() !== ''),
    )

    // Process CSV data
    const faqItems = processFAQData(rows)

    // Create records in database
    console.log(`Importing ${faqItems.length} FAQs...`)

    let processed = 0

    for (const item of faqItems) {
      try {
        await payloadClient.create({
          collection: 'faqs',
          data: item as any,
        })
        processed++

        if (processed % 5 === 0) {
          console.log(`Progress: ${processed}/${faqItems.length}`)
        }
      } catch (error: any) {
        console.error(`Error processing FAQ "${item.question}":`, error.message)
      }
    }

    console.log(`Completed! ${processed} FAQs processed`)

    if (!payload) process.exit(0) // Only exit if executed directly
  } catch (error) {
    console.error('Error seeding FAQs:', error)

    if (!payload) process.exit(1) // Only exit if executed directly
  }
}

// Execute directly if this file is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedFAQ()
}
