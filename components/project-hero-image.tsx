import Image from "next/image"
import { getImageBlurData, getContentPathFromSrc, type ImageMetadata } from "@/lib/image-blur"

type ProjectHeroImageProps = {
  src: string
  alt: string
  sectionId: string
}

export async function ProjectHeroImage({ src, alt, sectionId }: Readonly<ProjectHeroImageProps>) {
  // Get content path and generate blur data on server
  const contentPath = getContentPathFromSrc(src)
  let metadata: ImageMetadata | null = null
  let imageSrc = src
  
  if (contentPath) {
    metadata = await getImageBlurData(contentPath)
    // Use optimized resolution (1200px width) for faster loading
    imageSrc = `/api/content-image?path=${encodeURIComponent(contentPath)}&mode=full&width=1200`
  }

  return (
    <figure className="mb-8 border-2 border-foreground">
      <div className="bg-muted/30 p-1 relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={alt}
          width={metadata?.width || 800}
          height={metadata?.height || 400}
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="w-full h-auto"
          placeholder={metadata?.blurDataUrl ? "blur" : "empty"}
          blurDataURL={metadata?.blurDataUrl}
          unoptimized // We're handling optimization in our API
        />
      </div>
      <figcaption className="bg-foreground text-card px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-sans flex justify-between">
        <span>FIG-{sectionId}-000</span>
        <span>Primary system visualization</span>
      </figcaption>
    </figure>
  )
}
