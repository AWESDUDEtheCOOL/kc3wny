"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/photos", label: "PHOTOS" },
  { href: "/radio", label: "RADIO" },
  { href: "/about", label: "ABOUT" },
  { href: "/sitemap", label: "SITEMAP" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <nav className="relative z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full">
            <Image
              src={theme === "dark" ? "/icons/Dark_Wide_V4.svg" : "/icons/Light_Wide_V4.svg"}
              alt="KC3WNY Logo"
              width={0}
              height={0}
              sizes="100%"
              className="h-10 w-auto" // scales to 40px tall, keeps aspect ratio
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-sm tracking-wider transition-colors hover:text-[#FE7F2D] ${
                  pathname === item.href ? "text-[#FE7F2D] border-b border-[#FE7F2D]" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-foreground hover:text-[#FE7F2D] transition-colors border border-muted hover:border-[#FE7F2D]/50"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-[#FE7F2D] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/90 backdrop-blur-sm">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 font-mono text-sm tracking-wider transition-colors hover:text-[#FE7F2D] ${
                    pathname === item.href ? "text-[#FE7F2D]" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center space-x-2 px-4 py-2 font-mono text-sm tracking-wider text-foreground hover:text-[#FE7F2D] transition-colors"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === "dark" ? "LIGHT_MODE" : "DARK_MODE"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
