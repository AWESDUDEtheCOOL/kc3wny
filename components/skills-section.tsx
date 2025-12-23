type Skill = {
  category: string
  items: string[]
}

type SkillsSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
  readonly data: Skill[]
}

export function SkillsSection({ sectionNum, sectionTitle, data }: SkillsSectionProps) {
  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Spec table like a technical manual */}
      <div className="border-2 border-foreground">
        <div className="bg-foreground text-card px-2 py-2 md:px-4 grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-2 md:gap-4 text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] font-sans uppercase">
          <span>System</span>
          <span>Components</span>
        </div>

        {data.map((skill, idx) => (
          <div
            key={skill.category}
            className={`px-2 py-4 md:px-4 grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-2 md:gap-4 items-center ${
              idx % 2 === 0 ? "bg-secondary/30" : ""
            } ${idx < data.length - 1 ? "border-b border-muted" : ""}`}
          >
            <span className="font-mono text-xs md:text-sm font-bold text-primary">{skill.category}</span>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 border border-foreground text-xs font-sans uppercase tracking-wider"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
