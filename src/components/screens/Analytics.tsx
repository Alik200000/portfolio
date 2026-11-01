import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  PiggyBank,
  AlertTriangle,
  ChevronRight,
  TrendingDown,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { BentoCard } from '../ui/Card';
import { CategoryIcon } from '../ui/CategoryIcon';
import { BudgetCategory } from '../../types';
import { initialBudgetCategories } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

interface AnalyticsProps {
  budgetCategories?: BudgetCategory[];
}

export const Analytics: React.FC<AnalyticsProps> = ({
  budgetCategories = initialBudgetCategories,
}) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'this-month' | 'last-month'>('this-month');

  const totalSpent = 3420.0;
  const totalBudget = 4800.0;
  const spentPercent = Math.round((totalSpent / totalBudget) * 100);
  const dailyRemaining = 46.0;

  // Weekly bar data
  const weeklyData = [
    { day: 'Mon', amount: 48, height: 40 },
    { day: 'Tue', amount: 112, height: 75 },
    { day: 'Wed', amount: 64, height: 50 },
    { day: 'Thu', amount: 28, height: 25 },
    { day: 'Fri', amount: 145, height: 95 },
    { day: 'Sat', amount: 92, height: 68 },
    { day: 'Sun', amount: 35, height: 30 },
  ];

  return (
    <div className="pb-28 pt-2 px-5 max-w-md mx-auto w-full">
      {/* Screen Title & Timeframe Selector */}
      <div className="flex items-center justify-between py-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Analytics & Budget
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Smart pacing & bento spending breakdown
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedTimeframe('this-month')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedTimeframe === 'this-month'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            Nov
          </button>
          <button
            type="button"
            onClick={() => setSelectedTimeframe('last-month')}
            className={`px-3 py-1 rounded-full transition-all ${
              selectedTimeframe === 'last-month'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            Oct
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Bento Card 1: Monthly Budget Pace (Span 2) */}
        <BentoCard
          colSpan={2}
          title="Monthly Budget Pace"
          badgeText={`${spentPercent}% Spent`}
          badgePositive={spentPercent < 80}
          stat={`${formatCurrency(totalSpent)} / ${formatCurrency(totalBudget)}`}
          subtitle="You are on track to stay within limit"
        >
          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${spentPercent}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-indigo-600 shadow-xs"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> ${dailyRemaining.toFixed(2)}/day safe to spend
            </span>
            <span>19 days remaining</span>
          </div>

          {/* Mini Weekly Bar Chart */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
            <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              This Week's Activity
            </div>
            <div className="flex items-end justify-between h-20 px-2">
              {weeklyData.map((item, index) => (
                <div key={item.day} className="flex flex-col items-center gap-1.5 flex-1">
                  <div className="w-full max-w-[20px] h-14 bg-slate-100 dark:bg-slate-800 rounded-t-lg relative flex items-end justify-center overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${item.height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`w-full rounded-t-md ${
                        index === 4
                          ? 'bg-indigo-600'
                          : 'bg-slate-300 dark:bg-slate-600 hover:bg-indigo-400 transition-colors'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Bento Card 2: Top Expense Category (Span 1) */}
        <BentoCard
          colSpan={1}
          icon={<UtensilsCrossed className="w-4 h-4 text-rose-500" />}
          iconBg="bg-rose-50 dark:bg-rose-950/60"
          title="Top Category"
          badgeText="+12%"
          badgePositive={false}
          stat="$842.50"
          subtitle="Dining & Bars (24.6%)"
        >
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            +$85 vs last month
          </div>
        </BentoCard>

        {/* Bento Card 3: Savings Vault (Span 1) */}
        <BentoCard
          colSpan={1}
          icon={<PiggyBank className="w-4 h-4 text-emerald-500" />}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          title="Emergency Vault"
          badgeText="91%"
          badgePositive={true}
          stat="$18,250"
          subtitle="Target: $20,000"
        >
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '91%' }}
              transition={{ duration: 0.7 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </BentoCard>

        {/* Bento Card 4: Categories & Allowances (Span 2) */}
        <BentoCard colSpan={2} title="Categories & Allowances" stat="Budgets Breakdown">
          <div className="space-y-3 mt-1">
            {budgetCategories.map((cat) => {
              const percent = Math.round((cat.spent / cat.allocated) * 100);
              const isOver = percent > 100;
              const isExpanded = expandedCategoryId === cat.id;

              return (
                <div
                  key={cat.id}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/[0.04] p-3 transition-all"
                >
                  <div
                    onClick={() => setExpandedCategoryId(isExpanded ? null : cat.id)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs"
                        style={{
                          backgroundColor: `${cat.color}20`,
                          color: cat.color,
                        }}
                      >
                        <CategoryIcon name={cat.icon} size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                          <span>{cat.name}</span>
                          {isOver && (
                            <span className="flex items-center gap-0.5 text-[10px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/80 px-1.5 py-0.2 rounded-full border border-rose-300/40">
                              <AlertTriangle className="w-3 h-3" /> Over
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {cat.itemsCount} transactions
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div
                          className={`text-xs font-bold tabular-nums ${
                            isOver ? 'text-rose-500' : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {formatCurrency(cat.spent)}
                          <span className="text-[10px] font-normal text-slate-400">
                            {' '}
                            / {formatCurrency(cat.allocated)}
                          </span>
                        </div>
                        <div className="text-[10px] font-semibold text-slate-400">
                          {percent}%
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200/70 dark:bg-slate-700/60 rounded-full h-2 mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percent, 100)}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: isOver ? '#F43F5E' : cat.color,
                        boxShadow: isOver ? '0 0 10px rgba(244, 63, 94, 0.4)' : undefined,
                      }}
                    />
                  </div>

                  {/* Accordion expanded sub-details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-3 pt-2 border-t border-slate-200/60 dark:border-white/[0.06] text-xs"
                      >
                        <div className="flex justify-between py-1 text-slate-500 dark:text-slate-400">
                          <span>Daily average</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            ${(cat.spent / 12).toFixed(2)}/day
                          </span>
                        </div>
                        <div className="flex justify-between py-1 text-slate-500 dark:text-slate-400">
                          <span>Remaining allowance</span>
                          <span
                            className={`font-semibold ${
                              cat.allocated - cat.spent < 0
                                ? 'text-rose-500 font-bold'
                                : 'text-emerald-500'
                            }`}
                          >
                            {formatCurrency(cat.allocated - cat.spent)}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </BentoCard>
      </div>
    </div>
  );
};
