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
            Alex Chen is a software engineer specializing in building exceptional digital experiences. With over eight
            years of experience in the field, they have developed expertise in full-stack development, system
            architecture, and user interface design.
          </p>
          <p className="font-serif text-base leading-relaxed text-muted-foreground">
            Currently based in San Francisco, Alex works at the intersection of design and engineering, creating tools
            and applications that prioritize both functionality and user experience. Their approach combines technical
            precision with creative problem-solving.
          </p>
          <p className="font-serif text-base leading-relaxed text-muted-foreground">
            Prior assignments include positions at major technology companies and innovative startups, where they
            contributed to products serving millions of users worldwide.
          </p>
        </div>

        {/* Sidebar callout box */}
        <aside className="border-2 border-foreground h-fit">
          <div className="bg-foreground text-card px-3 py-1 text-[10px] tracking-[0.3em] font-sans uppercase">
            Quick Facts
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex justify-between border-b border-dashed border-muted pb-2">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Location</span>
              <span className="font-mono">SF, CA</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-muted pb-2">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Experience</span>
              <span className="font-mono">8+ YRS</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-muted pb-2">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Focus</span>
              <span className="font-mono">FULL-STACK</span>
            </div>
            <div className="flex justify-between">
              <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">Status</span>
              <span className="font-mono text-primary">ACTIVE</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
