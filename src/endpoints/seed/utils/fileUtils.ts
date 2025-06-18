import fs from 'fs'
import path from 'path'
import { type File, Payload } from 'payload'
import { fileURLToPath } from 'url'

/**
 * Gets the directory name for ES modules
 * @param importMetaUrl - The import.meta.url from the calling module
 * @returns The directory path
 */
export const getDirname = (importMetaUrl: string): string => {
  return path.dirname(fileURLToPath(importMetaUrl))
}

/**
 * Reads and parses a JSON file
 * @param filePath - Path to the JSON file
 * @param payload - Payload instance for logging
 * @returns Parsed JSON data or null if there was an error
 */
export const readJsonFile = (filePath: string, payload: Payload) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch (error) {
    payload.logger.error(`Error reading file ${filePath}:`, error)

    return null
  }
}

/**
 * Fetches a file from a given URL and returns it as a File object.
 *
 * @param {string} url - The URL from which to fetch the file.
 * @return {Promise<File>} A promise that resolves to a File object containing the fetched file data.
 * @throws {Error} Throws an error if the fetch operation fails or the response status is not OK.
 */
async function _fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
