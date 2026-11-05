import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Car, Building2, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { Department } from '../../types';

interface DepartmentCardsProps {
  departments: Department[];
}

export const DepartmentCards: React.FC<DepartmentCardsProps> = ({ departments }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="h-6 w-6" />;
      case 'Building2':
        return <Building2 className="h-6 w-6" />;
      case 'Laptop':
        return <Laptop className="h-6 w-6" />;
      case 'Cpu':
      default:
        return <Cpu className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (without the right-side link) */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium mb-3 border border-brand-100">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            <span>04 SPECIALIZED STREAMS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            Participating Departments
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Select your domain of passion. Explore flagship hackathons, CAD relays, design sprints, and hardware arenas across our 4 core engineering branches.
          </p>
        </div>

        {/* 4 Cards Grid with In & Out Smooth Interactive Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="group relative rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] hover:bg-white hover:border-brand-400 hover:shadow-2xl hover:shadow-brand-500/15"
            >
              {/* Top Accent Beam that shines on cursor hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-cyan-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Header Icon + Code */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center text-slate-800 shadow-sm transition-all duration-500 ease-out group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-brand-500/30">
                    {getIcon(dept.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-brand-600 transition-colors duration-300">
                    // {dept.code}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-950 group-hover:text-brand-600 transition-colors duration-300">
                  {dept.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {dept.description}
                </p>
              </div>

              {/* Card Footer with Program Count & View Link */}
              <div className="mt-8 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-slate-500">
                  {dept.programCount ?? 3} Programs
                </span>

                <Link
                  to={`/programs?dept=${dept.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 group-hover:text-brand-700 transition-colors"
                >
                  <span>View Programs</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
