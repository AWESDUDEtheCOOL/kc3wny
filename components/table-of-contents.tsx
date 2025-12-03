import Link from "next/link"

export function TableOfContents() {
  const sections = [
    { num: "1.0", title: "Biography", page: "2", href: "#section-1.0" },
    { num: "2.0", title: "Technical Specifications", page: "3", href: "#section-2.0" },
    { num: "3.0", title: "Mission History", page: "4", href: "#section-3.0" },
    { num: "4.0", title: "Systems & Capabilities", page: "5", href: "#section-4.0" },
    { num: "5.0", title: "Communication Protocols", page: "6", href: "#section-5.0" },
  ]

  const subpages = [
    { title: "Project Index", href: "/projects" },
    { title: "Site Map", href: "/sitemap" },
  ]

  return (
    <nav className="mb-12 border-2 border-foreground">
      {/* TOC Header */}
      <div className="bg-foreground text-card px-4 py-2 flex justify-between items-center">
        <span className="text-xs tracking-[0.3em] font-sans uppercase">Contents</span>
        <span className="text-xs tracking-[0.2em] font-sans">Quick Reference</span>
      </div>

      {/* TOC Entries */}
      <div className="p-4">
        {sections.map((section) => (
          <a
            key={section.num}
            href={section.href}
            className="group flex items-baseline gap-2 py-2 border-b border-dashed border-muted last:border-0 hover:bg-secondary/50 transition-colors -mx-2 px-2"
          >
            <span className="font-mono text-primary text-sm font-bold w-10 shrink-0">{section.num}</span>
            <span className="font-sans text-sm uppercase tracking-[0.1em] group-hover:text-primary transition-colors">
              {section.title}
            </span>
            <span className="flex-1 border-b border-dotted border-muted-foreground mx-2 mb-1" />
            <span className="font-mono text-xs text-muted-foreground">{section.page}</span>
          </a>
        ))}

        {/* Subpage links */}
        <div className="mt-4 pt-4 border-t border-foreground">
          <div className="text-[9px] tracking-[0.2em] font-sans uppercase text-muted-foreground mb-2">
            Supplementary Documents
          </div>
          <div className="flex gap-4">
            {subpages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-xs font-sans uppercase tracking-[0.1em] text-primary hover:underline"
              >
                {page.title} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
