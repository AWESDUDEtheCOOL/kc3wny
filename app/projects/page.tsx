// app/projects/page.tsx

import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { ChevronRight } from 'lucide-react';

async function getProjectFiles() {
  const projectsDirectory = path.join(process.cwd(), 'projects');
  const fileNames = await fs.readdir(projectsDirectory);
  return fileNames.filter(fileName => fileName.endsWith('.mdx'));
}

async function getProjectData(fileName: string) {
  const fullPath = path.join(process.cwd(), 'projects', fileName);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data: frontmatter } = matter(fileContents);

  if (frontmatter.date && frontmatter.date instanceof Date) {
    frontmatter.date = frontmatter.date.toISOString().split('T')[0];
  }

  return {
    slug: fileName.replace(/\.mdx$/, ''),
    frontmatter,
  };
}

export default async function ProjectsPage() {
  const projectFiles = await getProjectFiles();
  const projects = await Promise.all(projectFiles.map(fileName => getProjectData(fileName)));

  return (
    <div className="container py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-primary mb-8">PROJECTS_</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="group relative border border-primary/20 bg-background/50 backdrop-blur hover:bg-primary/5 transition-colors block"
          >
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow" />
                <div className="text-xs text-primary">PROJECT_{String(index + 1).padStart(3, "0")}</div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary group-hover:retro-glow">
                {project.frontmatter.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.frontmatter.date ? project.frontmatter.date : 'No date'}
              </p>
              <div className="inline-flex items-center text-primary group">
                <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow mr-2" />
                View Project
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
