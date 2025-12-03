import type React from "react"
import type { Metadata, Viewport } from "next"
import { EB_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "PERSONNEL FILE // A. CHEN",
  description: "Personal website in the style of NASA technical manuals",
  openGraph: {
    title: "PERSONNEL FILE // A. CHEN",
    description: "Personal website in the style of NASA technical manuals",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#FE7F2D",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={garamond.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
