import * as fs from "node:fs"
import * as path from "node:path"
import matter from "gray-matter"

export interface ProjectFigure {
  src: string
  caption: string
  id: string
}

export interface Project {
  slug: string
  title: string
  type: string
  description: string
  publishedAt: string
  award?: string
  metrics: Record<string, string>
  images: {
    hero: string
    figures: ProjectFigure[]
  }
  content: string
  sectionId: string
}

const projectsDirectory = path.join(process.cwd(), "content")

/**
 * Find all project directories and markdown files.
 * Supports both:
 * - Subdirectory structure: content/project-name/index.md
 * - Flat file structure: content/project-name.md (legacy)
 */
function findProjectFiles(): { slug: string; filePath: string }[] {
  const entries = fs.readdirSync(projectsDirectory, { withFileTypes: true })
  const projects: { slug: string; filePath: string }[] = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Check for index.md in subdirectory
      const indexPath = path.join(projectsDirectory, entry.name, "index.md")
      if (fs.existsSync(indexPath)) {
        projects.push({ slug: entry.name, filePath: indexPath })
      }
    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "home.md") {
      // Legacy flat file structure (exclude home.md which is for the home page)
      projects.push({
        slug: entry.name.replace(/\.md$/, ""),
        filePath: path.join(projectsDirectory, entry.name),
      })
    }
  }

  return projects
}

export function getAllProjects(): Project[] {
  const projectFiles = findProjectFiles()
  const projects = projectFiles
    .map(({ slug, filePath }) => {
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        type: data.type,
        description: data.description,
        publishedAt: data.publishedAt,
        award: data.award,
        metrics: data.metrics,
        images: {
          hero: data.heroImage,
          figures: data.figures || [],
        },
        content,
      }
    })
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
    .map((project, index) => ({
      ...project,
      sectionId: `PRJ-${String(index + 1).padStart(3, "0")}`,
    }))
    .reverse()

  return projects
}

export function getRecentProjects(count = 3): Project[] {
  return getAllProjects().slice(0, count)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return findProjectFiles().map(({ slug }) => slug)
}
