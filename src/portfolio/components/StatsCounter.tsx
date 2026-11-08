import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Cpu, Database, Pause, Play, Terminal } from 'lucide-react';

const MARQUEE_ITEMS = [
  '1С:ПРЕДПРИЯТИЕ 8.3',
  'БИТРИКС24 CRM',
  'KASPI MERCHANT',
  'WILDBERRIES API',
  'GEMINI VISION AI',
  'NEXT.JS 16 & FASTAPI',
  'GOOGLE SHEETS & EXCEL',
  'WAZZUP24 & GREEN-API',
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

  // 00:06-00:09 Split Reveal: ОБО moves left, МНЕ moves right, center card scales down smoothly
  const oboX = useTransform(smoothProgress, [0.05, 0.28], [70, 0]);
  const mneX = useTransform(smoothProgress, [0.05, 0.28], [-70, 0]);
  const centerCardScale = useTransform(smoothProgress, [0.05, 0.28], [1.12, 1]);

  // 00:14 Dual Headline kinetic horizontal parallax
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
      className="relative z-20 bg-[#07080B] text-white pt-20 sm:pt-28 pb-16 overflow-hidden border-b border-white/10"
    >
      {/* Subtle monochrome architectural grid texture backdrop (00:06-00:09 reference) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 22%, rgba(255,255,255,0.4) 0%, transparent 60%), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 80px)',
        }}
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 relative z-10">
        {/* 1. Scroll-Driven Split Editorial Reveal: ОБО [Portrait/Profile Card] МНЕ (00:07-00:09 reference) */}
        <div className="relative py-8 sm:py-14 flex flex-col items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4">
            {/* Left Giant Word: ОБО */}
            <motion.div
              style={{ x: oboX }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 text-center lg:text-right"
            >
              <span
                className="font-display font-black uppercase tracking-[-0.04em] leading-none text-white select-none inline-block"
                style={{ fontSize: 'clamp(3.75rem, 9.5vw, 8.2rem)' }}
              >
                ОБО
              </span>
            </motion.div>

            {/* Center Vertical Monochromatic Editorial Card with Scanline Sweep */}
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
                className="w-full max-w-[330px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-neutral-800/90 via-neutral-900 to-[#0A0C10] border border-white/20 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl"
              >
                {/* Animated Scanline Sweep */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent scanline-sweep"
                />

                {/* Monochromatic architectural grid lines */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />

                {/* Top Card Status */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                  <span>ALIM • KZ</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Center Monogram & Terminal Blueprint */}
                <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    className="w-20 h-20 rounded-2xl bg-white text-[#07080B] flex items-center justify-center font-display font-black text-4xl tracking-tighter shadow-xl mb-4"
                  >
                    A
                  </motion.div>
                  <div className="font-display font-extrabold text-xl text-white tracking-tight">
                    Алим (Alik200000)
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-1">
                    Fullstack & AI Automation Engineer
                  </div>
                  <div className="mt-4 w-full rounded-xl bg-black/60 border border-white/10 p-3 text-left font-mono text-[11px] text-neutral-300 space-y-1">
                    <div className="text-neutral-500">// Специализация</div>
                    <div>• 1С:Предприятие 8.3 & Битрикс24</div>
                    <div>• Kaspi.kz & Wildberries API</div>
                    <div>• Gemini AI & Next.js 16</div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-neutral-400">
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
              className="lg:col-span-4 text-center lg:text-left"
            >
              <span
                className="font-display font-black uppercase tracking-[-0.04em] leading-none text-white select-none inline-block"
                style={{ fontSize: 'clamp(3.75rem, 9.5vw, 8.2rem)' }}
              >
                МНЕ
              </span>
            </motion.div>
          </div>

          {/* Caption Line below ОБО МНЕ (00:09 reference) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pt-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <span>АЛИМ • РАЗРАБОТЧИК B2B-СИСТЕМ И ИНТЕГРАЦИЙ</span>
            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="GITHUB ↗"
              className="inline-flex items-center gap-1.5 text-white hover:text-neutral-300 transition-colors"
            >
              <span>ОТКРЫТЫЙ КОД НА GITHUB (ALIK200000)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. Asymmetric Bento Grid with Interactive Inline Pill Capsules (00:10-00:11 reference) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: 2 Top Stat Cards + 1 Bottom Statement Card */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Stat Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.3)' }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="rounded-3xl bg-[#111319] border border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[210px]"
            >
              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                  6+
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1">
                  боевых проектов в портфолио
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-6">
                Коммерческие B2B-сервисы, репрайсеры Kaspi, шлюзы 1С CommerceML 3.1, AI-боты и расширения с открытым кодом.
              </p>
            </motion.div>

            {/* Stat Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.3)' }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.08 }}
              className="rounded-3xl bg-[#111319] border border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[210px]"
            >
              <div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                  4
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1">
                  ключевых направления
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-6">
                B2B E-Commerce (Kaspi/WB), интеграции 1С:Предприятие & Битрикс24, прикладные AI-агенты и Fullstack веб-сервисы.
              </p>
            </motion.div>

            {/* Bottom Wide Statement Card with Interactive Inline Pill Badges (00:11 reference) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.28)' }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.14 }}
              className="sm:col-span-2 rounded-3xl bg-[#111319] border border-white/10 p-6 sm:p-8 flex flex-col justify-center"
            >
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[1.2] text-white">
                <span>СОЗДАЮ </span>
                <motion.span
                  whileHover={{ scale: 1.12, rotate: -3 }}
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 align-middle mx-1 px-3 py-1 rounded-full bg-white/10 border border-white/25 text-xs font-mono text-neutral-100 cursor-default"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1С · CRM</span>
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 align-middle mx-1 px-3 py-1 rounded-full bg-white text-[#07080B] text-xs font-mono font-bold cursor-default shadow-md"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AI · API</span>
                </motion.span>
                <br />
                <span>СИСТЕМЫ, КОТОРЫЕ ПЕРЕДАЮТ БИЗНЕСУ БОЛЬШЕ</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl">
                Вместо шаблонных сайтов — двусторонняя синхронизация с 1С и Битрикс24, автоматическое удержание Топ-1 в Kaspi Магазине и ИИ-контроль отделов продаж.
              </p>
            </motion.div>
          </div>

          {/* Right 5 Columns: Tall "Обсудим ваш проект" Editorial Feature Card (00:10-00:11 reference) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#181B24] via-[#111319] to-[#0B0C10] border border-white/15 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden min-h-[380px] group"
          >
            {/* Animated Pulsing Blueprint Rings on Right */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full border border-dashed border-white/15 flex items-center justify-center pointer-events-none opacity-45 group-hover:opacity-75 transition-opacity"
            >
              <div className="w-44 h-44 rounded-full border border-white/20 flex items-center justify-center">
                <Terminal className="w-14 h-14 text-white/35" />
              </div>
            </motion.div>

            <div className="relative z-10 max-w-xs">
              <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-3">
                ПРЯМОЙ КОНТАКТ • БЕЗ ПОСРЕДНИКОВ
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Обсудим вашу задачу
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-3">
                Разработаю архитектуру интеграции 1С / Битрикс24 / Kaspi, запущу Telegram-бота или соберу современное веб-приложение под ваш бизнес.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                data-cursor-label="КОНТАКТ ↓"
                onClick={scrollToContact}
                className="px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-[#07080B] font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer shadow-xl"
              >
                <span>Связаться</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
              <a
                href="https://wa.me/77786078732"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="WHATSAPP ↗"
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-mono text-xs transition-colors"
              >
                WhatsApp ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3. "ЭКОСИСТЕМА ИНТЕГРАЦИЙ" Infinite Marquee Ticker (00:12-00:13 reference) */}
        <div className="mt-20 sm:mt-28 pt-10 border-t border-white/10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              ЭКОСИСТЕМА ИНТЕГРАЦИЙ
            </h3>

            {/* Pause/Play mechanism required by modern-web-guidance `motion` accessibility rule */}
            <button
              type="button"
              onClick={() => setMarqueePaused((prev) => !prev)}
              aria-pressed={marqueePaused}
              aria-label={marqueePaused ? 'Возобновить бегущую строку' : 'Остановить бегущую строку'}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {marqueePaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{marqueePaused ? 'Старт' : 'Пауза'}</span>
            </button>
          </div>

          <div className="relative overflow-hidden py-5 border-y border-white/10">
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
                  <span className="font-display font-extrabold text-xl sm:text-3xl tracking-wider uppercase text-neutral-300 hover:text-white transition-colors">
                    {item}
                  </span>
                  <span className="text-neutral-600 font-mono text-lg" aria-hidden="true">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Scroll-Driven Kinetic Dual Filled + Outlined Stroke Headline (00:14 reference) */}
        <div className="mt-20 sm:mt-28 text-center select-none overflow-hidden">
          <motion.div
            style={{
              x: topHeadlineX,
              fontSize: 'clamp(2.8rem, 11vw, 9.5rem)',
            }}
            className="font-display font-black uppercase tracking-[-0.03em] leading-[0.9] text-white"
          >
            FULLSTACK
          </motion.div>
          <motion.div
            style={{
              x: bottomHeadlineX,
              fontSize: 'clamp(2.8rem, 11vw, 9.5rem)',
            }}
            className="font-display font-black uppercase tracking-[-0.03em] leading-[0.9] text-outline-stroke mt-1 cursor-default"
          >
            ИНТЕГРАТОР
          </motion.div>

          {/* Animated Scroll-Linked Progress Bar from 00:14 */}
          <div className="mt-8 w-full h-3 sm:h-4 rounded-sm bg-white/15 relative overflow-hidden">
            <motion.div
              style={{ scaleX: barScaleX, transformOrigin: 'left center' }}
              className="absolute inset-0 bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
