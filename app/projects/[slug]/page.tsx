import Link from "next/link"
import { ArrowLeft, Calendar, Github, ExternalLink, Zap, Code, Settings, Play } from "lucide-react"
import { notFound } from "next/navigation"

// Project data - in a real app, this would come from a database or CMS
const projectsData = {
  "orbital-tracker-v2": {
    title: "ORBITAL_TRACKER_V2",
    description:
      "Real-time satellite tracking system with predictive algorithms for mission planning and orbital mechanics calculations.",
    status: "OPERATIONAL",
    date: "2024.01.15",
    tech: ["Python", "TLE_Data", "Orbital_Mechanics", "Real_Time_Processing"],
    category: "AEROSPACE",
    longDescription: `Advanced satellite tracking system designed for mission-critical operations. The system processes Two-Line Element (TLE) data from NORAD to provide real-time satellite positions and predictive orbital mechanics calculations.

Key features include automated TLE updates, collision avoidance algorithms, and integration with ground station networks. The system supports multiple satellite constellations and provides accurate positioning data for communication planning and space situational awareness.

Built with high-performance Python libraries for numerical computations and real-time data processing. The architecture supports distributed processing for handling large satellite catalogs and provides REST APIs for integration with other mission systems.`,
    features: [
      "Real-time satellite position calculation",
      "Predictive orbital mechanics modeling",
      "Automated TLE data ingestion",
      "Collision avoidance algorithms",
      "Ground station pass predictions",
      "Multi-constellation support",
      "REST API integration",
      "Distributed processing architecture",
    ],
    specifications: {
      "Processing Speed": "10,000+ satellites/second",
      Accuracy: "±50 meters at LEO",
      "Update Frequency": "Real-time (1Hz)",
      "Data Sources": "NORAD TLE, SpaceTrack",
      "API Endpoints": "15+ REST endpoints",
      "Supported Formats": "JSON, XML, CSV",
    },
    images: [
      { title: "Main Dashboard", description: "Real-time tracking interface" },
      { title: "Orbital Visualization", description: "3D satellite trajectory display" },
      { title: "Prediction Engine", description: "Pass prediction algorithms" },
    ],
  },
  "rf-analyzer-pro": {
    title: "RF_ANALYZER_PRO",
    description:
      "Advanced spectrum analysis tool for radio frequency monitoring with signal processing and interference detection.",
    status: "DEVELOPMENT",
    date: "2024.01.08",
    tech: ["SDR", "DSP", "C++", "GNU_Radio"],
    category: "RF_SYSTEMS",
    longDescription: `Professional-grade RF spectrum analyzer built on software-defined radio (SDR) technology. Provides comprehensive signal analysis capabilities for frequency monitoring, interference detection, and signal intelligence applications.

The system utilizes advanced digital signal processing algorithms for real-time spectrum analysis, automatic modulation classification, and signal parameter extraction. Built with GNU Radio framework and custom C++ processing blocks for optimal performance.

Features include wideband spectrum monitoring, signal recording and playback, automated interference detection, and integration with external RF equipment. The modular architecture supports various SDR hardware platforms and custom processing plugins.`,
    features: [
      "Wideband spectrum analysis (DC-6GHz)",
      "Real-time signal processing",
      "Automatic modulation classification",
      "Interference detection algorithms",
      "Signal recording and playback",
      "Waterfall display visualization",
      "Plugin architecture support",
      "Multi-channel processing",
    ],
    specifications: {
      "Frequency Range": "DC - 6 GHz",
      Bandwidth: "Up to 56 MHz",
      "Dynamic Range": "120 dB",
      "Processing Rate": "100 MSPS",
      "Supported SDRs": "USRP, RTL-SDR, HackRF",
      "Output Formats": "WAV, IQ, CSV",
    },
    images: [
      { title: "Spectrum Display", description: "Real-time frequency analysis" },
      { title: "Signal Processing", description: "DSP algorithm visualization" },
      { title: "Hardware Setup", description: "SDR equipment configuration" },
    ],
  },
  "mission-control-ui": {
    title: "MISSION_CONTROL_UI",
    description: "Command center interface for aerospace operations with real-time telemetry and system monitoring.",
    status: "TESTING",
    date: "2023.12.22",
    tech: ["React", "WebGL", "Real_Time_Data", "Dashboard"],
    category: "INTERFACE",
    longDescription: `Modern mission control interface designed for aerospace operations and satellite command centers. Provides real-time telemetry visualization, system status monitoring, and command execution capabilities in a responsive web-based platform.

Built with React and WebGL for high-performance data visualization and 3D graphics rendering. The system supports multiple data sources, real-time updates, and customizable dashboard layouts for different mission requirements.

Features include telemetry plotting, alarm management, command scheduling, and integration with ground station networks. The interface is optimized for 24/7 operations with dark mode support and accessibility features for mission-critical environments.`,
    features: [
      "Real-time telemetry visualization",
      "3D satellite tracking display",
      "Customizable dashboard layouts",
      "Alarm and alert management",
      "Command execution interface",
      "Historical data analysis",
      "Multi-mission support",
      "Responsive design",
    ],
    specifications: {
      "Update Rate": "10 Hz telemetry",
      "Data Points": "1000+ parameters",
      Visualization: "WebGL 3D graphics",
      Browsers: "Chrome, Firefox, Safari",
      Resolution: "4K display support",
      Latency: "<100ms end-to-end",
    },
    images: [
      { title: "Control Dashboard", description: "Main mission control interface" },
      { title: "3D Visualization", description: "Satellite tracking display" },
      { title: "Telemetry Plots", description: "Real-time data visualization" },
    ],
  },
  "antenna-controller": {
    title: "ANTENNA_CONTROLLER",
    description: "Automated antenna positioning system for satellite communication and radio astronomy applications.",
    status: "OPERATIONAL",
    date: "2023.11.30",
    tech: ["Arduino", "Stepper_Motors", "Position_Control", "Serial_Comm"],
    category: "HARDWARE",
    longDescription: `Precision antenna positioning system for automated satellite tracking and radio astronomy observations. The controller provides accurate azimuth and elevation positioning with sub-degree accuracy for various antenna configurations.

Built around Arduino microcontroller platform with custom stepper motor drivers and position feedback systems. Supports multiple control interfaces including serial commands, network protocols, and integration with tracking software.

The system features automatic satellite tracking, preset position memory, and safety interlocks for weather protection. Designed for 24/7 operation with remote monitoring capabilities and maintenance alerts.`,
    features: [
      "Dual-axis positioning (Az/El)",
      "Sub-degree positioning accuracy",
      "Automatic satellite tracking",
      "Preset position memory",
      "Weather protection modes",
      "Remote control interface",
      "Position feedback sensors",
      "Safety interlock system",
    ],
    specifications: {
      "Positioning Accuracy": "±0.1 degrees",
      "Rotation Speed": "1-10 deg/sec",
      "Load Capacity": "500 kg antenna",
      "Control Interface": "Serial, Ethernet, USB",
      "Power Requirements": "24V DC, 10A",
      "Operating Temperature": "-40°C to +60°C",
    },
    images: [
      { title: "Controller Hardware", description: "Arduino-based control system" },
      { title: "Motor Assembly", description: "Stepper motor positioning" },
      { title: "Antenna Installation", description: "Complete system deployment" },
    ],
  },
  "telemetry-decoder": {
    title: "TELEMETRY_DECODER",
    description: "Multi-protocol telemetry decoder for various satellite and aerospace vehicle data streams.",
    status: "OPERATIONAL",
    date: "2023.10.15",
    tech: ["Signal_Processing", "Protocol_Analysis", "Data_Parsing"],
    category: "COMMUNICATIONS",
    longDescription: `Universal telemetry decoder supporting multiple satellite and aerospace vehicle data formats. Processes raw RF signals and extracts telemetry data for analysis and monitoring applications.

The decoder supports various telemetry standards including CCSDS, AX.25, and custom proprietary formats. Built with modular architecture allowing easy addition of new protocols and data formats.

Features include real-time decoding, data validation, format conversion, and integration with mission control systems. The system provides both command-line and GUI interfaces for different operational requirements.`,
    features: [
      "Multi-protocol support",
      "Real-time signal decoding",
      "Data format conversion",
      "Error detection and correction",
      "Automated frame synchronization",
      "Custom protocol plugins",
      "Data logging and archival",
      "Integration APIs",
    ],
    specifications: {
      "Supported Protocols": "CCSDS, AX.25, Custom",
      "Data Rates": "1.2 kbps - 10 Mbps",
      "Frame Sizes": "Variable length",
      "Error Correction": "Reed-Solomon, Viterbi",
      "Output Formats": "JSON, CSV, Binary",
      "Processing Latency": "<10ms",
    },
    images: [
      { title: "Decoder Interface", description: "Real-time telemetry display" },
      { title: "Protocol Analysis", description: "Data format visualization" },
      { title: "Signal Processing", description: "RF signal conditioning" },
    ],
  },
  "ground-station-network": {
    title: "GROUND_STATION_NETWORK",
    description: "Distributed ground station network for satellite communication and data collection.",
    status: "PLANNING",
    date: "2024.02.01",
    tech: ["Network_Architecture", "Distributed_Systems", "API_Design"],
    category: "INFRASTRUCTURE",
    longDescription: `Distributed network architecture for coordinating multiple ground stations in satellite communication operations. Provides centralized scheduling, data routing, and resource management for global satellite coverage.

The system implements microservices architecture with containerized deployment for scalability and reliability. Features include automated scheduling algorithms, load balancing, and fault tolerance for mission-critical operations.

Designed to support various satellite missions with different communication requirements. The network provides APIs for integration with existing ground systems and supports both commercial and government satellite operations.`,
    features: [
      "Multi-site coordination",
      "Automated scheduling",
      "Load balancing algorithms",
      "Fault tolerance design",
      "Real-time monitoring",
      "API gateway services",
      "Data routing optimization",
      "Security and encryption",
    ],
    specifications: {
      "Network Nodes": "50+ ground stations",
      Coverage: "Global (24/7)",
      Scheduling: "Automated optimization",
      "Data Throughput": "10 Gbps aggregate",
      Latency: "<500ms inter-site",
      Availability: "99.9% uptime SLA",
    },
    images: [
      { title: "Network Topology", description: "Global station distribution" },
      { title: "Control Center", description: "Network operations center" },
      { title: "Data Flow", description: "Information routing diagram" },
    ],
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = projectsData[params.slug as keyof typeof projectsData]

  if (!project) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPERATIONAL":
        return "text-green-400 border-green-400"
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
        return <Zap size={20} />
      case "RF_SYSTEMS":
        return <Settings size={20} />
      case "INTERFACE":
        return <Code size={20} />
      case "HARDWARE":
        return <Settings size={20} />
      case "COMMUNICATIONS":
        return <Settings size={20} />
      case "INFRASTRUCTURE":
        return <Settings size={20} />
      default:
        return <Code size={20} />
    }
  }

  return (
    <div className="space-y-8 relative z-10">
      {/* Back Navigation */}
      <div className="flex items-center space-x-4">
        <Link
          href="/projects"
          className="flex items-center space-x-2 font-mono text-sm text-foreground hover:text-[#FE7F2D] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>BACK_TO_PROJECTS</span>
        </Link>
      </div>

      {/* Project Header */}
      <section className="border-b border-green-400/20 pb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            {getCategoryIcon(project.category)}
            <h1 className="font-mono text-3xl md:text-4xl font-bold text-[#FE7F2D] tracking-wider">{project.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`font-mono text-sm px-3 py-1 border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className="font-mono text-sm text-green-400/70 bg-green-400/10 px-3 py-1">{project.category}</span>
          </div>
        </div>

        <p className="font-mono text-lg text-muted-foreground mb-6 max-w-4xl">{project.description}</p>

        <div className="flex items-center space-x-6 font-mono text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>DEPLOYED: {project.date}</span>
          </div>
          <div className="flex space-x-3">
            <button className="text-foreground hover:text-[#FE7F2D] transition-colors">
              <Github size={16} />
            </button>
            <button className="text-foreground hover:text-[#FE7F2D] transition-colors">
              <ExternalLink size={16} />
            </button>
            {project.status === "OPERATIONAL" && (
              <button className="text-foreground hover:text-[#FE7F2D] transition-colors">
                <Play size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section>
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-4">TECH_STACK</h2>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech, index) => (
            <span key={index} className="font-mono text-sm px-3 py-2 border border-muted text-foreground bg-muted/20">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Project Overview */}
      <section>
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6">PROJECT_OVERVIEW</h2>
        <div className="border border-muted bg-card p-6">
          <div className="prose prose-green max-w-none">
            {project.longDescription.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features and Specifications Grid */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Features */}
        <div>
          <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6">KEY_FEATURES</h2>
          <div className="border border-muted bg-card p-6">
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-[#FE7F2D] font-mono text-sm mt-1">▸</span>
                  <span className="text-foreground/80 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6">SPECIFICATIONS</h2>
          <div className="border border-muted bg-card p-6">
            <div className="space-y-4">
              {Object.entries(project.specifications).map(([key, value], index) => (
                <div key={index} className="border-b border-green-400/10 pb-3 last:border-b-0 last:pb-0">
                  <div className="font-mono text-sm text-muted-foreground mb-1">{key}:</div>
                  <div className="font-mono text-sm text-foreground font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Images */}
      <section>
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6">SYSTEM_IMAGES</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {project.images.map((image, index) => (
            <div key={index} className="border border-green-400/30 bg-black/40 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-400/10 to-[#FE7F2D]/10 flex items-center justify-center">
                <Code className="text-green-400/30" size={48} />
              </div>
              <div className="p-4">
                <h3 className="font-mono text-green-400 font-bold text-sm mb-2">{image.title}</h3>
                <p className="text-green-400/70 text-xs">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Projects */}
      <section className="border-t border-green-400/20 pt-8">
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6">RELATED_SYSTEMS</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(projectsData)
            .filter(([slug]) => slug !== params.slug)
            .slice(0, 3)
            .map(([slug, relatedProject]) => (
              <Link
                key={slug}
                href={`/projects/${slug}`}
                className="border border-muted bg-card p-4 hover:border-[#FE7F2D]/50 transition-colors"
              >
                <h3 className="font-mono text-foreground font-bold text-sm mb-2">{relatedProject.title}</h3>
                <p className="text-muted-foreground text-xs mb-3">{relatedProject.description.slice(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground">{relatedProject.category}</span>
                  <span className={`font-mono text-xs px-2 py-1 border ${getStatusColor(relatedProject.status)}`}>
                    {relatedProject.status}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
