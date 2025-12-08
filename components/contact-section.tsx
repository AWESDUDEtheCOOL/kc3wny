type ContactSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
}

export function ContactSection({ sectionNum, sectionTitle }: ContactSectionProps) {
  const channels = [
    { protocol: "EMAIL", address: "mmatich@kc3wny.com", href: "mailto:mmatich@kc3wny.com", status: "PRIMARY" },
    { protocol: "GITHUB", address: "github.com/AWESDUDEtheCOOL", href: "https://github.com/AWESDUDEtheCOOL", status: "ACTIVE" },
    { protocol: "LINKEDIN", address: "linkedin.com/in/mason-matich", href: "https://linkedin.com/in/mason-matich", status: "ACTIVE" },
    { protocol: "MAIL", address: "531 Lasuen Mall #20012, Stanford, CA 94309", href: "https://maps.google.com/?q=531+Lasuen+Mall+20012+Stanford+CA+94309", status: "ACTIVE" },
  ]

  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Contact channels table - full width */}
      <div className="border-2 border-foreground">
        <div className="bg-foreground text-card px-4 py-2 grid grid-cols-[80px_1fr_60px] gap-4 text-[10px] tracking-[0.2em] font-sans uppercase">
          <span>Protocol</span>
          <span>Address</span>
          <span className="text-right">Status</span>
        </div>
        {channels.map((channel, idx) => (
          <div
            key={channel.protocol}
            className={`px-4 py-3 grid grid-cols-[80px_1fr_60px] gap-4 items-center ${
              idx % 2 === 0 ? "bg-secondary/30" : ""
            } ${idx !== channels.length - 1 ? "border-b border-muted" : ""}`}
          >
            <span className="font-mono text-xs font-bold text-primary">{channel.protocol}</span>
            {channel.href ? (
              <a 
                href={channel.href}
                target={channel.protocol !== "EMAIL" ? "_blank" : undefined}
                rel={channel.protocol !== "EMAIL" ? "noopener noreferrer" : undefined}
                className="font-mono text-sm truncate hover:text-primary transition-colors"
              >
                {channel.address}
              </a>
            ) : (
              <span className="font-mono text-sm">{channel.address}</span>
            )}
            <span
              className={`text-[9px] tracking-[0.1em] text-right ${
                channel.status === "PRIMARY" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {channel.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
