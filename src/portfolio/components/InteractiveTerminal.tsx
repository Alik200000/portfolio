import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  text: string;
  link?: { url: string; label: string };
}

export function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'output',
      text: 'Добро пожаловать в интерактивную консоль Алима v2.0 (Light Editorial)',
    },
    {
      id: 'init-2',
      type: 'output',
      text: 'Введите "help" или нажмите быстрые кнопки ниже для просмотра BI-дашбордов и стека.',
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory: TerminalLine[] = [
      ...history,
      { id: String(Date.now()), type: 'input', text: `$ ${cmd}` },
    ];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Доступные команды:\n • projects  - Показать 6 проектов и Live BI-дашборды\n • stack     - Технологический стек (SQL, Python, BI, 1C, Next.js)\n • contact   - Прямые контакты (WhatsApp, Email, GitHub)\n • whoami    - Профиль Data/BI & Fullstack инженера\n • clear     - Очистить экран',
        });
        break;

      case 'projects':
        newHistory.push(
          {
            id: String(Date.now() + 1),
            type: 'output',
            text: '1. Smart Digital Ops & Profit Intelligence (BI / P&L Live Dashboard)',
            link: { url: '/demos/smart-digital-ops/index.html', label: 'Открыть Live BI-дашборд P&L' },
          },
          {
            id: String(Date.now() + 2),
            type: 'output',
            text: '2. Kaspi Repricer Enterprise (Live Kaspi Seller Dashboard)',
            link: { url: '/demos/kaspi-repricer/index.html', label: 'Открыть Live Дашборд Kaspi' },
          },
          {
            id: String(Date.now() + 3),
            type: 'output',
            text: '3. Alatau Food Trade (1C:Предприятие 8.3 CommerceML 3.1 + Next.js 16)',
            link: { url: 'https://github.com/Alik200000/alatau-food-trade', label: 'github.com/Alik200000/alatau-food-trade' },
          },
          {
            id: String(Date.now() + 4),
            type: 'output',
            text: '4. Wildberries Manager AI Bot (Burn-Rate Analytics & Gemini OCR)',
            link: { url: 'https://github.com/Alik200000/wb-manager-ai-bot', label: 'github.com/Alik200000/wb-manager-ai-bot' },
          }
        );
        break;

      case 'stack':
        newHistory.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Data & BI: SQL (PostgreSQL, SQLite WAL), Python 3.11+, P&L Unit-экономика, Data Lineage, 1С СКД / OData.\nBackend & Web: FastAPI, Next.js 16, React 19, TypeScript 5, Tailwind CSS.\nIntegrations: 1С:Предприятие 8.3, Битрикс24, Kaspi XML, Wildberries API, Gemini Vision AI.',
        });
        break;

      case 'contact':
        newHistory.push(
          {
            id: String(Date.now() + 1),
            type: 'output',
            text: 'WhatsApp: +7 (778) 607-87-32',
            link: { url: 'https://wa.me/77786078732', label: 'Написать в WhatsApp' },
          },
          {
            id: String(Date.now() + 2),
            type: 'output',
            text: 'Email: aptayalimzhan07@gmail.com',
            link: { url: 'mailto:aptayalimzhan07@gmail.com', label: 'Отправить Email' },
          },
          {
            id: String(Date.now() + 3),
            type: 'output',
            text: 'GitHub: https://github.com/Alik200000',
            link: { url: 'https://github.com/Alik200000', label: 'github.com/Alik200000' },
          }
        );
        break;

      case 'whoami':
        newHistory.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Алим — Data / BI Analyst & Fullstack Engineer (Алматы).\nСпециализация: перевод бизнес-задач в понятные метрики, дашборды, витрины данных DWH и B2B-интеграции.',
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          id: String(Date.now() + 1),
          type: 'error',
          text: `Команда не найдена: "${cmd}". Введите "help" для списка команд.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 pb-[env(safe-area-inset-bottom)]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Открыть интерактивную консоль"
          aria-expanded={isOpen}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-[#0A0B0E] shadow-xl text-xs font-mono font-bold cursor-pointer transition-all"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>{isOpen ? 'Закрыть CLI' : '>_ CLI Консоль'}</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Интерактивная консоль разработчика"
            aria-modal="false"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed bottom-20 right-4 sm:right-6 z-40 w-[94vw] sm:w-[480px] max-h-[75vh] sm:max-h-[460px] rounded-2xl bg-white border border-slate-300 shadow-2xl flex flex-col overflow-hidden text-[#0A0B0E] font-mono text-xs mb-[env(safe-area-inset-bottom)]"
          >
            <div className="px-4 py-2.5 bg-[#FAF9F5] border-b border-slate-300 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-[11px] font-bold text-slate-700">alim@terminal: ~ (light-cli)</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть консоль"
                className="text-slate-600 hover:text-[#0A0B0E] cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1.5">
              {['help', 'projects', 'stack', 'contact', 'whoami', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-200 text-[#0A0B0E] border border-slate-300 transition-colors text-[11px] font-bold cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-2.5 max-h-[280px] bg-white">
              {history.map((line) => (
                <div key={line.id} className="leading-relaxed">
                  {line.type === 'input' && (
                    <span className="text-indigo-700 font-bold">{line.text}</span>
                  )}
                  {line.type === 'output' && (
                    <div className="text-slate-800 whitespace-pre-wrap">
                      {line.text}
                      {line.link && (
                        <div className="mt-1">
                          <a
                            href={line.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-800 hover:text-emerald-950 underline font-bold"
                          >
                            → {line.link.label}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  {line.type === 'error' && (
                    <span className="text-rose-700 font-bold">{line.text}</span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 bg-[#FAF9F5] border-t border-slate-300 flex items-center gap-2">
              <span className="text-emerald-700 font-bold" aria-hidden="true">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Ввод команды"
                placeholder="Введите команду (например: projects)..."
                className="flex-1 bg-transparent text-[#0A0B0E] placeholder-slate-500 focus:outline-none font-mono text-xs"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                aria-label="Выполнить команду"
                className="p-1.5 rounded bg-[#0A0B0E] text-[#F5F5F0] cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
