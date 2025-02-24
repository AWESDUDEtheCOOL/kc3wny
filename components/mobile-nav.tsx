"use client"

import * as React from "react"
import Link from "next/link"
import { Radio, Camera, Cpu, Menu, User, FileText, Map, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileNav({ className, ...props }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  const navItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/projects", label: "PROJECTS", icon: Cpu },
    { href: "/photography", label: "PHOTOGRAPHY", icon: Camera },
    { href: "/radio", label: "RADIO", icon: Radio },
    { href: "/card", label: "ABOUT", icon: FileText },
    { href: "/sitemap", label: "SITEMAP", icon: Map },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className} {...props}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="grid gap-4 py-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-lg font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

