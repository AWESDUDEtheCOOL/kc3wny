type QuickFact = {
  label: string
  value: string
}

type Biography = {
  intro: string
  summary: string
  quickFacts: QuickFact[]
}

type BiographySectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
  readonly data: Biography
}

export function BiographySection({ sectionNum, sectionTitle, data }: BiographySectionProps) {
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
            {data.intro}
          </p>
          <p className="font-serif text-base leading-relaxed text-muted-foreground">
            {data.summary}
          </p>
        </div>

        {/* Sidebar callout box */}
        <aside className="border-2 border-foreground h-fit">
          <div className="bg-foreground text-card px-3 py-1 text-[10px] tracking-[0.3em] font-sans uppercase">
            Quick Facts
          </div>
          <div className="p-4 space-y-3 text-sm">
            {data.quickFacts.map((fact, idx) => (
              <div key={fact.label} className={`grid grid-cols-[auto_1fr] gap-x-4 ${idx < data.quickFacts.length - 1 ? 'border-b border-dashed border-muted pb-2' : ''}`}>
                <span className="font-sans text-muted-foreground text-xs uppercase tracking-wider">{fact.label}</span>
                <span className="font-mono text-right">{fact.value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
