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
        <div className="h-8 w-40 bg-slate-800 rounded-lg mb-6" />
        <div className="h-64 bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4 bg-[#08090E] min-h-screen text-white">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-3" />
        <h2 className="font-display text-2xl font-bold text-white whitespace-nowrap">Event Not Found</h2>
        <p className="text-slate-400 text-sm mt-1 mb-6">
          The requested program could not be located in our catalog.
        </p>
        <Link to="/programs">
          <Button variant="primary" className="bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold">
            Back to Programs Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const isTeam = program.participation_type === 'Team';
  const isFull = (program.current_registrations || 0) >= program.max_participants;

  return (
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Share */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to catalog</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F1322] border border-slate-700 text-xs font-semibold text-slate-300 hover:border-amber-400 hover:text-white transition shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5 text-amber-400" />
            <span>{copied ? 'Link Copied!' : 'Share Event'}</span>
          </button>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-[#0F1322] border border-slate-800 p-6 sm:p-10 shadow-xl mb-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-mono font-medium">
                {program.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
                {program.department_name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className={`h-2.5 w-2.5 rounded-full ${program.registration_open && !isFull ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span>{program.registration_open && !isFull ? 'Registration Open' : 'Registration Closed / Full'}</span>
            </div>
          </div>

          <h1 className="relative z-10 font-display text-3xl sm:text-5xl font-black tracking-tight text-white whitespace-nowrap">
            {program.name}
          </h1>

          <p className="relative z-10 text-slate-300 text-base sm:text-lg leading-relaxed">
            {program.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#14192D] border border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blue-400" /> Date
              </span>
              <p className="text-sm font-bold text-white mt-1">{program.date}</p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-blue-400" /> Time
              </span>
              <p className="text-sm font-bold text-white mt-1">{program.time}</p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-amber-400" /> Format
              </span>
              <p className="text-sm font-bold text-white mt-1">
                {isTeam ? `Team (${program.min_team_size}-${program.max_team_size})` : 'Individual'}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <Trophy className="h-3.5 w-3.5 text-amber-400" /> Prize Pool
              </span>
              <p className="text-sm font-bold text-amber-400 mt-1 truncate" title={program.prize_pool}>
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
            <div className="rounded-3xl bg-[#0F1322] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                Competition Rules &amp; Structure
              </h3>

              <div className="space-y-3 pt-2">
                {program.rules && program.rules.length > 0 ? (
                  program.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                      <p className="text-sm text-slate-300 leading-relaxed">{rule}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 italic">
                    Standard fest rules apply. Detailed problem statement will be handed over at venue.
                  </p>
                )}
              </div>
            </div>

            {/* Venue & Location */}
            <div className="rounded-3xl bg-[#0F1322] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-3">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-400" />
                Venue &amp; Reporting
              </h3>
              <p className="text-sm text-slate-300">
                <strong>Reporting Hall:</strong> {program.venue}
              </p>
              <p className="text-xs text-slate-400">
                Please report at least 20 minutes prior to the scheduled start time with your official VENOVATION 26 registration ID.
              </p>
            </div>
          </div>

          {/* Right: Registration Card & Coordinator Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Register Box */}
            <div className="rounded-3xl bg-[#0F1322] text-white p-6 sm:p-7 shadow-xl border border-slate-800 space-y-5">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                  REGISTRATION STATUS
                </span>
                <div className="font-display font-extrabold text-2xl text-white mt-1">
                  {program.registration_open && !isFull ? 'Seats Available' : 'Registration Full'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#14192D] border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Event Fee:</span>
                  <span className="text-emerald-400 font-bold">100% Free Entry</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Team Format:</span>
                  <span className="text-white font-bold">{program.participation_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certification:</span>
                  <span className="text-amber-400 font-bold">Official Digital Credential</span>
                </div>
              </div>

              <Link to={`/register?dept=${program.department_id}&prog=${program.id}`} className="block">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!program.registration_open || isFull}
                  className="w-full font-bold shadow-xl shadow-red-500/25 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white"
                >
                  {program.registration_open && !isFull ? 'Register For Event' : 'Seats Closed'}
                </Button>
              </Link>
            </div>

            {/* Coordinator Contact Card */}
            {program.coordinator_name && (
              <div className="rounded-3xl bg-[#0F1322] border border-slate-800 p-6 shadow-sm space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  Event Coordinator
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">
                      {program.coordinator_name}
                    </h4>
                    <p className="text-xs text-slate-400">{program.department_name}</p>
                  </div>
                </div>

                {program.coordinator_phone && (
                  <div className="pt-2 border-t border-slate-800">
                    <a
                      href={`tel:${program.coordinator_phone}`}
                      className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition"
                    >
                      <Phone className="h-3.5 w-3.5 text-blue-400" />
                      <span>{program.coordinator_phone}</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
