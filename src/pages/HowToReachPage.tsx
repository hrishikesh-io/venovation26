import React from 'react';
import { MapPin, Navigation, Train, Bus, Plane, Phone, Mail, ExternalLink, ShieldCheck, Clock, GraduationCap } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HowToReachPage: React.FC = () => {
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Vennikulam+Poly+CM37%2B4JG+Eraviperoor+Vennikulam+Rd+Vennikulam+Kerala+689544';

  const transitOptions = [
    {
      icon: <Train className="h-6 w-6 text-amber-400 group-hover:text-white" />,
      title: 'By Train / Railway',
      primary: 'Thiruvalla (TRVL) & Chengannur (CNGR) Stations',
      details: 'Distance: ~14 km from Thiruvalla / Chengannur Railway Stations. Frequent KSRTC buses and taxi/auto services are available directly to Vennikulam Junction.',
    },
    {
      icon: <Bus className="h-6 w-6 text-amber-400 group-hover:text-white" />,
      title: 'By KSRTC / Private Bus',
      primary: 'Vennikulam Bus Junction & Eraviperoor Stop',
      details: 'KSRTC and private buses operating along the Kozhencherry - Thiruvalla and Pathanamthitta routes stop directly near the college campus entrance.',
    },
    {
      icon: <Plane className="h-6 w-6 text-amber-400 group-hover:text-white" />,
      title: 'By Air',
      primary: 'Cochin International Airport (COK) / TRV',
      details: 'Distance: ~115 km from Cochin Airport (COK) or ~125 km from Trivandrum Airport (TRV). Direct train and road connections lead to Pathanamthitta district.',
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Single Line Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-mono font-medium">
            <Navigation className="h-3.5 w-3.5 text-amber-400" />
            <span>CAMPUS LOCATION &amp; TRANSIT</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white whitespace-nowrap">
            How to Reach Us
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Complete transit instructions and venue directions to ensure seamless arrival for all participating college contingents.
          </p>
        </div>

        {/* Top Grid: Campus Card + Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left Campus Details */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0F1322] border border-slate-800 p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>

              <div>
                <span className="text-xs font-mono text-amber-400 uppercase font-semibold">
                  Official Fest Venue
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  GPTC Vennikulam Campus
                </h2>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <p className="font-semibold text-white">Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College</p>
                <p>Eraviperoor - Vennikulam Road, CM37+4JG</p>
                <p className="font-mono text-slate-400">Vennikulam, Pathanamthitta, Kerala – 689 544</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span>Registration Gates Open: 08:00 AM (March 24 &amp; 25)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Free Designated Parking for Registered Vehicles &amp; Contingents</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 flex flex-col gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white"
                  rightIcon={<ExternalLink className="h-4 w-4 ml-1" />}
                >
                  Open in Google Maps
                </Button>
              </a>

              <a
                href="tel:+919876543212"
                className="inline-flex items-center justify-center gap-2 py-2 text-xs font-mono text-slate-400 hover:text-white transition"
              >
                <Phone className="h-3.5 w-3.5 text-amber-400" />
                <span>Transit Helpdesk: +91 98765 43212</span>
              </a>
            </div>
          </div>

          {/* Right Live Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-800 shadow-xl relative min-h-[380px] bg-slate-900">
            <iframe
              title="Campus Map Location"
              src="https://maps.google.com/maps?q=Vennikulam+Polytechnic+College+Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Transit Cards Breakdown - With Unified Electric Blue Hover */}
        <div className="mb-16">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center whitespace-nowrap">
            Transit &amp; Transportation Routes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transitOptions.map((t, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-3xl bg-[#0F1322] border border-slate-800 p-6 sm:p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer space-y-4"
              >
                {/* Unified Electric Blue Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110">
                    {t.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white group-hover:text-white transition-colors">{t.title}</h4>
                    <p className="text-xs font-semibold text-amber-400 group-hover:text-white/90 mt-1 transition-colors">{t.primary}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white/85 leading-relaxed transition-colors">
                    {t.details}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodation & Support Box */}
        <div className="rounded-3xl bg-[#0F1322] text-white p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block">
              OUTSTATION STUDENT ACCOMMODATION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Need hostel accommodation during the fest?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Subsidized campus guest rooms and student hostel suites are available for outstation teams registering before March 20, 2026. Reach out to our hospitality committee to reserve rooms.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hospitality@venovation26.edu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white text-sm font-semibold transition shadow-md"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Hospitality Team</span>
              </a>
              <a
                href="tel:+919876543213"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white font-mono"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                <span>+91 98765 43213</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
