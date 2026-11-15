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
    <section className="py-20 sm:py-28 bg-[#0A0D16] border-t border-slate-800 relative overflow-hidden text-white">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Heading in ONE SAME LINE */}
        <div className="mb-14 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 text-red-400 text-xs font-mono font-medium border border-red-500/25">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>04 SPECIALIZED STREAMS</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white whitespace-nowrap">
            Participating Departments
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Select your domain of passion. Explore flagship hackathons, CAD relays, design sprints, and hardware arenas across our 4 core engineering branches.
          </p>
        </div>

        {/* 4 Cards Grid with the EXACT SAME Unified Cursor In/Out Color Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, idx) => (
            <Link
              key={dept.id}
              to={`/programs?dept=${dept.id}`}
              className="group relative rounded-3xl bg-[#0F1322] border border-slate-800 p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer"
            >
              {/* Same Unified Catchy Electric Blue Gradient Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

              {/* Subtle tech grid on hover */}
              <div className="absolute inset-0 bg-tech-grid opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                    {getIcon(dept.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-400 group-hover:text-white/80 transition-colors duration-300">
                    STREAM 0{idx + 1}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 group-hover:text-white/80 transition-colors duration-300">
                    {dept.code}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-white mt-0.5">
                    {dept.name}
                  </h3>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed transition-colors duration-300 group-hover:text-white/85">
                  {dept.description}
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-slate-800/80 group-hover:border-white/20 flex items-center justify-between transition-colors duration-300">
                <span className="text-xs font-semibold text-amber-400 group-hover:text-white transition-colors duration-300 flex items-center gap-1.5">
                  <span>View Events</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-white/70 transition-colors duration-300">
                  FLAGSHIP
                </span>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
                <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-amber-500 group-hover:border-white transition-colors duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
