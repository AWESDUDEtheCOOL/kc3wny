"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type ImageMetadata = {
  width: number
  height: number
  blurDataUrl: string
}

type ProjectHeroImageProps = {
  src: string
  alt: string
  sectionId: string
}

// Helper to convert image src to API path
function getContentPath(src: string): string | null {
  // Handle /api/content-image paths
  if (src.startsWith('/api/content-image')) {
    const url = new URL(src, 'http://localhost')
    return url.searchParams.get('path')
  }
  return null
}

export function ProjectHeroImage({ src, alt, sectionId }: Readonly<ProjectHeroImageProps>) {
  const contentPath = getContentPath(src)
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  // Initialize image source: use original for non-content images, null for content images (will load via API)
  const [imageSrc, setImageSrc] = useState<string | null>(
    contentPath ? null : src
  )

  useEffect(() => {
    if (!contentPath) {
      // Non-content images already have imageSrc set
      return
    }

    // Fetch blur metadata for content images
    fetch(`/api/content-image?path=${encodeURIComponent(contentPath)}&mode=blur`)
      .then(res => res.json())
      .then((data: ImageMetadata) => {
        setMetadata(data)
        // Set full resolution source after we have metadata
        setImageSrc(`/api/content-image?path=${encodeURIComponent(contentPath)}&mode=full`)
      })
      .catch(err => {
        console.error('Failed to load image metadata:', err)
        // Fallback to original source
        setImageSrc(src)
      })
  }, [contentPath, src])

  return (
    <figure className="mb-8 border-2 border-foreground">
      <div className="bg-muted/30 p-1 relative overflow-hidden min-h-[200px]">
        {/* Blur placeholder */}
        {metadata?.blurDataUrl && !isLoaded && (
          <div 
            className="absolute inset-1 bg-cover bg-center blur-sm scale-110"
            style={{ backgroundImage: `url(${metadata.blurDataUrl})` }}
          />
        )}
        
        {/* Hero image */}
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={alt}
            width={metadata?.width || 800}
            height={metadata?.height || 400}
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className={`w-full h-auto transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            unoptimized // We're handling optimization in our API
          />
        )}
      </div>
      <figcaption className="bg-foreground text-card px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-sans flex justify-between">
        <span>FIG-{sectionId}-000</span>
        <span>Primary system visualization</span>
      </figcaption>
    </figure>
  )
}
