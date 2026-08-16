import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { storageService } from '../../lib/storage';
import { Registration, Department, Program } from '../../types';
import { exportToCSV, exportToExcel } from '../../lib/exportUtils';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const AdminRegistrationsPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected registration for modal detail view
  const [viewRegistration, setViewRegistration] = useState<Registration | null>(null);

  // Delete confirm modal
  const [deleteTarget, setDeleteTarget] = useState<Registration | null>(null);

  useEffect(() => {
    async function loadData() {
      const [regs, depts, progs] = await Promise.all([
        storageService.getRegistrations(),
        storageService.getDepartments(),
        storageService.getPrograms(),
      ]);
      setRegistrations(regs);
      setDepartments(depts);
      setPrograms(progs);
      setLoading(false);
    }
    loadData();
  }, []);

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      // Dept filter
      if (selectedDept !== 'all' && r.selected_department_id !== selectedDept) {
        return false;
      }
      // Program filter
      if (selectedProgram !== 'all' && r.program_id !== selectedProgram) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'all' && r.gender !== selectedGender) {
        return false;
      }
      // Participation type
      if (selectedType !== 'all' && r.participation_type !== selectedType) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = r.full_name.toLowerCase().includes(q);
        const matchId = r.registration_id.toLowerCase().includes(q);
        const matchEmail = r.email.toLowerCase().includes(q);
        const matchPhone = r.phone.includes(q);
        const matchCollege = r.college_name.toLowerCase().includes(q);
        const matchProg = r.program_name.toLowerCase().includes(q);
        const matchTeam = (r.team_name || '').toLowerCase().includes(q);

        if (!matchName && !matchId && !matchEmail && !matchPhone && !matchCollege && !matchProg && !matchTeam) {
          return false;
        }
      }
      return true;
    });
  }, [registrations, selectedDept, selectedProgram, selectedGender, selectedType, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage) || 1;
  const paginatedRegistrations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRegistrations.slice(start, start + itemsPerPage);
  }, [filteredRegistrations, currentPage, itemsPerPage]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await storageService.deleteRegistration(deleteTarget.registration_id);
    setRegistrations((prev) => prev.filter((r) => r.registration_id !== deleteTarget.registration_id));
    setDeleteTarget(null);
  };

  const handleExportFilteredCSV = () => {
    const prefix = selectedDept !== 'all' ? `VENOVATION26-${selectedDept.toUpperCase()}-Registrations` : 'VENOVATION26-Registrations';
    exportToCSV(filteredRegistrations, prefix);
  };

  const handleExportFilteredExcel = () => {
    const prefix = selectedDept !== 'all' ? `VENOVATION26-${selectedDept.toUpperCase()}-Registrations` : 'VENOVATION26-Registrations';
    exportToExcel(filteredRegistrations, prefix);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Registration Records
          </h1>
          <p className="text-xs text-slate-400">
            Total {registrations.length} registered candidates across all engineering streams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleExportFilteredCSV}
            variant="outline"
            size="sm"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:text-white text-xs"
            leftIcon={<Download className="h-3.5 w-3.5 mr-1 text-brand-400" />}
          >
            Export CSV ({filteredRegistrations.length})
          </Button>

          <Button
            onClick={handleExportFilteredExcel}
            variant="primary"
            size="sm"
            className="font-bold text-xs shadow-md shadow-brand-500/20"
            leftIcon={<FileSpreadsheet className="h-3.5 w-3.5 mr-1" />}
          >
            Export Excel (.xlsx)
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        {/* Live Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by participant name, Reg ID, email, phone, college, or team name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* Dept Filter */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
              Fest Stream
            </label>
            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name.split(' ')[0]} ({d.code})
                </option>
              ))}
            </select>
          </div>

          {/* Program Filter */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
              Event / Program
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Events</option>
              {programs
                .filter((p) => selectedDept === 'all' || p.department_id === selectedDept)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Participation Type Filter */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
              Participation Mode
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Modes</option>
              <option value="Individual">Individual</option>
              <option value="Team">Team</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
              Gender
            </label>
            <select
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Registrations Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Registration ID</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Email & Phone</th>
                <th className="py-3.5 px-4">College</th>
                <th className="py-3.5 px-4">Event Track</th>
                <th className="py-3.5 px-4">Mode</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    Loading registration database...
                  </td>
                </tr>
              ) : paginatedRegistrations.length > 0 ? (
                paginatedRegistrations.map((reg) => (
                  <tr key={reg.registration_id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-400">
                      {reg.registration_id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {reg.full_name}
                      <span className="block text-[10px] text-slate-500 font-normal">
                        {reg.gender} &bull; {reg.department}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      <div>{reg.email}</div>
                      <div className="text-slate-500">{reg.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-[160px] truncate" title={reg.college_name}>
                      {reg.college_name}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-200 block truncate max-w-[180px]" title={reg.program_name}>
                        {reg.program_name}
                      </span>
                      <span className="text-[10px] font-mono text-brand-400">
                        Dept: {reg.selected_department_id.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                          reg.participation_type === 'Team'
                            ? 'bg-brand-950 text-brand-400 border border-brand-800/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {reg.participation_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {new Date(reg.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewRegistration(reg)}
                          title="View Full Registration Details"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(reg)}
                          title="Delete Registration"
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No registrations match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <strong className="text-white">{filteredRegistrations.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
            <strong className="text-white">{Math.min(currentPage * itemsPerPage, filteredRegistrations.length)}</strong> of{' '}
            <strong className="text-white">{filteredRegistrations.length}</strong> results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-xs text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: VIEW REGISTRATION DETAILS */}
      {viewRegistration && (
        <Modal
          isOpen={Boolean(viewRegistration)}
          onClose={() => setViewRegistration(null)}
          title={`Candidate Profile: ${viewRegistration.registration_id}`}
          subtitle="Complete attendee registration record"
          maxWidth="2xl"
        >
          <div className="space-y-6 text-slate-800 text-sm">
            {/* Header info */}
            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-brand-600 uppercase font-bold">Registration Pass ID</span>
                <div className="font-mono text-xl font-black text-brand-700">{viewRegistration.registration_id}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-semibold">
                Status: {viewRegistration.status}
              </span>
            </div>

            {/* Student & Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Student Name</span>
                <p className="font-bold text-slate-900">{viewRegistration.full_name}</p>
                <p className="text-xs text-slate-500">Gender: {viewRegistration.gender}</p>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Contact Details</span>
                <p className="text-xs font-mono text-slate-800">{viewRegistration.email}</p>
                <p className="text-xs font-mono text-slate-800">{viewRegistration.phone}</p>
              </div>
            </div>

            {/* College & Department */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">College / Institute</span>
                <p className="font-semibold text-slate-900">{viewRegistration.college_name}</p>
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Branch & Semester</span>
                <p className="text-slate-800">{viewRegistration.department} &bull; {viewRegistration.course || 'B.Tech'}</p>
                <p className="text-xs text-slate-500">{viewRegistration.semester}</p>
              </div>
            </div>

            {/* Event & Team */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-mono text-brand-600 uppercase font-bold">Registered Event</span>
              <div className="font-display font-bold text-base text-slate-950">{viewRegistration.program_name}</div>
              <div className="text-xs text-slate-600">
                Department: {viewRegistration.selected_department_id.toUpperCase()} &bull; Mode: {viewRegistration.participation_type}
              </div>

              {viewRegistration.participation_type === 'Team' && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-1 text-xs">
                  <p className="font-bold text-slate-900">
                    Team: {viewRegistration.team_name || 'N/A'} (Leader: {viewRegistration.team_leader})
                  </p>
                  {viewRegistration.team_members && viewRegistration.team_members.length > 0 && (
                    <p className="text-slate-600">
                      Roster: {viewRegistration.team_members.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="text-xs text-slate-600 space-y-1 pt-1">
              <span className="font-mono text-slate-400 uppercase">Postal Address</span>
              <p>{viewRegistration.address}, {viewRegistration.district || ''}, {viewRegistration.state || ''} - {viewRegistration.pincode}</p>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: DELETE CONFIRMATION */}
      {deleteTarget && (
        <Modal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          title="Confirm Registration Deletion"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to delete registration{' '}
              <strong className="text-slate-900 font-mono">{deleteTarget.registration_id}</strong> (
              {deleteTarget.full_name})? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                onClick={() => setDeleteTarget(null)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                variant="danger"
                size="sm"
                className="font-bold"
              >
                Yes, Delete Record
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
