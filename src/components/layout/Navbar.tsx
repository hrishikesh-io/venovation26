import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Cpu, ShieldAlert } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      {/* Floating iPhone Glass Capsule Container */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-5'
        }`}
      >
        <div
          className={`pointer-events-auto transition-all duration-300 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-4 ${
            scrolled ? 'ios-glass-bar-scrolled scale-[0.995]' : 'ios-glass-bar'
          }`}
        >
          {/* Logo with Apple-Style Clean Hardware Aesthetics */}
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div className="h-9 w-9 rounded-xl bg-slate-950/90 text-white flex items-center justify-center shadow-sm group-hover:scale-105 group-active:scale-95 transition-all duration-200">
              <Cpu className="h-4.5 w-4.5 text-brand-400 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <div className="font-display font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1 leading-none">
                <span>VENOVATION</span>
                <span className="text-brand-500 font-extrabold">26.</span>
              </div>
              <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase mt-0.5">
                GPTC VENNIKULAM
              </span>
            </div>
          </Link>

          {/* Desktop iOS Segmented Control Dock */}
          <nav className="hidden lg:flex items-center gap-1 ios-segmented-dock p-1 rounded-full">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight select-none transition-all duration-200 ${
                    active
                      ? 'ios-segmented-active text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/45 active:scale-95'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Admin Quick Link */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link to="/admin" aria-label="Admin Portal">
              <button
                title="Admin Portal Login"
                className="ios-icon-button h-9 w-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950"
              >
                <ShieldAlert className="h-4 w-4" />
              </button>
            </Link>

            <Link to="/register">
              <button className="ios-button-primary px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 select-none tracking-tight">
                <span>Register</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/register">
              <button className="ios-button-primary px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <span>Register</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ios-icon-button h-8 w-8 rounded-full flex items-center justify-center text-slate-700"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile iOS Style Frosted Glass Sheet */}
      {isOpen && (
        <div className="lg:hidden pointer-events-auto max-w-7xl mx-auto px-4 pt-2.5 animate-in fade-in zoom-in-95 duration-200">
          <div className="ios-glass-bar-scrolled rounded-3xl p-4 shadow-2xl space-y-2.5">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'ios-segmented-active text-slate-950 font-semibold'
                        : 'text-slate-700 hover:bg-white/40 active:scale-[0.98]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    ) : (
                      <span className="text-slate-400 text-xs font-mono">›</span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200/50 flex flex-col gap-2">
              <Link to="/register" className="w-full">
                <button className="ios-button-primary w-full py-2.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-1.5">
                  <span>Register for Events</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Link>

              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono text-slate-600 hover:text-slate-900 transition"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-brand-500" />
                <span>Admin Console</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
