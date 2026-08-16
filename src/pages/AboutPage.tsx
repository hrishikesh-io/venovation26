import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Target, Trophy, Users, ShieldCheck, Sparkles, ArrowRight, Zap, Code2, Wrench, Building, Cpu } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      icon: <Code2 className="h-6 w-6 text-brand-500" />,
      title: 'Digital Disruption',
      desc: 'Advancing beyond classical software engineering into decentralized ledgers, autonomic intelligence, and ultra-low-latency computing.',
    },
    {
      icon: <Wrench className="h-6 w-6 text-brand-500" />,
      title: 'Mobility & Power Dynamics',
      desc: 'Reimagining electric powertrains, regenerative dynamics, structural aerodynamics, and safety-critical vehicle mechanics.',
    },
    {
      icon: <Building className="h-6 w-6 text-brand-500" />,
      title: 'Resilient Infrastructure',
      desc: 'Architecting carbon-neutral structures, BIM-driven smart urbanization, and advanced composite materials capable of enduring natural forces.',
    },
    {
      icon: <Cpu className="h-6 w-6 text-brand-500" />,
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
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ABOUT VENOVATION 26</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-950">
            Ideas need room <br />
            <span className="text-brand-500">to grow.</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            VENOVATION 26 is the annual flagship innovation and technology festival engineered to unite the brightest minds, aspiring engineers, and creative builders to solve real-world problems.
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-950">Our Mission</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To foster a culture of cross-disciplinary innovation where technical theory meets real hardware and software execution. We empower student innovators to build prototypes that can transition from college labs into viable commercial patents and startups.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Our Vision</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              To establish VENOVATION as the benchmark technology summit for emerging engineers across the nation—bridging academia, high-growth tech enterprises, and fearless student experimentation.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="my-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950">
              The Four Pillars of Venovation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
              Every challenge, hackathon, and exhibition is rooted in these four domains of fundamental engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-brand-500 hover:shadow-lg transition space-y-3"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center">
                  {p.icon}
                </div>
                <h4 className="font-display font-bold text-lg text-slate-950">{p.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="my-16 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-brand-600 font-mono text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>FEST PROTOCOLS & GUIDELINES</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-6">
              Participation & Code of Conduct
            </h3>
            <div className="space-y-3">
              {guidelines.map((g, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="h-5 w-5 rounded-full bg-brand-50 text-brand-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm sm:text-base text-slate-700">{g}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4">
            Ready to show your engineering prowess?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="font-bold">
                Register for Events Now →
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="outline" size="lg">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
