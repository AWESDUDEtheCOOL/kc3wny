# Build Information System

This project automatically updates document numbers, revisions, and dates based on Git commits.

## How It Works

### On Vercel (Production)
Vercel automatically provides these environment variables:
- `VERCEL_GIT_COMMIT_SHA` - The commit hash
- `VERCEL_GIT_COMMIT_DATE` - The commit timestamp

The system uses these to generate:
- **Document Number**: `PF-2025-abc1234` (prefix + year + short commit hash)
- **Revision**: `v123` or commit count
- **Date**: Formatted from commit date (e.g., "DEC 2025")

### Locally (Development)
The `next.config.ts` runs git commands at build time to extract:
- Current commit SHA
- Commit date
- Commit count (for revision number)
- Build timestamp

## Usage

### In Server Components (Default)
```tsx
import { buildInfo } from "@/lib/build-info"

<DocumentHeader
  documentNo={buildInfo.getDocumentNumber("PF")}
  revision={buildInfo.revision}
  date={buildInfo.buildDate}
  pages="1-8"
/>
```

### In Client Components
```tsx
"use client"
import { useBuildInfo } from "@/lib/build-info"

export function MyComponent() {
  const { commitHash, buildDate, revision } = useBuildInfo()
  // Use the values...
}
```

## Environment Variables

The following are automatically set during build:
- `NEXT_PUBLIC_GIT_COMMIT_SHA` - Full commit SHA
- `NEXT_PUBLIC_GIT_COMMIT_DATE` - ISO timestamp of commit
- `NEXT_PUBLIC_GIT_REVISION` - Commit count
- `NEXT_PUBLIC_BUILD_DATE` - ISO timestamp of build

## Testing Locally

1. Make sure you have git initialized with commits
2. Run `pnpm build` or `pnpm dev`
3. The git information will be automatically extracted
4. Check the console for any warnings if git commands fail

## Fallbacks

If git information is unavailable (e.g., not a git repo):
- Document number uses "LOCAL" instead of commit hash
- Revision defaults to "3.2"
- Date uses current date

## Vercel Configuration

No additional configuration needed! Vercel automatically provides git environment variables for all deployments.
