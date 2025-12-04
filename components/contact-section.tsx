type ContactSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
}

export function ContactSection({ sectionNum, sectionTitle }: ContactSectionProps) {
  const channels = [
    { protocol: "EMAIL", address: "alex@example.com", status: "PRIMARY" },
    { protocol: "GITHUB", address: "github.com/alexchen", status: "ACTIVE" },
    { protocol: "LINKEDIN", address: "linkedin.com/in/alexchen", status: "ACTIVE" },
    { protocol: "TWITTER", address: "@alexchen_dev", status: "ACTIVE" },
  ]

  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact channels table */}
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
              <span className="font-mono text-sm truncate">{channel.address}</span>
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

        {/* Availability matrix */}
        <div>
          <div className="border-2 border-foreground p-4 mb-4">
            <div className="text-[10px] tracking-[0.3em] font-sans uppercase text-muted-foreground mb-3">
              Response Time Matrix
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary" />
                <span className="font-mono text-sm">{"< 24h"}</span>
                <span className="text-xs text-muted-foreground font-sans">— Direct inquiries</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-foreground" />
                <span className="font-mono text-sm">{"< 72h"}</span>
                <span className="text-xs text-muted-foreground font-sans">— Project proposals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-muted" />
                <span className="font-mono text-sm">{"1 week"}</span>
                <span className="text-xs text-muted-foreground font-sans">— General networking</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-l-4 border-primary bg-secondary/30">
            <span className="text-primary font-mono text-sm font-bold">NOTICE:</span>
            <p className="mt-1 text-xs font-serif text-muted-foreground leading-relaxed">
              Currently accepting inquiries for consulting, technical writing, and speaking engagements. For urgent
              matters, please use the EMAIL protocol.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
