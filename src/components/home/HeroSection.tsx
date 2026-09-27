import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, MapPin, Terminal, Zap, Shield, Trophy, Flame } from 'lucide-react';
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

            {/* Main Headline with Fest Day & SPARK */}
            <div className="space-y-3">
              {/* College name – subtle above headline */}
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                <p className="text-xs sm:text-sm font-mono text-slate-500 tracking-wide uppercase">
                  Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College
                </p>
              </div>

              {/* VENOVATION 26 in one straight line + badges */}
              <div className="flex flex-col xl:flex-row xl:items-center gap-3 sm:gap-4 pt-1">
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-slate-950 leading-none inline-flex items-baseline flex-wrap gap-x-3 sm:gap-x-4">
                  <span>VENOVATION</span>
                  <span className="text-brand-500">26.</span>
                </h1>

                {/* Right-side badges */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Fest Day badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 shadow-md text-white">
                    <Calendar className="h-4 w-4 text-brand-400 shrink-0" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Fest Days</span>
                      <span className="text-xs sm:text-sm font-display font-bold text-white whitespace-nowrap">Mar 24 · 25, 2026</span>
                    </div>
                  </div>

                  {/* SPARK badge */}
                  <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 border border-amber-400/40 shadow-md text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-[shimmer_2.5s_ease_infinite] pointer-events-none" />
                    <Flame className="h-4 w-4 text-white shrink-0 animate-pulse" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-mono text-amber-100/80 uppercase tracking-widest">Theme</span>
                      <span className="text-xs sm:text-sm font-display font-bold text-white whitespace-nowrap">SPARK '26</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                <span>Vennikulam, Pathanamthitta, Kerala</span>
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
                  {/* SPARK theme highlight */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 to-orange-950/40 border border-amber-800/40">
                    <div className="flex items-center justify-between text-xs text-amber-500 font-mono mb-2">
                      <span>THEME // SPARK 2026</span>
                      <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-black tracking-wide text-white uppercase">
                      INNOVATION BEYOND LIMITS
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono text-amber-400/70">Ignite · Create · Innovate</span>
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

                  {/* Fest Day info */}
                  <div className="p-3.5 rounded-xl bg-brand-950/50 border border-brand-900/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-brand-500/70 uppercase tracking-wider">Fest Days</div>
                        <div className="text-lg font-display font-extrabold text-brand-400">24 &amp; 25 March 2026</div>
                      </div>
                      <Calendar className="h-8 w-8 text-brand-600/50" />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 font-mono">Vennikulam, Pathanamthitta, Kerala</div>
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
