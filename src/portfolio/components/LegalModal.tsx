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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-[#090C15] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E121E]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h2 id="legal-modal-title" className="font-display font-bold text-base text-white">
                  Юридическая информация и Комплаенс
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Соответствие законодательству РК, Закону о персональных данных и стандартам Reel 4 (@davydovit)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Закрыть модальное окно"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-[#070910] px-6 gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'privacy'
                  ? 'border-violet-500 text-violet-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Политика конфиденциальности</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'terms'
                  ? 'border-violet-500 text-violet-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Условия использования</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cookie')}
              className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'cookie'
                  ? 'border-violet-500 text-violet-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Политика Cookie</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('integrity')}
              className={`py-3 px-3 text-xs font-mono font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'integrity'
                  ? 'border-violet-500 text-violet-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Прозрачность и Реквизиты</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-300 space-y-4 font-sans leading-relaxed">
            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  1. Политика конфиденциальности и обработки персональных данных
                </h3>
                <p className="text-xs text-slate-400">
                  Дата актуализации: 5 ноября 2026 г. • Применимое право: Республика Казахстан (Закон РК № 94-V «О персональных данных и их защите»).
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">1.1. Общие положения</h4>
                  <p>
                    Настоящая Политика регулирует порядок сбора, хранения и защиты информации, предоставляемой пользователями при взаимодействии с сайтом-портфолио и контактными формами разработчика Алима.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">1.2. Сбор и цели обработки данных</h4>
                  <p>
                    При отправке заявки через форму обратной связи пользователь добровольно передает:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li>Имя или псевдоним (для персонализации ответа);</li>
                    <li>Контактные данные: телефон, WhatsApp или Telegram username;</li>
                    <li>Тему и описание инженерной задачи или проекта.</li>
                  </ul>
                  <p>
                    Данные используются исключительно для прямой связи с заказчиком, согласования технического задания и коммерческих условий.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">1.3. Конфиденциальность и запрет передачи третьим лицам</h4>
                  <p>
                    Персональные данные никогда не продаются, не передаются сторонним рекламным сетям или спам-брокерам. Прямая отправка лида направляется в мессенджер WhatsApp разработчика по защищенному протоколу TLS.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">1.4. Права пользователя</h4>
                  <p>
                    Субъект персональных данных имеет право на отзыв согласия на обработку, уточнение или удаление своих данных в любой момент, направив запрос в Telegram или WhatsApp: +7 (778) 607-87-32.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  2. Условия использования сервиса (Terms of Service)
                </h3>
                <p className="text-xs text-slate-400">
                  Регламент использования материалов, кода и демонстрационных прототипов.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">2.1. Интеллектуальная собственность</h4>
                  <p>
                    Все архитектурные схемы, дизайн-система, интерактивные 3D-компоненты, визуальные стили и исходный код демонстраторов, опубликованные в данном портфолио, являются интеллектуальной собственностью автора, за исключением открытых библиотек с лицензиями MIT/Apache 2.0.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">2.2. Демонстрационный характер витрины</h4>
                  <p>
                    Представленные модули (сканеры спредов Bybit, симуляторы Kaspi API) созданы в исследовательских и демонстрационных целях для подтверждения инженерных компетенций и не являются публичной офертой финансовых услуг.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">2.3. Безопасность и отсутствие вредоносного кода</h4>
                  <p>
                    Сайт полностью очищен от трекеров стороннего шпионажа, не использует вредоносные скрипты и проверяется автоматическим аудитором качества.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'cookie' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  3. Политика использования файлов Cookie (Cookie Policy)
                </h3>
                <p className="text-xs text-slate-400">
                  Соответствие требованиям приватности браузеров и согласия пользователя.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">3.1. Какие файлы Cookie используются</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li><strong className="text-slate-200">Технические и сессионные cookies:</strong> сохранение статуса закрытия баннеров, выбранной темы и состояния интерактивных окон.</li>
                    <li><strong className="text-slate-200">Локальное хранилище (localStorage):</strong> исключительно на стороне браузера пользователя (без отправки на сервер).</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">3.2. Сторонние куки</h4>
                  <p>
                    На сайте не используются сторонние рекламные межсайтовые трекеры (cross-site cookies).
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">3.3. Управление файлами Cookie</h4>
                  <p>
                    Пользователь вправе отключить прием файлов cookie в настройках любого современного браузера (Chrome, Safari, Firefox, Edge).
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'integrity' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-display">
                  4. Прозрачность, Реквизиты и Этический стандарт
                </h3>
                <p className="text-xs text-slate-400">
                  Требования Reel 4 (@davydovit): защита от фейков, прозрачные реквизиты, защита прав потребителей.
                </p>
                <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 space-y-2">
                  <h4 className="font-semibold text-violet-300">🏢 Юридические реквизиты и контакты разработчика:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    <div><span className="text-slate-500">Разработчик:</span> Алим (Full-Stack & Systems Engineer)</div>
                    <div><span className="text-slate-500">Локация:</span> Казахстан, г. Алматы / Астана</div>
                    <div><span className="text-slate-500">GitHub:</span> <a href="https://github.com/Alik200000" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">github.com/Alik200000</a></div>
                    <div><span className="text-slate-500">WhatsApp:</span> <a href="https://wa.me/77786078732" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">+7 (778) 607-87-32</a></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">🚫 Запрет фейковых отзывов и неподтвержденных заявлений</h4>
                  <p>
                    В соответствии с правилами честной разработки на сайте не размещаются фальшивые отзывы вымышленных лиц, фальшивые таймеры скидок или обещания гарантированной прибыли. Каждый представленный проект подтвержден реальным открытым репозиторием в профиле GitHub.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0E121E]">
            <span className="text-xs font-mono text-slate-500">
              Стандарт Reel 4 • Максим Давыдов (@davydovit)
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              Понятно / Закрыть
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
