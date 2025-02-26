// app/projects/[slug]/page.tsx
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'projects');
  const files = await fs.readdir(projectsDirectory);

  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

const components = {
  h1: (props: any) => <h1 {...props} className="text-3xl font-bold mt-8 mb-4 text-primary" />,
  h2: (props: any) => <h2 {...props} className="text-2xl font-bold mt-6 mb-3 text-primary" />,
  h3: (props: any) => <h3 {...props} className="text-xl font-bold mt-4 mb-2 text-primary" />,
  p: (props: any) => <p {...props} className="my-4 retro-text" />,
  a: ({ href, children, ...props }: any) => (
    <Link href={href} {...props} className="text-primary hover:underline cursor-pointer">
      {children}
    </Link>
  ),
  ul: (props: any) => <ul {...props} className="list-disc list-inside my-4 retro-text" />,
  ol: (props: any) => <ol {...props} className="list-decimal list-inside my-4 retro-text" />,
  li: (props: any) => <li {...props} className="ml-4 retro-text" />,
  blockquote: (props: any) => (
    <blockquote {...props} className="border-l-4 border-primary pl-4 italic my-4 retro-text" />
  ),
  code: (props: any) => <code {...props} className="bg-primary/10 rounded px-1 py-0.5 retro-text" />,
  pre: (props: any) => <pre {...props} className="bg-primary/10 p-4 rounded my-4 overflow-x-auto retro-text" />,
  img: (props: any) => (
    <Image
      {...props}
      width={600}
      height={400}
      className="my-4"
      alt={props.alt || 'Project image'}
    />
  ),
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const projectsDirectory = path.join(process.cwd(), 'projects');
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  
  let fileContents;
  try {
    fileContents = await fs.readFile(fullPath, 'utf8');
  } catch (error) {
    notFound();
  }

  const { content, data: frontMatter } = matter(fileContents);

  const imagesDirectory = path.join(process.cwd(), 'public', 'images', slug);
  let imageFiles = [];
  try {
    imageFiles = await fs.readdir(imagesDirectory);
  } catch (error) {
    // Directory doesn't exist or is empty
  }

  const formattedDate = frontMatter.date 
    ? new Date(frontMatter.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  const filename = path.basename(fullPath);

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter text-primary retro-glow">{frontMatter.title}</h1>
        {formattedDate && (
          <p className="text-sm text-primary/70 retro-glow">
            {formattedDate}
          </p>
        )}
        <p className="text-xs text-primary/50 font-mono">
          {filename}
        </p>
      </div>
      <div className="border border-primary/20 p-6 backdrop-blur-sm relative">
        <div className="prose prose-invert max-w-none relative z-10">
          <MDXRemote source={content} components={components} />
        </div>
      </div>
      {imageFiles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary retro-glow">Project Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageFiles.map((image, index) => (
              <div key={index} className="border border-primary/20 p-2 backdrop-blur-sm relative overflow-hidden group">
                <Image
                  src={`/images/${slug}/${image}`}
                  alt={`Project image ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}