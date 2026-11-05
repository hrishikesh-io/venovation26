import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Lightbulb, Code2, Wrench, Trophy, Users, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: 'Technical Competitions',
      desc: 'Coding marathons, CAD challenges, circuit debugging, and live relays.',
      icon: <Code2 className="h-5 w-5" />,
    },
    {
      title: 'Industry-Led Workshops',
      desc: 'Hands-on training sessions led by seasoned engineering architects.',
      icon: <Wrench className="h-5 w-5" />,
    },
    {
      title: 'Hardware & Software Expo',
      desc: 'Showcase working prototypes, EV mobility models, and smart systems.',
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: '4 Engineering Streams',
      desc: 'Dedicated tracks for CS, Automobile, Civil, and Electronics.',
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      title: '500+ Student Network',
      desc: 'Connect, collaborate, and exchange ideas with peers across Kerala.',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: '₹1.5L+ Cash Prizes & Badges',
      desc: 'Recognized trophies, cash prizes, and verified digital credentials.',
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="space-y-4 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-mono font-medium">
              <Lightbulb className="h-3.5 w-3.5 text-brand-500" />
              <span>THE VISION BEHIND VENOVATION</span>
            </div>

            {/* Heading in ONE SAME LINE */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight">
              Ideas need room <span className="text-brand-500">to grow.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed">
              <strong className="text-slate-900 font-semibold">VENOVATION 26</strong> is the premier college-level technology and innovation festival hosted by <strong>Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College</strong>, Vennikulam. It is designed to bring together students, creators, developers, engineers, and innovators to push boundaries and build the next era of breakthroughs.
            </p>
          </div>

          {/* Highlight Cards Grid — with the EXACT SAME cursor in/out color animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl bg-white border border-slate-200/90 p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 overflow-hidden cursor-pointer"
              >
                {/* Same Unified Catchy Electric Blue Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

                {/* Subtle tech grid on hover */}
                <div className="absolute inset-0 bg-tech-grid opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-5 transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                    {item.icon}
                  </div>

                  <h3 className="font-display font-bold text-slate-950 text-lg sm:text-xl transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-sm mt-2 leading-relaxed transition-colors duration-300 group-hover:text-white/85">
                    {item.desc}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-brand-500 group-hover:border-white transition-colors duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
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
      </div>
    </section>
  );
};
