type BiographySectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
}

export function BiographySection({ sectionNum, sectionTitle }: BiographySectionProps) {
  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Two-column layout like technical manual */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        {/* Main text column */}
        <div className="space-y-4">
          <p className="font-serif text-lg leading-relaxed first-letter:text-4xl first-letter:font-sans first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:leading-none">
            Mason Matich is a mechanical engineering student at Stanford University interested in spacecraft engineering, 
            mechatronics, and RF systems. Over three years of experience in space systems at SpaceX, MIT LL, and Stanford SSI, he has developed skills in 
            deployables design, CAD modeling, antenna design, embedded systems, and project management.
          </p>
          <p className="font-serif text-base leading-relaxed text-muted-foreground">
            Currently based in Palo Alto, Mason focuses on the design and development of small satellite systems
            and scaling large deployable solar and antenna structures to fit CubeSat form factors.
          </p>
        </div>

        {/* Sidebar callout box */}
        <aside className="border-2 border-foreground h-fit">
          <div className="bg-foreground text-card px-3 py-1 text-[10px] tracking-[0.3em] font-sans uppercase">
            Quick Facts
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-dashed border-muted pb-2">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Location</span>
              <span className="font-mono text-right">Palo Alto, CA</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-dashed border-muted pb-2">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Education</span>
              <span className="font-mono text-right">Stanford University</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-dashed border-muted pb-2">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Focus</span>
              <span className="font-mono text-right">Mechatronics, RF</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 border-b border-dashed border-muted pb-2">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Industry</span>
              <span className="font-mono text-right">Aerospace/Defense</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
