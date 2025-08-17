import { Camera, MapPin, Calendar, Eye } from "lucide-react"

export default function PhotosPage() {
  const photoGallery = [
    {
      title: "ANTENNA_ARRAY_SUNSET",
      location: "Site_Alpha",
      date: "2024.01.12",
      time: "18:45",
      category: "INFRASTRUCTURE",
      description: "Primary communication array during golden hour operations",
    },
    {
      title: "CONTROL_ROOM_NIGHT",
      location: "Command_Center",
      date: "2024.01.10",
      time: "23:30",
      category: "OPERATIONS",
      description: "Mission control during late-night satellite tracking session",
    },
    {
      title: "SATELLITE_DISH_DAWN",
      location: "Site_Beta",
      date: "2024.01.05",
      time: "06:15",
      category: "EQUIPMENT",
      description: "Deep space communication dish at sunrise",
    },
    {
      title: "RADAR_INSTALLATION",
      location: "Site_Gamma",
      date: "2023.12.28",
      time: "14:20",
      category: "SURVEILLANCE",
      description: "Advanced radar system for aerospace monitoring",
    },
    {
      title: "CIRCUIT_BOARD_MACRO",
      location: "Lab_Station_01",
      date: "2023.12.15",
      time: "16:45",
      category: "ELECTRONICS",
      description: "Custom RF amplifier circuit board detail",
    },
    {
      title: "LAUNCH_FACILITY_AERIAL",
      location: "Range_Complex",
      date: "2023.11.22",
      time: "12:00",
      category: "AEROSPACE",
      description: "Overhead view of launch preparation area",
    },
    {
      title: "OSCILLOSCOPE_TRACES",
      location: "Lab_Station_02",
      date: "2023.11.08",
      time: "21:15",
      category: "TESTING",
      description: "Signal analysis during equipment calibration",
    },
    {
      title: "GROUND_STATION_STORM",
      location: "Site_Delta",
      date: "2023.10.30",
      time: "19:30",
      category: "WEATHER",
      description: "Communication equipment during severe weather conditions",
    },
    {
      title: "CLEAN_ROOM_ASSEMBLY",
      location: "Manufacturing_Bay",
      date: "2023.10.12",
      time: "10:30",
      category: "MANUFACTURING",
      description: "Precision assembly of satellite components",
    },
  ]

  const categories = [
    "ALL",
    "INFRASTRUCTURE",
    "OPERATIONS",
    "EQUIPMENT",
    "SURVEILLANCE",
    "ELECTRONICS",
    "AEROSPACE",
    "TESTING",
    "WEATHER",
    "MANUFACTURING",
  ]

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <section className="text-center py-8 border-b border-muted/20">
        <h1 className="font-mono text-4xl font-bold text-[#FE7F2D] mb-4 tracking-wider">PHOTO_ARCHIVE</h1>
        <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
          Visual documentation of defense and aerospace systems. Technical photography and operational imagery.
        </p>
      </section>

      {/* Category Filter */}
      <section>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="font-mono text-xs px-3 py-1 border border-muted text-foreground hover:border-[#FE7F2D] hover:text-[#FE7F2D] transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {photoGallery.map((photo, index) => (
          <div
            key={index}
            className="border border-muted bg-card overflow-hidden hover:border-[#FE7F2D]/50 transition-all duration-300 group"
          >
            {/* Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-muted/10 to-[#FE7F2D]/10 flex items-center justify-center relative overflow-hidden">
              <Camera className="text-muted group-hover:text-[#FE7F2D]/50 transition-colors" size={48} />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors" />
              <div className="absolute top-2 right-2">
                <span className="font-mono text-xs px-2 py-1 bg-background/60 text-foreground border border-muted">
                  {photo.category}
                </span>
              </div>
            </div>

            {/* Photo Info */}
            <div className="p-4">
              <h3 className="font-mono text-foreground font-bold mb-2 group-hover:text-[#FE7F2D] transition-colors">
                {photo.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{photo.description}</p>

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
                  <MapPin size={12} />
                  <span>LOC: {photo.location}</span>
                </div>
                <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>DATE: {photo.date}</span>
                  <span>TIME: {photo.time}</span>
                </div>
              </div>

              {/* View Button */}
              <div className="mt-4 pt-3 border-t border-muted/20">
                <button className="flex items-center space-x-2 font-mono text-xs text-foreground hover:text-[#FE7F2D] transition-colors">
                  <Eye size={12} />
                  <span>VIEW_FULL_RES</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="border-t border-muted/20 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">09</div>
            <div className="font-mono text-sm text-muted-foreground">TOTAL_IMAGES</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">09</div>
            <div className="font-mono text-sm text-muted-foreground">CATEGORIES</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">07</div>
            <div className="font-mono text-sm text-muted-foreground">LOCATIONS</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">2.4</div>
            <div className="font-mono text-sm text-muted-foreground">GB_ARCHIVED</div>
          </div>
        </div>
      </section>
    </div>
  )
}
