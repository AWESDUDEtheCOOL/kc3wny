"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

type TechnicalFigure = {
  id: string
  src: string
  caption: string
}

type TechnicalFigureModalProps = {
  figure: TechnicalFigure
  isOpen: boolean
  onClose: () => void
}

export function TechnicalFigureModal({ figure, isOpen, onClose }: TechnicalFigureModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`figure-${figure.id}-title`}
    >
      <div 
        className="relative max-w-fit max-h-[90vh] flex flex-col mx-auto" 
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header */}
        <div className="bg-foreground text-card border-2 border-foreground mb-2 px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span id={`figure-${figure.id}-title`} className="font-mono text-sm font-bold">{figure.id}</span>
            <span className="text-[9px] tracking-[0.2em] uppercase">Technical Figure</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-card/20 p-1 rounded transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Container */}
        <div className="border-2 border-foreground bg-muted/30 p-4">
          <Image
            src={figure.src}
            alt={figure.caption}
            width={1920}
            height={1080}
            quality={95}
            className="max-w-[85vw] max-h-[70vh] w-auto h-auto object-contain"
            sizes="85vw"
            priority
          />
        </div>

        {/* Caption */}
        <div className="bg-foreground text-card border-2 border-foreground border-t-0 px-4 py-3">
          <p className="font-serif italic text-sm">{figure.caption}</p>
        </div>
      </div>
    </div>
  )
}
