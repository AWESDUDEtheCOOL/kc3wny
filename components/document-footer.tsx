export function DocumentFooter() {
  return (
    <footer className="border-t-2 border-foreground pt-6 mt-12">
      {/* Page navigation dots */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <div key={page} className={`w-2 h-2 ${page === 1 ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      {/* Footer content */}
      <div className="grid md:grid-cols-3 gap-6 text-[10px] font-sans tracking-[0.1em] text-muted-foreground">
        <div>
          <div className="uppercase mb-1">Document Control</div>
          <div className="font-mono text-foreground">PF-2024-001-R3.2</div>
        </div>
        <div className="text-center">
          <div className="uppercase mb-1">Last Updated</div>
          <div className="font-mono text-foreground">DEC 2024</div>
        </div>
        <div className="text-right">
          <div className="uppercase mb-1">Distribution</div>
          <div className="font-mono text-foreground">UNLIMITED</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-6 pt-4 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-2 text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
        <span>© 2025 A. Chen — All Rights Reserved</span>
        <span>Printed on recycled electrons</span>
        <span>Page 1 of 1</span>
      </div>
    </footer>
  )
}
