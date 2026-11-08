import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Github, Phone, Sparkles } from 'lucide-react';

interface BlueprintCell {
  id: number;
  x: number;
  y: number;
  tag: string;
  size: number;
}

const BLUEPRINT_TAGS = [
  '1С:OData 8.3',
  'Bitrix24 REST',
  'Kaspi XML 2.0',
  'Gemini Vision',
  'Next.js 16 SSR',
  'FastAPI Async',
  'АБК FinTech',
];

export function Hero() {
  const [trail, setTrail] = useState<BlueprintCell[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const counterRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const now = performance.now();
    if (now - lastSpawnRef.current < 65) return;
    lastSpawnRef.current = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Snap to 56px architectural blueprint grid like in 00:03-00:05 of the reference video
    const gridSize = 56;
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const snappedX = Math.floor(rawX / gridSize) * gridSize;
    const snappedY = Math.floor(rawY / gridSize) * gridSize;

    const id = ++counterRef.current;
    const tag = BLUEPRINT_TAGS[id % BLUEPRINT_TAGS.length];

    setTrail((prev) => [...prev.slice(-6), { id, x: snappedX, y: snappedY, tag, size: gridSize }]);

    setTimeout(() => {
      setTrail((prev) => prev.filter((item) => item.id !== id));
    }, 850);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[94vh] bg-[#F3F3EE] text-[#0A0B0E] flex flex-col justify-between px-4 sm:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden select-none"
    >
      {/* Subtle Architectural Radial Vignette & Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(255,255,255,0.9) 0%, rgba(235,235,228,0.65) 58%, rgba(216,216,208,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A0B0E 1px, transparent 1px), linear-gradient(to bottom, #0A0B0E 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Interactive Blueprint Wireframe Cursor Trail (00:03-00:05 video reference) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 hidden md:block" aria-hidden="true">
        {trail.map((cell) => (
          <motion.div
            key={cell.id}
            initial={{ opacity: 0.85, scale: 0.92 }}
            animate={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              transform: `translate3d(${cell.x}px, ${cell.y}px, 0)`,
              width: cell.size * 2,
              height: cell.size * 1.5,
            }}
            className="absolute top-0 left-0 border border-[#0A0B0E]/35 bg-[#0A0B0E]/[0.03] flex flex-col justify-between p-1.5"
          >
            <div className="flex items-center justify-between text-[9px] font-mono text-[#0A0B0E]/70 leading-none">
              <span>+</span>
              <span>{cell.tag}</span>
              <span>+</span>
            </div>
            <div className="border-t border-dashed border-[#0A0B0E]/25 my-auto" />
            <div className="flex items-center justify-between text-[8px] font-mono text-[#0A0B0E]/55 leading-none">
              <span>+</span>
              <span>
                {Math.round(cell.x)}:{Math.round(cell.y)}
              </span>
              <span>+</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Editorial Metadata Row (00:03 reference: ВИДЕОГРАФ И РЕЖИССЁР | АЛМАТЫ · 2026) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#0A0B0E]/80 border-b border-[#0A0B0E]/10 pb-3">
        <span>FULLSTACK & AI ИНЖЕНЕР-ИНТЕГРАТОР</span>
        <span className="hidden sm:inline text-[#0A0B0E]/50">• ОТКРЫТЫЙ КОД НА GITHUB •</span>
        <span>АЛМАТЫ · 2026</span>
      </div>

      {/* Center Giant Display Wordmark + Mirrored Reflection (00:02-00:05 reference) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Main Giant Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black uppercase tracking-[-0.04em] leading-[0.86] text-[#0A0B0E] w-full text-center"
          style={{ fontSize: 'clamp(3.5rem, 15.2vw, 13.5rem)' }}
        >
          ALIM.DEV
        </motion.h1>

        {/* Upside-down Mirrored Shadow Reflection right below the wordmark */}
        <div
          aria-hidden="true"
          className="font-display font-black uppercase tracking-[-0.04em] leading-[0.86] text-[#0A0B0E] w-full text-center text-reflection -mt-1 sm:-mt-2"
          style={{ fontSize: 'clamp(3.5rem, 15.2vw, 13.5rem)' }}
        >
          ALIM.DEV
        </div>

        {/* Concise Editorial Pitch & Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-6 max-w-2xl mx-auto flex flex-col items-center gap-5"
        >
          <p className="text-xs sm:text-sm md:text-base text-[#0A0B0E]/80 font-medium leading-relaxed px-2">
            Разрабатываю боевые B2B-сервисы, двусторонние интеграции с{' '}
            <strong className="font-bold text-[#0A0B0E]">1С:Предприятие 8.3</strong>,{' '}
            <strong className="font-bold text-[#0A0B0E]">Битрикс24</strong> и{' '}
            <strong className="font-bold text-[#0A0B0E]">Kaspi.kz</strong>, а также автономных AI-агентов и веб-системы на Next.js и FastAPI.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/77786078732"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать Алиму в WhatsApp"
              className="px-6 py-3 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 transition-all shadow-lg shadow-black/15 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Обсудить проект в WhatsApp</span>
            </a>

            <button
              onClick={scrollToProjects}
              aria-label="Смотреть все проекты"
              className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-[#0A0B0E] border border-[#0A0B0E]/20 font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Смотреть проекты (6)</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Открыть GitHub профиль Alik200000"
              className="px-4 py-3 rounded-full bg-transparent hover:bg-[#0A0B0E]/5 text-[#0A0B0E] border border-[#0A0B0E]/15 font-mono font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>@Alik200000</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Strip (00:05 reference: FASHION · HORECA · TRAVEL · РИЛСЫ | СЪЁМКА · МОНТАЖ · ЦВЕТ) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto pt-3 border-t border-[#0A0B0E]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#0A0B0E]/80">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>B2B E-COMMERCE</span>
          <span className="opacity-40">·</span>
          <span>1С & БИТРИКС24</span>
          <span className="opacity-40">·</span>
          <span>KASPI & WB</span>
          <span className="opacity-40">·</span>
          <span>AI-АГЕНТЫ</span>
        </div>

        <button
          onClick={scrollToAbout}
          className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer"
        >
          <span>АРХИТЕКТУРА</span>
          <span className="opacity-40">·</span>
          <span>ИНТЕГРАЦИИ</span>
          <span className="opacity-40">·</span>
          <span>ПРОДАКШН ↓</span>
        </button>
      </div>
    </section>
  );
}
