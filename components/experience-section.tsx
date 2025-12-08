type ExperienceSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
}

export function ExperienceSection({ sectionNum, sectionTitle }: ExperienceSectionProps) {
  const workExperience = [
    {
      role: "Hardware Development Intern, Starshield",
      org: "SpaceX",
      location: "Hawthorne, CA",
      duration: "March 2026 — June 2026",
      description:
        "Incoming Starshield Hardware Development Intern for Spring 2026.",
    },
    {
      role: "Build Reliability Engineering (BRE) Intern, Starship",
      org: "SpaceX",
      location: "Brownsville, TX",
      duration: "Jun 2025 — Sep 2025",
      description:
        "Responsible engineer for a portable Starship FOD control device for vehicle production (GSE). Tasks cover full lifecycle from initial design to serialized part production, including mechanical design, electrical design, and software development.",
    },
    {
      role: "Teaching Assistant, BWSI Build a CubeSat Challenge",
      org: "MIT Lincoln Laboratory (nextSource)",
      location: "Virtual",
      duration: "Sep 2025 — Mar 2026\nSep 2024 — Mar 2025\nSep 2023 — Apr 2024",
      description: "National high school competition of ∼40 teams to develop 1U CubeSat with an optical payload for a simulated disaster response mission. Create, test, and procure CubeSat hardware kits, update and expand online coursework. Manage team progress, answer forum questions, and host weekly office hours with student participants.",
    },
    {
      role: "Space Systems Intern, Advanced Electro-Optical Systems (G99)",
      org: "MIT Lincoln Laboratory",
      location: "Lexington, MA",
      duration: "Jun 2024 — Aug 2024",
      description: "Interdisciplinary group focusing on rapidly developing and field-testing terrestrial and space surveillance systems using technologies like electro-optics, infrared sensors, novel focal plane arrays, embedded processors, and image processing. Personal contributions include motion control tasks related to a satellite camera focus mechanism.",
    },
  ]

  const projectExperience = [
    {
      name: "Satellites CoLead",
      org: "Stanford Student Space Initiative - Satellites Team",
      location: "Stanford, CA",
      type: "Project Management",
      duration: "Apr 2025 — Present",
      description: "Lead of 40 person SSI Satellites team for the 2U SAMWISE program to launch Oct. 2025 on SpaceX Transporter 15. General program management, including budget, schedule, and team organization. Tasks from prior work as Structures Co-Lead and Mission Control Lead are carried over to this role.",
    },
    {
      name: "Mission Control Lead",
      org: "Stanford Student Space Initiative - Satellites Team",
      location: "Stanford, CA",
      type: "Technical Lead",
      duration: "Sep 2023 — Mar 2025",
      description: "Management of all command and control (C2) tasks, including ground control systems, satellite health monitoring, orbit tasking, and telemetry and mission data storage and processing. Personal technical contributions include the design and deployment of a 2400 MHz S-band ground station for high-speed photo downlink, reliability improvements to the UHF ground station, and the ground control and data storage architecture.",
    },
    {
      name: "Structures CoLead",
      org: "Stanford Student Space Initiative - Satellites Team",
      location: "Stanford, CA",
      type: "Technical Lead",
      duration: "Sep 2023 — Mar 2025",
      description: "Management of bus development, heat management structures, camera baffles, deployables, and satellite integration/assembly. Personal technical contributions include the redesign of bus components for laser cutting and the design/manufacture of hinges for the double-fold solar array using CNC milling and metal 3D printing.",
    },
    {
      name: "President, W6YX Radio Club",
      org: "Stanford University",
      location: "Stanford, CA",
      type: "Project Management",
      duration: "Sep 2023 — Present",
      description: "Management, maintenance, and improvement of W6YX facilities. Stanford community outreach through radio technology workshops & FCC licensing classes. Focus on enhancing club technical expertise in digital and satellite radio communication.",
    },
    {
      name: "Meshworks - NLP LoRa Mesh Network for Emergency Response",
      org: "TreeHacks 2024 - 1st Place, Intel: Best Use of Intel Developer Cloud",
      location: "Stanford, CA",
      type: "Hackathon",
      duration: "Feb 2024",
      description: "Mesh network of LoRa radio terminals for long-range resilient emergency communications in disaster scenarios. Terminal NLP processing and summarization of voice messages for a text-only data mode to save bandwidth. Automated emergency manager dashboard for reduced information overload at emergency management centers. Personal contributions include the LoRa modem driver, mesh network routing algorithm, and terminal case design.",
    },
  ]

  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Work Experience Table */}
      <div className="mb-8">
        <h3 className="text-sm font-sans font-bold uppercase tracking-[0.1em] mb-3 text-primary">Work Experience</h3>
        <div className="border-2 border-foreground">
          <div className="bg-foreground text-card px-2 py-2 md:px-4 grid grid-cols-[1fr_auto] gap-2 md:gap-4 text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] font-sans uppercase">
            <span>Position</span>
            <span>Period</span>
          </div>

          {workExperience.map((job, idx) => (
            <div
              key={`${job.role}-${idx}`}
              className={`px-2 py-3 md:px-4 md:py-4 ${
                idx % 2 === 0 ? "bg-secondary/30" : ""
              } ${idx < workExperience.length - 1 ? "border-b border-muted" : ""}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-4">
                <div>
                  <h4 className="font-mono text-xs md:text-sm font-bold text-foreground mb-1">{job.role}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] md:text-xs text-muted-foreground font-sans mb-2">
                    <span>{job.org}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                  <p className="font-serif text-xs md:text-sm leading-relaxed text-muted-foreground">{job.description}</p>
                </div>
                <div className="font-mono text-[10px] md:text-xs text-muted-foreground whitespace-pre-line md:text-right leading-snug">
                  {job.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Experience Table */}
      <div>
        <h3 className="text-sm font-sans font-bold uppercase tracking-[0.1em] mb-3 text-primary">Project Experience</h3>
        <div className="border-2 border-foreground">
          <div className="bg-foreground text-card px-2 py-2 md:px-4 grid grid-cols-[1fr_auto] gap-2 md:gap-4 text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] font-sans uppercase">
            <span>Project</span>
            <span>Period</span>
          </div>

          {projectExperience.map((project, idx) => (
            <div
              key={`${project.name}-${idx}`}
              className={`px-2 py-3 md:px-4 md:py-4 ${
                idx % 2 === 0 ? "bg-secondary/30" : ""
              } ${idx < projectExperience.length - 1 ? "border-b border-muted" : ""}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-mono text-xs md:text-sm font-bold text-foreground">{project.name}</h4>
                    <span className="text-[8px] md:text-[9px] tracking-[0.15em] font-sans uppercase text-muted-foreground px-1.5 md:px-2 py-0.5 border border-muted shrink-0">
                      {project.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] md:text-xs text-muted-foreground font-sans mb-2">
                    <span>{project.org}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>
                  <p className="font-serif text-xs md:text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
                <div className="font-mono text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                  {project.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
