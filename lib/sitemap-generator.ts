export interface SiteNode {
  name: string
  path: string
  description: string
  children?: SiteNode[]
  type: "page" | "section" | "dynamic"
  status?: "active" | "development" | "planned"
}

export function generateSiteStructure(): SiteNode {
  const rootNode: SiteNode = {
    name: "COMMAND_CENTER",
    path: "/",
    description: "Defense & Aerospace Engineering Systems",
    type: "section",
    children: [
      {
        name: "HOME",
        path: "/",
        description: "Main command center dashboard with recent activity",
        type: "page",
        status: "active",
      },
      {
        name: "PROJECTS",
        path: "/projects",
        description: "Engineering project archive and documentation",
        type: "section",
        status: "active",
        children: [
          {
            name: "PROJECT_INDEX",
            path: "/projects",
            description: "Complete project listing and categories",
            type: "page",
            status: "active",
          },
          {
            name: "ORBITAL_TRACKER_V2",
            path: "/projects/orbital-tracker-v2",
            description: "Real-time satellite tracking system",
            type: "dynamic",
            status: "active",
          },
          {
            name: "RF_ANALYZER_PRO",
            path: "/projects/rf-analyzer-pro",
            description: "Advanced spectrum analysis tool",
            type: "dynamic",
            status: "development",
          },
          {
            name: "MISSION_CONTROL_UI",
            path: "/projects/mission-control-ui",
            description: "Command center interface",
            type: "dynamic",
            status: "active",
          },
          {
            name: "ANTENNA_CONTROLLER",
            path: "/projects/antenna-controller",
            description: "Automated positioning system",
            type: "dynamic",
            status: "active",
          },
          {
            name: "TELEMETRY_DECODER",
            path: "/projects/telemetry-decoder",
            description: "Multi-protocol decoder",
            type: "dynamic",
            status: "active",
          },
          {
            name: "GROUND_STATION_NETWORK",
            path: "/projects/ground-station-network",
            description: "Distributed communication network",
            type: "dynamic",
            status: "planned",
          },
        ],
      },
      {
        name: "PHOTOS",
        path: "/photos",
        description: "Technical photography and documentation",
        type: "section",
        status: "active",
        children: [
          {
            name: "PHOTO_GALLERY",
            path: "/photos",
            description: "Complete image archive with filtering",
            type: "page",
            status: "active",
          },
          {
            name: "INFRASTRUCTURE",
            path: "/photos#infrastructure",
            description: "Communication arrays and facilities",
            type: "section",
            status: "active",
          },
          {
            name: "OPERATIONS",
            path: "/photos#operations",
            description: "Control room and mission operations",
            type: "section",
            status: "active",
          },
          {
            name: "EQUIPMENT",
            path: "/photos#equipment",
            description: "Technical equipment documentation",
            type: "section",
            status: "active",
          },
          {
            name: "SURVEILLANCE",
            path: "/photos#surveillance",
            description: "Radar and monitoring systems",
            type: "section",
            status: "active",
          },
        ],
      },
      {
        name: "RADIO",
        path: "/radio",
        description: "Amateur radio operations and logging",
        type: "section",
        status: "active",
        children: [
          {
            name: "OPERATIONS_LOG",
            path: "/radio",
            description: "Contact log and station status",
            type: "page",
            status: "active",
          },
          {
            name: "STATION_STATUS",
            path: "/radio#station",
            description: "Equipment operational status",
            type: "section",
            status: "active",
          },
          {
            name: "BAND_ACTIVITY",
            path: "/radio#bands",
            description: "Frequency band utilization",
            type: "section",
            status: "active",
          },
          {
            name: "CONTACT_LOG",
            path: "/radio#contacts",
            description: "Communication records",
            type: "section",
            status: "active",
          },
        ],
      },
      {
        name: "ABOUT",
        path: "/about",
        description: "System operator information and credentials",
        type: "page",
        status: "active",
      },
      {
        name: "SITEMAP",
        path: "/sitemap",
        description: "Hierarchical site structure overview",
        type: "page",
        status: "active",
      },
    ],
  }

  return rootNode
}

export function flattenSiteStructure(node: SiteNode, level = 0): Array<SiteNode & { level: number }> {
  const result: Array<SiteNode & { level: number }> = []

  result.push({ ...node, level })

  if (node.children) {
    for (const child of node.children) {
      result.push(...flattenSiteStructure(child, level + 1))
    }
  }

  return result
}

export function getSiteStatistics(node: SiteNode): {
  totalPages: number
  totalSections: number
  activePages: number
  developmentPages: number
  plannedPages: number
  maxDepth: number
} {
  let totalPages = 0
  let totalSections = 0
  let activePages = 0
  let developmentPages = 0
  let plannedPages = 0
  let maxDepth = 0

  function traverse(currentNode: SiteNode, depth = 0) {
    maxDepth = Math.max(maxDepth, depth)

    if (currentNode.type === "page" || currentNode.type === "dynamic") {
      totalPages++
    } else if (currentNode.type === "section") {
      totalSections++
    }

    switch (currentNode.status) {
      case "active":
        activePages++
        break
      case "development":
        developmentPages++
        break
      case "planned":
        plannedPages++
        break
    }

    if (currentNode.children) {
      for (const child of currentNode.children) {
        traverse(child, depth + 1)
      }
    }
  }

  traverse(node)

  return {
    totalPages,
    totalSections,
    activePages,
    developmentPages,
    plannedPages,
    maxDepth,
  }
}
