import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'electric';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-brand-50 text-brand-700 border-brand-200',
    electric: 'bg-brand-500/10 text-brand-600 border-brand-500/20 font-semibold',
    secondary: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    outline: 'bg-transparent text-slate-600 border-slate-300',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider uppercase font-mono',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3.5 py-1.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
