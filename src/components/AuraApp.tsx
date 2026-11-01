import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, X, ExternalLink } from 'lucide-react';
import { Dashboard } from './screens/Dashboard';
import { Analytics } from './screens/Analytics';
import { Cards } from './screens/Cards';
import { BottomNav, ScreenType } from './navigation/BottomNav';
import { AddTransactionSheet } from './modals/AddTransactionSheet';
import {
  initialNetWorth,
  initialTransactions,
  initialCards,
  initialLinkedAccounts,
  initialBudgetCategories,
} from '../data/mockData';
import { Transaction, CardItem, BudgetCategory } from '../types';

interface AuraAppProps {
  onClose?: () => void;
  isModal?: boolean;
}

export function AuraApp({ onClose, isModal = false }: AuraAppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const [isAddSheetOpen, setIsAddSheetOpen] = useState<boolean>(false);
  const [netWorth, setNetWorth] = useState<number>(initialNetWorth);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(initialBudgetCategories);
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  // Keep digital clock live
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}`,
    };

    setTransactions((prev) => [newTx, ...prev]);

    if (newTx.type === 'income') {
      setNetWorth((prev) => prev + newTx.amount);
    } else if (newTx.type === 'expense') {
      setNetWorth((prev) => Math.max(0, prev - newTx.amount));

      setBudgetCategories((prev) =>
        prev.map((cat) => {
          if (
            cat.name.toLowerCase().includes(newTx.category.toLowerCase()) ||
            newTx.category.toLowerCase().includes(cat.name.toLowerCase())
          ) {
            return {
              ...cat,
              spent: cat.spent + newTx.amount,
              itemsCount: cat.itemsCount + 1,
            };
          }
          return cat;
        })
      );
    }
  };

  const handleToggleFreezeCard = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFrozen: !c.isFrozen } : c))
    );
  };

  return (
    <div className={`relative w-full ${isModal ? 'max-w-[410px] h-[720px] sm:h-[820px] max-h-[82vh]' : 'sm:max-w-[430px] sm:h-[890px] h-[100dvh]'} bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 rounded-[32px] sm:rounded-[44px] ring-1 ring-white/10 shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 mx-auto select-none`}>
      {/* Hardware Bezel Gloss */}
      <div className="absolute inset-0 rounded-[32px] sm:rounded-[44px] ring-1 ring-inset ring-white/15 pointer-events-none z-50" />

      {/* Close button if inside modal */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close interactive modal preview"
          className="absolute top-3.5 right-3.5 z-[60] w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-white flex items-center justify-center transition-all backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* 1. Status Bar Header */}
      <div className="w-full pt-3 px-7 pb-1 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 select-none z-40">
        {/* Time */}
        <span className="tabular-nums tracking-tight font-bold">{currentTime}</span>

        {/* Dynamic Island / Notch */}
        <div className="w-24 h-5 bg-black rounded-full shadow-inner flex items-center justify-center gap-1.5 px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-900/40" />
        </div>

        {/* Indicators: 5G, Wifi, Battery */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold">5G</span>
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] tabular-nums font-bold">98%</span>
            <Battery className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 2. Main Content Screens with AnimatePresence */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait">
          {activeScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <Dashboard
                netWorth={netWorth}
                transactions={transactions}
                onOpenAddSheet={() => setIsAddSheetOpen(true)}
                onNavigate={setActiveScreen}
                darkMode={darkMode}
                onToggleTheme={() => setDarkMode(!darkMode)}
              />
            </motion.div>
          )}

          {activeScreen === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <Analytics budgetCategories={budgetCategories} />
            </motion.div>
          )}

          {activeScreen === 'cards' && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <Cards
                cards={cards}
                linkedAccounts={initialLinkedAccounts}
                onToggleFreezeCard={handleToggleFreezeCard}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Floating Bottom Navigation Dock */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        onOpenAddSheet={() => setIsAddSheetOpen(true)}
      />

      {/* 4. Bottom Home Indicator Bar (Apple iOS style) */}
      <div className="w-full flex justify-center pb-2 pt-1 pointer-events-none select-none z-40">
        <div className="w-32 h-1 bg-slate-400/40 dark:bg-white/30 rounded-full" />
      </div>

      {/* 5. Interactive Add Transaction Sheet */}
      <AddTransactionSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
