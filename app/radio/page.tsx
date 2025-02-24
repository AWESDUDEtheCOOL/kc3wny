export default function RadioPage() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-bold tracking-tighter text-primary mb-8">AMATEUR RADIO_</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-primary/20 p-6 space-y-4 bg-background/50 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-primary retro-glow" />
            <h3 className="text-xl font-bold text-primary">Station Details</h3>
          </div>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between border-b border-dashed border-primary/20 pb-2">
              <span className="text-muted-foreground">CALLSIGN:</span>
              <span className="text-primary">KC3WNY</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-primary/20 pb-2">
              <span className="text-muted-foreground">GRID:</span>
              <span className="text-primary">CM87vk</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-primary/20 pb-2">
              <span className="text-muted-foreground">EQUIPMENT:</span>
              <span className="text-primary">QRZ-1 Explorer, Icom IC-910, T-Echo, T-Deck</span>
            </div>
          </div>
        </div>
        <div className="border border-primary/20 p-6 space-y-4 bg-background/50 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-primary retro-glow" />
            <h3 className="text-xl font-bold text-primary">Recent Contacts</h3>
          </div>
          <div className="space-y-2 text-sm font-mono">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center border-b border-dashed border-primary/20 pb-2">
                <span className="text-muted-foreground">2025-24-{String(i + 1).padStart(2, "0")}</span>
                <span className="text-primary">TEST</span>
                <span className="text-muted-foreground">TEST</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

