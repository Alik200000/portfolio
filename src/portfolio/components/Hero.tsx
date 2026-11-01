import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, MessageCircle, Github, ChevronRight, Phone, Sparkles, Terminal } from 'lucide-react';

const roles = [
  'Fullstack & AI Automation Developer',
  'B2B-интеграции с 1С:Предприятие 8.3',
  'Автоматизация Kaspi.kz и Wildberries',
  'Веб-приложения на Next.js & React',
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric Aurora Blurs with gentle pulse */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-32 w-[550px] h-[550px] bg-cyan-600/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.12, 1, 1.12],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-xl shadow-lg shadow-emerald-950/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-emerald-300">
            КАЗАХСТАН (АЛМАТЫ / АСТАНА / УДАЛЁННО) • ДОСТУПЕН ДЛЯ ПРОЕКТОВ
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-slate-100 mb-6 uppercase"
        >
          <span>Разработка </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 animate-pulse">
            B2B-Сервисов,
          </span>
          <br className="hidden sm:inline" />
          <span> Интеграций с 1С, Kaspi & </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Прикладного AI.
          </span>
        </motion.h1>

        {/* Dynamic Role Flip Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 mb-6 flex items-center justify-center font-mono text-sm sm:text-base font-semibold text-slate-300"
        >
          <span className="text-cyan-400 mr-2 font-mono">&gt;</span>
          <div className="relative overflow-hidden h-8 w-80 sm:w-[480px] text-center flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute font-mono text-cyan-300 font-bold tracking-wide"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Authentic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl text-slate-300/90 font-medium max-w-3xl leading-relaxed mb-10"
        >
          Привет! Я <span className="text-white font-bold">Алим</span> — разработчик с фокусом на реальные прикладные задачи: электронную коммерцию, B2B-сервисы, интеграции с Kaspi.kz и 1С, а также внедрение прикладных AI-решений для автоматизации рутины. Мой код открыт на GitHub, а продакшен-сервисы развернуты на Render.
        </motion.p>

        {/* Action Buttons with Spring Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary CTA - WhatsApp with glow */}
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.96 }}
            href="https://wa.me/77786078732"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать Алиму в WhatsApp"
            className="group relative px-6 sm:px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-600/25 transition-colors text-white font-bold text-sm sm:text-base flex items-center gap-2.5 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Написать в WhatsApp</span>
          </motion.a>

          {/* Secondary CTA - Explore Projects */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToProjects}
            aria-label="Перейти к реальным проектам"
            className="px-6 sm:px-8 py-3.5 rounded-full bg-[#161C2C]/80 hover:bg-[#1E263C] text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/40 font-semibold text-sm sm:text-base backdrop-blur-xl transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Реальные проекты с GitHub</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </motion.button>

          {/* Tertiary CTA - GitHub */}
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            href="https://github.com/Alik200000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub профиль Alik200000"
            className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
            title="GitHub: Alik200000"
          >
            <Github className="w-5 h-5 text-slate-300" />
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Scroll Down Arrow with bouncing animation */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={scrollToProjects}
        aria-label="Прокрутить вниз к проектам"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer hidden md:flex items-center justify-center"
      >
        <ArrowDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
