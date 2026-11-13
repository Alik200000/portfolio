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
    <footer className="relative border-t border-black/15 bg-[#EFEFEA] text-slate-700 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0A0B0E] flex items-center justify-center shadow-xs">
              <Zap className="w-4 h-4 text-[#F5F5F0]" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#0A0B0E]">
                Alim<span className="text-indigo-700">.Dev</span> — Портфолио
              </div>
              <div className="text-[11px] font-mono text-slate-600">
                © 2026 Алим. BI-аналитика, витрины данных, интеграции 1С/Kaspi и AI.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-semibold text-slate-700">
            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A0B0E] transition-colors"
            >
              GitHub (Alik200000)
            </a>
            <span>•</span>
            <a
              href="https://wa.me/77786078732"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:text-emerald-950 font-bold transition-colors"
            >
              WhatsApp (+7 778 607-87-32)
            </a>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Казахстан (Алматы / Астана)</span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Вернуться наверх"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-[#0A0B0E] border border-slate-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-[#0A0B0E] font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-700" />
              <span>Политика конфиденциальности</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-[#0A0B0E] font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5 text-slate-700" />
              <span>Условия использования</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('cookie')}
              className="hover:text-[#0A0B0E] font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <Cookie className="w-3.5 h-3.5 text-amber-700" />
              <span>Политика Cookie</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('integrity')}
              className="hover:text-[#0A0B0E] font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Реквизиты и этический кодекс</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-600 text-center sm:text-right">
            Закон РК «О персональных данных» • 0% фейковых отзывов • WCAG A11y
          </div>
        </div>
      </div>
    </footer>
  );
}
