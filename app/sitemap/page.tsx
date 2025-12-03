import Link from "next/link"
import { DocumentWrapper } from "@/components/document-wrapper"
import { getAllProjects } from "@/lib/projects"

export const metadata = {
  title: "SITEMAP // A. CHEN",
  description: "Complete site navigation and document index",
}

export default function SitemapPage() {
  const projects = getAllProjects()

  const siteStructure = [
    {
      section: "1.0",
      title: "Primary Documents",
      items: [
        { href: "/", label: "Personnel File", description: "Main personnel documentation" },
        { href: "/projects", label: "Project Index", description: "Complete project catalog" },
        { href: "/sitemap", label: "Sitemap", description: "Site navigation index" },
      ],
    },
    {
      section: "2.0",
      title: "Project Documentation",
      items: projects.map((p) => ({
        href: `/projects/${p.slug}`,
        label: p.title,
        description: `${p.type} documentation`,
      })),
    },
    {
      section: "3.0",
      title: "External References",
      items: [
        { href: "#", label: "GitHub", description: "Source code repository", external: true },
        { href: "#", label: "LinkedIn", description: "Professional network", external: true },
        { href: "#", label: "Twitter/X", description: "Social media presence", external: true },
      ],
    },
  ]

  return (
    <DocumentWrapper documentNo="NAV-MAP-001" backLink={{ href: "/", label: "Return to Personnel File" }}>
      {/* Title block */}
      <div className="border-2 border-foreground mb-8">
        <div className="bg-foreground text-card px-4 py-2">
          <span className="text-[10px] tracking-[0.3em] font-sans uppercase">Navigation Document</span>
        </div>
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight uppercase mb-2">Site Map</h1>
          <p className="font-serif italic text-muted-foreground">
            Complete index of all accessible pages and documentation within this domain.
          </p>
        </div>
      </div>

      {/* Visual site diagram */}
      <div className="mb-8 p-6 border-2 border-dashed border-muted bg-secondary/20">
        <div className="text-[10px] tracking-[0.3em] font-sans uppercase text-muted-foreground mb-6 text-center">
          Fig. 1.0 — Site Architecture Diagram
        </div>
        <div className="flex flex-col items-center gap-4">
          {/* Root */}
          <div className="w-48 border-2 border-primary bg-primary/10 p-3 text-center">
            <div className="font-mono text-xs text-primary mb-1">/</div>
            <div className="font-sans text-sm font-bold uppercase">Personnel File</div>
          </div>

          {/* Connector */}
          <div className="h-6 w-[2px] bg-foreground" />

          {/* Branches */}
          <div className="flex gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-36 border-2 border-foreground p-2 text-center">
                <div className="font-mono text-[10px] text-muted-foreground">/projects</div>
                <div className="font-sans text-xs font-bold uppercase">Index</div>
              </div>
              <div className="h-4 w-[2px] bg-muted" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 border border-muted flex items-center justify-center">
                    <span className="font-mono text-[8px] text-muted-foreground">{i}</span>
                  </div>
                ))}
                <div className="w-8 h-8 border border-dashed border-muted flex items-center justify-center">
                  <span className="font-mono text-[8px] text-muted-foreground">...</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-36 border-2 border-foreground p-2 text-center">
                <div className="font-mono text-[10px] text-muted-foreground">/sitemap</div>
                <div className="font-sans text-xs font-bold uppercase">Navigation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed sitemap */}
      {siteStructure.map((section) => (
        <div key={section.section} className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-sm font-bold">
              {section.section}
            </div>
            <h2 className="text-xl font-sans font-bold uppercase tracking-[0.05em]">{section.title}</h2>
            <div className="flex-1 h-[2px] bg-foreground" />
          </div>

          <div className="border-2 border-foreground">
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 text-[10px] tracking-[0.2em] font-sans uppercase bg-secondary px-4 py-2">
              <span>Path</span>
              <span>Description</span>
              <span>Status</span>
            </div>

            {section.items.map((item, idx) => (
              <Link
                key={item.href + idx}
                href={item.href}
                className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 border-t border-muted hover:bg-secondary/50 transition-colors items-center group"
                target={item.external ? "_blank" : undefined}
              >
                <span className="font-mono text-sm text-primary group-hover:underline">
                  {item.href}
                  {item.external && " ↗"}
                </span>
                <span className="font-serif text-sm text-muted-foreground">{item.description}</span>
                <span className="font-mono text-[10px] text-green-600">ACTIVE</span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Document statistics */}
      <div className="border-2 border-dashed border-muted p-4 bg-secondary/20">
        <div className="text-[10px] tracking-[0.3em] font-sans uppercase text-muted-foreground mb-3">
          Document Statistics
        </div>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="font-mono text-lg font-bold">{3 + projects.length}</div>
            <div className="text-[9px] tracking-[0.15em] font-sans uppercase text-muted-foreground">Total Pages</div>
          </div>
          <div>
            <div className="font-mono text-lg font-bold">{projects.length}</div>
            <div className="text-[9px] tracking-[0.15em] font-sans uppercase text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="font-mono text-lg font-bold">3</div>
            <div className="text-[9px] tracking-[0.15em] font-sans uppercase text-muted-foreground">Sections</div>
          </div>
          <div>
            <div className="font-mono text-lg font-bold">∞</div>
            <div className="text-[9px] tracking-[0.15em] font-sans uppercase text-muted-foreground">Possibilities</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-foreground flex justify-between items-center text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
        <span>Site Map // Rev 1.0</span>
        <span>Page 1 of 1</span>
      </div>
    </DocumentWrapper>
  )
}
