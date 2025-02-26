import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { ChevronRight } from 'lucide-react';

interface ProjectsGridProps {
  limit?: number;
}

interface ProjectData {
  slug: string;
  title: string;
  date: string | null;
}

const projectsDirectory = path.join(process.cwd(), 'projects');

function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

async function getProjects(): Promise<ProjectData[]> {
  const fileNames = await fs.readdir(projectsDirectory);
  const projectPromises = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(async (fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data: frontmatter } = matter(fileContents);
      
      const date = frontmatter.date ? parseDate(frontmatter.date) : null;
      
      return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: frontmatter.title as string,
        date: date ? date.toISOString() : null,
      };
    });

  return Promise.all(projectPromises);
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

export default async function ProjectsGrid({ limit }: ProjectsGridProps) {
  const allProjects = await getProjects();

  const sortedProjects = allProjects.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  const displayedProjects = limit ? sortedProjects.slice(0, limit) : sortedProjects;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedProjects.map((project, index) => (
        <Link
          href={`/projects/${project.slug}`}
          key={project.slug}
          className="group relative border border-primary/20 bg-background/50 backdrop-blur hover:bg-primary/5 transition-colors block"
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow" />
              <div className="text-xs text-primary">PROJECT_{String(sortedProjects.length - index).padStart(3, "0")}</div>
            </div>
            <h4 className="text-lg font-bold group-hover:text-primary group-hover:retro-glow">
              {project.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {formatDate(project.date)}
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
  );
}