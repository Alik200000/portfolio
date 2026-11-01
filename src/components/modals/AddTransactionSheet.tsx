import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet } from '../ui/Sheet';
import { Numpad } from '../ui/Numpad';
import { CategoryIcon } from '../ui/CategoryIcon';
import { Transaction, TransactionType } from '../../types';
import { categoriesList } from '../../data/mockData';
import { CheckCircle2 } from 'lucide-react';

interface AddTransactionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const AddTransactionSheet: React.FC<AddTransactionSheetProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [activeType, setActiveType] = useState<TransactionType>('expense');
  const [rawAmount, setRawAmount] = useState<string>('0');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoriesList[0].id);
  const [merchantNote, setMerchantNote] = useState<string>('');
  const [showSuccessGlow, setShowSuccessGlow] = useState<boolean>(false);

  // Parse amount into number
  const parsedAmount = parseFloat(rawAmount) || 0;

  const handleDigit = (digit: string) => {
    if (digit === '.') {
      if (!rawAmount.includes('.')) {
        setRawAmount((prev) => (prev === '0' ? '0.' : prev + '.'));
      }
      return;
    }

    if (rawAmount.includes('.')) {
      const parts = rawAmount.split('.');
      if (parts[1] && parts[1].length >= 2) {
        return; // max 2 decimal places
      }
    }

    if (rawAmount === '0') {
      setRawAmount(digit);
    } else {
      if (rawAmount.length < 9) {
        setRawAmount((prev) => prev + digit);
      }
    }
  };

  const handleBackspace = () => {
    if (rawAmount.length <= 1) {
      setRawAmount('0');
    } else {
      setRawAmount((prev) => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    setRawAmount('0');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (parsedAmount <= 0) return;

    const matchedCat = categoriesList.find((c) => c.id === selectedCategory) || categoriesList[0];
    const defaultMerchant =
      merchantNote.trim() ||
      (activeType === 'income'
        ? 'Incoming Wire Transfer'
        : activeType === 'transfer'
        ? 'Internal Vault Transfer'
        : `${matchedCat.name} Purchase`);

    onAddTransaction({
      merchant: defaultMerchant,
      category: matchedCat.name,
      categoryIcon: matchedCat.icon,
      amount: parsedAmount,
      type: activeType,
      date: 'Just now',
      group: 'Today',
      account: 'Titanium •• 9842',
      status: 'completed',
      categoryColor: matchedCat.color,
    });

    // Flash success
    setShowSuccessGlow(true);
    setTimeout(() => {
      setShowSuccessGlow(false);
      setRawAmount('0');
      setMerchantNote('');
      onClose();
    }, 450);
  };

  // Keyboard support for desktop/accessibility
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit();
        }
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.') {
        handleDigit('.');
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, rawAmount, merchantNote, activeType, selectedCategory, parsedAmount]);

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="New Transaction">
      <div className="flex flex-col items-center w-full">
        {/* Segmented Type Switcher */}
        <div className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-800/90 w-full max-w-[320px] mb-4">
          {(['expense', 'income', 'transfer'] as TransactionType[]).map((type) => {
            const isActive = activeType === type;
            const labels: Record<TransactionType, string> = {
              expense: 'Expense',
              income: 'Income',
              transfer: 'Transfer',
            };

            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setActiveType(type);
                  if (type === 'income') {
                    setSelectedCategory('Income');
                  }
                }}
                className={`relative flex-1 py-1.5 text-xs font-bold rounded-full transition-colors focus:outline-none capitalize ${
                  isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTransactionType"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 38,
                    }}
                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
                  />
                )}
                <span className="relative z-10">{labels[type]}</span>
              </button>
            );
          })}
        </div>

        {/* Massive Hero Amount Display */}
        <div className="my-2 text-center w-full relative">
          <div className="flex items-center justify-center gap-1">
            <span
              className={`text-3xl font-extrabold ${
                activeType === 'income'
                  ? 'text-emerald-500'
                  : activeType === 'transfer'
                  ? 'text-indigo-500'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              $
            </span>
            <div
              className={`text-5xl font-extrabold tracking-tight tabular-nums select-none ${
                activeType === 'income'
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : activeType === 'transfer'
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-900 dark:text-slate-50'
              }`}
            >
              {rawAmount}
            </div>
            {/* Blinking cursor bar */}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
              className={`w-1 h-9 rounded-full ${
                activeType === 'income'
                  ? 'bg-emerald-500'
                  : activeType === 'transfer'
                  ? 'bg-indigo-500'
                  : 'bg-indigo-600'
              }`}
            />
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">
            {activeType === 'expense'
              ? 'Deducted from Primary Titanium'
              : activeType === 'income'
              ? 'Credited to Checking Account'
              : 'Transfer between linked vaults'}
          </p>
        </div>

        {/* Merchant / Description Input Field */}
        <div className="w-full max-w-[320px] my-2">
          <input
            type="text"
            value={merchantNote}
            onChange={(e) => setMerchantNote(e.target.value)}
            maxLength={60}
            placeholder="Merchant / Note (e.g. Whole Foods)"
            className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/10 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-center transition-all"
          />
        </div>

        {/* Category Selector Carousel */}
        <div className="w-full max-w-[340px] my-2 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 justify-start px-1">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all focus:outline-none ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25 ring-2 ring-indigo-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <CategoryIcon name={cat.icon} size={14} className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tactile 3x4 Numpad */}
        <Numpad
          onDigit={handleDigit}
          onBackspace={handleBackspace}
          onClear={handleClear}
          className="my-2"
        />

        {/* Primary Action Button */}
        <div className="w-full max-w-[320px] mt-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            disabled={parsedAmount <= 0}
            onClick={() => handleSubmit()}
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all focus:outline-none ${
              parsedAmount <= 0
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
                : activeType === 'income'
                ? 'bg-[#00D533] hover:bg-[#00be2e] text-black shadow-[#00D533]/25'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {showSuccessGlow ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-white" /> Saved!
              </span>
            ) : (
              <span>
                {activeType === 'income'
                  ? `Add Income ($${parsedAmount > 0 ? parsedAmount.toFixed(2) : '0.00'})`
                  : activeType === 'transfer'
                  ? `Transfer ($${parsedAmount > 0 ? parsedAmount.toFixed(2) : '0.00'})`
                  : `Save Expense ($${parsedAmount > 0 ? parsedAmount.toFixed(2) : '0.00'})`}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </Sheet>
  );
};
