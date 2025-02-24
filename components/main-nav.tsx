"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/photography", label: "Photography" },
  { href: "/radio", label: "Amateur Radio" },
  { href: "/projects", label: "Projects" },
  
  { href: "/sitemap", label: "Sitemap" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-0 text-sm border-2 bg-background">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-4 py-2 border-r-2 last:border-r-0 transition-colors hover:bg-primary hover:text-primary-foreground",
            pathname === item.href ? "bg-primary text-primary-foreground" : "text-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

