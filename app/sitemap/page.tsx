import Link from "next/link"
import { DocumentWrapper } from "@/components/document-wrapper"
import { getAllProjects } from "@/lib/projects"
import { DocumentFooter } from "@/components/document-footer"
import { buildInfo } from "@/lib/build-info"

export const metadata = {
  title: "SITEMAP // M. Matich",
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
    }
  ]

  return (
    <DocumentWrapper documentNo={buildInfo.getDocumentNumber("SM")} backLink={{ href: "/", label: "Return to Home" }}>
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

      <DocumentFooter
        documentControl={buildInfo.getDocumentNumber("SM")}
        lastUpdated={buildInfo.buildDate}
      />
    </DocumentWrapper>
  )
}
