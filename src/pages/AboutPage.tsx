import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck, Sparkles, ArrowRight, Zap, Code2, Wrench, Building, Cpu } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: <Code2 className="h-6 w-6 text-amber-400 group-hover:text-white" />,
      title: 'Digital Disruption',
      desc: 'Advancing beyond classical software engineering into decentralized ledgers, autonomic intelligence, and ultra-low-latency computing.',
    },
    {
      icon: <Wrench className="h-6 w-6 text-amber-400 group-hover:text-white" />,
      title: 'Mobility & Power Dynamics',
      desc: 'Reimagining electric powertrains, regenerative dynamics, structural aerodynamics, and safety-critical vehicle mechanics.',
    },
    {
      icon: <Building className="h-6 w-6 text-amber-400 group-hover:text-white" />,
      title: 'Resilient Infrastructure',
      desc: 'Architecting carbon-neutral structures, BIM-driven smart urbanization, and advanced composite materials capable of enduring natural forces.',
    },
    {
      icon: <Cpu className="h-6 w-6 text-amber-400 group-hover:text-white" />,
      title: 'Next-Gen Silicon & Robotics',
      desc: 'Pioneering micro-controller telemetry, high-frequency signal processing, autonomous navigation, and embedded edge systems.',
    },
  ];

  const guidelines = [
    'Open to all undergraduate and postgraduate engineering, polytechnic, and technology students across India.',
    'Participants must carry their valid College ID card and their VENOVATION 26 Digital Registration Pass.',
    'Teams can be interdisciplinary for designated open events (such as Hackathons and Innovation Challenges).',
    'Official certificates will be awarded to all participants, with grand cash prizes and trophies for winners.',
    'Food, refreshment stalls, high-speed Wi-Fi, and 24-hour hackathon lab facilities will be provided on campus.',
  ];

  return (
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Single Line Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>ABOUT VENOVATION 26</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white whitespace-nowrap">
            Ideas need room to grow.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            VENOVATION 26 is the annual flagship innovation and technology festival engineered to unite the brightest minds, aspiring engineers, and creative builders to solve real-world problems.
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0F1322] border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Our Mission</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To foster a culture of cross-disciplinary innovation where technical theory meets real hardware and software execution. We empower student innovators to build prototypes that can transition from college labs into viable commercial patents and startups.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0F1322] text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/25 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To establish VENOVATION as the benchmark technology summit for emerging engineers across the nation — bridging academia, high-growth tech enterprises, and fearless student experimentation.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence - With Unified Electric Blue Hover */}
        <div className="my-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white whitespace-nowrap">
              The Four Pillars of Venovation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
              Every challenge, hackathon, and exhibition is rooted in these four domains of fundamental engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden p-6 rounded-3xl bg-[#0F1322] border border-slate-800 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer space-y-3"
              >
                {/* Unified Electric Blue Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110">
                    {p.icon}
                  </div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-white transition-colors">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white/85 leading-relaxed transition-colors">{p.desc}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                  <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="my-16 p-8 sm:p-12 rounded-3xl bg-[#0F1322] border border-slate-800 shadow-xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>FEST PROTOCOLS &amp; GUIDELINES</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-6">
              Participation &amp; Code of Conduct
            </h3>
            <div className="space-y-4">
              {guidelines.map((g, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm sm:text-base text-slate-300">{g}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Ready to show what you've got?
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white font-bold px-8"
                rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
              >
                Register Now
              </Button>
            </Link>
            <Link to="/programs">
              <Button
                variant="outline"
                size="lg"
                className="bg-[#14192D] text-slate-200 border-slate-700 hover:text-white hover:border-amber-400 px-8"
              >
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
