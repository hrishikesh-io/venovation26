import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Car, Building2, Cpu, ArrowRight } from 'lucide-react';
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
    <section className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium mb-3">
              <span>04 SPECIALIZED STREAMS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Participating Departments
            </h2>
            <p className="text-slate-600 text-base max-w-xl mt-2">
              Select your domain of passion. Explore flagship hackathons, CAD relays, design sprints, and hardware arenas.
            </p>
          </div>

          <Link
            to="/departments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Explore All 4 Stream Specs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="group relative rounded-2xl bg-[#F8FAFC] border border-slate-200/90 p-6 sm:p-7 transition-all duration-300 hover:bg-white hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon + Code */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-300 shadow-sm">
                    {getIcon(dept.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-brand-600 transition">
                    // {dept.code}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-950 group-hover:text-brand-600 transition">
                  {dept.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {dept.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-slate-500">
                  {dept.programCount ?? 3} Programs
                </span>

                <Link
                  to={`/programs?dept=${dept.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:text-brand-700 transition"
                >
                  <span>View Programs</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
