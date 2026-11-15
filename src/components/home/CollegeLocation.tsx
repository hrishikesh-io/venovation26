import React from 'react';
import { MapPin, Navigation, ExternalLink, GraduationCap } from 'lucide-react';

export const CollegeLocation: React.FC = () => {
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Vennikulam+Poly+CM37%2B4JG+Eraviperoor+Vennikulam+Rd+Vennikulam+Kerala+689544';

  return (
    <section className="relative py-20 md:py-28 bg-[#08090E] border-t border-slate-800 text-white overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-xs sm:text-sm font-mono font-medium mb-5">
            <MapPin className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span>VENUE &amp; LOCATION</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4 whitespace-nowrap">
            Find Us Here
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Located in the scenic town of Vennikulam, Pathanamthitta – a short drive from major transport hubs in Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Info Panel */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* College Card */}
            <div className="flex-1 rounded-2xl bg-[#0F1322] text-white p-6 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Host Institution</div>
                    <div className="text-sm font-display font-bold text-white leading-tight">Govt. Polytechnic College</div>
                  </div>
                </div>

                <div className="pt-1">
                  <p className="font-display font-semibold text-base sm:text-lg text-white leading-snug">
                    Mahakavi Vennikulam Gopalakurup Memorial
                  </p>
                  <p className="font-display font-semibold text-base sm:text-lg text-amber-400 leading-snug">
                    Govt. Polytechnic College
                  </p>
                </div>

                <div className="flex items-start gap-2.5 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <div>Vennikulam, Pathanamthitta</div>
                    <div className="text-slate-400 text-xs mt-0.5">Kerala – 689 544</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                  <Navigation className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>CM37+4JG, Eraviperoor - Vennikulam Rd</span>
                </div>
              </div>
            </div>

            {/* Quick Info Chips */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'District', value: 'Pathanamthitta' },
                { label: 'State', value: 'Kerala' },
                { label: 'Pin Code', value: '689 544' },
                { label: 'Fest Dates', value: 'March 24–25' },
              ].map(item => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-2xl bg-[#0F1322] border border-slate-800 p-3.5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-transparent hover:shadow-xl hover:shadow-blue-500/25 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="text-[10px] font-mono text-slate-400 group-hover:text-white/80 uppercase tracking-wider mb-1 transition-colors duration-300">
                      {item.label}
                    </div>
                    <div className="text-sm font-display font-bold text-white group-hover:text-white transition-colors duration-300">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Directions CTA */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              id="open-maps-link"
              className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-red-500/20 group"
            >
              <Navigation className="h-4 w-4" />
              Get Directions on Google Maps
              <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition" />
            </a>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-slate-800 shadow-xl min-h-[380px] relative bg-slate-900">
            <iframe
              id="college-map-embed"
              title="Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College Location"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Vennikulam+Polytechnic+College+Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
