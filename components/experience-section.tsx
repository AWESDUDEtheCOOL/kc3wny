type ExperienceSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
}

export function ExperienceSection({ sectionNum, sectionTitle }: ExperienceSectionProps) {
  const experience = [
    {
      code: "MSN-001",
      name: "Project Atlas",
      org: "TechCorp Inc.",
      duration: "2022—Present",
      role: "Lead Engineer",
      status: "ACTIVE",
      description:
        "Architected and deployed a distributed system handling 10M+ daily requests. Led a team of 6 engineers.",
    },
    {
      code: "MSN-002",
      name: "Operation Streamline",
      org: "StartupX",
      duration: "2020—2022",
      role: "Senior Developer",
      status: "COMPLETE",
      description: "Built core platform features from 0 to 1, contributing to successful Series B funding round.",
    },
    {
      code: "MSN-003",
      name: "Initiative Nova",
      org: "MegaSoft",
      duration: "2017—2020",
      role: "Software Engineer",
      status: "COMPLETE",
      description: "Developed internal tooling that reduced deployment time by 60% across the organization.",
    },
  ]

  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Mission cards - horizontal timeline style */}
      <div className="space-y-6">
        {experience.map((mission, idx) => (
          <article key={mission.code} className="relative">
            {/* Mission patch style header */}
            <div className="flex flex-col md:flex-row md:items-stretch border-2 border-foreground overflow-hidden">
              {/* Left badge area */}
              <div className="bg-foreground text-card p-4 md:w-32 shrink-0 flex flex-col justify-center items-center">
                <div className="font-mono text-lg font-bold text-primary">{mission.code}</div>
                <div
                  className={`mt-2 px-2 py-0.5 text-[9px] tracking-[0.2em] font-sans uppercase ${
                    mission.status === "ACTIVE" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {mission.status}
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-4">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                  <h3 className="font-sans font-bold text-lg uppercase tracking-[0.05em]">{mission.name}</h3>
                  <span className="font-mono text-sm text-muted-foreground">{mission.duration}</span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3 text-xs font-sans uppercase tracking-[0.1em] text-muted-foreground">
                  <span>
                    <strong className="text-foreground">Org:</strong> {mission.org}
                  </span>
                  <span>
                    <strong className="text-foreground">Role:</strong> {mission.role}
                  </span>
                </div>

                <p className="font-serif text-sm leading-relaxed text-muted-foreground">{mission.description}</p>
              </div>
            </div>

            {/* Connector line */}
            {idx !== experience.length - 1 && (
              <div className="absolute left-16 md:left-16 top-full w-0.5 h-6 bg-muted hidden md:block" />
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
