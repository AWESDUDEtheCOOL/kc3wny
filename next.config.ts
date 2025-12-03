import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: true, // Added update
  },

  experimental: {
    optimizeCss: true,
  },

  typescript: {
    ignoreBuildErrors: true, // Added update
  },
}

export default nextConfig
