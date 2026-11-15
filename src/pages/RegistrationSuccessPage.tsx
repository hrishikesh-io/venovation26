import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Printer,
  Home,
  Copy,
  Check,
  Calendar,
  Clock,
  MapPin,
  Cpu,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Registration } from '../types';
import { storageService } from '../lib/storage';
import { Button } from '../components/ui/Button';

export const RegistrationSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const regId = searchParams.get('id');

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Trigger festive confetti burst with Red, Gold, Blue palette
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#DC2626', '#F59E0B', '#0052FF', '#FFFFFF', '#10B981'],
    });

    async function loadRegistration() {
      // 1. Check session storage first
      const sessionPass = sessionStorage.getItem('latest_registration_pass');
      if (sessionPass) {
        try {
          const parsed = JSON.parse(sessionPass);
          if (!regId || parsed.registration_id === regId) {
            setRegistration(parsed);
            setLoading(false);
            return;
          }
        } catch {
          // ignore
        }
      }

      // 2. Lookup in data layer
      if (regId) {
        const all = await storageService.getRegistrations();
        const found = all.find((r) => r.registration_id === regId);
        if (found) {
          setRegistration(found);
        }
      }
      setLoading(false);
    }

    loadRegistration();
  }, [regId]);

  const handleCopyId = () => {
    if (registration?.registration_id) {
      navigator.clipboard.writeText(registration.registration_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-4 text-center animate-pulse">
        <div className="h-64 bg-slate-900 rounded-3xl" />
      </div>
    );
  }

  // Fallback demo data if opened directly without ID
  const pass: Registration = registration || {
    registration_id: regId || 'VEN26-CS-0042',
    full_name: 'Student Innovator',
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'participant@college.edu',
    address: 'Campus Tech Corridor',
    pincode: '689544',
    college_name: 'Govt. Polytechnic College Vennikulam',
    department: 'Computer Science',
    selected_department_id: 'cse',
    program_id: 'hack-26',
    program_name: 'CodeStorm: 24-Hour Hackathon',
    category: 'Coding',
    participation_type: 'Individual',
    status: 'Confirmed',
    created_at: new Date().toISOString(),
  };

  return (
    <div className="pt-32 pb-24 bg-[#08090E] min-h-screen text-white bg-tech-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Confirmation Message - Single Line Heading */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white whitespace-nowrap">
            Registration Confirmed!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            You are officially registered for <strong className="text-white font-semibold">VENOVATION 26</strong>. Please present this digital pass or printed copy at the event reception.
          </p>
        </div>

        {/* PRINTABLE DIGITAL PASS / RECEIPT CARD */}
        <div
          id="printable-receipt"
          className="rounded-3xl bg-[#0F1322] border-2 border-amber-400 shadow-2xl overflow-hidden mb-8"
        >
          {/* Receipt Top Header */}
          <div className="bg-[#0A0D18] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1">
                  <span>VENOVATION</span>
                  <span className="text-amber-400">26.</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Official Participant Entry Pass
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Registration ID</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-lg font-bold text-amber-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                  {pass.registration_id}
                </span>
                <button
                  onClick={handleCopyId}
                  title="Copy Registration ID"
                  className="no-print p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Receipt Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Details Grid */}
              <div className="md:col-span-8 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Participant Name</span>
                    <p className="font-bold text-white text-base mt-0.5">{pass.full_name}</p>
                    <p className="text-xs text-slate-400 font-mono">{pass.email}</p>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">College / Institute</span>
                    <p className="font-semibold text-white text-sm mt-0.5">{pass.college_name}</p>
                    <p className="text-xs text-slate-400">{pass.department} &bull; {pass.course || 'B.Tech'}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-amber-400 uppercase font-bold">Registered Event</span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {pass.program_name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 font-mono text-xs">
                      Category: {pass.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 font-mono text-xs">
                      Mode: {pass.participation_type}
                    </span>
                  </div>
                </div>

                {pass.participation_type === 'Team' && (
                  <div className="p-3.5 rounded-xl bg-[#14192D] border border-slate-800 space-y-1 text-xs">
                    <div className="font-bold text-amber-400">
                      Team: {pass.team_name || 'Squad Alpha'} (Leader: {pass.team_leader || pass.full_name})
                    </div>
                    {pass.team_members && pass.team_members.length > 0 && (
                      <div className="text-slate-300">
                        Members: {pass.team_members.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right QR Code & Security Stamp */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#14192D] border border-slate-800 text-center">
                <div className="p-3 bg-white rounded-xl shadow-md">
                  <QRCodeSVG
                    value={`VENOVATION26|ID:${pass.registration_id}|NAME:${pass.full_name}|PROG:${pass.program_name}|COLLEGE:${pass.college_name}`}
                    size={130}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <span className="font-mono text-[10px] text-slate-400 uppercase mt-2">
                  Scan at Gate Reception
                </span>
                <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Entry</span>
                </div>
              </div>
            </div>

            {/* Receipt Bottom Meta */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400 shrink-0" />
                <span>March 24-25, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                <span>Central Campus Block</span>
              </div>
              <div className="flex items-center gap-2 sm:justify-end font-mono text-slate-500">
                <span>Issued: {new Date(pass.created_at).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 no-print">
          <Button
            onClick={handlePrint}
            variant="primary"
            size="lg"
            className="font-bold shadow-lg shadow-blue-500/25 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 hover:brightness-110 text-white"
            leftIcon={<Printer className="h-5 w-5 mr-1" />}
          >
            Print Digital Pass
          </Button>

          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="bg-[#14192D] text-slate-200 border-slate-700 hover:text-white hover:border-amber-400"
              leftIcon={<Home className="h-5 w-5 mr-1" />}
            >
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
