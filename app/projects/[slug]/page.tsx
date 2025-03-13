// app/projects/[slug]/page.tsx
import fs from 'node:fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import type { StaticImageData } from 'next/image';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const projectsDirectory = path.join(process.cwd(), 'markdown/projects');

export async function generateStaticParams() {
  const files = await fs.readdir(projectsDirectory);
  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type CodeProps = ComponentPropsWithoutRef<'code'>;
type PreProps = ComponentPropsWithoutRef<'pre'>;
type ImageComponentProps = ComponentPropsWithoutRef<'img'> & {
  src: string | StaticImageData;
  alt?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
};

const components: MDXComponents = {
  h1: (props: HeadingProps) => <h1 {...props} className="text-3xl font-bold mt-8 mb-4 text-primary" />,
  h2: (props: HeadingProps) => <h2 {...props} className="text-2xl font-bold mt-6 mb-3 text-primary" />,
  h3: (props: HeadingProps) => <h3 {...props} className="text-xl font-bold mt-4 mb-2 text-primary" />,
  p: (props: ParagraphProps) => <p {...props} className="my-4 retro-text" />,
  a: (props) => (
    <Link 
      href={props.href || '#'} 
      className="text-primary hover:underline cursor-pointer"
      prefetch={false}
    >
      {props.children}
    </Link>
  ),
  ul: (props: ListProps) => <ul {...props} className="list-disc list-inside my-4 retro-text" />,
  ol: (props: ListProps) => <ol {...props} className="list-decimal list-inside my-4 retro-text" />,
  li: (props: ListItemProps) => <li {...props} className="ml-4 retro-text" />,
  blockquote: (props: BlockquoteProps) => (
    <blockquote {...props} className="border-l-4 border-primary pl-4 italic my-4 retro-text" />
  ),
  code: (props: CodeProps) => <code {...props} className="bg-primary/10 rounded px-1 py-0.5 retro-text" />,
  pre: (props: PreProps) => <pre {...props} className="bg-primary/10 p-4 rounded my-4 overflow-x-auto retro-text" />,
  img: ({ src, alt, width, height, style, className, ...props }) => {
    if (!src) return null;
    
    const numericWidth = width ? 
      (typeof width === 'string' ? Number.parseInt(width, 10) : width) : 600;
    
    const numericHeight = height ? 
      (typeof height === 'string' ? Number.parseInt(height, 10) : height) : 400;
    
    const mergedStyle = {
      ...style,
      maxHeight: style?.maxHeight || '70vh',
    };
    
    return (
      <Image
        src={src as string | StaticImageData}
        alt={alt || 'Project image'}
        width={numericWidth}
        height={numericHeight}
        className={`${className || ''} max-w-full h-auto object-contain my-4 mx-auto`}
        style={mergedStyle}
        loading="lazy"
        priority={false}
        {...props}
      />
    );
  },
};

interface FrontMatter {
  title: string;
  date?: string;
  [key: string]: unknown;
}

async function getProjectFile(slug: string) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    return { 
      fullPath, 
      fileContents 
    };
  } catch (error) {
    return null;
  }
}

export default async function ProjectPage({ params }: Readonly<ProjectPageProps>) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const projectFileResult = await getProjectFile(slug);
  
  if (!projectFileResult) {
    notFound();
  }
  
  const { fullPath, fileContents } = projectFileResult;
  const { content, data } = matter(fileContents);
  const frontMatter = data as FrontMatter;

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
    </div>
  );
}