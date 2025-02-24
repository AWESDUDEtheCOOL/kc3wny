import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-mono flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-primary animate-pulse">ERROR_404</h1>
          <p className="text-xl text-muted-foreground">SYSTEM MALFUNCTION: PAGE NOT FOUND</p>
        </div>
        <div className="h-1 bg-primary/20 my-8">
          <div className="h-full bg-primary w-1/4 animate-pulse"></div>
        </div>
        <p className="text-muted-foreground">
          The requested page could not be located. Please check the URL and try again.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <div className="h-1.5 w-1.5 bg-primary-foreground mr-2" />
            RETURN TO HOME
          </Link>
        </Button>
      </div>
    </div>
  )
}

