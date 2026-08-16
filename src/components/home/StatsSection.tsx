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
      variant: 'light' as const,
    },
    {
      number: '20+',
      label: 'Programs',
      sublabel: 'Hackathons, Quizzes & Challenges',
      icon: <Award className="h-6 w-6" />,
      variant: 'light' as const,
    },
    {
      number: '500+',
      label: 'Participants',
      sublabel: 'From 50+ Top Tech Universities',
      icon: <Users className="h-6 w-6" />,
      variant: 'light' as const,
    },
    {
      number: '01',
      label: 'Big Innovation Fest',
      sublabel: '48 Hours of Pure Engineering',
      icon: <Flame className="h-6 w-6" />,
      variant: 'dark' as const,
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              number={stat.number}
              label={stat.label}
              sublabel={stat.sublabel}
              icon={stat.icon}
              variant={stat.variant}
              className="tech-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
