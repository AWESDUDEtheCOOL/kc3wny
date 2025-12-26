/**
 * Pre-generate blur placeholders for all content images.
 * Run this script before building: `node scripts/generate-blur-placeholders.js`
 * 
 * This generates blur data once and caches it to a JSON file,
 * eliminating the need to process images during Next.js build.
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.join(__dirname, '..', 'content')
const cacheFile = path.join(__dirname, '..', '.blur-cache.json')

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

/**
 * Generate a hash of file contents for cache invalidation.
 * This works across git clones (unlike mtime which resets on checkout).
 */
function getFileHash(filePath) {
  const buffer = fs.readFileSync(filePath)
  return crypto.createHash('md5').update(buffer).digest('hex')
}

/**
 * Recursively find all image files in content directory
 */
function findAllImages(dir, baseDir = dir) {
  const images = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      images.push(...findAllImages(fullPath, baseDir))
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      // Store relative path from content directory
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')
      images.push({ relativePath, fullPath })
    }
  }

  return images
}

/**
 * Generate blur data for a single image
 */
async function generateBlurData(fullPath) {
  const fileBuffer = fs.readFileSync(fullPath)
  const sharpImage = sharp(fileBuffer)
  const metadata = await sharpImage.metadata()

  // Handle EXIF orientation
  let width = metadata.width || 800
  let height = metadata.height || 600
  if (metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8) {
    [width, height] = [height, width]
  }

  // Generate tiny blurred placeholder
  const blurredBuffer = await sharp(fileBuffer)
    .rotate()
    .resize(10, null, { withoutEnlargement: true })
    .blur(2)
    .jpeg({ quality: 50 })
    .toBuffer()

  return {
    width,
    height,
    blurDataUrl: `data:image/jpeg;base64,${blurredBuffer.toString('base64')}`
  }
}

async function main() {
  console.log('Finding new images in content directory...')
  const images = findAllImages(contentDir)
  console.log(`   Found ${images.length} images`)

  // Load existing cache if it exists
  let cache = {}
  if (fs.existsSync(cacheFile)) {
    try {
      cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
      console.log(`Loaded existing cache with ${Object.keys(cache).length} entries`)
    } catch {
      console.log('Could not read existing cache, starting fresh')
    }
  }

  // Check which images need processing
  const toProcess = []
  for (const { relativePath, fullPath } of images) {
    const hash = getFileHash(fullPath)

    // Skip if cached and file content hasn't changed (using hash, not mtime)
    if (cache[relativePath] && cache[relativePath].hash === hash) {
      continue
    }

    toProcess.push({ relativePath, fullPath, hash })
  }

  if (toProcess.length === 0) {
    console.log('All images already cached, nothing to do!')
    return
  }

  console.log(`Processing ${toProcess.length} images...`)
  // Process images in parallel batches for speed
  const BATCH_SIZE = 5
  for (let i = 0; i < toProcess.length; i += BATCH_SIZE) {
    const batch = toProcess.slice(i, i + BATCH_SIZE)
    
    await Promise.all(batch.map(async ({ relativePath, fullPath, hash }) => {
      try {
        const blurData = await generateBlurData(fullPath)
        cache[relativePath] = { ...blurData, hash }
        console.log(`   ✓ ${relativePath}`)
      } catch (error) {
        console.error(`   ✗ ${relativePath}: ${error.message}`)
      }
    }))
  }

  // Remove entries for deleted images
  const currentPaths = new Set(images.map(i => i.relativePath))
  for (const cachedPath of Object.keys(cache)) {
    if (!currentPaths.has(cachedPath)) {
      delete cache[cachedPath]
      console.log(`   Removed stale entry: ${cachedPath}`)
    }
  }

  // Write cache
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2))
  console.log(`\nCache saved to .blur-cache.json (${Object.keys(cache).length} entries)`)
}

main().catch(console.error)
