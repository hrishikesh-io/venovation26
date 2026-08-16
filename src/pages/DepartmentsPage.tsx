import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Car, Building2, Cpu, ArrowRight, Award, Layers } from 'lucide-react';
import { Department, Program } from '../types';
import { storageService } from '../lib/storage';
import { Button } from '../components/ui/Button';

export const DepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [depts, progs] = await Promise.all([
        storageService.getDepartments(),
        storageService.getPrograms(),
      ]);
      setDepartments(depts);
      setPrograms(progs);
      setLoading(false);
    }
    fetchData();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car':
        return <Car className="h-8 w-8" />;
      case 'Building2':
        return <Building2 className="h-8 w-8" />;
      case 'Laptop':
        return <Laptop className="h-8 w-8" />;
      case 'Cpu':
      default:
        return <Cpu className="h-8 w-8" />;
    }
  };

  const getDeptPrograms = (deptId: string) => {
    return programs.filter((p) => p.department_id === deptId);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-mono font-medium">
            <Layers className="h-3.5 w-3.5" />
            <span>ACADEMIC DISCIPLINES & TRACKS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-slate-950">
            Departments
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Explore 4 distinct engineering streams, each running bespoke competitions, live problem statements, and cash award opportunities.
          </p>
        </div>

        {/* Departments Full Breakdown */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {departments.map((dept, index) => {
              const deptProgs = getDeptPrograms(dept.id);
              return (
                <div
                  key={dept.id}
                  id={dept.id}
                  className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Department Info */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/25">
                          {getIcon(dept.icon)}
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-brand-600">
                            STREAM 0{index + 1} &bull; {dept.code}
                          </span>
                          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
                            {dept.name}
                          </h2>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {dept.description}
                      </p>

                      <div className="pt-2 flex items-center gap-3">
                        <Link to={`/programs?dept=${dept.id}`}>
                          <Button
                            variant="primary"
                            size="md"
                            rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
                          >
                            Explore All {deptProgs.length} Events
                          </Button>
                        </Link>

                        <Link to={`/register?dept=${dept.id}`}>
                          <Button variant="outline" size="md">
                            Register For {dept.code}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Program List in this department */}
                    <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                          Key Events Scheduled:
                        </span>
                        <span className="text-xs font-mono text-brand-600 font-semibold">
                          {deptProgs.length} Flagship Tracks
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {deptProgs.map((prog) => (
                          <div
                            key={prog.id}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-4 hover:border-brand-300 transition"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-display font-bold text-sm text-slate-900">
                                  {prog.name}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-600">
                                  {prog.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                {prog.date} &bull; {prog.venue}
                              </p>
                            </div>

                            <Link
                              to={`/programs/${prog.id}`}
                              className="text-xs font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap inline-flex items-center gap-1"
                            >
                              <span>Details</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
