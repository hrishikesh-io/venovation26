import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  sublabel,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 transition-all duration-500 ease-out hover:-translate-y-2.5 hover:scale-[1.02] hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/35 cursor-pointer ${className}`}
    >
      {/* Same Unified Catchy Electric Blue Gradient Overlay for cursor in */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] via-[#0047E0] to-[#002FA7] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 pointer-events-none" />

      {/* Subtle tech grid on hover */}
      <div className="absolute inset-0 bg-tech-grid opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        {/* Top: Icon + Status */}
        <div className="flex items-center justify-between">
          {icon && (
            <div className="rounded-2xl p-3 bg-brand-50 text-brand-600 border border-brand-100 shadow-sm transition-all duration-500 ease-out group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 group-hover:rotate-6 group-hover:scale-110">
              {icon}
            </div>
          )}
          <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-white/80 transition-colors duration-300">
            // METRIC
          </span>
        </div>

        {/* Heading with Number on the SAME LINE */}
        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-display text-4xl sm:text-5xl font-black tracking-tight text-slate-950 transition-all duration-300 group-hover:text-white whitespace-nowrap">
              {number}
            </span>
            <span className="font-display text-base sm:text-lg font-bold tracking-wide uppercase text-slate-700 transition-colors duration-300 group-hover:text-white whitespace-nowrap">
              {label}
            </span>
          </div>

          {sublabel && (
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-sans transition-colors duration-300 group-hover:text-white/85">
              {sublabel}
            </p>
          )}
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 h-8 w-8 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-300">
        <div className="absolute bottom-[-10px] right-[-10px] h-6 w-6 border-b-2 border-r-2 border-brand-500 group-hover:border-white transition-colors duration-300"></div>
      </div>
    </div>
  );
};
