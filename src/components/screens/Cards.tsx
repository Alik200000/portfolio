import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sliders,
  Plus,
  Wifi,
  Sparkles,
  Building2,
  PiggyBank,
  TrendingUp,
  Coins,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { CardItem, LinkedAccount } from '../../types';
import { initialCards, initialLinkedAccounts } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

interface CardsProps {
  cards?: CardItem[];
  linkedAccounts?: LinkedAccount[];
  onToggleFreezeCard?: (cardId: string) => void;
}

export const Cards: React.FC<CardsProps> = ({
  cards: initialCardsProp = initialCards,
  linkedAccounts = initialLinkedAccounts,
  onToggleFreezeCard,
}) => {
  const [cards, setCards] = useState<CardItem[]>(initialCardsProp);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showSensitiveDetails, setShowSensitiveDetails] = useState(false);
  const [spendingLimitModalOpen, setSpendingLimitModalOpen] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(5000);
  const [limitSavedAlert, setLimitSavedAlert] = useState(false);

  const activeCard = cards[activeCardIndex] || cards[0];

  const handleToggleFreeze = () => {
    if (!activeCard) return;
    setCards((prev) =>
      prev.map((c, i) => (i === activeCardIndex ? { ...c, isFrozen: !c.isFrozen } : c))
    );
    if (onToggleFreezeCard) {
      onToggleFreezeCard(activeCard.id);
    }
  };

  const handleCreateVirtualCard = () => {
    const newCard: CardItem = {
      id: `card-${Date.now()}`,
      name: 'Cyber Neon Virtual',
      tagline: 'Disposable Online Card',
      gradient: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: '11/29',
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      balance: 1500.0,
      limit: 3000,
      brand: 'visa',
      isFrozen: false,
      isVirtual: true,
      accentColor: '#38BDF8',
    };
    setCards((prev) => [...prev, newCard]);
    setActiveCardIndex(cards.length);
  };

  const handleSaveLimit = () => {
    setCards((prev) =>
      prev.map((c, i) => (i === activeCardIndex ? { ...c, limit: currentLimit } : c))
    );
    setLimitSavedAlert(true);
    setTimeout(() => {
      setLimitSavedAlert(false);
      setSpendingLimitModalOpen(false);
    }, 800);
  };

  return (
    <div className="pb-28 pt-2 px-5 max-w-md mx-auto w-full">
      {/* Screen Header */}
      <div className="flex items-center justify-between py-3 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Cards & Vaults
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Physical titanium & multi-sig accounts
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateVirtualCard}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition-colors focus:outline-none"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Card</span>
        </button>
      </div>

      {/* Card Selector Dots */}
      <div className="flex justify-center items-center gap-2 mb-3">
        {cards.map((c, index) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCardIndex(index)}
            aria-label={`Select card ${c.name}`}
            className={`transition-all rounded-full ${
              activeCardIndex === index
                ? 'w-7 h-2 bg-indigo-600 dark:bg-indigo-400'
                : 'w-2 h-2 bg-slate-300 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* 3D Apple-Wallet Style Interactive Card */}
      <div className="relative perspective-1000 my-2">
        {!activeCard ? (
          <div className="w-full aspect-[1.586/1] rounded-[24px] p-6 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">No active cards found</p>
            <button
              type="button"
              onClick={handleCreateVirtualCard}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all"
            >
              Issue Virtual Card
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.id}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full aspect-[1.586/1] rounded-[24px] p-6 text-white shadow-2xl overflow-hidden select-none border border-white/20"
              style={{
                background: activeCard.gradient,
                boxShadow: activeCard.isFrozen
                  ? '0 12px 30px -8px rgba(56, 189, 248, 0.25)'
                  : '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Frozen Ice Shimmer Overlay */}
              {activeCard.isFrozen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-sky-950/70 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 shadow-lg shadow-sky-500/30">
                    <Lock className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                    Card Frozen
                  </span>
                  <span className="text-[10px] text-sky-300/80">
                    Transactions temporarily disabled
                  </span>
                </motion.div>
              )}

              {/* Subtle Metallic Brushed Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-white/[0.12] pointer-events-none" />

              {/* Top row: Wordmark and Contactless Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold tracking-widest uppercase">
                    AURA
                  </span>
                  {activeCard.isVirtual && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/20 border border-white/30 tracking-wider">
                      Virtual
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-white/80">
                  <Wifi className="w-5 h-5 rotate-90 opacity-80" />
                </div>
              </div>

              {/* Center: EMV Chip & Holographic Glint */}
              <div className="relative z-10 my-4 flex items-center justify-between">
                <div className="w-11 h-8 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300/60 shadow-inner flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 border border-black/20 rounded-lg" />
                  <div className="w-6 h-4 border border-black/20 rounded" />
                </div>

                {/* Balance Badge on Card */}
                <div className="text-right">
                  <div className="text-[10px] uppercase font-semibold text-white/70 tracking-wider">
                    Available Limit
                  </div>
                  <div className="text-lg font-extrabold tabular-nums tracking-tight">
                    {formatCurrency(activeCard.balance)}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Cardholder Number, Expiry, Brand Logo */}
              <div className="relative z-10 mt-auto pt-2 flex items-end justify-between">
                <div>
                  <div className="text-sm font-mono tracking-widest text-white/90">
                    {showSensitiveDetails
                      ? `4582 9201 8421 ${activeCard.last4}`
                      : `•••• •••• •••• ${activeCard.last4}`}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[11px] text-white/75 font-mono">
                    <span>EXP: {activeCard.expiry}</span>
                    <span>
                      CVV: {showSensitiveDetails ? activeCard.cvv : '•••'}
                    </span>
                  </div>
                </div>

                {/* Brand Logo */}
                <div className="text-right">
                  {activeCard.brand === 'visa' ? (
                    <span className="text-xl font-black italic tracking-tighter text-white">
                      VISA
                    </span>
                  ) : (
                    <div className="flex items-center -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-rose-500 opacity-90" />
                      <div className="w-6 h-6 rounded-full bg-amber-400 opacity-90" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Quick Card Controls Underneath */}
      {activeCard && (
        <div className="grid grid-cols-3 gap-2.5 my-4">
        {/* 1. Freeze Toggle */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleToggleFreeze}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all focus:outline-none ${
            activeCard.isFrozen
              ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-800 text-sky-600 dark:text-sky-300 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200'
          }`}
        >
          {activeCard.isFrozen ? (
            <Unlock className="w-5 h-5 text-sky-500" />
          ) : (
            <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          )}
          <span className="text-[11px] font-bold">
            {activeCard.isFrozen ? 'Unfreeze' : 'Freeze Card'}
          </span>
        </motion.button>

        {/* 2. Show Sensitive Details */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowSensitiveDetails(!showSensitiveDetails)}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all focus:outline-none ${
            showSensitiveDetails
              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 shadow-xs'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200'
          }`}
        >
          {showSensitiveDetails ? (
            <EyeOff className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <Eye className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          )}
          <span className="text-[11px] font-bold">
            {showSensitiveDetails ? 'Hide CVV' : 'Card Details'}
          </span>
        </motion.button>

        {/* 3. Set Spending Limits */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setSpendingLimitModalOpen(true)}
          className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 focus:outline-none"
        >
          <Sliders className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          <span className="text-[11px] font-bold">Set Limits</span>
        </motion.button>
      </div>
      )}

      {/* Spending Limit Dialog / Sheet Popover */}
      <AnimatePresence>
        {spendingLimitModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/90 border border-indigo-200 dark:border-white/10 mb-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Monthly Spending Limit
              </span>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {formatCurrency(currentLimit, { showCents: false })}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="25000"
              step="500"
              value={currentLimit}
              onChange={(e) => setCurrentLimit(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between items-center mt-3">
              <button
                type="button"
                onClick={() => setSpendingLimitModalOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLimit}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 shadow-sm flex items-center gap-1"
              >
                {limitSavedAlert ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Saved!
                  </>
                ) : (
                  'Apply Limit'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Linked Accounts Section */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Linked Vaults & Institutions
            </h2>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            Plaid 256-bit AES
          </span>
        </div>

        <div className="space-y-2.5">
          {linkedAccounts.map((account) => {
            const iconMap: Record<string, React.ReactElement> = {
              Building2: <Building2 className="w-5 h-5 text-blue-500" />,
              PiggyBank: <PiggyBank className="w-5 h-5 text-emerald-500" />,
              TrendingUp: <TrendingUp className="w-5 h-5 text-indigo-500" />,
              Coins: <Coins className="w-5 h-5 text-amber-500" />,
            };

            return (
              <motion.div
                key={account.id}
                whileHover={{ y: -1 }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.06] shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    {iconMap[account.icon] || <Building2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span>{account.name}</span>
                      {account.apy && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-300/40">
                          {account.apy}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {account.type} • {account.lastSync}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    {formatCurrency(account.balance)}
                  </div>
                  <div className="text-[10px] text-emerald-500 font-medium">
                    Connected
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
