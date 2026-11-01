import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'subtle' | 'interactive';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-bento p-5 transition-all duration-200 relative overflow-hidden';

  const variantStyles = {
    default:
      'bg-white dark:bg-aura-surface-dark border border-slate-200/80 dark:border-white/[0.08] shadow-sm',
    glass:
      'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-sm',
    subtle:
      'bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-white/[0.05]',
    interactive:
      'bg-white dark:bg-aura-surface-dark border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 cursor-pointer active:scale-[0.99]',
  }[variant];

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface BentoCardProps {
  title: string;
  subtitle?: string;
  stat: string | React.ReactNode;
  badgeText?: string;
  badgePositive?: boolean;
  colSpan?: 1 | 2;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconBg?: string;
  className?: string;
  onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  subtitle,
  stat,
  badgeText,
  badgePositive = true,
  colSpan = 1,
  children,
  icon,
  iconBg,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-[26px] p-5 
        bg-white dark:bg-slate-900/90 backdrop-blur-xl
        border border-slate-200/80 dark:border-white/[0.08]
        shadow-sm hover:shadow-md transition-shadow
        ${colSpan === 2 ? 'col-span-2' : 'col-span-1'}
        ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''}
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs ${
                iconBg || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {icon}
            </div>
          )}
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </span>
        </div>
        {badgeText && (
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums ${
              badgePositive
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40'
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40'
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 tabular-nums">
        {stat}
      </div>

      {subtitle && (
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {subtitle}
        </div>
      )}

      {children && <div className="mt-3.5">{children}</div>}
    </motion.div>
  );
};
