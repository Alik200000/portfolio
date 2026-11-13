import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Scale, Cookie, CheckCircle2 } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'cookie' | 'integrity';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export function LegalModal({ isOpen, initialTab = 'privacy', onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-white border border-slate-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#0A0B0E] z-10"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#FAF9F5]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0A0B0E] flex items-center justify-center text-[#F5F5F0]">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h2 id="legal-modal-title" className="font-display font-bold text-base text-[#0A0B0E]">
                  Юридическая информация и Комплаенс
                </h2>
                <p className="text-xs font-mono text-slate-600">
                  Соответствие законодательству РК, Закону о персональных данных и стандартам Reel 4 (@davydovit)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Закрыть модальное окно"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-[#0A0B0E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b border-slate-200 bg-[#FAF9F5] px-6 gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`py-3 px-3 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'privacy'
                  ? 'border-[#0A0B0E] text-[#0A0B0E]'
                  : 'border-transparent text-slate-600 hover:text-[#0A0B0E]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Политика конфиденциальности</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`py-3 px-3 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'terms'
                  ? 'border-[#0A0B0E] text-[#0A0B0E]'
                  : 'border-transparent text-slate-600 hover:text-[#0A0B0E]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Условия использования</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cookie')}
              className={`py-3 px-3 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'cookie'
                  ? 'border-[#0A0B0E] text-[#0A0B0E]'
                  : 'border-transparent text-slate-600 hover:text-[#0A0B0E]'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Политика Cookie</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('integrity')}
              className={`py-3 px-3 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'integrity'
                  ? 'border-[#0A0B0E] text-[#0A0B0E]'
                  : 'border-transparent text-slate-600 hover:text-[#0A0B0E]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Прозрачность и Реквизиты</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-700 space-y-4 font-sans leading-relaxed">
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0A0B0E] font-display">
                  1. Политика конфиденциальности и обработки персональных данных
                </h3>
                <p className="text-xs text-slate-600">
                  Дата актуализации: 5 ноября 2026 г. • Применимое право: Республика Казахстан (Закон РК № 94-V «О персональных данных и их защите»).
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#0A0B0E]">1.1. Общие положения</h4>
                  <p>
                    Настоящая Политика регулирует порядок сбора, хранения и защиты информации, предоставляемой пользователями при взаимодействии с сайтом-портфолио и контактными формами разработчика Алима.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#0A0B0E]">1.2. Сбор и цели обработки данных</h4>
                  <p>
                    При отправке заявки через форму обратной связи пользователь добровольно передает:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>Имя или псевдоним (для персонализации ответа);</li>
                    <li>Контактные данные: телефон, WhatsApp или Telegram username;</li>
                    <li>Тему и описание инженерной задачи или проекта.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#0A0B0E]">1.3. Конфиденциальность и запрет передачи третьим лицам</h4>
                  <p>
                    Персональные данные никогда не продаются, не передаются сторонним рекламным сетям или спам-брокерам. Прямая отправка лида направляется в мессенджер WhatsApp разработчика по защищенному протоколу TLS.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0A0B0E] font-display">
                  2. Условия использования сервиса (Terms of Service)
                </h3>
                <p>
                  Все архитектурные схемы, дизайн-система, интерактивные BI-дашборды и исходный код демонстраторов, опубликованные в данном портфолио, созданы для демонстрации инженерных и аналитических компетенций автора.
                </p>
              </div>
            )}

            {activeTab === 'cookie' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0A0B0E] font-display">
                  3. Политика использования файлов Cookie (Cookie Policy)
                </h3>
                <p>
                  Используются только технические сессионные cookies и localStorage браузера для сохранения пользовательских настроек интерфейса без сторонних рекламных трекеров.
                </p>
              </div>
            )}

            {activeTab === 'integrity' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0A0B0E] font-display">
                  4. Прозрачность, Реквизиты и Этический стандарт
                </h3>
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-slate-300 space-y-2">
                  <h4 className="font-semibold text-[#0A0B0E]">🏢 Юридические реквизиты и контакты разработчика:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-700">
                    <div><span className="text-slate-500">Разработчик:</span> Алим (Data / BI & Full-Stack Engineer)</div>
                    <div><span className="text-slate-500">Локация:</span> Казахстан, г. Алматы / Астана</div>
                    <div><span className="text-slate-500">GitHub:</span> <a href="https://github.com/Alik200000" target="_blank" rel="noopener noreferrer" className="text-indigo-700 font-bold hover:underline">github.com/Alik200000</a></div>
                    <div><span className="text-slate-500">WhatsApp:</span> <a href="https://wa.me/77786078732" target="_blank" rel="noopener noreferrer" className="text-emerald-800 font-bold hover:underline">+7 (778) 607-87-32</a></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-[#FAF9F5]">
            <span className="text-xs font-mono text-slate-600">
              Стандарт Reel 4 • Максим Давыдов (@davydovit)
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-mono text-xs font-bold transition-colors cursor-pointer"
            >
              Понятно / Закрыть
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
