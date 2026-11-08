import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight, Github, Phone } from 'lucide-react';

const KINETIC_ROLES = [
  'Двусторонняя синхронизация 1С:Предприятие 8.3 ↔ Битрикс24',
  'Автоматический репрайсинг и удержание Топ-1 в Kaspi.kz',
  'Прикладные AI-агенты (Gemini Vision, Telegram & WhatsApp)',
  'Fullstack B2B-порталы и ERP-системы на Next.js 16 & FastAPI',
];

const HERO_LETTERS = ['A', 'L', 'I', 'M', '.', 'D', 'E', 'V'];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  // Mouse-driven 3D parallax values for giant typography
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);
  const smoothX = useSpring(mouseNormX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(mouseNormY, { stiffness: 180, damping: 24 });

  const wordRotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const wordRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const reflectionX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % KINETIC_ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      mouseNormX.set(rawX / Math.max(rect.width, 1) - 0.5);
      mouseNormY.set(rawY / Math.max(rect.height, 1) - 0.5);
    },
    [mouseNormX, mouseNormY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseNormX.set(0);
    mouseNormY.set(0);
  }, [mouseNormX, mouseNormY]);

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
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] sm:min-h-[95vh] bg-[#F3F3EE] text-[#0A0B0E] flex flex-col justify-between px-4 sm:px-8 pt-16 sm:pt-24 pb-5 sm:pb-8 overflow-hidden select-none"
    >
      {/* Subtle Architectural Radial Vignette & Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 46%, rgba(255,255,255,0.95) 0%, rgba(235,235,228,0.7) 56%, rgba(212,212,202,0.9) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.065]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A0B0E 1px, transparent 1px), linear-gradient(to bottom, #0A0B0E 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Top Editorial Metadata Row (00:03 reference) */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-[1440px] w-full mx-auto flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.14em] text-[#0A0B0E]/80 border-b border-[#0A0B0E]/15 pb-3"
      >
        <span>FULLSTACK & AI ИНЖЕНЕР-ИНТЕГРАТОР</span>
        <span className="hidden sm:inline-flex items-center gap-2 text-[#0A0B0E]/65">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>ДОСТУПЕН ДЛЯ ПРОЕКТОВ • GITHUB VERIFIED</span>
        </span>
        <span>АЛМАТЫ · 2026</span>
      </motion.div>

      {/* Center Giant 3D Kinetic Display Wordmark + Counter-Parallax Reflection */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto my-auto py-4 sm:py-10 flex flex-col items-center justify-center text-center perspective-stage">
        {/* Main Giant Wordmark with per-character 3D stagger & hover lift */}
        <motion.h1
          style={{
            rotateX: wordRotateX,
            rotateY: wordRotateY,
            fontSize: 'clamp(2.85rem, 16vw, 13.5rem)',
          }}
          className="font-display font-black uppercase tracking-[-0.04em] leading-[0.86] text-[#0A0B0E] w-full flex items-center justify-center preserve-3d"
          aria-label="ALIM.DEV"
        >
          {HERO_LETTERS.map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 60, rotateX: -75 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{
                y: -12,
                scale: 1.06,
                transition: { type: 'spring', stiffness: 450, damping: 18 },
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 22,
                delay: 0.08 + idx * 0.045,
              }}
              className="inline-block cursor-default"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Upside-down Mirrored Shadow Reflection with counter-parallax glide */}
        <motion.div
          aria-hidden="true"
          style={{
            x: reflectionX,
            fontSize: 'clamp(2.85rem, 16vw, 13.5rem)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display font-black uppercase tracking-[-0.04em] leading-[0.86] text-[#0A0B0E] w-full text-center text-reflection -mt-1 sm:-mt-2"
        >
          ALIM.DEV
        </motion.div>

        {/* Kinetic Role Flip Pill + Editorial Pitch + Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3 sm:mt-6 max-w-2xl w-full mx-auto flex flex-col items-center gap-3.5 sm:gap-4"
        >
          {/* Animated Role Flip Badge (mobile-friendly wrapping) */}
          <div className="min-h-[2.25rem] w-full sm:w-auto max-w-md sm:max-w-none px-3.5 py-1.5 rounded-2xl sm:rounded-full bg-[#0A0B0E]/[0.06] border border-[#0A0B0E]/15 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                className="font-mono text-[11px] sm:text-xs font-bold text-[#0A0B0E] tracking-wide text-center leading-snug"
              >
                ▸ {KINETIC_ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-[#0A0B0E]/80 font-medium leading-relaxed px-1 sm:px-2">
            Разрабатываю боевые B2B-сервисы, двусторонние интеграции с{' '}
            <strong className="font-bold text-[#0A0B0E]">1С:Предприятие 8.3</strong>,{' '}
            <strong className="font-bold text-[#0A0B0E]">Битрикс24</strong> и{' '}
            <strong className="font-bold text-[#0A0B0E]">Kaspi.kz</strong>, а также автономных AI-агентов и веб-системы на Next.js и FastAPI.
          </p>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-1">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/77786078732"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать Алиму в WhatsApp"
              className="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-colors shadow-xl shadow-black/15 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Обсудить проект в WhatsApp</span>
            </motion.a>

            <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToProjects}
                aria-label="Смотреть все проекты"
                className="px-4 sm:px-6 py-3 rounded-full bg-white/90 hover:bg-white text-[#0A0B0E] border border-[#0A0B0E]/20 font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <span>Проекты (6)</span>
                <ArrowDownRight className="w-4 h-4 shrink-0" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://github.com/Alik200000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Открыть GitHub профиль Alik200000"
                className="px-4 py-3 rounded-full bg-transparent hover:bg-[#0A0B0E]/5 text-[#0A0B0E] border border-[#0A0B0E]/15 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>@Alik200000</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Strip (00:05 reference) */}
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
