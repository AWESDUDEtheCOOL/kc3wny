import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const projectsDirectory = path.join(process.cwd(), 'projects');
  
  try {
    const files = await fs.readdir(projectsDirectory);
    const projects = files
      .filter(filename => filename.endsWith('.mdx'))
      .map((filename) => ({
        slug: filename.replace('.mdx', ''),
      }));

    return Response.json(projects);
  } catch (error) {
    console.error("Error reading projects directory:", error);
    return Response.json({ error: "Failed to retrieve projects" }, { status: 500 });
  }
}