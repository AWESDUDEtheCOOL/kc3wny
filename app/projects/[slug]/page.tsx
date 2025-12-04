import { notFound } from "next/navigation"
import Image from "next/image"
import { DocumentWrapper } from "@/components/document-wrapper"
import { getAllProjects, getProjectBySlug } from "@/lib/projects"
import { DocumentFooter } from "@/components/document-footer"
import { buildInfo } from "@/lib/build-info"

export function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project Not Found" }
  return {
    title: `${project.title} // PROJECT FILE`,
    description: project.description,
    openGraph: {
      title: `${project.title} // PROJECT FILE`,
      description: project.description,
      type: "article",
      publishedTime: project.publishedAt,
    },
  }
}

const parseCache = new Map<string, string>()

function parseMarkdownContent(content: string): string {
  if (parseCache.has(content)) {
    return parseCache.get(content)!
  }

  const result = content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2 class="text-xl font-sans font-bold uppercase tracking-[0.05em] mt-10 mb-4 flex items-center gap-3"><span class="w-8 h-[2px] bg-primary"></span>${line.slice(3)}</h2>`
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/)
        if (match) {
          return `<div class="flex gap-2 mb-2"><span class="font-sans font-bold text-primary">▸</span><span><strong class="font-sans">${match[1]}</strong>${match[2] ? `: <span class="font-serif italic">${match[2]}</span>` : ""}</span></div>`
        }
      }
      if (line.match(/^\d+\.\s+\*\*/)) {
        const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*—?\s*(.*)/)
        if (match) {
          return `<div class="flex gap-3 mb-3 pl-4 border-l-2 border-muted"><span class="font-mono text-primary text-sm font-bold">${line.match(/^\d+/)?.[0]}.</span><span><strong class="font-sans">${match[1]}</strong>${match[2] ? ` — <span class="font-serif italic text-muted-foreground">${match[2]}</span>` : ""}</span></div>`
        }
      }
      if (line.trim() === "") return "<div class='h-4'></div>"
      if (line.startsWith("**") && line.endsWith("**")) {
        return `<p class="font-sans font-bold text-primary mb-4">${line.slice(2, -2)}</p>`
      }
      return `<p class="font-serif italic leading-relaxed mb-4 text-foreground/90">${line}</p>`
    })
    .join("")

  parseCache.set(content, result)
  return result
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  const contentHtml = parseMarkdownContent(project.content)

  return (
    <DocumentWrapper
      documentNo={`PRJ-${slug.toUpperCase().slice(0, 8)}`}
      backLink={{ href: "/projects", label: "Return to Index" }}
    >
      {/* Project header */}
      <div className="border-2 border-foreground mb-8">
        <div className="bg-foreground text-card px-4 py-2 flex justify-between items-center">
          <span className="font-mono text-sm font-bold">{project.sectionId}</span>
          <span className="text-[9px] tracking-[0.2em] uppercase">{project.type}</span>
        </div>
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight uppercase mb-2">{project.title}</h1>
          <p className="font-serif italic text-muted-foreground text-lg">{project.description}</p>
          <div className="mt-4 pt-4 border-t border-dashed border-muted flex flex-wrap gap-6 text-[10px] tracking-[0.15em] font-sans uppercase text-muted-foreground">
            <span>
              Published:{" "}
              <span className="font-mono text-foreground">
                {new Date(project.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </span>
            <span>
              Classification: <span className="font-mono text-foreground">PUBLIC</span>
            </span>
          </div>
        </div>
      </div>

      {project.images?.hero && (
        <figure className="mb-8 border-2 border-foreground">
          <div className="bg-muted/30 p-1">
            <Image
              src={project.images.hero || "/placeholder.svg"}
              alt={`${project.title} project overview`}
              width={800}
              height={400}
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="w-full h-auto"
            />
          </div>
          <figcaption className="bg-foreground text-card px-4 py-2 text-[10px] tracking-[0.15em] uppercase font-sans flex justify-between">
            <span>FIG-{project.sectionId}-000</span>
            <span>Primary system interface visualization</span>
          </figcaption>
        </figure>
      )}

      {/* Metrics panel */}
      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="border-2 border-foreground p-4 text-center">
              <div className="font-mono text-2xl font-bold text-primary">{value}</div>
              <div className="text-[9px] tracking-[0.2em] font-sans uppercase text-muted-foreground">{key}</div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />

      {project.images?.figures && project.images.figures.length > 0 && (
        <div className="mt-12 pt-8 border-t-2 border-foreground">
          <h2 className="text-lg font-sans font-bold uppercase tracking-[0.05em] mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary"></span>
            Technical Figures
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.images.figures.map((figure) => (
              <figure key={figure.id} className="border-2 border-foreground">
                <div className="bg-muted/30 p-1">
                  <Image
                    src={figure.src || "/placeholder.svg"}
                    alt={figure.caption}
                    width={500}
                    height={300}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="bg-foreground/10 px-4 py-3 border-t-2 border-foreground">
                  <div className="text-[9px] tracking-[0.2em] uppercase font-mono text-primary mb-1">{figure.id}</div>
                  <p className="font-serif italic text-sm text-muted-foreground">{figure.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <DocumentFooter
        documentControl={`PRJ-${slug.toUpperCase().slice(0, 8)}-${buildInfo.revision}`}
        lastUpdated={new Date(project.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }).toUpperCase()}
        navigation={{
          prev: prevProject ? { href: `/projects/${prevProject.slug}`, title: prevProject.title } : undefined,
          next: nextProject ? { href: `/projects/${nextProject.slug}`, title: nextProject.title } : undefined,
        }}
      />
    </DocumentWrapper>
  )
}
