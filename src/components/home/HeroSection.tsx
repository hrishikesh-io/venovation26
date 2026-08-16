import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, MapPin, Terminal, Zap, Shield, Trophy } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-tech-grid bg-radial-glow">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs sm:text-sm font-mono font-medium">
              <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
              <span>ANNUAL NATIONAL TECH FEST &bull; MARCH 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-slate-950 leading-[0.95]">
              VENOVATION
              <span className="block text-brand-500 mt-1">26.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-display font-semibold text-slate-800 tracking-tight">
              Innovation. Technology. Creativity.
            </p>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
              Experience a celebration of technology, creativity and innovation where students come together to compete, create, collaborate and inspire beyond boundaries.
            </p>

            {/* Quick Meta Chips */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-700 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200 shadow-sm">
                <Calendar className="h-4 w-4 text-brand-500" />
                <span>March 24 &bull; 25, 2026</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200 shadow-sm">
                <MapPin className="h-4 w-4 text-brand-500" />
                <span>Central Tech Campus, Bengaluru</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200 shadow-sm">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>₹1,50,000+ Prize Pool</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="font-bold shadow-xl shadow-brand-500/30 group"
                  rightIcon={<ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />}
                >
                  Register Now
                </Button>
              </Link>

              <Link to="/programs">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold border-slate-300 hover:border-brand-400"
                >
                  Explore Programs ↓
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Futuristic Tech Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Tech Frame */}
              <div className="relative rounded-3xl bg-slate-950 p-6 sm:p-8 text-white shadow-2xl border border-slate-800 overflow-hidden group">
                {/* Tech grid inside card */}
                <div className="absolute inset-0 bg-tech-grid-dark opacity-40 pointer-events-none" />

                {/* Blue top glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/30 rounded-full blur-3xl" />

                {/* Header terminal status */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs text-slate-400">venovation-v26.sys</span>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-mono text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    PORTAL ACTIVE
                  </span>
                </div>

                {/* Futuristic card core */}
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                      <span>THEME // TAGLINE</span>
                      <Zap className="h-4 w-4 text-brand-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-black tracking-wide text-white uppercase">
                      INNOVATION BEYOND LIMITS
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Departments</div>
                      <div className="text-2xl font-display font-extrabold text-brand-400 mt-1">4 Streams</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">CS &bull; Auto &bull; Civil &bull; ECE</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Certifications</div>
                      <div className="text-2xl font-display font-extrabold text-emerald-400 mt-1">National</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Verified Digital Badges</div>
                    </div>
                  </div>

                  {/* Terminal code snippet preview */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-2 text-brand-400">
                      <Terminal className="h-3.5 w-3.5" />
                      <span>$ init_venovation --year=2026</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      &gt; Loading 12+ technical tracks... [OK]
                    </p>
                    <p className="text-emerald-400 text-[11px]">
                      &gt; Registration nodes live worldwide.
                    </p>
                  </div>
                </div>

                {/* Floating micro-badge */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-brand-400" />
                    <span>Official College Tech Fest</span>
                  </div>
                  <span className="font-mono text-brand-400">#VEN26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
