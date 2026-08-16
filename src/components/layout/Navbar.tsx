import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Cpu, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-md">
              <Cpu className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="font-display font-black text-xl tracking-tight text-slate-950 flex items-center gap-1">
                <span>VENOVATION</span>
                <span className="text-brand-500 font-extrabold">26.</span>
              </div>
              <span className="text-[10px] tracking-widest font-mono text-slate-500 uppercase -mt-1">
                Tech Fest
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-100/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/70">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-white text-brand-600 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action & Admin Quick Link */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admin">
              <button
                title="Admin Portal"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
              >
                <ShieldAlert className="h-5 w-5" />
              </button>
            </Link>

            <Link to="/register">
              <Button
                variant="primary"
                size="md"
                className="font-semibold px-6 shadow-md hover:shadow-brand-500/30"
                rightIcon={<ArrowUpRight className="h-4 w-4 ml-0.5" />}
              >
                Register Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/register">
              <Button variant="primary" size="sm" className="font-semibold">
                Register
              </Button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl px-6 py-6 transition-all duration-300 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium transition ${
                  isActive(link.path)
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link to="/register" className="w-full">
                <Button variant="primary" size="lg" className="w-full">
                  Register Now →
                </Button>
              </Link>
              <Link
                to="/admin"
                className="flex items-center justify-center gap-2 py-2 text-xs font-mono text-slate-500 hover:text-slate-800"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Admin Portal Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
