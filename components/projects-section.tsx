import Link from "next/link"
import { getRecentProjects } from "@/lib/projects"

type ProjectsSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
}

export function ProjectsSection({ sectionNum, sectionTitle }: ProjectsSectionProps) {
  const projects = getRecentProjects(3)

  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Subtitle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-muted-foreground">Most Recent Projects</p>
        <Link
          href="/projects"
          className="text-[10px] tracking-[0.2em] font-sans uppercase text-primary hover:underline"
        >
          View All Projects →
        </Link>
      </div>

      {/* Blueprint-style grid of projects */}
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link
            key={project.sectionId}
            href={`/projects/${project.slug}`}
            className="border-2 border-foreground group hover:border-primary transition-colors block"
          >
            {/* System header */}
            <div className="bg-foreground group-hover:bg-primary transition-colors text-card px-3 py-2 flex justify-between items-center">
              <span className="font-mono text-sm font-bold">{project.sectionId}</span>
              <span className="text-[9px] tracking-[0.2em] uppercase">{project.type}</span>
            </div>

            <div className="p-4">
              <h3 className="font-sans font-bold text-lg uppercase tracking-[0.05em] mb-2">{project.title}</h3>
              <p className="font-serif text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>

              {/* Metrics display */}
              {project.metrics && Object.keys(project.metrics).length > 0 && (
                <div className="border-t border-dashed border-muted pt-3 grid grid-cols-3 gap-2">
                  {Object.entries(project.metrics)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-mono text-sm font-bold text-primary">{value}</div>
                        <div className="text-[9px] font-sans uppercase tracking-wider text-muted-foreground">{key}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
