import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Train, Bus, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const VenuePreview: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#0B0F19] text-white relative overflow-hidden bg-tech-grid-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-mono font-medium">
              <Navigation className="h-3.5 w-3.5" />
              <span>VENUE & TRANSIT LOGISTICS</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
              Getting to VENOVATION 26
            </h2>

            <p className="text-slate-400 text-base leading-relaxed">
              The fest is hosted at our state-of-the-art Technology Campus equipped with advanced engineering labs, open auditoriums, EV testing grounds, and high-capacity seminar facilities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-semibold">
                  <Train className="h-4 w-4" />
                  <span>NEAREST RAILWAY</span>
                </div>
                <p className="text-sm font-semibold text-white">City Central Junction</p>
                <p className="text-xs text-slate-400">8.2 km (Approx 20 mins via Metro / Cab)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-semibold">
                  <Bus className="h-4 w-4" />
                  <span>NEAREST BUS TERMINUS</span>
                </div>
                <p className="text-sm font-semibold text-white">Tech Park Express Terminal</p>
                <p className="text-xs text-slate-400">1.5 km (Direct feeder buses every 10 mins)</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link to="/how-to-reach">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowUpRight className="h-4 w-4 ml-1" />}
                >
                  Interactive Route Guide
                </Button>
              </Link>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Central Campus Venue</h3>
                  <p className="text-xs text-slate-400">Bengaluru Technology Corridor, Karnataka</p>
                </div>
                <div className="h-9 w-9 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>

              {/* Styled Mock Map / Route graphic */}
              <div className="rounded-2xl bg-[#080C14] border border-slate-800 p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
                <div className="absolute inset-0 bg-tech-grid-dark opacity-60 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-brand-500/20 text-brand-400 font-mono text-xs border border-brand-500/30">
                    GPS: 12.9716° N, 77.5946° E
                  </span>
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Campuses Connected
                  </span>
                </div>

                <div className="relative z-10 my-4 text-center py-4">
                  <div className="inline-flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/90 border border-brand-500/40 shadow-xl glow-box">
                    <MapPin className="h-8 w-8 text-brand-400 animate-bounce mb-2" />
                    <span className="font-display font-extrabold text-sm text-white">VENOVATION 26 AUDITORIUM</span>
                    <span className="text-[11px] text-slate-400">Main Campus Entry Gate 2</span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Parking: Free for Participants</span>
                  <span>Helpdesk: Block A</span>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-brand-400" />
                  <span>Transport Support: +91 98765 43212</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
