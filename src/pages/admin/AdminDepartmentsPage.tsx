import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Layers,
  Car,
  Laptop,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { storageService } from '../../lib/storage';
import { Department, Program } from '../../types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const AdminDepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    code: '',
    description: '',
    icon: 'Laptop',
    color: '#0052FF',
  });

  useEffect(() => {
    async function loadData() {
      const [depts, progs] = await Promise.all([
        storageService.getDepartments(),
        storageService.getPrograms(),
      ]);
      setDepartments(depts);
      setPrograms(progs);
      setLoading(false);
    }
    loadData();
  }, []);

  const openEditModal = (dept: Department) => {
    setEditingDept(dept);
    setFormData({
      id: dept.id,
      name: dept.name,
      code: dept.code,
      description: dept.description,
      icon: dept.icon,
      color: dept.color,
    });
    setIsModalOpen(true);
  };

  const handleSaveDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;

    const updated = departments.map((d) =>
      d.id === editingDept.id
        ? {
            ...d,
            name: formData.name.trim(),
            code: formData.code.trim().toUpperCase(),
            description: formData.description.trim(),
            icon: formData.icon,
            color: formData.color,
          }
        : d
    );

    setDepartments(updated);
    await storageService.saveDepartments(updated);
    setIsModalOpen(false);
  };

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
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Engineering Streams & Departments
          </h1>
          <p className="text-xs text-slate-400">
            Configure the 4 core disciplines participating in VENOVATION 26.
          </p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => {
          const count = programs.filter((p) => p.department_id === dept.id).length;
          return (
            <div
              key={dept.id}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-brand-500/40 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400">
                      {getIcon(dept.icon)}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-brand-400 uppercase">
                        Stream Code: {dept.code}
                      </span>
                      <h3 className="font-display font-bold text-lg text-white">
                        {dept.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => openEditModal(dept)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                    title="Edit Department"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{count} Registered Events</span>
                <span className="text-emerald-400 font-semibold">Active in Portal</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit Department Details"
          subtitle="Customize stream title, prefix code and academic overview"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveDepartment} className="space-y-4 text-slate-800 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Department Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Prefix Code (2-3 chars)
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Theme Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Laptop">Laptop (CSE)</option>
                  <option value="Car">Car (Automobile)</option>
                  <option value="Building2">Building (Civil)</option>
                  <option value="Cpu">CPU (Electronics)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Department Overview / Description *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="font-bold">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
