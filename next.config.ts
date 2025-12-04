import type { NextConfig } from "next"
import { execSync } from "node:child_process"

// Get git information at build time
function getGitInfo() {
  try {
    const commitSha = execSync("git rev-parse HEAD").toString().trim()
    const commitDate = execSync("git log -1 --format=%cI").toString().trim()
    const commitCount = execSync("git rev-list --count HEAD").toString().trim()
    
    return {
      NEXT_PUBLIC_GIT_COMMIT_SHA: commitSha,
      NEXT_PUBLIC_GIT_COMMIT_DATE: commitDate,
      NEXT_PUBLIC_GIT_REVISION: `${commitCount}`,
      NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
    }
  } catch (error) {
    console.warn("Failed to get git info:", error)
    return {}
  }
}

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

  async redirects() {
    return [
      {
        source: '/card',
        destination: '/',
        permanent: true,
      },
    ]
  },

  env: {
    ...getGitInfo(),
  },
}

export default nextConfig
