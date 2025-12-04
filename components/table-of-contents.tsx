import Link from "next/link"

type Section = {
  num: string
  title: string
  page: string
  href: string
}

type Subpage = {
  title: string
  href: string
}

type TableOfContentsProps = {
  readonly sections: Section[]
  readonly subpages?: Subpage[]
}

export function TableOfContents({ sections, subpages }: TableOfContentsProps) {

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
        {subpages && subpages.length > 0 && (
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
        )}
      </div>
    </nav>
  )
}
