import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, MapPin, Trophy, Flame, Layers } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-tech-grid bg-radial-glow">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8 text-left">
          {/* Top Badges Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 text-xs sm:text-sm font-mono font-medium">
              <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
              <span>ANNUAL NATIONAL TECH FEST &bull; MARCH 2026</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>GPTC VENNIKULAM</span>
            </div>
          </div>

          {/* College Name & Full-Line Main Headline */}
          <div className="space-y-4">
            {/* Host College Name */}
            <div className="flex items-center gap-2 text-slate-500 font-mono text-xs sm:text-sm uppercase tracking-wider">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College</span>
            </div>

            {/* Main Headline (Full Line) + Badges */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-1">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tight text-slate-950 leading-[0.92] select-none">
                VENOVATION <span className="text-brand-500">26.</span>
              </h1>

              {/* Side Floating Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Fest Day badge */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl text-white">
                  <Calendar className="h-5 w-5 text-brand-400 shrink-0" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Fest Days</span>
                    <span className="text-sm sm:text-base font-display font-bold text-white whitespace-nowrap">Mar 24 &bull; 25, 2026</span>
                  </div>
                </div>

                {/* SPARK badge */}
                <div className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 border border-amber-400/40 shadow-xl shadow-amber-500/20 text-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.5s_ease_infinite] pointer-events-none" />
                  <Flame className="h-5 w-5 text-white shrink-0 animate-pulse" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-mono text-amber-100/90 uppercase tracking-widest">Theme</span>
                    <span className="text-sm sm:text-base font-display font-bold text-white whitespace-nowrap">SPARK '26</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitle & Description */}
          <div className="space-y-3 max-w-4xl">
            <p className="text-2xl sm:text-3xl font-display font-bold text-slate-800 tracking-tight">
              Innovation. Technology. Creativity.
            </p>
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed font-sans">
              Experience a celebration of technology, creativity, and engineering excellence where students come together to compete, collaborate, and innovate beyond limits across 4 specialized streams.
            </p>
          </div>

          {/* Meta Chips */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-slate-700 pt-1">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
              <Calendar className="h-4 w-4 text-brand-500" />
              <span>March 24 &bull; 25, 2026</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
              <MapPin className="h-4 w-4 text-brand-500" />
              <span>Vennikulam, Pathanamthitta, Kerala</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span>₹1,50,000+ Prize Pool</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 border border-slate-200 shadow-sm">
              <Layers className="h-4 w-4 text-brand-500" />
              <span>4 Engineering Streams</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/register">
              <Button
                variant="primary"
                size="lg"
                className="font-bold shadow-xl shadow-brand-500/30 group px-8"
                rightIcon={<ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />}
              >
                Register Now
              </Button>
            </Link>

            <Link to="/programs">
              <Button
                variant="outline"
                size="lg"
                className="font-semibold border-slate-300 hover:border-brand-400 px-8"
              >
                Explore Programs &darr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
