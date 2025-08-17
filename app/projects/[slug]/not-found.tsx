import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="space-y-8 relative z-10 text-center py-16">
      <div className="flex justify-center mb-8">
        <AlertTriangle className="text-[#FE7F2D]" size={64} />
      </div>

      <h1 className="font-mono text-4xl font-bold text-[#FE7F2D] tracking-wider mb-4">PROJECT_NOT_FOUND</h1>

      <p className="font-mono text-green-400/80 max-w-md mx-auto mb-8">
        The requested project does not exist in the system database. Please verify the project identifier and try again.
      </p>

      <div className="space-y-4">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 font-mono text-sm text-green-400 hover:text-[#FE7F2D] transition-colors border border-green-400/30 hover:border-[#FE7F2D]/50 px-4 py-2"
        >
          <ArrowLeft size={16} />
          <span>RETURN_TO_PROJECTS</span>
        </Link>

        <div className="font-mono text-xs text-green-400/50">ERROR_CODE: 404_PROJECT_NOT_FOUND</div>
      </div>
    </div>
  )
}
