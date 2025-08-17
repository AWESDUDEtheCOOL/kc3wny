"use client"

import { useState } from "react"
import { FileText, ExternalLink, BarChart3, RefreshCw, Search, Filter } from "lucide-react"
import { SitemapTree } from "@/components/sitemap-tree"
import { generateSiteStructure, getSiteStatistics, flattenSiteStructure } from "@/lib/sitemap-generator"

export default function SitemapPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const siteStructure = generateSiteStructure()
  const statistics = getSiteStatistics(siteStructure)
  const flatStructure = flattenSiteStructure(siteStructure)

  // Filter nodes based on search and filters
  const filteredNodes = flatStructure.filter((node) => {
    const matchesSearch =
      searchTerm === "" ||
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.path.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || node.type === filterType
    const matchesStatus = filterStatus === "all" || node.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })
 
  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <section className="text-center py-8 border-b border-green-400/20">
        <h1 className="font-mono text-4xl font-bold text-[#FE7F2D] mb-4 tracking-wider">SITEMAP</h1>
      </section>

      {/* Controls */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <Search size={16} className="text-green-400/60" />
          <input
            type="text"
            placeholder="SEARCH_NODES..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-black/40 border border-green-400/30 text-green-400 font-mono text-sm px-3 py-2 focus:border-[#FE7F2D] focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-green-400/60" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-black/40 border border-green-400/30 text-green-400 font-mono text-sm px-2 py-1 focus:border-[#FE7F2D] focus:outline-none"
            >
              <option value="all">ALL_TYPES</option>
              <option value="page">PAGES</option>
              <option value="section">SECTIONS</option>
              <option value="dynamic">DYNAMIC</option>
            </select>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-black/40 border border-green-400/30 text-green-400 font-mono text-sm px-2 py-1 focus:border-[#FE7F2D] focus:outline-none"
          >
            <option value="all">ALL_STATUS</option>
            <option value="active">ACTIVE</option>
            <option value="development">DEVELOPMENT</option>
            <option value="planned">PLANNED</option>
          </select>

          <button className="p-2 border border-green-400/30 text-green-400 hover:border-[#FE7F2D] hover:text-[#FE7F2D] transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>
      </section>

      {/* Site Structure */}
      <section>
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6 flex items-center">
          <FileText className="mr-3" size={24} />
          SITE_HIERARCHY
        </h2>

        {searchTerm || filterType !== "all" || filterStatus !== "all" ? (
          // Filtered Results
          <div className="border border-green-400/30 bg-black/40 p-6">
            <div className="mb-4 font-mono text-sm text-green-400/70">
              FILTERED_RESULTS: {filteredNodes.length} nodes found
            </div>
            <div className="space-y-2">
              {filteredNodes.map((node, index) => (
                <div
                  key={`${node.path}-${index}`}
                  className="flex items-center space-x-4 py-2 border-b border-green-400/10 last:border-b-0"
                >
                  <div className="font-mono text-sm text-green-400 font-bold min-w-0 flex-1">{node.name}</div>
                  <div className="font-mono text-xs text-green-400/60">{node.path}</div>
                  <div className="font-mono text-xs px-2 py-1 bg-green-400/10 text-green-400/70 border border-green-400/20">
                    L{node.level}
                  </div>
                  {node.status && (
                    <div
                      className={`font-mono text-xs px-2 py-1 border ${
                        node.status === "active"
                          ? "text-green-400 border-green-400"
                          : node.status === "development"
                            ? "text-yellow-400 border-yellow-400"
                            : "text-purple-400 border-purple-400"
                      }`}
                    >
                      {node.status.toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Full Hierarchy Tree
          <div className="border border-green-400/30 bg-black/40 p-6">
            <SitemapTree node={siteStructure} isRoot={true} />
          </div>
        )}
      </section>

   </div>
  )
}
