import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Terminal } from "lucide-react"
import fs from "fs"
import path from "path"
import ProjectsGrid from "@/components/projects-grid"


export default function Page() {
  // Get recent photos
  let recentPhotos = []
  try {
    const photosDirectory = path.join(process.cwd(), "public", "images")
    const photoFolders = fs.readdirSync(photosDirectory)
    recentPhotos = photoFolders
      .flatMap((folder) => {
        const folderPath = path.join(photosDirectory, folder)
        if (fs.statSync(folderPath).isDirectory()) {
          return fs.readdirSync(folderPath).map((file) => ({
            src: `/images/${folder}/${file}`,
            folder: folder,
            file: file,
          }))
        }
        return []
      })
      .sort(
        (a, b) =>
          fs.statSync(path.join(photosDirectory, b.folder, b.file)).mtime.getTime() -
          fs.statSync(path.join(photosDirectory, a.folder, a.file)).mtime.getTime(),
      )
      .slice(0, 6)

    console.log("Recent Photos:", recentPhotos)
  } catch (error) {
    console.error("Error reading photos:", error)
  }

    return (
      <div className="min-h-screen bg-background font-mono">
        {/* Hero with Satellite Image */}
        <div className="relative h-screen">
          <Image
            src="home.gif"
            alt="Earth from GOES-16 Satellite"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 satellite-overlay" />
          <div className="absolute inset-0 scan-line" />
  
          {/* Technical Overlay */}
          <div className="absolute top-4 left-4 text-xs font-mono text-primary/80">
            GOES-16 - ABI - FULL DISK
            <br />
            12:40:22 UTC 06-JUL-2024
          </div>
  
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-2xl space-y-8 backdrop-blur-sm bg-background/40 p-8 border border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-primary animate-pulse retro-glow" />
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-primary retro-glow">
                      KC3WNY SYSTEMS
                    </h1>
                  </div>
                  <p className="text-xl text-black/80 dark:text-primary/80 font-mono">
                    <span className="text-black dark:text-primary">&gt;</span> Personal Website of Mason Matich <br></br>
                    <span className="text-black dark:text-primary">&gt;</span> Technical projects // Amateur radio experiments // Digital & Analog photography
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/projects" className="w-full sm:w-auto">  
                    <Button variant="outline" className="w-full sm:w-auto border-black dark:border-primary hover:bg-black/10 dark:hover:bg-primary/10 hover:text-black dark:hover:text-primary group">
                      <div className="h-1.5 w-1.5 bg-black dark:bg-primary group-hover:retro-glow mr-2" />
                      View Projects
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/card" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto border-black dark:border-primary hover:bg-black/10 dark:hover:bg-primary/10 hover:text-black dark:hover:text-primary group">
                      <Terminal className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
  
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none grid-pattern opacity-20" />
        </div>
  
        {/* Recently Added Section */}
        <div className="bg-background py-24">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tighter text-primary mb-8">RECENTLY ADDED_</h2>
  
            {/* Projects */}
            <section className="mb-12">
              <h3 className="text-xl font-bold text-primary mb-4">Latest Projects</h3>
              <ProjectsGrid limit={3} />
              <div className="mt-6">
                <Link href="/projects" className="text-primary hover:underline group inline-flex items-center">
                  <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow mr-2" />
                  View All Projects
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </section>
  
            {/* Photography */}
            <section className="mb-12">
              <h3 className="text-xl font-bold text-primary mb-4">Latest Photos</h3>
              {recentPhotos.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {recentPhotos.map((photo, i) => (
                    <Link
                      key={i}
                      href="/photography"
                      className="group relative border border-primary/20 bg-background/50 backdrop-blur hover:bg-primary/5 transition-colors block aspect-square"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={photo.src}
                          alt={`Photo ${i + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity border-t border-primary/20 bg-background/80 backdrop-blur">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-primary retro-glow" />
                          <div className="text-xs text-primary">IMG_{String(i + 1).padStart(3, "0")}</div>
                        </div>
                        <div className="font-medium text-primary mt-1">{photo.file}</div>
                        <div className="text-xs text-muted-foreground mt-1 font-mono">{photo.folder}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border border-primary/20 p-6 text-center">
                  <p className="text-muted-foreground">No photos found. Check back soon for updates.</p>
                </div>
              )}
              <div className="mt-6">
                <Link href="/photography" className="text-primary hover:underline group inline-flex items-center">
                  <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow mr-2" />
                  View All Photos
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </section>
  
            {/* Radio */}
            <section>
              <h3 className="text-xl font-bold text-primary mb-4">Latest Radio Contacts</h3>
              <div className="border border-primary/20 p-4 bg-background/50 backdrop-blur">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="text-left p-2 text-primary">Date</th>
                      <th className="text-left p-2 text-primary">Callsign</th>
                      <th className="text-left p-2 text-primary">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="border-b border-primary/20 hover:bg-primary/5 transition-colors">
                        <td className="p-2 text-muted-foreground">2025-02-24</td>
                        <td className="p-2 text-muted-foreground">TEST</td>
                        <td className="p-2 text-muted-foreground">TEST</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4">
                  <Link href="/radio" className="text-primary hover:underline group inline-flex items-center">
                    <div className="h-1.5 w-1.5 bg-primary group-hover:retro-glow mr-2" />
                    View All Contacts
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }