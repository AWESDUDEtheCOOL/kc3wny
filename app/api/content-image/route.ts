import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

type ImageMode = 'full' | 'thumbnail' | 'blur'

interface ImageMetadata {
  width: number
  height: number
  blurDataUrl: string
}

// Cache for blur data URLs and metadata
const metadataCache = new Map<string, ImageMetadata>()

async function generateBlurDataUrl(buffer: Buffer): Promise<string> {
  // Generate a tiny blurred placeholder (10px wide)
  const blurredBuffer = await sharp(buffer)
    .rotate() // Auto-rotate based on EXIF orientation
    .resize(10, null, { withoutEnlargement: true })
    .blur(2)
    .jpeg({ quality: 50 })
    .toBuffer()
  
  return `data:image/jpeg;base64,${blurredBuffer.toString('base64')}`
}

async function getImageMetadata(fullPath: string, buffer: Buffer): Promise<ImageMetadata> {
  const cached = metadataCache.get(fullPath)
  if (cached) return cached

  const sharpImage = sharp(buffer)
  const metadata = await sharpImage.metadata()
  
  // Handle EXIF orientation - swap dimensions if rotated 90/270 degrees
  let width = metadata.width || 800
  let height = metadata.height || 600
  
  // Orientation values 5-8 indicate 90 or 270 degree rotations
  if (metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8) {
    [width, height] = [height, width]
  }
  
  const blurDataUrl = await generateBlurDataUrl(buffer)
  
  const result: ImageMetadata = { width, height, blurDataUrl }
  metadataCache.set(fullPath, result)
  
  return result
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imagePath = searchParams.get('path')
  const mode = (searchParams.get('mode') || 'full') as ImageMode
  const width = searchParams.get('width')

  if (!imagePath) {
    return new NextResponse('Image path is required', { status: 400 })
  }

  // Security: prevent directory traversal
  const safePath = path.normalize(imagePath).replace(/^(\.\.[/\\])+/, '')
  const fullPath = path.join(process.cwd(), 'content', safePath)

  // Ensure the file is within the content directory
  if (!fullPath.startsWith(path.join(process.cwd(), 'content'))) {
    return new NextResponse('Invalid path', { status: 403 })
  }

  try {
    const fileBuffer = fs.readFileSync(fullPath)
    const ext = path.extname(fullPath).toLowerCase()
    
    // For SVG files, just return the original
    if (ext === '.svg') {
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    // Handle metadata request (for blur placeholder data)
    if (mode === 'blur') {
      const metadata = await getImageMetadata(fullPath, fileBuffer)
      return NextResponse.json(metadata, {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    // Process image with sharp - auto-rotate based on EXIF orientation
    let sharpImage = sharp(fileBuffer).rotate() // rotate() without args auto-orients based on EXIF

    if (mode === 'thumbnail') {
      // Low-resolution thumbnail (max 400px width)
      const thumbnailWidth = width ? Number.parseInt(width, 10) : 400
      sharpImage = sharpImage
        .resize(thumbnailWidth, null, { withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true })
    } else {
      // Full/optimized resolution - resize if width specified, keep quality high
      if (width) {
        const targetWidth = Number.parseInt(width, 10)
        sharpImage = sharpImage
          .resize(targetWidth, null, { withoutEnlargement: true })
      }
      sharpImage = sharpImage
        .jpeg({ quality: 85, progressive: true })
    }

    const outputBuffer = await sharpImage.toBuffer()

    return new NextResponse(new Uint8Array(outputBuffer), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error loading image:', error)
    return new NextResponse('Image not found', { status: 404 })
  }
}
