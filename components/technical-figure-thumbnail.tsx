import Image from "next/image"

type TechnicalFigure = {
  id: string
  src: string
  caption: string
}

type TechnicalFigureThumbnailProps = {
  figure: TechnicalFigure
  onClick: () => void
}

export function TechnicalFigureThumbnail({ figure, onClick }: TechnicalFigureThumbnailProps) {
  return (
    <figure 
      className="border-2 border-foreground cursor-pointer hover:border-primary transition-colors group flex flex-col h-full" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="bg-muted/30 p-1 relative overflow-hidden flex-1 flex items-center justify-center">
        <Image
          src={figure.src || "/placeholder.svg"}
          alt={figure.caption}
          width={500}
          height={300}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 500px"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-4 py-2 text-xs font-mono tracking-wider uppercase">
            Click to Enlarge
          </span>
        </div>
      </div>
      <figcaption className="bg-foreground/10 px-4 py-3 border-t-2 border-foreground">
        <div className="text-[9px] tracking-[0.2em] uppercase font-mono text-primary mb-1">{figure.id}</div>
        <p className="font-serif italic text-sm text-muted-foreground">{figure.caption}</p>
      </figcaption>
    </figure>
  )
}
