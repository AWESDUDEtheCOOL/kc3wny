import Link from "next/link"
import { ArrowRight, Radio, Camera, Code, ExternalLink } from "lucide-react"

export default function HomePage() {
  const recentProjects = [
    {
      title: "ORBITAL_TRACKER_V2",
      description: "Real-time satellite tracking system with predictive algorithms",
      status: "OPERATIONAL",
      date: "2024.01.15",
    },
    {
      title: "RF_ANALYZER_PRO",
      description: "Advanced spectrum analysis tool for radio frequency monitoring",
      status: "DEVELOPMENT",
      date: "2024.01.08",
    },
    {
      title: "MISSION_CONTROL_UI",
      description: "Command center interface for aerospace operations",
      status: "TESTING",
      date: "2023.12.22",
    },
  ]

  const recentPhotos = [
    { title: "ANTENNA_ARRAY_SUNSET", location: "Site_Alpha", date: "2024.01.12" },
    { title: "CONTROL_ROOM_NIGHT", location: "Command_Center", date: "2024.01.10" },
    { title: "SATELLITE_DISH_DAWN", location: "Site_Beta", date: "2024.01.05" },
  ]

  const recentContacts = [
    { callsign: "W1AW", frequency: "14.205", mode: "CW", date: "2024.01.14", time: "23:45" },
    { callsign: "JA1XYZ", frequency: "21.074", mode: "FT8", date: "2024.01.14", time: "22:30" },
    { callsign: "VK2ABC", frequency: "7.032", mode: "PSK31", date: "2024.01.13", time: "19:15" },
  ]

  return (
    <div className="space-y-12 relative z-10">
      {/* Hero Section */}
      <section className="text-center py-16 border-b border-foreground/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-mono text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-wider">
            DEFENSE & AEROSPACE
          </h1>
          <h2 className="font-mono text-2xl md:text-3xl text-[#FE7F2D] mb-6 tracking-wide">ENGINEERING SYSTEMS</h2>
          <p className="font-mono text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced technological solutions for mission-critical applications. Specializing in RF systems, orbital
            mechanics, and command interfaces.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-[#FE7F2D] text-[#FE7F2D] font-mono hover:bg-[#FE7F2D] hover:text-black transition-colors"
            >
              VIEW_PROJECTS <ArrowRight className="ml-2" size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-foreground text-foreground font-mono hover:bg-foreground hover:text-background transition-colors"
            >
              SYSTEM_INFO <ExternalLink className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider flex items-center">
            <Code className="mr-3" size={24} />
            RECENT_PROJECTS
          </h2>
          <Link href="/projects" className="font-mono text-foreground hover:text-[#FE7F2D] transition-colors text-sm">
            VIEW_ALL →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project, index) => (
            <div key={index} className="border border-muted bg-card p-6 hover:border-[#FE7F2D]/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-mono text-foreground font-bold">{project.title}</h3>
                <span
                  className={`font-mono text-xs px-2 py-1 border ${
                    project.status === "OPERATIONAL"
                      ? "text-foreground border-foreground"
                      : project.status === "DEVELOPMENT"
                        ? "text-yellow-400 border-yellow-400"
                        : "text-blue-400 border-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
              <div className="font-mono text-xs text-muted-foreground/50">{project.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Photos */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider flex items-center">
            <Camera className="mr-3" size={24} />
            RECENT_CAPTURES
          </h2>
          <Link href="/photos" className="font-mono text-foreground hover:text-[#FE7F2D] transition-colors text-sm">
            VIEW_ALL →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {recentPhotos.map((photo, index) => (
            <div key={index} className="border border-muted bg-card p-4 hover:border-[#FE7F2D]/50 transition-colors">
              <div className="aspect-video bg-gradient-to-br from-foreground/10 to-[#FE7F2D]/10 mb-3 flex items-center justify-center">
                <Camera className="text-foreground/30" size={32} />
              </div>
              <h3 className="font-mono text-foreground text-sm font-bold mb-1">{photo.title}</h3>
              <div className="font-mono text-xs text-muted-foreground">
                <div>LOC: {photo.location}</div>
                <div>DATE: {photo.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Radio Contacts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider flex items-center">
            <Radio className="mr-3" size={24} />
            RECENT_CONTACTS
          </h2>
          <Link href="/radio" className="font-mono text-foreground hover:text-[#FE7F2D] transition-colors text-sm">
            VIEW_LOG →
          </Link>
        </div>
        <div className="border border-muted bg-card">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-foreground/20 font-mono text-xs text-foreground font-bold">
            <div>CALLSIGN</div>
            <div>FREQ_MHZ</div>
            <div>MODE</div>
            <div>DATE</div>
            <div>TIME_UTC</div>
          </div>
          {recentContacts.map((contact, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 p-4 border-b border-foreground/10 font-mono text-sm text-foreground hover:bg-foreground/5 transition-colors"
            >
              <div className="font-bold">{contact.callsign}</div>
              <div>{contact.frequency}</div>
              <div>{contact.mode}</div>
              <div>{contact.date}</div>
              <div>{contact.time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
