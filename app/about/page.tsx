import { User, MapPin, Mail, Phone, Calendar, Award, Zap, Code } from "lucide-react"

export default function AboutPage() {
  const skills = [
    {
      category: "AEROSPACE",
      items: ["Orbital_Mechanics", "Satellite_Systems", "Mission_Planning", "Telemetry_Analysis"],
    },
    { category: "RF_SYSTEMS", items: ["Antenna_Design", "Signal_Processing", "SDR_Development", "Spectrum_Analysis"] },
    { category: "SOFTWARE", items: ["Python", "C++", "JavaScript", "Real_Time_Systems"] },
    { category: "HARDWARE", items: ["Circuit_Design", "PCB_Layout", "Microcontrollers", "Test_Equipment"] },
  ]

  const experience = [
    {
      title: "SENIOR_SYSTEMS_ENGINEER",
      company: "AEROSPACE_DYNAMICS_CORP",
      period: "2020.03 - PRESENT",
      description: "Lead engineer for satellite communication systems and ground station operations.",
    },
    {
      title: "RF_ENGINEER",
      company: "DEFENSE_TECHNOLOGIES_INC",
      period: "2017.08 - 2020.02",
      description: "Developed advanced radar and communication systems for defense applications.",
    },
    {
      title: "SYSTEMS_ANALYST",
      company: "SPACE_RESEARCH_LAB",
      period: "2015.01 - 2017.07",
      description: "Analyzed telemetry data and developed mission control software for space missions.",
    },
  ]

  const certifications = [
    { name: "AMATEUR_RADIO_EXTRA", code: "W0ABC", date: "2018.05" },
    { name: "CERTIFIED_SYSTEMS_ENGINEER", code: "CSE-2019", date: "2019.11" },
    { name: "RF_SAFETY_CERTIFICATION", code: "RFC-2020", date: "2020.03" },
    { name: "SECURITY_CLEARANCE", code: "SECRET", date: "2017.12" },
  ]

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <section className="text-center py-8 border-b border-muted">
        <h1 className="font-mono text-4xl font-bold text-foreground mb-4 tracking-wider">SYSTEM_OPERATOR</h1>
        <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
          Defense and aerospace systems engineer specializing in RF communications, satellite operations, and
          mission-critical software development.
        </p>
      </section>

      {/* Personal Info */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="border border-muted bg-card p-6">
          <h2 className="font-mono text-xl text-foreground mb-4 flex items-center">
            <User className="mr-3" size={20} />
            PERSONAL_DATA
          </h2>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex items-center space-x-3">
              <MapPin size={16} className="text-muted-foreground/60" />
              <span className="text-muted-foreground">LOCATION:</span>
              <span className="text-foreground">Colorado Springs, CO</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={16} className="text-muted-foreground/60" />
              <span className="text-muted-foreground">EMAIL:</span>
              <span className="text-foreground">operator@command-center.mil</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-muted-foreground/60" />
              <span className="text-muted-foreground">CALLSIGN:</span>
              <span className="text-foreground">W0ABC</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar size={16} className="text-muted-foreground/60" />
              <span className="text-muted-foreground">ACTIVE_SINCE:</span>
              <span className="text-foreground">2015.01.01</span>
            </div>
          </div>
        </div>

        <div className="border border-muted bg-card p-6">
          <h2 className="font-mono text-xl text-foreground mb-4 flex items-center">
            <Award className="mr-3" size={20} />
            CERTIFICATIONS
          </h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="border-l-2 border-muted pl-3">
                <div className="font-mono text-sm text-foreground font-bold">{cert.name}</div>
                <div className="font-mono text-xs text-muted-foreground">
                  CODE: {cert.code} | DATE: {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section>
        <h2 className="font-mono text-2xl text-foreground tracking-wider mb-6 flex items-center">
          <Code className="mr-3" size={24} />
          TECHNICAL_SKILLS
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((skillGroup, index) => (
            <div key={index} className="border border-muted bg-card p-6">
              <h3 className="font-mono text-lg text-foreground mb-4 font-bold">{skillGroup.category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="font-mono text-xs px-2 py-1 border border-muted text-foreground text-center"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section>
        <h2 className="font-mono text-2xl text-foreground tracking-wider mb-6 flex items-center">
          <Zap className="mr-3" size={24} />
          MISSION_HISTORY
        </h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="border border-muted bg-card p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <h3 className="font-mono text-lg text-foreground font-bold">{exp.title}</h3>
                <span className="font-mono text-sm text-foreground mb-1 md:mb-0">{exp.period}</span>
              </div>
              <div className="font-mono text-sm text-muted-foreground mb-3">{exp.company}</div>
              <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="border-t border-muted pt-8">
        <div className="border border-muted bg-card p-8 text-center">
          <h2 className="font-mono text-2xl text-foreground mb-4 tracking-wider">MISSION_STATEMENT</h2>
          <p className="font-mono text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "To advance the frontiers of aerospace and defense technology through innovative engineering solutions,
            ensuring mission success and operational excellence in critical systems. Dedicated to the pursuit of
            technical mastery and the protection of national interests through superior technological capabilities."
          </p>
        </div>
      </section>
    </div>
  )
}
