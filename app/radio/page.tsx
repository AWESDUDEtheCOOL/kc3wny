import { Radio, Signal, Globe } from "lucide-react"

export default function RadioPage() {
  const recentContacts = [
    {
      callsign: "W1AW",
      frequency: "14.205",
      mode: "CW",
      date: "2024.01.14",
      time: "23:45",
      location: "Connecticut, USA",
      signal: "599",
    },
    {
      callsign: "JA1XYZ",
      frequency: "21.074",
      mode: "FT8",
      date: "2024.01.14",
      time: "22:30",
      location: "Tokyo, Japan",
      signal: "-08",
    },
    {
      callsign: "VK2ABC",
      frequency: "7.032",
      mode: "PSK31",
      date: "2024.01.13",
      time: "19:15",
      location: "Sydney, Australia",
      signal: "579",
    },
    {
      callsign: "DL0XYZ",
      frequency: "14.070",
      mode: "FT4",
      date: "2024.01.13",
      time: "18:45",
      location: "Berlin, Germany",
      signal: "-12",
    },
    {
      callsign: "PY2ABC",
      frequency: "28.074",
      mode: "FT8",
      date: "2024.01.12",
      time: "20:30",
      location: "São Paulo, Brazil",
      signal: "-05",
    },
    {
      callsign: "ZL1XYZ",
      frequency: "3.573",
      mode: "CW",
      date: "2024.01.12",
      time: "07:15",
      location: "Auckland, New Zealand",
      signal: "559",
    },
    {
      callsign: "OH2ABC",
      frequency: "14.230",
      mode: "SSB",
      date: "2024.01.11",
      time: "16:20",
      location: "Helsinki, Finland",
      signal: "57",
    },
    {
      callsign: "VE3XYZ",
      frequency: "7.074",
      mode: "FT8",
      date: "2024.01.11",
      time: "14:45",
      location: "Ontario, Canada",
      signal: "-10",
    },
  ]

  const equipment = [
    { name: "TRANSCEIVER", model: "IC-7851", power: "100W", status: "OPERATIONAL" },
    { name: "AMPLIFIER", model: "AL-1500", power: "1500W", status: "OPERATIONAL" },
    { name: "ANTENNA_TUNER", model: "AT-500", power: "500W", status: "OPERATIONAL" },
    { name: "ROTATOR", model: "G-5500", power: "24V", status: "MAINTENANCE" },
  ]

  const bands = [
    { band: "160M", frequency: "1.8-2.0", contacts: 12, status: "ACTIVE" },
    { band: "80M", frequency: "3.5-4.0", contacts: 45, status: "ACTIVE" },
    { band: "40M", frequency: "7.0-7.3", contacts: 78, status: "ACTIVE" },
    { band: "20M", frequency: "14.0-14.35", contacts: 156, status: "ACTIVE" },
    { band: "15M", frequency: "21.0-21.45", contacts: 89, status: "ACTIVE" },
    { band: "10M", frequency: "28.0-29.7", contacts: 34, status: "ACTIVE" },
  ]

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <section className="text-center py-8 border-b border-green-400/20">
        <h1 className="font-mono text-4xl font-bold text-[#FE7F2D] mb-4 tracking-wider">RADIO_OPERATIONS</h1>
        <p className="font-mono text-green-400/80 max-w-2xl mx-auto">
          Amateur radio communications log and equipment status. HF/VHF operations for emergency communications and
          experimentation.
        </p>
      </section>

      {/* Station Status */}
      <section>
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6 flex items-center">
          <Signal className="mr-3" size={24} />
          STATION_STATUS
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {equipment.map((item, index) => (
            <div key={index} className="border border-muted bg-card p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-mono text-foreground font-bold text-sm">{item.name}</h3>
                <span
                  className={`font-mono text-xs px-2 py-1 border ${
                    item.status === "OPERATIONAL"
                      ? "text-green-400 border-green-400"
                      : "text-yellow-400 border-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                <div>MODEL: {item.model}</div>
                <div>POWER: {item.power}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Band Activity */}
      <section>
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6 flex items-center">
          <Globe className="mr-3" size={24} />
          BAND_ACTIVITY
        </h2>
        <div className="border border-muted bg-card">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-muted/50 font-mono text-xs text-[#FE7F2D] font-bold">
            <div>BAND</div>
            <div>FREQUENCY_MHZ</div>
            <div>CONTACTS</div>
            <div>STATUS</div>
          </div>
          {bands.map((band, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 p-4 border-b border-muted/20 font-mono text-sm text-foreground hover:bg-muted/20 transition-colors"
            >
              <div className="font-bold">{band.band}</div>
              <div>{band.frequency}</div>
              <div>{band.contacts}</div>
              <div className="text-foreground">{band.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Contacts Log */}
      <section>
        <h2 className="font-mono text-2xl text-[#FE7F2D] tracking-wider mb-6 flex items-center">
          <Radio className="mr-3" size={24} />
          CONTACT_LOG
        </h2>
        <div className="border border-muted bg-card overflow-x-auto">
          <div className="grid grid-cols-7 gap-4 p-4 border-b border-muted/50 font-mono text-xs text-[#FE7F2D] font-bold min-w-[800px]">
            <div>CALLSIGN</div>
            <div>FREQ_MHZ</div>
            <div>MODE</div>
            <div>DATE</div>
            <div>TIME_UTC</div>
            <div>LOCATION</div>
            <div>SIGNAL</div>
          </div>
          {recentContacts.map((contact, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 p-4 border-b border-muted/20 font-mono text-sm text-foreground hover:bg-muted/20 transition-colors min-w-[800px]"
            >
              <div className="font-bold">{contact.callsign}</div>
              <div>{contact.frequency}</div>
              <div>{contact.mode}</div>
              <div>{contact.date}</div>
              <div>{contact.time}</div>
              <div className="text-muted-foreground">{contact.location}</div>
              <div>{contact.signal}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="border-t border-green-400/20 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">414</div>
            <div className="font-mono text-sm text-muted-foreground">TOTAL_CONTACTS</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">67</div>
            <div className="font-mono text-sm text-muted-foreground">COUNTRIES</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">06</div>
            <div className="font-mono text-sm text-muted-foreground">BANDS_ACTIVE</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl text-[#FE7F2D] font-bold">08</div>
            <div className="font-mono text-sm text-muted-foreground">MODES_USED</div>
          </div>
        </div>
      </section>
    </div>
  )
}
