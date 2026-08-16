import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Trophy, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { Program } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const isTeam = program.participation_type === 'Team';
  const isFull = (program.current_registrations || 0) >= program.max_participants;

  const getCategoryBadgeVariant = (cat: string) => {
    switch (cat) {
      case 'Coding':
      case 'Innovation Challenge':
        return 'electric';
      case 'Technical Event':
      case 'Circuit Challenge':
        return 'primary';
      case 'Paper Presentation':
      case 'Workshop':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="group rounded-2xl bg-white border border-slate-200/90 hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Banner / Category */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={getCategoryBadgeVariant(program.category)} size="sm">
            {program.category}
          </Badge>

          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            {program.department_name.split(' ')[0]}
          </span>
        </div>

        <Link to={`/programs/${program.id}`}>
          <h3 className="font-display text-xl font-bold text-slate-950 group-hover:text-brand-600 transition line-clamp-2">
            {program.name}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {program.description}
        </p>
      </div>

      {/* Meta Grid */}
      <div className="px-6 py-3 bg-slate-50/60 border-y border-slate-100 text-xs text-slate-600 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="h-3.5 w-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{program.date}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="h-3.5 w-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{program.time}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="h-3.5 w-3.5 text-brand-500 shrink-0" />
          <span className="truncate">{program.venue}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono pt-1">
          <div className="flex items-center gap-1 text-slate-500">
            {isTeam ? <Users className="h-3.5 w-3.5 text-brand-600" /> : <UserCheck className="h-3.5 w-3.5 text-brand-600" />}
            <span>{isTeam ? `Team (${program.min_team_size}-${program.max_team_size})` : 'Individual'}</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-amber-600">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="truncate max-w-[140px]">{program.prize_pool.split('+')[0]}</span>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-1.5 text-xs">
          <span className={`h-2 w-2 rounded-full ${program.registration_open && !isFull ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <span className="font-mono text-[11px] text-slate-600">
            {program.registration_open && !isFull ? 'Seats Open' : 'Registration Full'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/programs/${program.id}`}>
            <Button variant="ghost" size="sm" className="text-xs px-2.5">
              Details
            </Button>
          </Link>

          <Link to={`/register?dept=${program.department_id}&prog=${program.id}`}>
            <Button
              variant={program.registration_open && !isFull ? 'primary' : 'secondary'}
              size="sm"
              disabled={!program.registration_open || isFull}
              className="text-xs px-3.5 font-semibold"
              rightIcon={<ArrowRight className="h-3 w-3" />}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
