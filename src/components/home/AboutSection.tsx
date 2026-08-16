import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Lightbulb, Compass, Share2, Rocket } from 'lucide-react';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  const highlights = [
    'Participate in state-of-the-art technical competitions and hackathons',
    'Attend hands-on workshops led by seasoned industry architects',
    'Showcase innovative final-year hardware and software prototypes',
    'Compete across four dedicated engineering department tracks',
    'Network with 500+ aspiring tech leaders and researchers',
    'Explore emerging AI, EV mobility, and smart city technologies',
    'Win cash prize pools, trophies, and verified merit credentials',
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-mono font-medium">
              <Lightbulb className="h-3.5 w-3.5 text-brand-500" />
              <span>THE VISION BEHIND VENOVATION</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.05]">
              Ideas need room <br className="hidden sm:inline" />
              <span className="text-brand-500">to grow.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              <strong className="text-slate-900 font-semibold">VENOVATION 26</strong> is a college-level technology and innovation festival designed to bring together students, creators, developers, engineers, and innovators to push boundaries and build the next era of technological breakthroughs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-1" />
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link to="/about">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
                >
                  Read Fest Philosophy
                </Button>
              </Link>

              <Link to="/schedule">
                <Button variant="outline" size="md">
                  View Timeline Schedule
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Abstract Technology Split Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-brand-400">PILLARS OF EXCELLENCE</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-start gap-3">
                    <Compass className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-white text-base">Real-World Problem Solving</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Competitions modeled after live industrial use-cases across engineering streams.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-start gap-3">
                    <Share2 className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-white text-base">Cross-Disciplinary Synergy</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Collaborative tracks where computer scientists work alongside automobile and civil builders.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>VENOVATION &bull; 2026 EDITION</span>
                  <span className="text-emerald-400">ADMISSIONS OPEN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
