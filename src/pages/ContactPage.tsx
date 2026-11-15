import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Instagram, Linkedin, Twitter, Github, UserCheck, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const coordinators = [
    {
      role: 'Faculty Lead',
      subtitle: 'Staff Convenor',
      name: 'Dr. Ramesh Sundaram',
      dept: 'Dean of Student Affairs',
      phone: '+91 98400 11223',
      email: 'ramesh.sundaram@venovation26.edu',
    },
    {
      role: 'Student Head',
      subtitle: 'Head Coordinator',
      name: 'Aditya Verma',
      dept: 'President, Student Council',
      phone: '+91 98765 43210',
      email: 'aditya.v@venovation26.edu',
    },
    {
      role: 'Technical Lead',
      subtitle: 'Events & Challenges',
      name: 'Sanjana Krishnan',
      dept: 'Secretary, Computing Society',
      phone: '+91 98765 43211',
      email: 'sanjana.k@venovation26.edu',
    },
    {
      role: 'Hospitality Lead',
      subtitle: 'Logistics & Stay',
      name: 'Nikhil Rathi',
      dept: 'Outstation Logistics Lead',
      phone: '+91 98765 43213',
      email: 'hospitality@venovation26.edu',
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ============================================================== */}
        {/* 1. Page Header - Centered & Perfectly Aligned                  */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-mono font-medium">
            <MessageSquare className="h-3.5 w-3.5 text-amber-400" />
            <span>CONNECT WITH VENOVATION COMMITTEE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white whitespace-nowrap">
            Contact Official Committee
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Reach out directly to faculty convenors, student leaders, and event coordinators for queries on participation, schedules, and hospitality.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. Coordinators Grid - Perfectly Balanced Card Heights         */}
        {/* ============================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <h2 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Event Leads &amp; Coordinators
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">04 Dedicated Contacts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {coordinators.map((c, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl bg-[#0F1322] border border-slate-800 p-6 transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer flex flex-col justify-between"
              >
                {/* Unified Electric Blue Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

                {/* Subtle tech grid on hover */}
                <div className="absolute inset-0 bg-tech-grid opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

                {/* Top: Avatar, Role Badges, Name, Dept */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                      <UserCheck className="h-5 w-5" />
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-[#14192D] border border-slate-700 text-slate-300 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 text-[10px] font-mono font-semibold uppercase tracking-wider transition-colors">
                      {c.role}
                    </span>
                  </div>

                  <div className="min-h-[72px] flex flex-col justify-center">
                    <span className="text-[11px] font-mono text-amber-400 group-hover:text-white/80 uppercase tracking-wider block transition-colors">
                      {c.subtitle}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-white transition-colors duration-300 mt-0.5">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-400 group-hover:text-white/80 transition-colors duration-300 mt-0.5">
                      {c.dept}
                    </p>
                  </div>
                </div>

                {/* Bottom: Contact Info Links */}
                <div className="relative z-10 pt-4 mt-4 border-t border-slate-800/80 group-hover:border-white/20 space-y-2 text-xs font-mono text-slate-300 transition-colors duration-300">
                  <a
                    href={`tel:${c.phone}`}
                    className="flex items-center gap-2.5 text-slate-300 hover:text-white transition group-hover:text-white py-1 px-2 rounded-lg hover:bg-white/5 group-hover:hover:bg-white/10"
                  >
                    <Phone className="h-3.5 w-3.5 text-blue-400 group-hover:text-white shrink-0" />
                    <span className="truncate">{c.phone}</span>
                  </a>

                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-2.5 text-slate-300 hover:text-white transition group-hover:text-white py-1 px-2 rounded-lg hover:bg-white/5 group-hover:hover:bg-white/10"
                  >
                    <Mail className="h-3.5 w-3.5 text-amber-400 group-hover:text-white shrink-0" />
                    <span className="truncate">{c.email}</span>
                  </a>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. Central Secretariat & Live Broadcasts Split Section         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Headquarters Panel (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F1322] border border-slate-800 p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-mono font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>OFFICIAL CENTRAL SECRETARIAT</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white whitespace-nowrap">
                  Fest Control Room &amp; Operations Desk
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed">
                  The Central Fest Secretariat is located on the Ground Floor of the Main Academic Block, functioning round-the-clock during festival days for on-spot registrations, certificates, transit coordination, and lab allocations.
                </p>
              </div>

              {/* Status Chips Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#14192D] border border-slate-800 space-y-1.5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>Control Desk Hours</span>
                  </div>
                  <p className="text-sm font-bold text-white">08:00 AM – 08:00 PM</p>
                  <p className="text-xs text-slate-400">March 24 &amp; 25, 2026</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#14192D] border border-slate-800 space-y-1.5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>Helpline Desk</span>
                  </div>
                  <p className="text-sm font-bold text-white">+91 98765 43210</p>
                  <p className="text-xs text-slate-400">+91 98765 43211 / 12</p>
                </div>
              </div>

              {/* Address and Email Links */}
              <div className="pt-2 text-sm text-slate-300 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College, Vennikulam, Pathanamthitta, Kerala – 689544
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-400 shrink-0" />
                  <a
                    href="mailto:info@venovation26.edu"
                    className="hover:text-amber-400 transition font-mono text-xs sm:text-sm"
                  >
                    info@venovation26.edu / secretariat@venovation26.edu
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Footer Row */}
            <div className="relative z-10 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Vennikulam+Poly+CM37%2B4JG+Eraviperoor+Vennikulam+Rd+Vennikulam+Kerala+689544"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <span className="text-xs font-mono text-slate-400">
                GPS: 9.3854° N, 76.6710° E
              </span>
            </div>
          </div>

          {/* Social Broadcasts & Hospitality Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0F1322] border border-slate-800 p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-mono font-medium">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>COMMUNICATION CHANNELS</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white whitespace-nowrap">
                Live Broadcast Channels
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Stay informed with minute-by-minute announcements, round qualifications, event updates, and ceremonies via our official channels.
              </p>
            </div>

            {/* Social Grid with unified hover */}
            <div className="grid grid-cols-2 gap-3.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden p-4 rounded-2xl bg-[#14192D] border border-slate-800 hover:border-transparent transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0">
                    <Instagram className="h-4.5 w-4.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-white block">Instagram</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-white/80 font-mono">@venovation26</span>
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden p-4 rounded-2xl bg-[#14192D] border border-slate-800 hover:border-transparent transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0">
                    <Linkedin className="h-4.5 w-4.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-white block">LinkedIn</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-white/80 font-mono">/venovation26</span>
                  </div>
                </div>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden p-4 rounded-2xl bg-[#14192D] border border-slate-800 hover:border-transparent transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0">
                    <Twitter className="h-4.5 w-4.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-white block">Twitter / X</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-white/80 font-mono">@venovation_fest</span>
                  </div>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden p-4 rounded-2xl bg-[#14192D] border border-slate-800 hover:border-transparent transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-white flex items-center justify-center shrink-0">
                    <Github className="h-4.5 w-4.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-white block">GitHub</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-white/80 font-mono">/venovation26</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Outstation Support Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed flex items-start gap-2.5">
              <span className="font-bold text-amber-200 shrink-0">Note:</span>
              <span>Outstation participants needing hostel accommodation or transit assistance should contact the Hospitality Lead at least 24 hours prior to arrival.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
