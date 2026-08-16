import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  Building,
  TrendingUp,
  Download,
  FileSpreadsheet,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { storageService } from '../../lib/storage';
import { Registration, StatsOverview, Program, Department } from '../../types';
import { exportToCSV, exportToExcel } from '../../lib/exportUtils';
import { Button } from '../../components/ui/Button';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<StatsOverview>({
    totalRegistrations: 0,
    automobileRegistrations: 0,
    civilRegistrations: 0,
    computerScienceRegistrations: 0,
    electronicsRegistrations: 0,
    totalPrograms: 0,
    todayRegistrations: 0,
    totalColleges: 0,
  });

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      const [statsData, regs, progs] = await Promise.all([
        storageService.getStats(),
        storageService.getRegistrations(),
        storageService.getPrograms(),
      ]);
      setStats(statsData);
      setRegistrations(regs);
      setPrograms(progs);
      setLoading(false);
    }
    loadDashboardData();
  }, []);

  const total = stats.totalRegistrations || 1;
  const csPercent = Math.round((stats.computerScienceRegistrations / total) * 100);
  const autoPercent = Math.round((stats.automobileRegistrations / total) * 100);
  const civilPercent = Math.round((stats.civilRegistrations / total) * 100);
  const ecPercent = Math.round((stats.electronicsRegistrations / total) * 100);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>CENTRAL METRICS & ANALYTICS</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Command Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time enrollment telemetry, department quotas, and participant data.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => exportToCSV(registrations)}
            variant="outline"
            size="sm"
            className="bg-slate-800/80 border-slate-700 text-slate-200 hover:text-white"
            leftIcon={<Download className="h-4 w-4 mr-1 text-brand-400" />}
          >
            Export CSV
          </Button>

          <Button
            onClick={() => exportToExcel(registrations)}
            variant="primary"
            size="sm"
            className="font-bold shadow-md shadow-brand-500/25"
            leftIcon={<FileSpreadsheet className="h-4 w-4 mr-1" />}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-xl shadow-brand-900/40 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-100">Total Enrollments</span>
            <Users className="h-5 w-5 text-brand-200" />
          </div>
          <div className="font-display text-4xl font-black tracking-tight mt-3">
            {stats.totalRegistrations}
          </div>
          <div className="text-xs text-brand-100 mt-2 font-mono">
            Across 4 Engineering Streams
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Today's New Regs</span>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="font-display text-4xl font-black tracking-tight mt-3 text-emerald-400">
            +{stats.todayRegistrations}
          </div>
          <div className="text-xs text-slate-400 mt-2 font-mono">
            Active in last 24 hours
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Active Programs</span>
            <Calendar className="h-5 w-5 text-brand-400" />
          </div>
          <div className="font-display text-4xl font-black tracking-tight mt-3 text-brand-400">
            {stats.totalPrograms}
          </div>
          <div className="text-xs text-slate-400 mt-2 font-mono">
            Live technical tracks
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Colleges Represented</span>
            <Building className="h-5 w-5 text-amber-400" />
          </div>
          <div className="font-display text-4xl font-black tracking-tight mt-3 text-amber-400">
            {stats.totalColleges}
          </div>
          <div className="text-xs text-slate-400 mt-2 font-mono">
            Institutes across India
          </div>
        </div>
      </div>

      {/* Grid: Department Distribution Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Distribution Breakdown */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white">
              Enrollments by Department
            </h3>
            <span className="text-xs font-mono text-slate-400">Live Quotas</span>
          </div>

          <div className="space-y-4">
            {/* Computer Science */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Computer Science & Engineering</span>
                <span className="font-mono text-brand-400 font-bold">
                  {stats.computerScienceRegistrations} ({csPercent}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(csPercent, 4)}%` }}
                />
              </div>
            </div>

            {/* Automobile */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Automobile Engineering</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {stats.automobileRegistrations} ({autoPercent}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(autoPercent, 4)}%` }}
                />
              </div>
            </div>

            {/* Civil */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Civil Engineering</span>
                <span className="font-mono text-indigo-400 font-bold">
                  {stats.civilRegistrations} ({civilPercent}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(civilPercent, 4)}%` }}
                />
              </div>
            </div>

            {/* Electronics */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Electronics & Communication</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {stats.electronicsRegistrations} ({ecPercent}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(ecPercent, 4)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Management Links */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h3 className="font-display font-bold text-lg text-white">
            Quick Operations
          </h3>

          <div className="space-y-3">
            <Link
              to="/admin/registrations"
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-brand-400 transition">
                    Manage Registrations
                  </div>
                  <div className="text-[11px] text-slate-400">Search, filter & verify attendees</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-brand-400 transition" />
            </Link>

            <Link
              to="/admin/programs"
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition">
                    Configure Programs
                  </div>
                  <div className="text-[11px] text-slate-400">Create, edit, or close seat quotas</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition" />
            </Link>

            <Link
              to="/admin/departments"
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-brand-500/50 flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Building className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition">
                    Department Setup
                  </div>
                  <div className="text-[11px] text-slate-400">Customize stream headers & descriptions</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Registrations Table Sneak-Peek */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              Recent Registrations
            </h3>
            <p className="text-xs text-slate-400">Latest 5 enrollments submitted to portal</p>
          </div>

          <Link
            to="/admin/registrations"
            className="text-xs font-mono font-semibold text-brand-400 hover:text-brand-300 hover:underline"
          >
            View All ({registrations.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Reg ID</th>
                <th className="py-3 px-4">Participant Name</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {registrations.slice(0, 5).map((reg) => (
                <tr key={reg.registration_id} className="hover:bg-slate-900/50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-brand-400">
                    {reg.registration_id}
                  </td>
                  <td className="py-3 px-4 font-medium text-white">
                    {reg.full_name}
                  </td>
                  <td className="py-3 px-4 text-slate-400 truncate max-w-[180px]">
                    {reg.college_name}
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    {reg.program_name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[10px]">
                      {reg.participation_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">
                    {new Date(reg.created_at).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
