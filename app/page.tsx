import { Suspense } from "react"
import dynamic from "next/dynamic"
import { DocumentHeader } from "@/components/document-header"
import { TableOfContents } from "@/components/table-of-contents"
import { DocumentFooter } from "@/components/document-footer"
import { buildInfo } from "@/lib/build-info"

const BiographySection = dynamic(
  () => import("@/components/biography-section").then((mod) => ({ default: mod.BiographySection })),
)
const SpecificationsSection = dynamic(
  () => import("@/components/specifications-section").then((mod) => ({ default: mod.SpecificationsSection })),
)
const MissionsSection = dynamic(
  () => import("@/components/missions-section").then((mod) => ({ default: mod.MissionsSection })),
)
const SystemsSection = dynamic(
  () => import("@/components/systems-section").then((mod) => ({ default: mod.SystemsSection })),
)
const ContactSection = dynamic(
  () => import("@/components/contact-section").then((mod) => ({ default: mod.ContactSection })),
)

function SectionSkeleton() {
  return (
    <div className="mb-12 animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-muted w-12 h-8" />
        <div className="bg-muted h-6 w-48" />
        <div className="flex-1 h-[2px] bg-muted" />
      </div>
      <div className="space-y-3">
        <div className="bg-muted h-4 w-full" />
        <div className="bg-muted h-4 w-3/4" />
        <div className="bg-muted h-4 w-5/6" />
      </div>
    </div>
  )
}

export default function Home() {
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
    <main className="min-h-screen bg-background">
      {/* Page margins like a real document */}
      <div className="max-w-[8.5in] mx-auto bg-card shadow-[0_0_40px_rgba(0,0,0,0.1)] min-h-screen relative">
        {/* Binding edge indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />

        {/* Document content */}
        <div className="pl-8 pr-6 py-8 md:pl-12 md:pr-10 md:py-12">
          <DocumentHeader
            documentNo={buildInfo.getDocumentNumber("PF")}
            revision={buildInfo.revision}
            date={buildInfo.buildDate}
            pages="1-8"
          />
          <TableOfContents sections={sections} subpages={subpages} />
          <Suspense fallback={<SectionSkeleton />}>
            <BiographySection sectionNum={sections[0].num} sectionTitle={sections[0].title} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <SpecificationsSection sectionNum={sections[1].num} sectionTitle={sections[1].title} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <MissionsSection sectionNum={sections[2].num} sectionTitle={sections[2].title} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <SystemsSection sectionNum={sections[3].num} sectionTitle={sections[3].title} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection sectionNum={sections[4].num} sectionTitle={sections[4].title} />
          </Suspense>
          <DocumentFooter
            documentControl={`${buildInfo.getDocumentNumber("PF")}-R${buildInfo.revision}`}
            lastUpdated={buildInfo.buildDate}
          />
        </div>
      </div>
    </main>
  )
}
