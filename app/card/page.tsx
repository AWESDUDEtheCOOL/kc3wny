"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, User, Briefcase, Calendar, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [gitInfo, setGitInfo] = useState({ year: "XXXX", commitNumber: "000" });

  useEffect(() => {
    fetch("/api/git-info")
      .then((res) => res.json())
      .then((data) => setGitInfo(data))
      .catch(() => setGitInfo({ year: "ERR", commitNumber: "ERR" }));
  }, []);
  
  return (
    <div className="min-h-screen bg-background font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto border border-primary/20 bg-background/50 backdrop-blur">
        {/* Header */}
        <div className="border-b border-primary/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            <Image src="/headshot.jpg" alt="Logo" width={60} height={60} className="w-12 h-12 sm:w-[60px] sm:h-[60px]"/>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tighter text-primary">KC3WNY SYSTEMS</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">PERSONNEL REPORT 001</p>
            </div>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-xs sm:text-sm text-muted-foreground">DOCUMENT NO.</p>
            <p className="text-sm sm:text-lg font-bold text-primary">DOC. NO.: KC-PR-{gitInfo.year}-{gitInfo.commitNumber} REV: {gitInfo.commitRev}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 space-y-8">
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              PERSONAL INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-primary/20 p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">NAME:</p>
                <p className="font-bold">Mason Matich</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">UNIVERSITY:</p>
                <p className="font-bold">Stanford University</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">EMPLOYEE ID:</p>
                <p className="font-bold">AE-2024-0042</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">MAJOR:</p>
                <p className="font-bold">Mechanical Engineering</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              CONTACT INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-primary/20 p-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <Link href="mailto:mcmatich@stanford.edu" className="underline">
                  mcmatich@stanford.edu
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <Link href="mailto:mmatich@kc3wny.com" className="underline">
                  mmatich@kc3wny.com
                </Link>              
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Palo Alto, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-primary" />
                <Link href="https://www.linkedin.com/in/mason-matich/" target="_blank" rel="noopener noreferrer" className="underline">
                  LinkedIn
                </Link>
              </div>
            </div>
          </section>

          {/* Professional Summary */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              PROFESSIONAL SUMMARY
            </h2>
            <div className="border border-primary/20 p-4">
              <p className="text-sm leading-relaxed">
              Mechanical Engineering student at Stanford University with hobbyist, academic, and professional experience 
              in motor control, embedded systems, satellite bus development, and RF systems. I'm interested in spacecraft 
              engineering, deployable structures, defense-tech, and ground control systems.
              </p>
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="space-y-8">
              {/* Space Systems Intern */}
              <div className="border border-primary/20 p-4">
                <h3 className="text-lg font-semibold text-primary">Space Systems Intern</h3>
                <p className="text-sm text-muted-foreground">Advanced Electro-Optical Systems (G99) - MIT Lincoln Laboratory, Lexington, MA</p>
                <p className="text-sm text-muted-foreground">Jun 2024 – Aug 2024</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Contributed to an interdisciplinary group focusing on rapidly developing and field-testing innovative sensor systems for persistent surveillance in space and on Earth.</li>
                  <li>Designed and built prototypes involving electro-optics, infrared sensors, novel focal plane arrays, embedded processors, and image processing technologies.</li>
                  <li>Contributed to motion control tasks related to a satellite camera focus mechanism.</li>
                </ul>
              </div>

              {/* Mission Control Lead */}
              <div className="border border-primary/20 p-4">
                <h3 className="text-lg font-semibold text-primary">Mission Control Lead</h3>
                <p className="text-sm text-muted-foreground">Stanford Student Space Initiative – Satellites Team, Stanford, CA</p>
                <p className="text-sm text-muted-foreground">Sep 2023 – Present</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Manage all command and control (C2) tasks, including ground control systems, satellite health monitoring, orbit tasking, and telemetry and mission data storage/processing.</li>
                  <li>Design and deploy a 2400 MHz S-band ground station for high-speed photo downlink.</li>
                  <li>Improve reliability of the UHF ground station and develop the ground control and data storage architecture.</li>
                </ul>
              </div>

              {/* Structures CoLead */}
              <div className="border border-primary/20 p-4">
                <h3 className="text-lg font-semibold text-primary">Structures CoLead</h3>
                <p className="text-sm text-muted-foreground">Stanford Student Space Initiative – Satellites Team, Stanford, CA</p>
                <p className="text-sm text-muted-foreground">Sep 2023 – Present</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Lead development of bus systems, heat management structures, camera baffles, deployables, and satellite integration/assembly.</li>
                  <li>Redesigned bus components for laser cutting and designed/manufactured hinges for the double-fold solar array using CNC milling and metal 3D printing.</li>
                </ul>
              </div>

              {/* W6YX Radio Club */}
              <div className="border border-primary/20 p-4">
                <h3 className="text-lg font-semibold text-primary">Vice-President</h3>
                <p className="text-sm text-muted-foreground">W6YX Radio Club, Stanford, CA</p>
                <p className="text-sm text-muted-foreground">Sep 2023 – Present</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Manage, maintain, and improve W6YX facilities for community outreach.</li>
                  <li>Lead workshops and FCC licensing classes to improve technical knowledge of the Stanford community in radio technology.</li>
                  <li>Focus on enhancing the club's technical expertise in digital and satellite radio communication.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Skills */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              KEY SKILLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-primary/20 p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">CAD</h3>
                <ul className="list-disc list-inside">
                  <li>Fusion360</li>
                  <li>SolidWorks</li>
                  <li>KiCad</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Programming</h3>
                <ul className="list-disc list-inside">
                  <li>Simulink</li>
                  <li>MatLab</li>
                  <li>Python</li>
                  <li>Git</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Prototyping</h3>
                <ul className="list-disc list-inside">
                  <li>Additive Manufacturing</li>
                  <li>CNC Milling</li>
                  <li>Motor Control</li>
                  <li>Soldering (SMD/THT)</li>
                  <li>Circuit Debugging</li>
                  <li>Real-Time Microcontrollers</li>
                  <li>Embedded systems (Arduino/RP2040)</li>
                  <li>UART/i2c/SPI</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Amateur Radio</h3>
                <ul className="list-disc list-inside">
                  <li>Amateur Extra Class</li>
                  <li>LoRa SatCom</li>
                  <li>Mesh Networks</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-primary/20 p-4 text-center text-sm text-muted-foreground">
          <p>CONFIDENTIAL - FOR INTERNAL USE ONLY</p>
          <p>KC3WNY SYSTEMS © {gitInfo.year}</p>
        </div>
      </div>
    </div>
  );
}
