// app/contact/page.tsx
import fs from 'node:fs/promises';
import path from 'path';
import matter from 'gray-matter';
import ContactInfo from "./contact-info";

type ContactFrontmatter = {
  name: string;
  university: string;
  employeeId: string;
  major: string;
  email1: string;
  email2: string;
  location: string;
  linkedin: string;
  summary: string;
  experiences: {
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
};

export default async function ContactPage() {
  const contactFilePath = path.join(process.cwd(), 'markdown', 'card.mdx');
  const source = await fs.readFile(contactFilePath, 'utf8');
  const { data } = matter(source);
  
  // Cast data to the expected type
  const frontmatter = data as ContactFrontmatter;
  
  return (
    <div className="min-h-screen bg-background font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto border border-primary/20 bg-background/50 backdrop-blur">
        <ContactInfo frontmatter={frontmatter} />
      </div>
    </div>
  );
}