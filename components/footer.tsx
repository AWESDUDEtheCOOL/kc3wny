"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, ChevronRight } from "lucide-react";

export function Footer() {
  const [gitInfo, setGitInfo] = useState({ year: "XXXX", commitNumber: "000" });

  useEffect(() => {
    fetch("/api/git-info")
      .then((res) => res.json())
      .then((data) => setGitInfo(data))
      .catch(() => setGitInfo({ year: "ERR", commitNumber: "ERR" }));
  }, []);

  return (
    <footer className="border-t border-primary/20 bg-background/95 backdrop-blur relative overflow-hidden">
      <div className="container py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Copyright */}
          <div className="space-y-4 border border-primary/20 p-4 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-primary">KC3WNY SYSTEMS</h3>
            <div className="h-px bg-primary/20" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mason Matich
              <br />
              All rights reserved.
            </p>
            <div className="text-xs text-muted-foreground font-mono">
              <div>DOC. NO.: KC-FT-{gitInfo.year}-{gitInfo.commitNumber}</div>
              <div>REV.: {gitInfo.commitRev}</div>
            </div>
          </div>
          {/* Links */}
          <div className="space-y-4 border border-primary/20 p-4 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-primary">NAVIGATION</h3>
            <div className="h-px bg-primary/20" />
            <ul className="space-y-2">
              {['Projects', 'Photography', 'Radio', 'Card', 'Sitemap'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <div className="h-1.5 w-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity mr-2" />
                    {item.toUpperCase()}
                    <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4 border border-primary/20 p-4 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-primary">CONNECT</h3>
            <div className="h-px bg-primary/20" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mason-matich/' },
                { icon: Github, label: 'Github', href: 'https://github.com/AWESDUDEtheCOOL' },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="text-sm">{social.label}</span>
                  <div className="h-px flex-grow bg-primary/20 group-hover:bg-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>    
        </div>
      </div>
    </footer>
  );
}
