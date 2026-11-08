import React from 'react';
import { ArrowUp, Zap, Shield, Scale, Cookie, CheckCircle2 } from 'lucide-react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal?: (tab: LegalTab) => void;
}

export function Footer({ onOpenLegal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#05060A] text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-[#090B10] rounded-[7px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white">
                Alim<span className="text-violet-400">.Dev</span> — Портфолио
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                © 2026 Алим. Разработка масштабируемых систем, интеграций Kaspi и AI.
              </div>
            </div>
          </div>

          {/* Status indicator & links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub (Alik200000)
            </a>
            <span>•</span>
            <a
              href="https://wa.me/77786078732"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              WhatsApp (+7 778 607-87-32)
            </a>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Казахстан (Алматы / Астана)</span>
            </span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Вернуться наверх"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#161C2C] hover:bg-[#1E263C] text-slate-300 hover:text-white border border-white/10 hover:border-violet-500/30 text-xs font-mono transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal & Compliance Navigation (Reel 4: @davydovit) */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-violet-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-violet-400/70" />
              <span>Политика конфиденциальности</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-violet-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5 text-cyan-400/70" />
              <span>Условия использования</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('cookie')}
              className="hover:text-violet-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Cookie className="w-3.5 h-3.5 text-amber-400/70" />
              <span>Политика Cookie</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('integrity')}
              className="hover:text-violet-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" />
              <span>Реквизиты и этический кодекс</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 text-center sm:text-right">
            Закон РК «О персональных данных» • 0% фейковых отзывов • WCAG A11y
          </div>
        </div>
      </div>
    </footer>
  );
}
