import Image from "next/image"

type Membership = {
  name: string
  fullName: string
  logo: string
}

type ProfessionalMembershipsSectionProps = {
  readonly sectionNum: string
  readonly sectionTitle: string
  readonly data: Membership[]
}

export function ProfessionalMembershipsSection({ sectionNum, sectionTitle, data }: ProfessionalMembershipsSectionProps) {
  return (
    <section id={`section-${sectionNum}`} className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-primary-foreground px-3 py-1 font-mono text-lg font-bold">{sectionNum}</div>
        <h2 className="text-2xl font-sans font-bold uppercase tracking-[0.05em]">{sectionTitle}</h2>
        <div className="flex-1 h-[2px] bg-foreground" />
      </div>

      {/* Memberships Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-6 [&>*:last-child:nth-child(odd)]:col-start-1 [&>*:last-child:nth-child(odd)]:col-end-3 [&>*:last-child:nth-child(odd)]:justify-self-center [&>*:last-child:nth-child(odd)]:max-w-[calc(50%-0.5rem)] md:[&>*:last-child:nth-child(odd)]:col-start-auto md:[&>*:last-child:nth-child(odd)]:col-end-auto md:[&>*:last-child:nth-child(odd)]:justify-self-stretch md:[&>*:last-child:nth-child(odd)]:max-w-none">
        {data.map((membership) => (
          <div
            key={membership.name}
            className="flex flex-col items-center p-4 border-2 border-foreground hover:bg-secondary/30 transition-colors group"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center flex-shrink-0">
              <Image
                src={membership.logo}
                alt={`${membership.name} Logo`}
                width={96}
                height={96}
                className="object-contain brightness-0 transition-all scale-100"
              />
            </div>
            <div className="flex flex-col items-center justify-start flex-grow">
              <h3 className="font-mono text-xs md:text-sm font-bold text-primary text-center mb-1">
                {membership.name}
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground text-center leading-tight">
                {membership.fullName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
