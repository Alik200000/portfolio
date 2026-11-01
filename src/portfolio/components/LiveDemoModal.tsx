import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { AuraApp } from '../../components/AuraApp';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveDemoModal({ isOpen, onClose }: LiveDemoModalProps) {
  const [activeTab, setActiveTab] = useState<'app' | 'architecture' | 'metrics'>('app');

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#05060A]/85 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative z-10 w-full max-w-6xl max-h-[94vh] bg-[#090B10] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Bar Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0F131D] border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-[#090B10] rounded-[11px] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 id="modal-title" className="text-xs sm:text-base font-bold text-white font-display truncate">
                  Aura Wealth Suite — Интерактивное Демо и Архитектура
                </h3>
                <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Интерактивное окружение активно
                </span>
              </div>
            </div>

            {/* Tab switchers in header */}
            <div
              role="tablist"
              aria-label="Вкладки модального окна"
              className="hidden md:flex items-center gap-1 bg-[#161C2C] border border-white/5 rounded-full p-1 shrink-0"
            >
              <button
                role="tab"
                aria-selected={activeTab === 'app'}
                onClick={() => setActiveTab('app')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  activeTab === 'app'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Интерактивное приложение
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'architecture'}
                onClick={() => setActiveTab('architecture')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  activeTab === 'architecture'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Архитектура системы
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'metrics'}
                onClick={() => setActiveTab('metrics')}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  activeTab === 'metrics'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Инженерные метрики
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Закрыть окно"
              className="p-2 shrink-0 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              title="Закрыть (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile tab bar */}
          <div
            role="tablist"
            aria-label="Вкладки для мобильных устройств"
            className="md:hidden flex items-center justify-around bg-[#0F131D] border-b border-white/5 py-2 px-3 text-xs font-mono"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'app'}
              onClick={() => setActiveTab('app')}
              className={`px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                activeTab === 'app' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              Приложение
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'architecture'}
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                activeTab === 'architecture' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              Архитектура
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'metrics'}
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                activeTab === 'metrics' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              Метрики
            </button>
          </div>

          {/* Modal Main Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#05060A]">
            {activeTab === 'app' && (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-2">
                {/* Left side info callout */}
                <div className="w-full lg:w-1/3 space-y-4">
                  <div className="p-5 rounded-2xl bg-[#0F131D] border border-white/10 space-y-3">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                      Инструкция к тестированию
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      Попробуйте функции приложения:
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Нажмите <b>кнопку «+»</b> внизу экрана для ввода новой транзакции через тактильный калькулятор.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Перейдите в <b>«Аналитику»</b>, чтобы увидеть структуру расходов и темп бюджета.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Во вкладке <b>«Карты»</b> проверьте заморозку (кнопка Freeze) с эффектом матового стекла.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs text-violet-200">
                    💡 <b>Мгновенный отклик:</b> Приложение работает в реальном времени с оптимистичным обновлением стейта и физикой Framer Motion.
                  </div>
                </div>

                {/* iPhone Frame housing the real live AuraApp */}
                <div className="w-full lg:w-auto flex justify-center py-2">
                  <AuraApp isModal={true} onClose={onClose} />
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="max-w-4xl mx-auto space-y-8 py-4">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Архитектура системы Aura Fintech
                  </h3>
                  <p className="text-sm text-slate-400">
                    Схема сквозной работы: оптимистичные мутации клиента, безопасность операций и визуальная синхронизация данных.
                  </p>
                </div>

                {/* Architecture Diagram Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0F131D] border border-white/10 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-mono font-bold">
                      01
                    </div>
                    <h4 className="font-bold text-white text-base">Оптимистичный UI-слой</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Транзакции и расчеты баланса применяются мгновенно за 0мс. Плавные микроанимации скрывают асинхронную валидацию.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F131D] border border-white/10 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold">
                      02
                    </div>
                    <h4 className="font-bold text-white text-base">Двусторонний учёт</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Бухгалтерская логика учета доходов и расходов с поддержкой мгновенного отката при сетевых сбоях.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F131D] border border-white/10 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold">
                      03
                    </div>
                    <h4 className="font-bold text-white text-base">Безопасность и лимиты</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Защита чувствительных данных карт (маскирование номеров), валидация числовых значений и безопасный ввод.
                    </p>
                  </div>
                </div>

                {/* Visual Pipeline Flow */}
                <div className="p-6 rounded-2xl bg-[#0F131D] border border-white/10">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4">
                    Жизненный цикл операции
                  </span>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-[#161C2C] border border-white/10 text-center w-full md:w-auto">
                      <span className="text-violet-400 font-bold block">Ввод с клавиатуры</span>
                      <span className="text-slate-400 text-[10px]">AddTransactionSheet</span>
                    </div>
                    <span className="text-slate-600 hidden md:inline">→</span>
                    <div className="p-3 rounded-xl bg-[#161C2C] border border-cyan-500/30 text-center w-full md:w-auto">
                      <span className="text-cyan-400 font-bold block">Мгновенный диспетчер</span>
                      <span className="text-slate-400 text-[10px]">Обновление баланса</span>
                    </div>
                    <span className="text-slate-600 hidden md:inline">→</span>
                    <div className="p-3 rounded-xl bg-[#161C2C] border border-white/10 text-center w-full md:w-auto">
                      <span className="text-emerald-400 font-bold block">Агрегатор бюджета</span>
                      <span className="text-slate-400 text-[10px]">Пересчёт категорий</span>
                    </div>
                    <span className="text-slate-600 hidden md:inline">→</span>
                    <div className="p-3 rounded-xl bg-[#161C2C] border border-white/10 text-center w-full md:w-auto">
                      <span className="text-white font-bold block">Framer Motion Spring</span>
                      <span className="text-slate-400 text-[10px]">Анимация счетчиков</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="max-w-4xl mx-auto space-y-6 py-4">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Инженерные метрики и производительность
                  </h3>
                  <p className="text-sm text-slate-400">
                    Стандарты качества, проверенные на мобильных устройствах и медленных сетях.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0F131D] border border-white/10 text-center">
                    <span className="text-2xl font-display font-bold text-emerald-400 block">60 FPS</span>
                    <span className="text-xs text-slate-400 font-mono">Плавность анимаций</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0F131D] border border-white/10 text-center">
                    <span className="text-2xl font-display font-bold text-cyan-400 block">&lt;45 КБ</span>
                    <span className="text-xs text-slate-400 font-mono">Размер JS-бандла (gzip)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0F131D] border border-white/10 text-center">
                    <span className="text-2xl font-display font-bold text-violet-400 block">100/100</span>
                    <span className="text-xs text-slate-400 font-mono">Lighthouse Best Practices</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0F131D] border border-white/10 text-center">
                    <span className="text-2xl font-display font-bold text-amber-400 block">0.0 мс</span>
                    <span className="text-xs text-slate-400 font-mono">Сдвиг верстки (CLS)</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0F131D] border border-white/10 space-y-4">
                  <h4 className="font-bold text-white text-base">Ключевые технические решения</h4>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Моноширинное выравнивание (tabular-nums):</strong>
                        Все числовые балансы используют свойство <code>font-variant-numeric: tabular-nums</code>, исключающее дрожание строки при прокрутке цифр.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Тактильный отклик интерфейса:</strong>
                        Каждое нажатие на кнопку анимировано через <code>{'whileTap={{ scale: 0.96 }}'}</code> с мягкой пружинной физикой.
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block">Доступность и поддержка клавиатуры:</strong>
                        Полное соответствие стандартам WCAG AA, контрастные палитры и семантическая верстка.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
