import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Lightbulb, Code2, Wrench, Trophy, Users, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: 'Technical Competitions',
      desc: 'Coding marathons, CAD challenges, circuit debugging, and live relays.',
      icon: <Code2 className="h-5 w-5 text-brand-500" />,
    },
    {
      title: 'Industry-Led Workshops',
      desc: 'Hands-on training sessions led by seasoned engineering architects.',
      icon: <Wrench className="h-5 w-5 text-brand-500" />,
    },
    {
      title: 'Hardware & Software Expo',
      desc: 'Showcase working prototypes, EV mobility models, and smart systems.',
      icon: <Sparkles className="h-5 w-5 text-brand-500" />,
    },
    {
      title: '4 Engineering Streams',
      desc: 'Dedicated tracks for CS, Automobile, Civil, and Electronics.',
      icon: <CheckCircle2 className="h-5 w-5 text-brand-500" />,
    },
    {
      title: '500+ Student Network',
      desc: 'Connect, collaborate, and exchange ideas with peers across Kerala.',
      icon: <Users className="h-5 w-5 text-brand-500" />,
    },
    {
      title: '₹1.5L+ Cash Prizes & Badges',
      desc: 'Recognized trophies, cash prizes, and verified digital credentials.',
      icon: <Trophy className="h-5 w-5 text-brand-500" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-mono font-medium">
              <Lightbulb className="h-3.5 w-3.5 text-brand-500" />
              <span>THE VISION BEHIND VENOVATION</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              Ideas need room <br className="hidden sm:inline" />
              <span className="text-brand-500">to grow.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed">
              <strong className="text-slate-900 font-semibold">VENOVATION 26</strong> is the premier college-level technology and innovation festival hosted by <strong>Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College</strong>, Vennikulam. It is designed to bring together students, creators, developers, engineers, and innovators to push boundaries and build the next era of breakthroughs.
            </p>
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white border border-slate-200/90 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-300 hover:-translate-y-1"
              >
                <div className="h-10 w-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
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
