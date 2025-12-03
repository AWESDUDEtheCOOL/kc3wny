import Image from "next/image"

export function DocumentHeader() {
  return (
    <header className="border-b-2 border-foreground pb-6 mb-8">
      {/* Top classification bar */}
      <div className="flex justify-between items-start mb-6">
        <div className="text-[10px] tracking-[0.3em] text-muted-foreground font-sans uppercase">
          Unclassified // Public Release
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.2em] text-muted-foreground font-sans">DOCUMENT NO.</div>
          <div className="font-mono text-sm">PF-2024-001</div>
        </div>
      </div>

      {/* Main title block */}
      <div className="grid grid-cols-[auto_1fr] gap-6 items-end">
        {/* Logo/Badge area */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 border-1 border-foreground flex items-center justify-center">
          <Image
            src="/v4.svg"
            alt="Logo"
            fill
            className="object-contain" 
          />
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-none mb-2">
            KC3WNY SYSTEMS
          </h1>
          <div className="flex items-baseline gap-4">
            <span className="text-2xl md:text-3xl font-serif italic text-primary">Mason Matich</span>
            <span className="text-xs tracking-[0.2em] text-muted-foreground font-sans uppercase">
              Mechanical Engineer
            </span>
          </div>
        </div>
      </div>

      {/* Revision info */}
      <div className="mt-6 pt-4 border-t border-muted flex flex-wrap gap-x-8 gap-y-2 text-[10px] tracking-[0.15em] text-muted-foreground font-sans uppercase">
        <span>Revision: 3.2</span>
        <span>Effective Date: Dec 2025</span>
        <span>Classification: Public</span>
        <span>Pages: 1-8</span>
      </div>
    </header>
  )
}
