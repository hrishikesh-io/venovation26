import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Phone,
  User,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Program } from '../types';
import { storageService } from '../lib/storage';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchProgram() {
      if (!id) return;
      const prog = await storageService.getProgramById(id);
      if (prog) {
        setProgram(prog);
      }
      setLoading(false);
    }
    fetchProgram();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 animate-pulse">
        <div className="h-8 w-40 bg-slate-200 rounded-lg mb-6" />
        <div className="h-64 bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-3" />
        <h2 className="font-display text-2xl font-bold text-slate-900">Event Not Found</h2>
        <p className="text-slate-600 text-sm mt-1 mb-6">
          The requested program could not be located in our catalog.
        </p>
        <Link to="/programs">
          <Button variant="primary">Back to Programs Catalog</Button>
        </Link>
      </div>
    );
  }

  const isTeam = program.participation_type === 'Team';
  const isFull = (program.current_registrations || 0) >= program.max_participants;

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Share */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to catalog</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-brand-400 hover:text-brand-600 transition shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Event'}</span>
          </button>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-sm mb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="electric" size="md">
                {program.category}
              </Badge>
              <Badge variant="secondary" size="md">
                {program.department_name}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className={`h-2.5 w-2.5 rounded-full ${program.registration_open && !isFull ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span>{program.registration_open && !isFull ? 'Registration Open' : 'Registration Closed / Full'}</span>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            {program.name}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {program.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-brand-500" /> Date
              </span>
              <p className="text-sm font-bold text-slate-900 mt-1">{program.date}</p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-brand-500" /> Time
              </span>
              <p className="text-sm font-bold text-slate-900 mt-1">{program.time}</p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-brand-500" /> Format
              </span>
              <p className="text-sm font-bold text-slate-900 mt-1">
                {isTeam ? `Team (${program.min_team_size}-${program.max_team_size})` : 'Individual'}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5 text-amber-500" /> Prize Pool
              </span>
              <p className="text-sm font-bold text-amber-600 mt-1 truncate" title={program.prize_pool}>
                {program.prize_pool}
              </p>
            </div>
          </div>
        </div>

        {/* Grid: Rules & Registration CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Detailed Rules & Venue */}
          <div className="lg:col-span-8 space-y-6">
            {/* Rules & Guidelines */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-display text-xl font-bold text-slate-950 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-500" />
                Competition Rules & Structure
              </h3>

              <div className="space-y-3 pt-2">
                {program.rules && program.rules.length > 0 ? (
                  program.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0 mt-1" />
                      <p className="text-sm text-slate-700 leading-relaxed">{rule}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    Standard fest rules apply. Detailed problem statement will be handed over at venue.
                  </p>
                )}
              </div>
            </div>

            {/* Venue & Location */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-3">
              <h3 className="font-display text-xl font-bold text-slate-950 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-500" />
                Venue & Reporting
              </h3>
              <p className="text-sm text-slate-700">
                <strong>Reporting Hall:</strong> {program.venue}
              </p>
              <p className="text-xs text-slate-500">
                Please report at least 20 minutes prior to the scheduled start time with your official VENOVATION 26 registration ID.
              </p>
            </div>
          </div>

          {/* Right: Registration Card & Coordinator Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Register Box */}
            <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-7 shadow-xl border border-slate-800 space-y-5">
              <div>
                <span className="text-[11px] font-mono text-brand-400 uppercase tracking-wider">
                  REGISTRATION STATUS
                </span>
                <div className="font-display font-extrabold text-2xl text-white mt-1">
                  {program.registration_open && !isFull ? 'Seats Available' : 'Closed'}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Capacity: {program.max_participants} participants max
                </div>
              </div>

              <Link
                to={`/register?dept=${program.department_id}&prog=${program.id}`}
                className="block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!program.registration_open || isFull}
                  className="w-full font-bold shadow-lg shadow-brand-500/30"
                >
                  Register For Event →
                </Button>
              </Link>

              <p className="text-[11px] text-slate-400 text-center font-mono">
                ✓ Free Registration &bull; Instant Digital Receipt Pass
              </p>
            </div>

            {/* Coordinator Info */}
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-sm space-y-3">
              <h4 className="font-display font-bold text-sm text-slate-950 uppercase tracking-wider">
                Event Lead Coordinator
              </h4>
              <div className="flex items-center gap-3 pt-1">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{program.coordinator_name}</div>
                  <div className="text-xs text-slate-500 font-mono">{program.department_name.split(' ')[0]} Faculty Lead</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${program.coordinator_phone}`}
                  className="inline-flex items-center gap-2 text-xs font-mono text-brand-600 hover:text-brand-700"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{program.coordinator_phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
