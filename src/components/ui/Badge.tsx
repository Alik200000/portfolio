import React from 'react';

export interface BadgeProps {
  variant?: 'positive' | 'negative' | 'warning' | 'brand' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'positive',
  size = 'md',
  children,
  className = '',
  icon,
}) => {
  const sizeStyles = {
    sm: 'text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide',
    md: 'text-xs font-semibold px-2.5 py-1 rounded-full tracking-normal',
  }[size];

  const variantStyles = {
    positive:
      'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs shadow-emerald-500/10',
    negative:
      'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50 shadow-xs shadow-rose-500/10',
    warning:
      'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/50 shadow-xs shadow-amber-500/10',
    brand:
      'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/50 shadow-xs shadow-indigo-500/10',
    neutral:
      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 tabular-nums ${sizeStyles} ${variantStyles} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
