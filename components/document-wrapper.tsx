import type React from "react"
import Link from "next/link"

interface DocumentWrapperProps {
  children: React.ReactNode
  documentNo?: string
  title?: string
  backLink?: { href: string; label: string }
}

export function DocumentWrapper({ children, documentNo = "UNKNOWN", title, backLink }: DocumentWrapperProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[8.5in] mx-auto bg-card shadow-[0_0_40px_rgba(0,0,0,0.1)] min-h-screen relative">
        {/* Binding edge indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />

        <div className="pl-8 pr-6 py-8 md:pl-12 md:pr-10 md:py-12">
          {/* Top bar */}
          <div className="flex justify-between items-start mb-6 border-b border-muted pb-4">
            <div className="flex items-center gap-4">
              {backLink && (
                <Link
                  href={backLink.href}
                  className="text-[10px] tracking-[0.2em] font-sans uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="font-mono">←</span>
                  {backLink.label}
                </Link>
              )}
              {!backLink && (
                <div className="text-[10px] tracking-[0.3em] text-muted-foreground font-sans uppercase">
                  Unclassified // Public Release
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground font-sans">DOCUMENT NO.</div>
              <div className="font-mono text-sm">{documentNo}</div>
            </div>
          </div>

          {title && <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-8 uppercase">{title}</h1>}

          {children}
        </div>
      </div>
    </main>
  )
}
