import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Building2,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Cpu,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
    { name: 'Manage Programs', path: '/admin/programs', icon: CalendarCheck },
    { name: 'Departments', path: '/admin/departments', icon: Building2 },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
            <Cpu className="h-4 w-4" />
          </div>
          <span className="font-display font-bold text-base tracking-tight">VENOVATION 26 Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B0F19] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static md:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Admin Header / Logo */}
          <div className="p-6 border-b border-slate-800/80">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-bold text-base tracking-tight text-white flex items-center gap-1">
                  <span>VENOVATION</span>
                  <span className="text-brand-400">26</span>
                </div>
                <div className="text-[10px] font-mono text-brand-400 uppercase tracking-wider">
                  Admin Command
                </div>
              </div>
            </Link>
          </div>

          {/* Database Status Indicator */}
          <div className="mx-4 my-3 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Database className="h-3.5 w-3.5 text-brand-400" />
              <span>Storage Engine</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                isSupabaseConfigured
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                  : 'bg-amber-950 text-amber-300 border border-amber-800/50'
              }`}
            >
              {isSupabaseConfigured ? 'Supabase Live' : 'Local / Hybrid'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 font-mono text-xs font-bold">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">
                {user?.name || 'Administrator'}
              </div>
              <div className="text-[11px] font-mono text-slate-400 truncate">
                {user?.email}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/40 text-xs transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
