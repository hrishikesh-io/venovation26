import React from 'react';
import { StatCard } from '../ui/StatCard';
import { Layers, Award, Users, Flame } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      number: '04',
      label: 'Departments',
      sublabel: 'Auto, Civil, CSE & ECE',
      icon: <Layers className="h-6 w-6" />,
      gradient: 'from-[#0052FF] via-[#0066FF] to-[#0039B3]',
      shadowGlow: 'hover:shadow-blue-500/40',
    },
    {
      number: '20+',
      label: 'Programs',
      sublabel: 'Hackathons, Quizzes & Challenges',
      icon: <Award className="h-6 w-6" />,
      gradient: 'from-[#7C3AED] via-[#8B5CF6] to-[#5B21B6]',
      shadowGlow: 'hover:shadow-purple-500/40',
    },
    {
      number: '500+',
      label: 'Participants',
      sublabel: 'From 50+ Top Tech Universities',
      icon: <Users className="h-6 w-6" />,
      gradient: 'from-[#0D9488] via-[#059669] to-[#047857]',
      shadowGlow: 'hover:shadow-emerald-500/40',
    },
    {
      number: '01',
      label: 'Big Innovation Fest',
      sublabel: '48 Hours of Pure Engineering',
      icon: <Flame className="h-6 w-6" />,
      gradient: 'from-[#EA580C] via-[#DC2626] to-[#991B1B]',
      shadowGlow: 'hover:shadow-orange-500/40',
    },
  ];

  return (
    <section className="py-14 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              number={stat.number}
              label={stat.label}
              sublabel={stat.sublabel}
              icon={stat.icon}
              gradient={stat.gradient}
              shadowGlow={stat.shadowGlow}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
