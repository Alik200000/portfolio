import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Cpu, Database, Pause, Play, Terminal } from 'lucide-react';

const MARQUEE_ITEMS = [
  'SQL & PYTHON DWH / ETL',
  'BI ДАШБОРДЫ & МЕТРИКИ P&L',
  '1С:ПРЕДПРИЯТИЕ 8.3',
  'БИТРИКС24 CRM',
  'KASPI MERCHANT API',
  'WILDBERRIES API',
  'GEMINI VISION AI',
  'NEXT.JS 16 & FASTAPI',
];

export function StatsCounter() {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
  });

  const oboX = useTransform(smoothProgress, [0.05, 0.28], [70, 0]);
  const mneX = useTransform(smoothProgress, [0.05, 0.28], [-70, 0]);
  const centerCardScale = useTransform(smoothProgress, [0.05, 0.28], [1.12, 1]);

  const topHeadlineX = useTransform(smoothProgress, [0.55, 0.95], [-40, 35]);
  const bottomHeadlineX = useTransform(smoothProgress, [0.55, 0.95], [40, -35]);
  const barScaleX = useTransform(smoothProgress, [0.6, 0.92], [0.2, 1]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-20 bg-[#FAF9F5] text-[#0A0B0E] pt-20 sm:pt-28 pb-16 overflow-hidden border-b border-black/15"
    >
      {/* Subtle monochrome architectural grid texture backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 22%, rgba(10,11,14,0.18) 0%, transparent 60%), repeating-linear-gradient(90deg, rgba(10,11,14,0.12) 0px, rgba(10,11,14,0.12) 1px, transparent 1px, transparent 80px)',
        }}
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 relative z-10">
        {/* 1. Scroll-Driven Split Editorial Reveal: ОБО [Portrait/Profile Card] МНЕ */}
        <div className="relative py-8 sm:py-14 flex flex-col items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4">
            {/* Left Giant Word: ОБО */}
            <motion.div
              style={{ x: oboX }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 text-center lg:text-right max-lg:!transform-none"
            >
              <span
                className="font-display font-black uppercase tracking-[-0.04em] leading-none text-[#0A0B0E] select-none inline-block"
                style={{ fontSize: 'clamp(3rem, 12vw, 8.2rem)' }}
              >
                ОБО
              </span>
            </motion.div>

            {/* Center Vertical Light Editorial Card */}
            <motion.div
              style={{ scale: centerCardScale }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex justify-center"
            >
              <motion.div
                whileHover={{ y: -8, rotateY: 4, rotateX: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="w-full max-w-[330px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-white via-[#FAF9F5] to-[#EFEFEA] border border-slate-300 p-6 flex flex-col justify-between relative overflow-hidden shadow-xl"
              >
                {/* Monochromatic architectural grid lines */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(10,11,14,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,11,14,0.08) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />

                {/* Top Card Status */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-600 font-semibold">
                  <span>ALIM • KZ</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Center Monogram & Terminal Blueprint */}
                <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    className="w-20 h-20 rounded-2xl bg-[#0A0B0E] text-[#F5F5F0] flex items-center justify-center font-display font-black text-4xl tracking-tighter shadow-lg mb-4"
                  >
                    A
                  </motion.div>
                  <div className="font-display font-extrabold text-xl text-[#0A0B0E] tracking-tight">
                    Алим (Alik200000)
                  </div>
                  <div className="font-mono text-xs text-slate-600 mt-1 font-medium">
                    Data / BI Analyst & Fullstack Engineer
                  </div>
                  <div className="mt-4 w-full rounded-xl bg-white border border-slate-300 p-3 text-left font-mono text-[11px] text-slate-800 space-y-1 shadow-xs">
                    <div className="text-slate-500">// Специализация</div>
                    <div>• SQL, Python, BI-дашборды & P&L</div>
                    <div>• 1С:Предприятие 8.3 & Битрикс24</div>
                    <div>• Kaspi.kz, WB API & Gemini AI</div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-300 text-[10px] font-mono text-slate-600 font-semibold">
                  <span>АЛМАТЫ / АСТАНА</span>
                  <span>GITHUB VERIFIED</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Giant Word: МНЕ */}
            <motion.div
              style={{ x: mneX }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 text-center lg:text-left max-lg:!transform-none"
            >
              <span
                className="font-display font-black uppercase tracking-[-0.04em] leading-none text-[#0A0B0E] select-none inline-block"
                style={{ fontSize: 'clamp(3rem, 12vw, 8.2rem)' }}
              >
                МНЕ
              </span>
            </motion.div>
          </div>

          {/* Caption Line below ОБО МНЕ */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pt-4 border-t border-black/15 text-xs font-mono uppercase tracking-wider text-slate-600 font-medium">
            <span>АЛИМ • АНАЛИТИКА ДАННЫХ, BI-ДАШБОРДЫ И B2B-СИСТЕМЫ</span>
            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="GITHUB ↗"
              className="inline-flex items-center gap-1.5 text-[#0A0B0E] font-bold hover:text-indigo-700 transition-colors"
            >
              <span>ОТКРЫТЫЙ КОД НА GITHUB (ALIK200000)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. Asymmetric Bento Grid with Interactive Inline Pill Capsules */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: 2 Top Stat Cards + 1 Bottom Statement Card */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Stat Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="rounded-3xl bg-white border border-slate-300 shadow-sm hover:border-slate-500 p-6 sm:p-8 flex flex-col justify-between min-h-[210px] transition-colors"
            >
              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-[#0A0B0E] tracking-tight">
                  6+
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mt-1">
                  боевых систем и BI-витрин
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-6">
                Управленческие P&L-дашборды, репрайсеры Kaspi с защитой маржи, шлюзы 1С CommerceML 3.1, AI-боты и витрины данных с открытым кодом.
              </p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.08 }}
              className="rounded-3xl bg-white border border-slate-300 shadow-sm hover:border-slate-500 p-6 sm:p-8 flex flex-col justify-between min-h-[210px] transition-colors"
            >
              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-[#0A0B0E] tracking-tight">
                  4
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold mt-1">
                  ключевых направления
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-6">
                BI & Data Analytics (SQL, Python, P&L), интеграции 1С:Предприятие & Битрикс24, E-Commerce (Kaspi/WB) и прикладные AI-агенты.
              </p>
            </motion.div>

            {/* Bottom Wide Statement Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.14 }}
              className="sm:col-span-2 rounded-3xl bg-white border border-slate-300 shadow-sm hover:border-slate-500 p-6 sm:p-8 flex flex-col justify-center transition-colors"
            >
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[1.2] text-[#0A0B0E]">
                <span>ОЦИФРОВЫВАЮ </span>
                <motion.span
                  whileHover={{ scale: 1.12, rotate: -3 }}
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 align-middle mx-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-900 font-bold cursor-default"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-700" />
                  <span>SQL · DWH · 1С</span>
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 align-middle mx-1 px-3 py-1 rounded-full bg-[#0A0B0E] text-[#F5F5F0] text-xs font-mono font-bold cursor-default shadow-sm"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>BI · PYTHON · AI</span>
                </motion.span>
                <br />
                <span>МЕТРИКИ И ПРОЦЕССЫ ДЛЯ ПРИНЯТИЯ РЕШЕНИЙ</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-3 max-w-xl">
                Превращаю сырые данные из 1С, Битрикс24 и Kaspi в прозрачные витрины данных, интерактивные P&L-дашборды и автоматизированные конвейеры.
              </p>
            </motion.div>
          </div>

          {/* Right 5 Columns: Tall "Обсудим вашу задачу" Editorial Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-white via-[#F5F5F0] to-[#EAEAE2] border border-slate-300 shadow-md p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden min-h-[380px] group"
          >
            {/* Animated Pulsing Blueprint Rings on Right */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full border border-dashed border-slate-400/60 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity"
            >
              <div className="w-44 h-44 rounded-full border border-slate-400/50 flex items-center justify-center">
                <Terminal className="w-14 h-14 text-slate-500/40" />
              </div>
            </motion.div>

            <div className="relative z-10 max-w-xs">
              <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-slate-600 font-bold mb-3">
                ПРЯМОЙ КОНТАКТ • АЛМАТЫ / ГИБРИД
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#0A0B0E] tracking-tight leading-tight">
                Обсудим вашу задачу
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
                Построю систему метрик и BI-дашборд, настрою витрины DWH и интеграцию 1С / Битрикс24 / Kaspi или запущу AI-автоматизацию.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                data-cursor-label="КОНТАКТ ↓"
                onClick={scrollToContact}
                className="px-6 py-3 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span>Связаться</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
              <a
                href="https://wa.me/77786078732"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="WHATSAPP ↗"
                className="px-4 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0A0B0E] border border-slate-300 font-mono font-bold text-xs transition-colors shadow-xs"
              >
                WhatsApp ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3. "ЭКОСИСТЕМА ИНТЕГРАЦИЙ" Infinite Marquee Ticker */}
        <div className="mt-20 sm:mt-28 pt-10 border-t border-black/15">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-[#0A0B0E]">
              ЭКОСИСТЕМА ДАННЫХ И ИНТЕГРАЦИЙ
            </h3>

            <button
              type="button"
              onClick={() => setMarqueePaused((prev) => !prev)}
              aria-pressed={marqueePaused}
              aria-label={marqueePaused ? 'Возобновить бегущую строку' : 'Остановить бегущую строку'}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              {marqueePaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{marqueePaused ? 'Старт' : 'Пауза'}</span>
            </button>
          </div>

          <div className="relative overflow-hidden py-5 border-y border-black/15 bg-white/60">
            <div
              className={`editorial-marquee-track items-center gap-10 sm:gap-16 ${
                marqueePaused ? 'editorial-marquee-paused' : ''
              }`}
            >
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-center gap-10 sm:gap-16 shrink-0"
                >
                  <span className="font-display font-extrabold text-xl sm:text-3xl tracking-wider uppercase text-slate-700 hover:text-[#0A0B0E] transition-colors">
                    {item}
                  </span>
                  <span className="text-slate-400 font-mono text-lg" aria-hidden="true">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Scroll-Driven Kinetic Dual Filled + Outlined Stroke Headline */}
        <div className="mt-16 sm:mt-28 text-center select-none overflow-hidden">
          <motion.div
            style={{
              x: topHeadlineX,
              fontSize: 'clamp(2.1rem, 10.5vw, 9.5rem)',
            }}
            className="font-display font-black uppercase tracking-[-0.03em] leading-[0.9] text-[#0A0B0E] max-sm:!transform-none"
          >
            DATA & BI
          </motion.div>
          <motion.div
            style={{
              x: bottomHeadlineX,
              fontSize: 'clamp(2.1rem, 10.5vw, 9.5rem)',
            }}
            className="font-display font-black uppercase tracking-[-0.03em] leading-[0.9] text-outline-stroke mt-1 cursor-default max-sm:!transform-none"
          >
            ИНТЕГРАТОР
          </motion.div>

          {/* Animated Scroll-Linked Progress Bar */}
          <div className="mt-8 w-full h-3 sm:h-4 rounded-sm bg-black/10 relative overflow-hidden">
            <motion.div
              style={{ scaleX: barScaleX, transformOrigin: 'left center' }}
              className="absolute inset-0 bg-[#0A0B0E]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
