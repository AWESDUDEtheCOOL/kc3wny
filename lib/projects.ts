import fs from "fs"
import path from "path"
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
  metrics: Record<string, string>
  images: {
    hero: string
    figures: ProjectFigure[]
  }
  content: string
  sectionId: string
}

const projectsDirectory = path.join(process.cwd(), "content/projects")

export function getAllProjects(): Project[] {
  const fileNames = fs.readdirSync(projectsDirectory)
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        type: data.type,
        description: data.description,
        publishedAt: data.publishedAt,
        metrics: data.metrics,
        images: {
          hero: data.heroImage,
          figures: data.figures || [],
        },
        content,
      }
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((project, index) => ({
      ...project,
      sectionId: `PRJ-${String(index + 1).padStart(3, "0")}`,
    }))

  return projects
}

export function getRecentProjects(count = 3): Project[] {
  return getAllProjects().slice(0, count)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  const fileNames = fs.readdirSync(projectsDirectory)
  return fileNames.filter((fileName) => fileName.endsWith(".md")).map((fileName) => fileName.replace(/\.md$/, ""))
}
