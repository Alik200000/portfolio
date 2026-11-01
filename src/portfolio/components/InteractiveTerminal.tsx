import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';

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
      text: 'Добро пожаловать в интерактивный терминал Алима v1.2',
    },
    {
      id: 'init-2',
      type: 'output',
      text: 'Введите "help" или нажмите быстрые кнопки ниже для навигации.',
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
          text: 'Доступные команды:\n • projects  - Показать 6 реальных проектов с GitHub\n • stack     - Технологический стек (Python, 1C, Next.js, AI)\n • contact   - Прямые контакты (WhatsApp, Email, GitHub)\n • whoami    - Информация обо мне\n • clear     - Очистить экран',
        });
        break;

      case 'projects':
        newHistory.push(
          {
            id: String(Date.now() + 1),
            type: 'output',
            text: '1. Kaspi Repricer Enterprise (FastAPI, XML feeds, Cloudflare Tunnel)',
            link: { url: 'https://github.com/Alik200000/kaspi-repricer', label: 'github.com/Alik200000/kaspi-repricer' },
          },
          {
            id: String(Date.now() + 2),
            type: 'output',
            text: '2. Smart Digital Ops & Profit Intelligence (Render Production ERP/CRM)',
            link: { url: 'https://smart-digital-ops-core.onrender.com', label: 'smart-digital-ops-core.onrender.com' },
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
            text: '4. Wildberries Manager AI Bot (aiogram 3 + Gemini Vision OCR)',
            link: { url: 'https://github.com/Alik200000/wb-manager-ai-bot', label: 'github.com/Alik200000/wb-manager-ai-bot' },
          },
          {
            id: String(Date.now() + 5),
            type: 'output',
            text: '5. Adway AI Helper (Chrome Extension + Gemini Multimodal Vision)',
            link: { url: 'https://github.com/Alik200000/adway-ai-helper', label: 'github.com/Alik200000/adway-ai-helper' },
          },
          {
            id: String(Date.now() + 6),
            type: 'output',
            text: '6. High-Frequency Trading Assistant (Bybit WebSocket v5 + Risk Management)',
            link: { url: 'https://github.com/Alik200000/bybit-trading-bot', label: 'github.com/Alik200000/bybit-trading-bot' },
          }
        );
        break;

      case 'stack':
        newHistory.push({
          id: String(Date.now() + 1),
          type: 'output',
          text: 'Backend: Python 3.11+, FastAPI, Node.js, Express, 1C CommerceML 3.1, Kaspi XML.\nFrontend: Next.js 16, React 19, TypeScript 5, Tailwind CSS, Framer Motion.\nAI & Automation: Gemini 1.5 Pro / Flash, Gemini Vision OCR, aiogram 3, Selenium / Puppeteer.\nInfra: Render, Cloudflare Tunnel, Docker, Git, SQLite WAL, PostgreSQL.',
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
          text: 'Алим — разработчик прикладных цифровых продуктов, B2B-интеграций и AI-автоматизации.\nЛокация: Казахстан (Алматы / Астана / Удалённо).\nФокус: надежные коммерческие решения без раздутого оверинжиниринга.',
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
      {/* Floating Toggle Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Открыть интерактивную консоль"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0D111A]/90 hover:bg-[#161C2C] border border-cyan-500/40 text-cyan-300 shadow-xl shadow-cyan-950/60 backdrop-blur-xl text-xs font-mono font-bold cursor-pointer transition-all"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>{isOpen ? 'Закрыть CLI' : '>_ CLI Консоль'}</span>
        </motion.button>
      </div>

      {/* Terminal Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed bottom-20 right-4 sm:right-6 z-40 w-[94vw] sm:w-[480px] max-h-[460px] rounded-2xl bg-[#080B11]/95 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden text-slate-200 font-mono text-xs"
          >
            {/* Header bar */}
            <div className="px-4 py-2.5 bg-[#0D121F] border-b border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-[11px] font-bold text-slate-300">alim@terminal: ~ (bash)</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick command buttons */}
            <div className="px-3 py-2 bg-white/[0.02] border-b border-white/5 flex flex-wrap gap-1.5">
              {['help', 'projects', 'stack', 'contact', 'whoami', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-white/5 transition-colors text-[11px] cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Scrollable Output */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2.5 max-h-[300px]">
              {history.map((line) => (
                <div key={line.id} className="leading-relaxed">
                  {line.type === 'input' && (
                    <span className="text-cyan-400 font-bold">{line.text}</span>
                  )}
                  {line.type === 'output' && (
                    <div className="text-slate-300 whitespace-pre-wrap">
                      {line.text}
                      {line.link && (
                        <div className="mt-1">
                          <a
                            href={line.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
                          >
                            → {line.link.label}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  {line.type === 'error' && (
                    <span className="text-rose-400">{line.text}</span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Line */}
            <div className="p-3 bg-[#0D121F] border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите команду (например: projects)..."
                className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none font-mono text-xs"
              />
              <button
                onClick={() => handleCommand(inputVal)}
                className="p-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 cursor-pointer"
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
