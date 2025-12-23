type ContactChannel = {
  protocol: string
  address: string
  href: string
}

type ContactSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
  readonly data: ContactChannel[]
}

export function ContactSection({ sectionNum, sectionTitle, data }: ContactSectionProps) {
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
        <div className="bg-foreground text-card px-4 py-2 grid grid-cols-[100px_1fr] gap-4 text-[10px] tracking-[0.2em] font-sans uppercase">
          <span>Protocol</span>
          <span>Address</span>
        </div>
        {data.map((channel, idx) => (
          <div
            key={channel.protocol}
            className={`px-4 py-3 grid grid-cols-[100px_1fr] gap-4 ${
              idx % 2 === 0 ? "bg-secondary/30" : ""
            } ${idx !== data.length - 1 ? "border-b border-muted" : ""}`}
          >
            <span className="font-mono text-xs font-bold text-primary self-start pt-1">{channel.protocol}</span>
            {channel.href ? (
              <a 
                href={channel.href}
                target={channel.protocol !== "EMAIL" ? "_blank" : undefined}
                rel={channel.protocol !== "EMAIL" ? "noopener noreferrer" : undefined}
                className="font-mono text-sm hover:text-primary transition-colors break-words"
              >
                {channel.address}
              </a>
            ) : (
              <span className="font-mono text-sm break-words">{channel.address}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
