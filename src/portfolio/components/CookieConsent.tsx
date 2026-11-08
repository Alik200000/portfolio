import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { LegalTab } from './LegalModal';

interface CookieConsentProps {
  onOpenLegal: (tab: LegalTab) => void;
}

export function CookieConsent({ onOpenLegal }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('alim_cookie_consent');
    if (!consent) {
      // Delay presentation slightly for pleasant UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('alim_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('alim_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40"
        role="region"
        aria-label="Уведомление об использовании cookies"
      >
        <div className="relative p-5 rounded-2xl bg-[#0B0F1A]/95 border border-white/10 shadow-2xl backdrop-blur-xl text-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-400 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider">
                  Использование файлов Cookie
                </h3>
                <button
                  onClick={handleDecline}
                  aria-label="Закрыть уведомление"
                  className="text-slate-500 hover:text-slate-300 p-1 rounded-md transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Мы используем только базовые cookies и локальное хранилище для сохранения ваших настроек интерфейса. Никакого рекламного спама и передачи третьим лицам.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-lg shadow-violet-600/20 transition-all cursor-pointer"
                >
                  Принять все
                </button>
                <button
                  onClick={() => onOpenLegal('cookie')}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Подробнее</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
