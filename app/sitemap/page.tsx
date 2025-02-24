"use client";

import { useEffect, useState } from "react";
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SiteStructure {
  name: string;
  path: string;
  children?: SiteStructure[];
}

export default function SitemapPage() {
  const [gitInfo, setGitInfo] = useState({ year: "XXXX", month: "XX", day: "XX", time: "00:00:00"});
  const [siteStructure, setSiteStructure] = useState<SiteStructure[]>([]);

  useEffect(() => {
    fetch("/api/git-info")
      .then((res) => res.json())
      .then((data) => setGitInfo(data))
      .catch(() => setGitInfo({ year: "ERR", month: "ERR", day: "ERR", time: "ERR"}));

    fetch("/api/projects")
      .then((res) => res.json())
      .then((projects) => {
        const projectStructure = projects.map((project: { slug: string }) => ({
          name: `PROJECT_${project.slug.toUpperCase()}`,
          path: `/projects/${project.slug}`,
        }));

        setSiteStructure([
          {
            name: "HOME",
            path: "/",
            children: [
              {
                name: "PROJECTS",
                path: "/projects",
                children: projectStructure,
              },
              {
                name: "PHOTOGRAPHY",
                path: "/photography",
              },
              {
                name: "RADIO",
                path: "/radio",
              },
              { name: "CARD", path: "/card" },
            ],
          },
        ]);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  useEffect(() => {
    fetch("/api/git-info")
      .then((res) => res.json())
      .then((data) => setGitInfo(data))
      .catch(() => setGitInfo({ year: "ERR", month: "ERR", day: "ERR", timepart: "ERR"}));
  }, []);
  
  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Technical Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="h-full w-full grid grid-cols-12 opacity-[0.03] dark:opacity-[0.02]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-foreground" />
          ))}
        </div>
        {/* Diagonal Stripes */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)`,
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      <div className="container py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="border border-foreground/20 bg-background/50 backdrop-blur">
            <div className="border-b border-foreground/20 p-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-foreground/20 animate-pulse" />
                <h1 className="text-lg font-bold tracking-wider">SYSTEM MAP</h1>
              </div>
            </div>
            <div className="p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>STATUS:</span>
                <span className="text-foreground">OPERATIONAL</span>
              </div>
              <div className="flex items-center gap-2">
                <span>LAST UPDATE:</span>
                <span className="text-foreground">{gitInfo.year}-{gitInfo.month}-{gitInfo.day} {gitInfo.time}</span>
              </div>
            </div>
          </div>

          {/* Sitemap Tree */}
          <div className="border border-foreground/20 bg-background/50 backdrop-blur">
            <div className="border-b border-foreground/20 p-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-foreground/20" />
                <h2 className="font-bold tracking-wider">NAVIGATION TREE</h2>
              </div>
            </div>
            <div className="p-4">
              {siteStructure.map((item) => (
                <SitemapItem key={item.path} item={item} level={0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SitemapItemProps {
  item: {
    name: string
    path: string
    children?: Array<{
      name: string
      path: string
      children?: Array<{
        name: string
        path: string
      }>
    }>
  }
  level: number
}

function SitemapItem({ item, level }: SitemapItemProps) {
  return (
    <div className="space-y-2">
      <Link
        href={item.path}
        className="group flex items-center gap-2 hover:text-foreground text-muted-foreground"
        style={{ paddingLeft: `${level * 24}px` }}
      >
        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        <span className="text-sm">{item.name}</span>
        <span className="text-xs text-muted-foreground/50">{item.path}</span>
      </Link>
      {item.children?.map((child) => (
        <SitemapItem key={child.path} item={child} level={level + 1} />
      ))}
    </div>
  )
}

