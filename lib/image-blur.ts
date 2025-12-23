import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

export type ImageMetadata = {
  width: number
  height: number
  blurDataUrl: string
}

// Cache for blur data URLs and metadata
const metadataCache = new Map<string, ImageMetadata>()

/**
 * Generate blur placeholder and metadata for an image.
 * This runs on the server during build/render.
 */
export async function getImageBlurData(imagePath: string): Promise<ImageMetadata | null> {
  // Check cache first
  const cached = metadataCache.get(imagePath)
  if (cached) return cached

  try {
    // Resolve the full path
    const fullPath = path.join(process.cwd(), 'content', imagePath)
    
    // Ensure file exists
    if (!fs.existsSync(fullPath)) {
      console.error(`Image not found: ${fullPath}`)
      return null
    }

    const fileBuffer = fs.readFileSync(fullPath)
    const sharpImage = sharp(fileBuffer)
    const metadata = await sharpImage.metadata()
    
    // Handle EXIF orientation - swap dimensions if rotated 90/270 degrees
    let width = metadata.width || 800
    let height = metadata.height || 600
    
    // Orientation values 5-8 indicate 90 or 270 degree rotations
    if (metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8) {
      [width, height] = [height, width]
    }
    
    // Generate a tiny blurred placeholder (10px wide)
    const blurredBuffer = await sharp(fileBuffer)
      .rotate() // Auto-rotate based on EXIF orientation
      .resize(10, null, { withoutEnlargement: true })
      .blur(2)
      .jpeg({ quality: 50 })
      .toBuffer()
    
    const blurDataUrl = `data:image/jpeg;base64,${blurredBuffer.toString('base64')}`
    
    const result: ImageMetadata = { width, height, blurDataUrl }
    metadataCache.set(imagePath, result)
    
    return result
  } catch (error) {
    console.error('Failed to generate blur data:', error)
    return null
  }
}

/**
 * Extract the content path from an API image URL
 */
export function getContentPathFromSrc(src: string): string | null {
  if (src.startsWith('/api/content-image')) {
    try {
      const url = new URL(src, 'http://localhost')
      return url.searchParams.get('path')
    } catch {
      return null
    }
  }
  return null
}
