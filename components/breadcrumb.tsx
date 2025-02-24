"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter((segment) => segment)

  return (
    <div className="retro-breadcrumb">
      <pre className="flex items-center overflow-x-auto">
        <Terminal className="h-4 w-4 mr-2 inline text-primary flex-shrink-0" />
        <span className="text-primary mr-2 flex-shrink-0">PATH&gt;</span>
        <span className="flex-shrink-0">/root</span>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`
          return (
            <span key={href} className="flex-shrink-0">
              <span className="text-muted-foreground mx-1">/</span>
              <Link href={href} className="hover:text-primary">
                {segment}
              </Link>
            </span>
          )
        })}
      </pre>
    </div>
  )
}

