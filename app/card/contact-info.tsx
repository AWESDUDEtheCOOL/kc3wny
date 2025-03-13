"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, User, Briefcase, Calendar, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

interface ContactInfoProps {
  readonly frontmatter: {
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
      id?: string;
    }[];
    skills: {
      category: string;
      items: string[];
      id?: string;
    }[];
  };
}

export default function ContactInfo({ frontmatter }: ContactInfoProps) {
  const [gitInfo, setGitInfo] = useState({ year: "XXXX", commitNumber: "000", commitRev: "0" });

  useEffect(() => {
    fetch("/api/git-info")
      .then((res) => res.json())
      .then((data) => setGitInfo(data))
      .catch(() => setGitInfo({ year: "ERR", commitNumber: "ERR", commitRev: "ERR" }));
  }, []);
  
  const {
    name,
    university,
    employeeId,
    major,
    email1,
    email2,
    location,
    linkedin,
    summary,
    experiences,
    skills
  } = frontmatter;

  return (
    <>
      {/* Header */}
      <div className="border-b border-primary/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-4">
          <Image src="/headshot.jpg" alt="Logo" width={60} height={60} className="w-12 h-12 sm:w-[60px] sm:h-[60px]"/>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tighter text-primary">KC3WNY SYSTEMS</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">PERSONNEL REPORT 001</p>
          </div>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-xs sm:text-sm text-muted-foreground">DOCUMENT NO.</p>
          <p className="text-sm sm:text-lg font-bold text-primary">DOC. NO.: KC-PR-{gitInfo.year}-{gitInfo.commitNumber} REV: {gitInfo.commitRev}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 space-y-8">
        {/* Personal Information */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            PERSONAL INFORMATION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-primary/20 p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">NAME:</p>
              <p className="font-bold">{name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">UNIVERSITY:</p>
              <p className="font-bold">{university}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">EMPLOYEE ID:</p>
              <p className="font-bold">{employeeId}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">MAJOR:</p>
              <p className="font-bold">{major}</p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            CONTACT INFORMATION
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-primary/20 p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <Link href={`mailto:${email1}`} className="underline">
                {email1}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <Link href={`mailto:${email2}`} className="underline">
                {email2}
              </Link>              
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-primary" />
              <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="underline">
                LinkedIn
              </Link>
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            PROFESSIONAL SUMMARY
          </h2>
          <div className="border border-primary/20 p-4">
            <p className="text-sm leading-relaxed">{summary}</p>
          </div>
        </section>

        {/* Professional Experience */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={`exp-${experience.company}-${experience.title}-${index}`} className="border border-primary/20 p-4">
                <h3 className="text-lg font-semibold text-primary">{experience.title}</h3>
                <p className="text-sm text-muted-foreground">{experience.company}</p>
                <p className="text-sm text-muted-foreground">{experience.period}</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  {experience.responsibilities.map((responsibility, respIndex) => (
                    <li key={`resp-${responsibility.substring(0, 20)}-${respIndex}`}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key Skills */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            KEY SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-primary/20 p-4">
            {skills.map((skillCategory, index) => (
              <div key={`skill-${skillCategory.category}-${index}`} className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">{skillCategory.category}</h3>
                <ul className="list-disc list-inside">
                  {skillCategory.items.map((item, itemIndex) => (
                    <li key={`item-${item.substring(0, 20)}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-primary/20 p-4 text-center text-sm text-muted-foreground">
        <p>CONFIDENTIAL - FOR INTERNAL USE ONLY</p>
        <p>KC3WNY SYSTEMS © {gitInfo.year}</p>
      </div>
    </>
  );
}