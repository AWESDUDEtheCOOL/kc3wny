"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NoticeProps {
  message: string
}

export function Notice({ message }: NoticeProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-warning text-warning-foreground py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-1.5 w-1.5 bg-warning-foreground animate-pulse" />
          <p className="text-sm font-medium">{message}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-warning-foreground hover:text-warning-foreground/80"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  )
}

