import { Suspense } from "react"
import dynamic from "next/dynamic"
import { DocumentHeader } from "@/components/document-header"
import { TableOfContents } from "@/components/table-of-contents"
import { DocumentFooter } from "@/components/document-footer"

const BiographySection = dynamic(
  () => import("@/components/biography-section").then((mod) => ({ default: mod.BiographySection })),
  { loading: () => <SectionSkeleton /> },
)
const SpecificationsSection = dynamic(
  () => import("@/components/specifications-section").then((mod) => ({ default: mod.SpecificationsSection })),
  { loading: () => <SectionSkeleton /> },
)
const MissionsSection = dynamic(
  () => import("@/components/missions-section").then((mod) => ({ default: mod.MissionsSection })),
  { loading: () => <SectionSkeleton /> },
)
const SystemsSection = dynamic(
  () => import("@/components/systems-section").then((mod) => ({ default: mod.SystemsSection })),
  { loading: () => <SectionSkeleton /> },
)
const ContactSection = dynamic(
  () => import("@/components/contact-section").then((mod) => ({ default: mod.ContactSection })),
  { loading: () => <SectionSkeleton /> },
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
  return (
    <main className="min-h-screen bg-background">
      {/* Page margins like a real document */}
      <div className="max-w-[8.5in] mx-auto bg-card shadow-[0_0_40px_rgba(0,0,0,0.1)] min-h-screen relative">
        {/* Binding edge indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />

        {/* Document content */}
        <div className="pl-8 pr-6 py-8 md:pl-12 md:pr-10 md:py-12">
          <DocumentHeader />
          <TableOfContents />
          <Suspense fallback={<SectionSkeleton />}>
            <BiographySection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <SpecificationsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <MissionsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <SystemsSection />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection />
          </Suspense>
          <DocumentFooter />
        </div>
      </div>
    </main>
  )
}
