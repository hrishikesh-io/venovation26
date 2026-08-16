import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { storageService } from '../../lib/storage';
import { Program, Department } from '../../types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';

export const AdminProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  // Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department_id: 'cse',
    category: 'Technical Event',
    description: '',
    rulesText: '',
    date: 'Day 1 (March 24, 2026)',
    time: '10:00 AM - 01:00 PM',
    venue: 'Advanced Engineering Lab',
    max_participants: 50,
    participation_type: 'Individual' as 'Individual' | 'Team',
    min_team_size: 1,
    max_team_size: 1,
    registration_open: true,
    coordinator_name: 'Staff Coordinator',
    coordinator_phone: '+91 98765 43210',
    prize_pool: '₹15,000 + Trophies',
  });

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState<Program | null>(null);

  useEffect(() => {
    async function loadData() {
      const [progs, depts] = await Promise.all([
        storageService.getPrograms(),
        storageService.getDepartments(),
      ]);
      setPrograms(progs);
      setDepartments(depts);
      setLoading(false);
    }
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingProgram(null);
    setFormData({
      id: `prog-${Date.now().toString().slice(-4)}`,
      name: '',
      department_id: departments[0]?.id || 'cse',
      category: 'Technical Event',
      description: '',
      rulesText: 'Rule 1: Adhere to event timeline\nRule 2: Original work required\nRule 3: Judges decision final',
      date: 'Day 1 (March 24, 2026)',
      time: '10:00 AM - 01:00 PM',
      venue: 'Main Campus Lab',
      max_participants: 50,
      participation_type: 'Individual',
      min_team_size: 1,
      max_team_size: 1,
      registration_open: true,
      coordinator_name: 'Department Faculty Lead',
      coordinator_phone: '+91 98765 43210',
      prize_pool: '₹15,000 + Merit Certificates',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prog: Program) => {
    setEditingProgram(prog);
    setFormData({
      id: prog.id,
      name: prog.name,
      department_id: prog.department_id,
      category: prog.category,
      description: prog.description,
      rulesText: prog.rules ? prog.rules.join('\n') : '',
      date: prog.date,
      time: prog.time,
      venue: prog.venue,
      max_participants: prog.max_participants,
      participation_type: prog.participation_type,
      min_team_size: prog.min_team_size || 1,
      max_team_size: prog.max_team_size || 1,
      registration_open: prog.registration_open,
      coordinator_name: prog.coordinator_name || 'Staff Lead',
      coordinator_phone: prog.coordinator_phone || '+91 98765 43210',
      prize_pool: prog.prize_pool || '₹15,000 + Trophies',
    });
    setIsModalOpen(true);
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDept = departments.find((d) => d.id === formData.department_id);
    const parsedRules = formData.rulesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const programPayload: Program = {
      id: formData.id.trim() || `prog-${Date.now()}`,
      name: formData.name.trim(),
      department_id: formData.department_id,
      department_name: selectedDept?.name || 'Engineering',
      category: formData.category,
      description: formData.description.trim(),
      rules: parsedRules,
      date: formData.date.trim(),
      time: formData.time.trim(),
      venue: formData.venue.trim(),
      max_participants: Number(formData.max_participants),
      current_registrations: editingProgram ? editingProgram.current_registrations : 0,
      participation_type: formData.participation_type,
      min_team_size: Number(formData.min_team_size),
      max_team_size: Number(formData.max_team_size),
      registration_open: formData.registration_open,
      coordinator_name: formData.coordinator_name.trim(),
      coordinator_phone: formData.coordinator_phone.trim(),
      prize_pool: formData.prize_pool.trim(),
      created_at: editingProgram?.created_at || new Date().toISOString(),
    };

    let updatedPrograms: Program[];
    if (editingProgram) {
      updatedPrograms = programs.map((p) => (p.id === editingProgram.id ? programPayload : p));
    } else {
      updatedPrograms = [programPayload, ...programs];
    }

    setPrograms(updatedPrograms);
    await storageService.savePrograms(updatedPrograms);
    setIsModalOpen(false);
  };

  const handleDeleteProgram = async () => {
    if (!deleteTarget) return;
    const updated = programs.filter((p) => p.id !== deleteTarget.id);
    setPrograms(updated);
    await storageService.savePrograms(updated);
    setDeleteTarget(null);
  };

  const toggleProgramRegistration = async (programId: string) => {
    const updated = programs.map((p) =>
      p.id === programId ? { ...p, registration_open: !p.registration_open } : p
    );
    setPrograms(updated);
    await storageService.savePrograms(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Program Management
          </h1>
          <p className="text-xs text-slate-400">
            Create, edit, toggle registrations, or configure event limits.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          variant="primary"
          size="sm"
          className="font-bold shadow-md shadow-brand-500/20"
          leftIcon={<Plus className="h-4 w-4 mr-1" />}
        >
          Add New Program
        </Button>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-950 text-brand-400 border border-brand-800/40 text-[10px] font-mono">
                  {prog.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  {prog.department_name.split(' ')[0]}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-white line-clamp-1">
                {prog.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {prog.description}
              </p>

              <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-brand-400" />
                  <span>{prog.date} &bull; {prog.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-brand-400" />
                  <span className="truncate">{prog.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3 w-3 text-brand-400" />
                  <span>Cap: {prog.max_participants} ({prog.participation_type})</span>
                </div>
              </div>
            </div>

            {/* Program Control Row */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              {/* Registration Toggle Switch */}
              <button
                type="button"
                onClick={() => toggleProgramRegistration(prog.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition ${
                  prog.registration_open
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                    : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                }`}
              >
                {prog.registration_open ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Open</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    <span>Closed</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(prog)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                  title="Edit Program"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(prog)}
                  className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition"
                  title="Delete Program"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT PROGRAM MODAL */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProgram ? 'Edit Program Details' : 'Create New Fest Program'}
          subtitle="Configure event specifications, prizes, venue and rules"
          maxWidth="2xl"
        >
          <form onSubmit={handleSaveProgram} className="space-y-4 text-slate-800 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Program / Event Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CodeStorm 24-Hour Hackathon"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Department *
                </label>
                <select
                  value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="Technical Event">Technical Event</option>
                  <option value="Coding">Coding / Hackathon</option>
                  <option value="Innovation Challenge">Innovation Challenge</option>
                  <option value="Paper Presentation">Paper Presentation</option>
                  <option value="CAD/Design">CAD / Design</option>
                  <option value="Circuit Challenge">Circuit Challenge</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Quiz">Quiz</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Overview of the event and challenges"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Event Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Event Time
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Venue / Lab
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Max Participants
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.max_participants}
                  onChange={(e) => setFormData({ ...formData, max_participants: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Participation Mode
                </label>
                <select
                  value={formData.participation_type}
                  onChange={(e) => setFormData({ ...formData, participation_type: e.target.value as 'Individual' | 'Team' })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Prize Pool Description
                </label>
                <input
                  type="text"
                  value={formData.prize_pool}
                  onChange={(e) => setFormData({ ...formData, prize_pool: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Rules & Evaluation (One rule per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.rulesText}
                  onChange={(e) => setFormData({ ...formData, rulesText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Faculty / Student Coordinator
                </label>
                <input
                  type="text"
                  value={formData.coordinator_name}
                  onChange={(e) => setFormData({ ...formData, coordinator_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Coordinator Phone
                </label>
                <input
                  type="text"
                  value={formData.coordinator_phone}
                  onChange={(e) => setFormData({ ...formData, coordinator_phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="font-bold"
              >
                Save Program Specifications
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <Modal
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          title="Delete Program"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to remove <strong className="text-slate-900">{deleteTarget.name}</strong> from VENOVATION 26?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button onClick={() => setDeleteTarget(null)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button onClick={handleDeleteProgram} variant="danger" size="sm">
                Delete Program
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
