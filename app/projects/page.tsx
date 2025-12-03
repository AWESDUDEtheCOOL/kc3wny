import Link from "next/link"
import { DocumentWrapper } from "@/components/document-wrapper"
import { getAllProjects } from "@/lib/projects"

export const metadata = {
  title: "PROJECT INDEX // A. CHEN",
  description: "Complete index of all projects",
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <DocumentWrapper documentNo="PRJ-IDX-001" backLink={{ href: "/", label: "Return to Personnel File" }}>
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

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border-2 border-foreground p-4 text-center">
          <div className="font-mono text-2xl font-bold text-primary">{projects.length}</div>
          <div className="text-[9px] tracking-[0.2em] font-sans uppercase text-muted-foreground">Total Projects</div>
        </div>
        <div className="border-2 border-foreground p-4 text-center">
          <div className="font-mono text-2xl font-bold text-primary">{new Set(projects.map((p) => p.type)).size}</div>
          <div className="text-[9px] tracking-[0.2em] font-sans uppercase text-muted-foreground">Categories</div>
        </div>
        <div className="border-2 border-foreground p-4 text-center">
          <div className="font-mono text-2xl font-bold text-primary">
            {projects[0]?.publishedAt ? new Date(projects[0].publishedAt).getFullYear() : "2024"}
          </div>
          <div className="text-[9px] tracking-[0.2em] font-sans uppercase text-muted-foreground">Latest Year</div>
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

      {/* Quick navigation */}
      <div className="mt-8 flex justify-between items-center text-[10px] tracking-[0.2em] font-sans uppercase text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          ← Personnel File
        </Link>
        <Link href="/sitemap" className="hover:text-primary transition-colors">
          Sitemap →
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-foreground">
        <div className="flex justify-between items-center text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
          <span>Project Index // Rev 1.0</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </DocumentWrapper>
  )
}
