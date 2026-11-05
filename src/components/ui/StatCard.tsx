import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  gradient?: string;
  shadowGlow?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  sublabel,
  icon,
  gradient = 'from-[#0052FF] via-[#0042D0] to-[#0A2E8A]',
  shadowGlow = 'hover:shadow-blue-500/30',
  className = '',
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl ${shadowGlow} ${className}`}
    >
      {/* Catchy Vibrant Gradient Overlay that reveals on cursor enter */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none`}
      />

      {/* Subtle tech grid on hover */}
      <div className="absolute inset-0 bg-tech-grid opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

      {/* Content Container (Layered above gradient) */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          {/* Big Number */}
          <div className="font-display text-4xl sm:text-5xl font-black tracking-tight text-slate-950 transition-all duration-300 group-hover:text-white group-hover:scale-105 origin-left">
            {number}
          </div>

          {/* Label */}
          <div className="mt-2 font-display text-base sm:text-lg font-bold tracking-wide uppercase text-slate-700 transition-colors duration-300 group-hover:text-white">
            {label}
          </div>

          {/* Sublabel */}
          {sublabel && (
            <p className="mt-1 text-xs text-slate-500 font-sans transition-colors duration-300 group-hover:text-white/80">
              {sublabel}
            </p>
          )}
        </div>

        {/* Icon Container */}
        {icon && (
          <div className="rounded-2xl p-3 bg-slate-100 text-slate-700 border border-slate-200/60 shadow-sm transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110">
            {icon}
          </div>
        )}
      </div>

      {/* Futuristic corner accent */}
      <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300">
        <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-brand-500 group-hover:border-white transition-colors duration-300"></div>
      </div>
    </div>
  );
};
