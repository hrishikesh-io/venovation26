import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Programs', path: '/programs' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'How to Reach', path: '/how-to-reach' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500">
      {/* Subtle ambient liquid backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-16 bg-gradient-to-r from-brand-500/10 via-cyan-400/15 to-brand-500/10 blur-2xl pointer-events-none -z-10 animate-liquid-glow" />

      {/* Main Nav Wrapper */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          scrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-6'
        }`}
      >
        <div
          className={`pointer-events-auto transition-all duration-500 rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 ${
            scrolled
              ? 'liquid-glass-nav-scrolled shadow-2xl shadow-brand-500/10 scale-[0.99]'
              : 'liquid-glass-nav'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo with Liquid Pod */}
            <Link to="/" className="flex items-center gap-3 group relative select-none">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-400 opacity-30 blur-sm group-hover:opacity-75 transition duration-500" />
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-slate-950 flex items-center justify-center text-brand-400 shadow-md group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <Cpu className="h-5 w-5 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="font-display font-black text-lg sm:text-xl tracking-tight text-slate-950 flex items-center gap-1 leading-none">
                  <span>VENOVATION</span>
                  <span className="text-brand-500 font-extrabold group-hover:text-cyan-500 transition-colors">
                    26.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                    GPTC VENNIKULAM
                  </span>
                  <span className="inline-block h-1 w-1 rounded-full bg-brand-500 animate-ping" />
                </div>
              </div>
            </Link>

            {/* Desktop Liquid Dock Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 liquid-dock px-2 py-1 rounded-full">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-300 select-none ${
                      active
                        ? 'liquid-pill-active text-brand-600 font-semibold shadow-sm'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/60 hover:scale-[1.03]'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.name}
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-sm shadow-brand-500" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action & Admin Quick Link */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/admin" aria-label="Admin Portal">
                <button
                  title="Admin Portal Login"
                  className="h-10 w-10 rounded-xl liquid-dock flex items-center justify-center text-slate-500 hover:text-brand-600 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
                >
                  <ShieldAlert className="h-4 w-4" />
                </button>
              </Link>

              <Link to="/register">
                <button className="liquid-button-cta px-5 py-2.5 rounded-xl sm:rounded-full text-xs xl:text-sm font-bold text-white flex items-center gap-2 group select-none active:scale-95">
                  <span>Register Now</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
            </div>

            {/* Mobile Actions & Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/register">
                <button className="liquid-button-cta px-3.5 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold text-white flex items-center gap-1 shadow-sm active:scale-95">
                  <span>Register</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl liquid-dock text-slate-700 hover:text-slate-950 hover:bg-white active:scale-95 transition-all"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Liquid Glass Drawer */}
      {isOpen && (
        <div className="lg:hidden pointer-events-auto max-w-7xl mx-auto px-4 sm:px-6 pt-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="liquid-glass-nav-scrolled rounded-3xl p-5 shadow-2xl border border-white/80 space-y-3">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'liquid-pill-active text-brand-600 font-semibold'
                        : 'text-slate-700 hover:bg-white/70 hover:text-slate-950'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active ? (
                      <span className="h-2 w-2 rounded-full bg-brand-500 shadow-sm" />
                    ) : (
                      <span className="text-slate-400 text-xs font-mono">→</span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2.5">
              <Link to="/register" className="w-full">
                <button className="liquid-button-cta w-full py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-md">
                  <span>Register for Events Now</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Link>

              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 py-2 rounded-xl liquid-dock text-xs font-mono text-slate-600 hover:text-slate-950 transition"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-brand-500" />
                <span>Admin Command Console</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
