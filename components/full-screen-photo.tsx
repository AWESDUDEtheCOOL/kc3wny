"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FullScreenPhotoProps {
  src: string
  alt: string
  folder: string
  file: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function FullScreenPhoto({ src, alt, folder, file, onClose, onPrev, onNext }: FullScreenPhotoProps) {
  const [imageData, setImageData] = useState<{ width: number; height: number; size: string } | null>(null)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      const size = `${(img.src.length / 1024).toFixed(2)} KB`
      setImageData({ width: img.width, height: img.height, size })
    }
  }, [src])

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button variant="ghost" size="icon" onClick={onPrev}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext}>
          <ChevronRight className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="max-w-4xl max-h-[80vh] relative">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={800}
          height={600}
          className="object-contain max-h-[80vh] border border-primary/20"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-primary/20 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-primary">{file}</h3>
              <p className="text-sm text-muted-foreground">{folder}</p>
            </div>
            {imageData && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{`${imageData.width}x${imageData.height}`}</p>
                <p className="text-sm text-muted-foreground">{imageData.size}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

