"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, ExternalLink, Zap, Settings } from "lucide-react"
import type { SiteNode } from "@/lib/sitemap-generator"

interface SitemapTreeProps {
  node: SiteNode
  level?: number
  isRoot?: boolean
}

export function SitemapTree({ node, level = 0, isRoot = false }: SitemapTreeProps) {
  const [isExpanded, setIsExpanded] = useState(isRoot || level < 2)
  const hasChildren = node.children && node.children.length > 0

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "text-green-400 border-green-400"
      case "development":
        return "text-yellow-400 border-yellow-400"
      case "planned":
        return "text-purple-400 border-purple-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getTypeIcon = (type: string, isExpanded: boolean) => {
    switch (type) {
      case "section":
        return isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />
      case "page":
        return <FileText size={16} />
      case "dynamic":
        return <Zap size={16} />
      default:
        return <Settings size={16} />
    }
  }

  const indentLevel = level * 24

  return (
    <div className="font-mono">
      {/* Current Node */}
      <div
        className="flex items-center py-2 hover:bg-green-400/5 transition-colors group"
        style={{ paddingLeft: `${indentLevel}px` }}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 text-green-400/60 hover:text-green-400 transition-colors"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}

        {/* Icon */}
        <div className="mr-3 text-green-400/70">{getTypeIcon(node.type, isExpanded)}</div>

        {/* Node Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            {/* Name and Link */}
            <div className="flex items-center space-x-2">
              {node.path.startsWith("#") ? (
                <span className="text-green-400 font-bold text-sm">{node.name}</span>
              ) : (
                <Link
                  href={node.path}
                  className="text-green-400 hover:text-[#FE7F2D] transition-colors font-bold text-sm group-hover:text-[#FE7F2D]"
                >
                  {node.name}
                </Link>
              )}

              {node.path.startsWith("http") && <ExternalLink size={12} className="text-green-400/60" />}
            </div>

            {/* Status Badge */}
            {node.status && (
              <span className={`text-xs px-2 py-1 border ${getStatusColor(node.status)}`}>
                {node.status.toUpperCase()}
              </span>
            )}

            {/* Type Badge */}
            <span className="text-xs px-2 py-1 bg-green-400/10 text-green-400/70 border border-green-400/20">
              {node.type.toUpperCase()}
            </span>
          </div>

          {/* Path */}
          <div className="text-xs text-green-400/50 mt-1">PATH: {node.path}</div>

          {/* Description */}
          <div className="text-xs text-green-400/60 mt-1">{node.description}</div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="border-l border-green-400/20 ml-2">
          {node.children!.map((child, index) => (
            <SitemapTree key={`${child.path}-${index}`} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
