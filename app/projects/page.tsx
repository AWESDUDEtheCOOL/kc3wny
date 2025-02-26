// app/projects/page.tsx

import ProjectsGrid from '@/components/projects-grid';

export default function ProjectsPage() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-primary mb-8">PROJECTS_</h1>
      <ProjectsGrid />
    </div>
  );
}