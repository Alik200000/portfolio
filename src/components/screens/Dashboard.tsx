import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  ArrowUpRight,
  Plus,
  ArrowLeftRight,
  BarChart3,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { CategoryIcon } from '../ui/CategoryIcon';
import { Transaction } from '../../types';
import { ScreenType } from '../navigation/BottomNav';
import { formatCurrency } from '../../utils/formatters';

interface DashboardProps {
  netWorth: number;
  transactions: Transaction[];
  onOpenAddSheet: () => void;
  onNavigate: (screen: ScreenType) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  netWorth,
  transactions,
  onOpenAddSheet,
  onNavigate,
  darkMode,
  onToggleTheme,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'expense' | 'income'>('all');
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('November 2026');

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (selectedFilter === 'all') return true;
    return tx.type === selectedFilter;
  });

  // Group transactions
  const groupedTransactions: Record<string, Transaction[]> = {};
  filteredTransactions.forEach((tx) => {
    const groupName = tx.group || 'Today';
    if (!groupedTransactions[groupName]) {
      groupedTransactions[groupName] = [];
    }
    groupedTransactions[groupName].push(tx);
  });

  const periods = ['November 2026', 'October 2026', 'Q3 2026', 'Year to Date'];

  return (
    <div className="pb-28 pt-2 px-5 max-w-md mx-auto w-full">
      {/* 1. Top Bar Header */}
      <header className="flex items-center justify-between py-3 mb-4">
        {/* User avatar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 p-[2px] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="User Profile"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback initials
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Welcome back
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Elena Rostova
            </span>
          </div>
        </div>

        {/* Center: Period Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPeriodDropdownOpen(!periodDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors focus:outline-none"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          <AnimatePresence>
            {periodDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 py-1.5 z-30"
              >
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPeriod(p);
                      setPeriodDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      selectedPeriod === p
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right actions: Theme & Notifications */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>
        </div>
      </header>

      {/* 2. Hero Wealth Overview */}
      <section className="my-6 text-center">
        <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 tracking-widest block mb-1">
          Total Net Worth
        </span>
        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white my-1 tabular-nums">
          <AnimatedCounter value={netWorth} />
        </div>

        {/* Proactive Copilot-style Delta Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold tabular-nums shadow-xs">
          <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+$3,842.15 (+3.08%) this month</span>
        </div>
      </section>

      {/* 3. Quick Action Pill Buttons */}
      <section className="grid grid-cols-4 gap-2.5 my-6">
        {/* Send */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onOpenAddSheet}
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 dark:bg-black/10">
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-bold">Send</span>
        </motion.button>

        {/* + Add (Hero Action) */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onOpenAddSheet}
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-bold">Add</span>
        </motion.button>

        {/* Transfer */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={onOpenAddSheet}
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
            <ArrowLeftRight className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-bold">Transfer</span>
        </motion.button>

        {/* Insights / Analytics */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => onNavigate('analytics')}
          className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
            <BarChart3 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-bold">Insights</span>
        </motion.button>
      </section>

      {/* 4. Recent Transactions Feed */}
      <section className="mt-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Activity
            </h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 tabular-nums">
              {transactions.length}
            </span>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-full text-[11px]">
            {(['all', 'expense', 'income'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-2.5 py-1 rounded-full font-semibold capitalize transition-all ${
                  selectedFilter === filter
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Transaction List */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.02 },
            },
          }}
          className="space-y-4"
        >
          {Object.keys(groupedTransactions).length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs font-medium">
              No transactions found in this category.
            </div>
          ) : (
            Object.entries(groupedTransactions).map(([group, items]) => (
              <div key={group}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
                  {group}
                </div>
                <div className="space-y-2">
                  {items.map((tx) => (
                    <motion.div
                      key={tx.id}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/15 transition-all shadow-xs"
                    >
                      {/* Left: Category Icon */}
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs"
                          style={{
                            backgroundColor: `${tx.categoryColor}18`,
                            color: tx.categoryColor,
                          }}
                        >
                          <CategoryIcon name={tx.categoryIcon} size={20} className="w-5 h-5" />
                        </div>

                        {/* Middle info */}
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                            {tx.merchant}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <span>{tx.category}</span>
                            <span>•</span>
                            <span>{tx.account}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right amount */}
                      <div className="text-right flex-shrink-0">
                        <div
                          className={`text-sm font-bold tabular-nums ${
                            tx.type === 'income'
                              ? 'text-emerald-500 dark:text-emerald-400'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {tx.type === 'income' ? '+' : '-'}
                          {formatCurrency(tx.amount)}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">
                          {tx.date}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </section>
    </div>
  );
};
