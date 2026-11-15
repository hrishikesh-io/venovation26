import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06080E] text-white pt-16 pb-12 border-t border-slate-800 relative overflow-hidden bg-tech-grid-dark">
      {/* Subtle ambient glow in background - Red & Blue */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-96 h-32 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/3 translate-x-1/2 w-96 h-32 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-500 to-blue-600 p-[1px] shadow-lg shadow-red-500/25">
                <div className="h-full w-full rounded-[11px] bg-[#0A0D18] flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-1">
                  <span>VENOVATION</span>
                  <span className="text-amber-400">26.</span>
                </div>
                <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">
                  SPARK • Innovation Beyond Limits
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              VENOVATION 26 is the annual tech fest of <strong className="text-slate-300">Mahakavi Vennikulam Gopalakurup Memorial Govt. Polytechnic College</strong>, Vennikulam — uniting creators, engineers, and innovators across CS, Auto, Civil, and ECE.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-400/50 hover:bg-amber-500/10 transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-400/50 hover:bg-amber-500/10 transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-400/50 hover:bg-amber-500/10 transition"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-amber-400/50 hover:bg-amber-500/10 transition"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">About Fest</Link>
              </li>
              <li>
                <Link to="/programs" className="text-slate-400 hover:text-white transition">Departments &amp; Programs</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-slate-400 hover:text-white transition">Timeline Schedule</Link>
              </li>
              <li>
                <Link to="/how-to-reach" className="text-slate-400 hover:text-white transition">How to Reach</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Departments */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Departments
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/programs?dept=cse" className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1">
                  Computer Science
                </Link>
              </li>
              <li>
                <Link to="/programs?dept=auto" className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1">
                  Automobile Engineering
                </Link>
              </li>
              <li>
                <Link to="/programs?dept=civil" className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1">
                  Civil Engineering
                </Link>
              </li>
              <li>
                <Link to="/programs?dept=ece" className="text-slate-400 hover:text-amber-400 transition flex items-center gap-1">
                  Electronics &amp; Comm
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/register" className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1">
                  Online Registration
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-slate-200 mb-4">
              Fest Helpdesk
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>Vennikulam Poly, CM37+4JG, Eraviperoor - Vennikulam Rd,<br/>Vennikulam, Pathanamthitta, Kerala – 689 544</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="mailto:info@venovation26.edu" className="hover:text-white transition">
                  info@venovation26.edu
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition">
                  +91 98765 43210 / 11
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 VENOVATION 26. All Rights Reserved. Built for technology innovators.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-slate-300 transition">
              Staff / Admin Portal
            </Link>
            <Link to="/about" className="hover:text-slate-300 transition">
              Guidelines &amp; Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
