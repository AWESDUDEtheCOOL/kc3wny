import Link from "next/link"
import { DocumentWrapper } from "@/components/document-wrapper"
import { getAllProjects } from "@/lib/projects"
import { DocumentFooter } from "@/components/document-footer"
import { buildInfo } from "@/lib/build-info"


export const metadata = {
  title: "PROJECT INDEX // M. Matich",
  description: "Complete index of all projects",
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <DocumentWrapper documentNo={buildInfo.getDocumentNumber("IDX")} backLink={{ href: "/", label: "Return to Home" }}>
      {/* Title block */}
      <div className="border-2 border-foreground mb-8">
        <div className="bg-foreground text-card px-4 py-2">
          <span className="text-[10px] tracking-[0.3em] font-sans uppercase">Technical Documentation</span>
        </div>
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight uppercase mb-2">Project Index</h1>
          <p className="font-serif italic text-muted-foreground">
            Complete catalog of technical projects and systems, ordered by publication date.
          </p>
        </div>
      </div>

      {/* Table of Contents style listing */}
      <div className="border-2 border-foreground">
        <div className="bg-foreground text-card px-4 py-2 flex justify-between items-center">
          <span className="text-xs tracking-[0.3em] font-sans uppercase">Contents</span>
          <span className="text-xs tracking-[0.2em] font-sans">By Publication Date</span>
        </div>

        <div className="p-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex items-baseline gap-3 py-3 border-b border-dashed border-muted last:border-0 hover:bg-secondary/50 transition-colors -mx-2 px-2"
            >
              <span className="font-mono text-primary text-sm font-bold w-16 shrink-0">{project.sectionId}</span>
              <span className="font-sans text-sm uppercase tracking-[0.1em] group-hover:text-primary transition-colors">
                {project.title}
              </span>
              <span className="text-[9px] tracking-[0.15em] font-sans uppercase text-muted-foreground px-2 border border-muted">
                {project.type}
              </span>
              <span className="flex-1 border-b border-dotted border-muted-foreground mx-2 mb-1" />
              <span className="font-mono text-xs text-muted-foreground shrink-0">
                {new Date(project.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </span>
            </Link>
          ))}
        </div>
      </div>

    <DocumentFooter
        documentControl={buildInfo.getDocumentNumber("IDX")}
        lastUpdated={buildInfo.buildDate}
      />
    </DocumentWrapper>
  )
}
