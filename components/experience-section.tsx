type WorkExperience = {
  role: string
  org: string
  location: string
  duration: string
  description: string
}

type ProjectExperience = {
  name: string
  org: string
  location: string
  type: string
  duration: string
  description: string
}

type ExperienceSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
  readonly workData: WorkExperience[]
  readonly projectData: ProjectExperience[]
}

export function ExperienceSection({ sectionNum, sectionTitle, workData, projectData }: ExperienceSectionProps) {
  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Work Experience Table */}
      <div className="mb-8">
        <h3 className="text-sm font-sans font-bold uppercase tracking-[0.1em] mb-3 text-primary">Work Experience</h3>
        <div className="border-2 border-foreground">
          <div className="bg-foreground text-card px-2 py-2 md:px-4 grid grid-cols-[1fr_auto] gap-2 md:gap-4 text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] font-sans uppercase">
            <span>Position</span>
            <span>Period</span>
          </div>

          {workData.map((job, idx) => (
            <div
              key={`${job.role}-${idx}`}
              className={`px-2 py-3 md:px-4 md:py-4 ${
                idx % 2 === 0 ? "bg-secondary/30" : ""
              } ${idx < workData.length - 1 ? "border-b border-muted" : ""}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-4">
                <div>
                  <h4 className="font-mono text-xs md:text-sm font-bold text-foreground mb-1">{job.role}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] md:text-xs text-muted-foreground font-sans mb-2">
                    <span>{job.org}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <p className="font-serif text-xs md:text-sm leading-relaxed text-muted-foreground">{job.description}</p>
                </div>
                <div className="font-mono text-[10px] md:text-xs text-muted-foreground whitespace-pre-line md:text-right leading-snug">
                  {job.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Experience Table */}
      <div>
        <h3 className="text-sm font-sans font-bold uppercase tracking-[0.1em] mb-3 text-primary">Project Experience</h3>
        <div className="border-2 border-foreground">
          <div className="bg-foreground text-card px-2 py-2 md:px-4 grid grid-cols-[1fr_auto] gap-2 md:gap-4 text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] font-sans uppercase">
            <span>Project</span>
            <span>Period</span>
          </div>

          {projectData.map((project, idx) => (
            <div
              key={`${project.name}-${idx}`}
              className={`px-2 py-3 md:px-4 md:py-4 ${
                idx % 2 === 0 ? "bg-secondary/30" : ""
              } ${idx < projectData.length - 1 ? "border-b border-muted" : ""}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-mono text-xs md:text-sm font-bold text-foreground">{project.name}</h4>
                    <span className="text-[8px] md:text-[9px] tracking-[0.15em] font-sans uppercase text-muted-foreground px-1.5 md:px-2 py-0.5 border border-muted shrink-0">
                      {project.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] md:text-xs text-muted-foreground font-sans mb-2">
                    <span>{project.org}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>
                  <p className="font-serif text-xs md:text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
                <div className="font-mono text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                  {project.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
