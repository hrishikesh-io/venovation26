import React from 'react';
import { Link } from 'react-router-dom';
import { Program } from '../../types';
import { ProgramCard } from '../programs/ProgramCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface FeaturedProgramsProps {
  programs: Program[];
}

export const FeaturedPrograms: React.FC<FeaturedProgramsProps> = ({ programs }) => {
  // Select 4 highlight events
  const featured = programs.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 text-xs font-mono font-medium mb-3">
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span>COMPETITION SPOTLIGHT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Featured Flagship Events
            </h2>
            <p className="text-slate-600 text-base max-w-xl mt-2">
              High-intensity hackathons, robotics arenas, EV powertrains, and structural stress tests. Register now to secure your spot.
            </p>
          </div>

          <Link to="/programs">
            <Button
              variant="outline"
              size="md"
              className="font-semibold"
              rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
            >
              Explore All 20+ Programs
            </Button>
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};
