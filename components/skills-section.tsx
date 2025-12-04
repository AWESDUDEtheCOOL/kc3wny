type skillsSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
}

export function skillsSection({ sectionNum, sectionTitle }: skillsSectionProps) {
  const skills = [
    { category: "Languages", items: ["TypeScript", "Python", "Rust", "Go"] },
    { category: "Frontend", items: ["React", "Next.js", "Vue", "Svelte"] },
    { category: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "GraphQL"] },
    { category: "Infrastructure", items: ["AWS", "Docker", "K8s", "Terraform"] },
  ]

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
        <div className="bg-foreground text-card px-4 py-2 grid grid-cols-[100px_1fr] gap-4 text-[10px] tracking-[0.2em] font-sans uppercase">
          <span>System</span>
          <span>Components</span>
        </div>

        {skills.map((skill, idx) => (
          <div
            key={skill.category}
            className={`px-4 py-4 grid grid-cols-[100px_1fr] gap-4 items-center ${
              idx % 2 === 0 ? "bg-secondary/30" : ""
            } ${idx !== skills.length - 1 ? "border-b border-muted" : ""}`}
          >
            <span className="font-mono text-sm font-bold text-primary">{skill.category}</span>
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
