import React from "react";
import type { Metadata } from 'next';
import Image from 'next/image';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { MainNav } from '@/components/main-nav';
import { Breadcrumb } from '@/components/breadcrumb';
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import '@/styles/globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'KC3WNY',
  description: "Mason Matich's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <link rel="icon" href="favicon.svg" />
      <body className={`${inter.variable} ${mono.variable} font-mono flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'