"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { Notice } from "@/components/notice"
import React from "react"

export default function Header() {
  const pathname = usePathname()
  const breadcrumbs = pathname === "/" ? [] : ["HOME", ...pathname.split("/").filter(Boolean)]

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="border-b border-primary/20">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="relative w-[120px] h-auto">
              <div className="relative w-full aspect-[3/1]">
                <Image
                  src="/dark_tall.svg"
                  alt="Logo"
                  fill
                  className="hidden dark:block object-contain"
                />
                <Image
                  src="/light_tall.svg"
                  alt="Logo"
                  fill
                  className="block dark:hidden object-contain"
                />
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/projects"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow" />
                PROJECTS
              </Link>
              <Link
                href="/photography"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow" />
                PHOTOGRAPHY
              </Link>
              <Link
                href="/radio"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow" />
                RADIO
              </Link>
              <Link
                href="/card"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow" />
                ABOUT
              </Link>
              <Link
                href="/sitemap"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow" />
                SITEMAP
              </Link>
              {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="text-primary">/</span>}
                      <Link
                        href={index === 0 ? "/" : `/${breadcrumbs.slice(1, index + 1).join("/")}`}
                        className="hover:text-primary transition-colors uppercase"
                      >
                        {crumb}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-xs font-mono text-primary animate-pulse">SYS_STATUS: ONLINE</div>
            <ThemeToggle />
            <MobileNav className="md:hidden" />
          </div>
        </div>
      </div>
      <Notice message="Website in active development. Some features & content may be unavailable." />
    </header>
  )
}