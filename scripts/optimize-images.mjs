/**
 * Optimize all content images for web delivery.
 * This reduces file sizes significantly while maintaining visual quality.
 * 
 * Run: node scripts/optimize-images.mjs
 * 
 * This will:
 * - Convert PNGs without transparency to JPEG (much smaller)
 * - Resize images to max 2400px width (sufficient for most displays)
 * - Compress JPEGs to quality 85
 * - Create backups of originals in content/.originals/ (local only, not on CI)
 */

import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.join(__dirname, '..', 'content')
const backupDir = path.join(contentDir, '.originals')

// Detect if running in CI environment (Vercel, GitHub Actions, etc.)
const isCI = process.env.CI === 'true' || process.env.VERCEL === '1'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
const MAX_WIDTH = 2400  // Max width for any image
const JPEG_QUALITY = 85
const WEBP_QUALITY = 85

// Size threshold - only optimize images larger than this (in bytes)
const SIZE_THRESHOLD = 500 * 1024  // 500 KB

function findAllImages(dir, baseDir = dir) {
  const images = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === '.originals') continue  // Skip backup folder
    
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      images.push(...findAllImages(fullPath, baseDir))
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')
      const stat = fs.statSync(fullPath)
      images.push({ relativePath, fullPath, size: stat.size })
    }
  }

  return images
}

async function optimizeImage(fullPath, relativePath) {
  const ext = path.extname(fullPath).toLowerCase()
  const fileBuffer = fs.readFileSync(fullPath)
  
  let sharpInstance = sharp(fileBuffer)
    .rotate()  // Auto-orient based on EXIF
    .resize(MAX_WIDTH, null, { 
      withoutEnlargement: true,
      fit: 'inside'
    })

  let outputBuffer
  let newExt = ext

  if (ext === '.png') {
    // Convert PNG to WebP for much better compression
    // (unless it has transparency that's important)
    const metadata = await sharp(fileBuffer).metadata()
    
    if (metadata.hasAlpha) {
      // Keep as PNG but optimize
      outputBuffer = await sharpInstance
        .png({ quality: 80, compressionLevel: 9 })
        .toBuffer()
    } else {
      // Convert to JPEG (smaller than WebP for photos)
      outputBuffer = await sharpInstance
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toBuffer()
      newExt = '.jpg'
    }
  } else {
    // JPEG optimization
    outputBuffer = await sharpInstance
      .jpeg({ quality: JPEG_QUALITY, progressive: true })
      .toBuffer()
  }

  return { buffer: outputBuffer, newExt }
}

async function main() {
  console.log('🔍 Finding images to optimize...')
  const images = findAllImages(contentDir)
  
  // Filter to only large images
  const toOptimize = images.filter(img => img.size > SIZE_THRESHOLD)
  
  console.log(`   Found ${images.length} images, ${toOptimize.length} are over ${SIZE_THRESHOLD / 1024}KB`)
  
  if (toOptimize.length === 0) {
    console.log('✅ All images are already optimized!')
    return
  }

  // Create backup directory (only locally, not in CI)
  if (!isCI && !fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  let totalSaved = 0
  
  for (const { relativePath, fullPath, size } of toOptimize) {
    try {
      const { buffer, newExt } = await optimizeImage(fullPath, relativePath)
      const saved = size - buffer.length
      
      // Only save if we're saving at least 10% or changing format
      const ext = path.extname(fullPath)
      const significantSavings = saved > size * 0.1
      const formatChange = newExt !== ext
      
      if (significantSavings || formatChange) {
        // Backup original (only locally, skip in CI to avoid bloat)
        if (!isCI) {
          const backupPath = path.join(backupDir, relativePath)
          fs.mkdirSync(path.dirname(backupPath), { recursive: true })
          fs.copyFileSync(fullPath, backupPath)
        }
        
        // Write optimized
        if (formatChange) {
          // Extension changed (PNG -> JPG), delete old and write new
          const newPath = fullPath.replace(ext, newExt)
          fs.writeFileSync(newPath, buffer)
          fs.unlinkSync(fullPath)
          console.log(`   ✓ ${relativePath} → ${path.basename(newPath)} (${(size/1024/1024).toFixed(1)}MB → ${(buffer.length/1024/1024).toFixed(1)}MB, saved ${(saved/1024/1024).toFixed(1)}MB)`)
        } else {
          fs.writeFileSync(fullPath, buffer)
          console.log(`   ✓ ${relativePath} (${(size/1024/1024).toFixed(1)}MB → ${(buffer.length/1024/1024).toFixed(1)}MB, saved ${(saved/1024/1024).toFixed(1)}MB)`)
        }
        
        totalSaved += saved
      } else {
        console.log(`   - ${relativePath} (already optimal)`)
      }
    } catch (error) {
      console.error(`   ✗ ${relativePath}: ${error.message}`)
    }
  }

  console.log(`\n✅ Optimization complete! Total saved: ${(totalSaved/1024/1024).toFixed(1)}MB`)
  if (!isCI) {
    console.log(`   Originals backed up to: content/.originals/`)
  }
}

main().catch(console.error)
