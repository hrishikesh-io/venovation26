import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, Cpu, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@venovation26.com');
  const [password, setPassword] = useState('venovation2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@venovation26.com');
    setPassword('venovation2026');
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white flex items-center justify-center p-4 relative overflow-hidden bg-tech-grid-dark">
      {/* Blue ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="h-12 w-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/30">
              <Cpu className="h-7 w-7" />
            </div>
          </Link>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">
            Admin Command Portal
          </h1>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            VENOVATION 26 &bull; SECURE CONSOLE
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-[#0F1626] border border-slate-800 p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@venovation26.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-1.5">
                Access Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full font-bold shadow-lg shadow-brand-500/25 mt-2"
              rightIcon={<ArrowRight className="h-4 w-4 ml-1" />}
            >
              Authenticate & Enter Console
            </Button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="pt-4 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-brand-400 font-mono font-semibold">
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Demo Admin Credentials</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  admin@venovation26.com / venovation2026
                </div>
              </div>

              <button
                type="button"
                onClick={fillDemoCredentials}
                className="px-2.5 py-1 rounded bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 text-[11px] font-mono transition"
              >
                Auto-fill
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-500 hover:text-slate-300 font-mono transition">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
