// app/sitemap.ts

import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://kc3wny.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/projects',
    '/photography',
    '/radio',
    '/card',
    '/sitemap',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  let projectEntries: MetadataRoute.Sitemap = []

  try {
    const projectsDirectory = path.join(process.cwd(), '/projects') // Updated path
    if (fs.existsSync(projectsDirectory)) {
      const projectFiles = fs.readdirSync(projectsDirectory)
        .filter(file => file.endsWith('.mdx'))

      projectEntries = projectFiles.map(file => {
        const slug = path.basename(file, '.mdx')
        return {
          url: `${SITE_URL}/projects/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }
      })
    }
  } catch (error) {
    console.error('Error reading projects directory:', error)
  }

  return [...staticEntries, ...projectEntries]
}