import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imagePath = searchParams.get('path')

  if (!imagePath) {
    return new NextResponse('Image path is required', { status: 400 })
  }

  // Security: prevent directory traversal
  const safePath = path.normalize(imagePath).replace(/^(\.\.[\/\\])+/, '')
  const fullPath = path.join(process.cwd(), 'content', safePath)

  // Ensure the file is within the content directory
  if (!fullPath.startsWith(path.join(process.cwd(), 'content'))) {
    return new NextResponse('Invalid path', { status: 403 })
  }

  try {
    const fileBuffer = fs.readFileSync(fullPath)
    const ext = path.extname(fullPath).toLowerCase()
    
    const contentTypeMap: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    }

    const contentType = contentTypeMap[ext] || 'application/octet-stream'

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error loading image:', error)
    return new NextResponse('Image not found', { status: 404 })
  }
}
