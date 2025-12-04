import Link from "next/link"
import { DocumentHeader } from "@/components/document-header"
import { DocumentFooter } from "@/components/document-footer"
import { buildInfo } from "@/lib/build-info"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background">
      {/* Page margins like a real document */}
      <div className="max-w-[8.5in] mx-auto bg-card shadow-[0_0_40px_rgba(0,0,0,0.1)] min-h-screen relative">
        {/* Binding edge indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />

        {/* Document content */}
        <div className="pl-8 pr-6 py-8 md:pl-12 md:pr-10 md:py-12">
          <DocumentHeader
            documentNo={buildInfo.getDocumentNumber("404")}
            revision={buildInfo.revision}
            date={buildInfo.buildDate}
            sections="1-3"
          />
          
          {/* Large 404 Error Display */}
          <div className="my-12 text-center">
            <div className="text-[12rem] md:text-[16rem] font-mono font-bold leading-none text-destructive opacity-100">
              404
            </div>
            <div className="text-2xl md:text-3xl font-sans font-bold tracking-tight uppercase -mt-8">
              PAGE NOT FOUND
            </div>
          </div>
          
          {/* Error Content */}
          <div className="space-y-12">
            {/* Section 1.0 - Error Description */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-foreground text-background px-3 py-1 font-mono text-sm font-bold min-w-[3rem] text-center">
                  1.0
                </div>
                <h2 className="text-xl font-sans font-bold tracking-tight uppercase">
                  ERROR DESCRIPTION
                </h2>
                <div className="flex-1 h-[2px] bg-foreground" />
              </div>

              <div className="space-y-4 text-foreground leading-relaxed">
                <p className="font-serif text-base">
                  The requested resource could not be located.
                </p>
                <p className="font-serif text-base">
                  Possible causes include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 font-serif text-base">
                  <li>The resource has been moved or deleted from the site</li>
                  <li>An incorrect URL was entered or bookmarked</li>
                  <li>The link from an external source is outdated</li>
                </ul>
              </div>
            </section>

            {/* Section 2.0 - Recommended Actions */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-foreground text-background px-3 py-1 font-mono text-sm font-bold min-w-[3rem] text-center">
                  2.0
                </div>
                <h2 className="text-xl font-sans font-bold tracking-tight uppercase">
                  RECOMMENDED ACTIONS
                </h2>
                <div className="flex-1 h-[2px] bg-foreground" />
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-sans font-bold text-sm tracking-wide uppercase mb-2">
                    Primary Action
                  </h3>
                  <p className="font-serif text-base mb-4">
                    Return to home page for available resources and navigation options.
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-foreground text-background px-6 py-3 font-sans font-bold text-sm tracking-wide uppercase hover:bg-primary transition-colors"
                  >
                    → Return to Home
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 3.0 - System Support */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-foreground text-background px-3 py-1 font-mono text-sm font-bold min-w-[3rem] text-center">
                  3.0
                </div>
                <h2 className="text-xl font-sans font-bold tracking-tight uppercase">
                  SUPPORT
                </h2>
                <div className="flex-1 h-[2px] bg-foreground" />
              </div>

              <div className="space-y-4 text-foreground leading-relaxed">
                <p className="font-serif text-base">
                  If you continue to experience navigation errors or require assistance accessing specific resources, 
                  please contact the system administrator through the following channels:
                </p>
                
                <div className="grid gap-4 mt-6">
                  <div className="border border-foreground p-4">
                    <div className="text-xs tracking-wider text-muted-foreground font-sans uppercase mb-2">
                      Electronic Mail
                    </div>
                    <a 
                      href="mailto:mmatich@kc3wny.com" 
                      className="font-mono text-base text-primary hover:underline"
                    >
                      mmatich@kc3wny.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <DocumentFooter
            documentControl={buildInfo.getDocumentNumber("404")}
            lastUpdated={buildInfo.buildDate}
          />
        </div>
      </div>
    </main>
  )
}