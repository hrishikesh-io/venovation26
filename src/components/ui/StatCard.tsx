import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  variant?: 'light' | 'dark' | 'electric';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  sublabel,
  icon,
  variant = 'light',
  className = '',
}) => {
  const variantStyles = {
    light: 'bg-white border-slate-200/80 text-slate-900 shadow-sm hover:border-brand-300',
    dark: 'bg-[#0F1626] border-slate-800 text-white shadow-xl hover:border-brand-500/40',
    electric: 'bg-gradient-to-br from-brand-500 to-brand-700 border-brand-400 text-white shadow-lg shadow-brand-500/20',
  };

  const numberColors = {
    light: 'text-slate-950 group-hover:text-brand-600',
    dark: 'text-white group-hover:text-brand-400',
    electric: 'text-white',
  };

  const labelColors = {
    light: 'text-slate-600',
    dark: 'text-slate-300',
    electric: 'text-brand-100',
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-300 ${numberColors[variant]}`}>
            {number}
          </div>
          <div className={`mt-2 font-display text-base sm:text-lg font-semibold tracking-wide uppercase ${labelColors[variant]}`}>
            {label}
          </div>
          {sublabel && (
            <p className="mt-1 text-xs text-slate-400 font-sans">
              {sublabel}
            </p>
          )}
        </div>
        {icon && (
          <div className={`rounded-xl p-3 ${variant === 'dark' ? 'bg-slate-800/80 text-brand-400' : variant === 'electric' ? 'bg-white/10 text-white' : 'bg-brand-50 text-brand-600'}`}>
            {icon}
          </div>
        )}
      </div>

      {/* Futuristic corner accent */}
      <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-brand-500"></div>
      </div>
    </div>
  );
};
