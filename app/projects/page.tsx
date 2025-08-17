import { Code, ExternalLink, Github, Calendar, Zap } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      title: "ORBITAL_TRACKER_V2",
      description:
        "Real-time satellite tracking system with predictive algorithms for mission planning and orbital mechanics calculations.",
      status: "OPERATIONAL",
      date: "2024.01.15",
      tech: ["Python", "TLE_Data", "Orbital_Mechanics", "Real_Time_Processing"],
      category: "AEROSPACE",
    },
    {
      title: "RF_ANALYZER_PRO",
      description:
        "Advanced spectrum analysis tool for radio frequency monitoring with signal processing and interference detection.",
      status: "DEVELOPMENT",
      date: "2024.01.08",
      tech: ["SDR", "DSP", "C++", "GNU_Radio"],
      category: "RF_SYSTEMS",
    },
    {
      title: "MISSION_CONTROL_UI",
      description: "Command center interface for aerospace operations with real-time telemetry and system monitoring.",
      status: "TESTING",
      date: "2023.12.22",
      tech: ["React", "WebGL", "Real_Time_Data", "Dashboard"],
      category: "INTERFACE",
    },
    {
      title: "ANTENNA_CONTROLLER",
      description: "Automated antenna positioning system for satellite communication and radio astronomy applications.",
      status: "OPERATIONAL",
      date: "2023.11.30",
      tech: ["Arduino", "Stepper_Motors", "Position_Control", "Serial_Comm"],
      category: "HARDWARE",
    },
    {
      title: "TELEMETRY_DECODER",
      description: "Multi-protocol telemetry decoder for various satellite and aerospace vehicle data streams.",
      status: "OPERATIONAL",
      date: "2023.10.15",
      tech: ["Signal_Processing", "Protocol_Analysis", "Data_Parsing"],
      category: "COMMUNICATIONS",
    },
    {
      title: "GROUND_STATION_NETWORK",
      description: "Distributed ground station network for satellite communication and data collection.",
      status: "PLANNING",
      date: "2024.02.01",
      tech: ["Network_Architecture", "Distributed_Systems", "API_Design"],
      category: "INFRASTRUCTURE",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPERATIONAL":
        return "text-foreground border-foreground"
      case "DEVELOPMENT":
        return "text-yellow-400 border-yellow-400"
      case "TESTING":
        return "text-blue-400 border-blue-400"
      case "PLANNING":
        return "text-purple-400 border-purple-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AEROSPACE":
        return <Zap size={16} />
      case "RF_SYSTEMS":
        return <Code size={16} />
      default:
        return <Code size={16} />
    }
  }

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <section className="text-center py-8 border-b border-foreground/20">
        <h1 className="font-mono text-4xl font-bold text-[#FE7F2D] mb-4 tracking-wider">PROJECT_ARCHIVE</h1>
        <p className="font-mono text-foreground/80 max-w-2xl mx-auto">
          Engineering solutions for defense and aerospace applications. Mission-critical systems and advanced
          technological implementations.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.title.toLowerCase().replace(/_/g, "-")}`}
            className="block border border-muted bg-card p-6 hover:border-[#FE7F2D]/50 transition-all duration-300 hover:bg-muted/50"
          >
            {/* Project Header */}
            <div className="flex justify-between items-start mb-4 group">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(project.category)}
                <h2 className="font-mono text-xl text-foreground font-bold group-hover:text-[#FE7F2D] transition-colors">
                  {project.title} →
                </h2>
              </div>
              <span className={`font-mono text-xs px-2 py-1 border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            {/* Category */}
            <div className="mb-3">
              <span className="font-mono text-xs text-[#FE7F2D] bg-[#FE7F2D]/10 px-2 py-1">{project.category}</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

            {/* Technologies */}
            <div className="mb-4">
              <div className="font-mono text-xs text-muted-foreground/60 mb-2">TECH_STACK:</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="font-mono text-xs px-2 py-1 border border-muted text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-foreground/20">
              <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
                <Calendar size={12} />
                <span>{project.date}</span>
              </div>
              <div className="flex space-x-3">
                <button className="text-foreground hover:text-[#FE7F2D] transition-colors">
                  <Github size={16} />
                </button>
                <button className="text-foreground hover:text-[#FE7F2D] transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Stats Section */}
      <section className="border-t border-foreground/20 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">06</div>
            <div className="font-mono text-sm text-foreground/70">TOTAL_PROJECTS</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">03</div>
            <div className="font-mono text-sm text-foreground/70">OPERATIONAL</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">02</div>
            <div className="font-mono text-sm text-foreground/70">IN_DEVELOPMENT</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">05</div>
            <div className="font-mono text-sm text-foreground/70">CATEGORIES</div>
          </div>
        </div>
      </section>
    </div>
  )
}
