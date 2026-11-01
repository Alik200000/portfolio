import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, PieChart, CreditCard, Plus } from 'lucide-react';

export type ScreenType = 'dashboard' | 'analytics' | 'cards';

interface BottomNavProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenAddSheet: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  onOpenAddSheet,
}) => {
  const tabs = [
    {
      id: 'dashboard' as ScreenType,
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      id: 'analytics' as ScreenType,
      label: 'Analytics',
      icon: PieChart,
    },
    {
      id: 'cards' as ScreenType,
      label: 'Cards',
      icon: CreditCard,
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 max-w-md mx-auto px-5 pb-6 pt-2 pointer-events-none">
      <div className="relative pointer-events-auto flex items-center justify-between px-3 py-2 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-black/30">
        {/* Left tabs */}
        <div className="flex items-center gap-1">
          {tabs.slice(0, 2).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreen === tab.id;

            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => onNavigate(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 38,
                    }}
                    className="absolute inset-0 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/50 dark:border-indigo-400/20"
                  />
                )}
                <Icon className="w-4 h-4 z-10 stroke-[2.2]" />
                <span className="z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Center Quick Add Action Button */}
        <motion.button
          whileTap={{ scale: 0.88, rotate: 45 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          onClick={onOpenAddSheet}
          aria-label="Add Transaction"
          className="relative -my-1 w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 hover:bg-indigo-500 active:bg-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span className="absolute -inset-0.5 rounded-full border border-white/25 pointer-events-none animate-pulse opacity-40" />
        </motion.button>

        {/* Right Tab: Cards */}
        <div className="flex items-center gap-1">
          {tabs.slice(2).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeScreen === tab.id;

            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => onNavigate(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 38,
                    }}
                    className="absolute inset-0 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/50 dark:border-indigo-400/20"
                  />
                )}
                <Icon className="w-4 h-4 z-10 stroke-[2.2]" />
                <span className="z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
