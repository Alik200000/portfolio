import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Cpu, Database, Github, Layers, Pause, Play, ShieldCheck, Terminal } from 'lucide-react';

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

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="experience"
      className="relative z-20 bg-[#07080B] text-white pt-20 sm:pt-28 pb-16 overflow-hidden border-b border-white/10"
    >
      {/* Subtle monochrome forest/architectural grid texture backdrop (00:06-00:09 reference) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 22%, rgba(255,255,255,0.35) 0%, transparent 60%), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 80px)',
        }}
      />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 relative z-10">
        {/* 1. Split Editorial Reveal: ОБО [Portrait/Profile Card] МНЕ (00:07-00:09 reference) */}
        <div className="relative py-8 sm:py-14 flex flex-col items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4">
            {/* Left Giant Word: ОБО */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 text-center lg:text-right"
            >
              <span
                className="font-display font-black uppercase tracking-[-0.04em] leading-none text-white select-none"
                style={{ fontSize: 'clamp(3.75rem, 9.5vw, 8.2rem)' }}
              >
                ОБО
              </span>
            </motion.div>

            {/* Center Vertical Monochromatic Editorial Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex justify-center"
            >
              <div className="w-full max-w-[330px] aspect-[4/5] rounded-2xl bg-gradient-to-b from-neutral-800/90 via-neutral-900 to-[#0A0C10] border border-white/15 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
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
                  <div className="w-20 h-20 rounded-2xl bg-white text-[#07080B] flex items-center justify-center font-display font-black text-4xl tracking-tighter shadow-xl mb-4">
                    A
                  </div>
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
              </div>
            </motion.div>

            {/* Right Giant Word: МНЕ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 text-center lg:text-left"
            >
              <span
                className="font-display font-black uppercase tracking-[-0.04em] leading-none text-white select-none"
                style={{ fontSize: 'clamp(3.75rem, 9.5vw, 8.2rem)' }}
              >
                МНЕ
              </span>
            </motion.div>
          </div>

          {/* Caption Line below ОБО МНЕ (00:09 reference: АДИЛЬ ТЕМИРБАЕВ | 3+ ГОДА В ВИДЕО) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pt-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <span>АЛИМ • РАЗРАБОТЧИК B2B-СИСТЕМ И ИНТЕГРАЦИЙ</span>
            <a
              href="https://github.com/Alik200000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white hover:text-neutral-300 transition-colors"
            >
              <span>ОТКРЫТЫЙ КОД НА GITHUB (ALIK200000)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. Asymmetric Bento Grid with Inline Pill Capsules inside Typography (00:10-00:11 reference) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left 7 Columns: 2 Top Stat Cards + 1 Bottom Statement Card */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Stat Card 1 */}
            <div className="rounded-3xl bg-[#111319] border border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[210px]">
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
            </div>

            {/* Stat Card 2 */}
            <div className="rounded-3xl bg-[#111319] border border-white/10 p-6 sm:p-8 flex flex-col justify-between min-h-[210px]">
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
            </div>

            {/* Bottom Wide Statement Card with Inline Pill Badges inside Typography (00:11 reference) */}
            <div className="sm:col-span-2 rounded-3xl bg-[#111319] border border-white/10 p-6 sm:p-8 flex flex-col justify-center">
              <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[1.18] text-white">
                <span>СОЗДАЮ </span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 align-middle mx-1 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-neutral-200"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1С · CRM</span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 align-middle mx-1 px-3 py-1 rounded-full bg-white text-[#07080B] text-xs font-mono font-bold"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AI · API</span>
                </span>
                <br />
                <span>СИСТЕМЫ, КОТОРЫЕ ПЕРЕДАЮТ БИЗНЕСУ БОЛЬШЕ</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-3 max-w-xl">
                Вместо шаблонных сайтов — двусторонняя синхронизация с 1С и Битрикс24, автоматическое удержание Топ-1 в Kaspi Магазине и ИИ-контроль отделов продаж.
              </p>
            </div>
          </div>

          {/* Right 5 Columns: Tall "Обсудим ваш проект" Editorial Feature Card (00:10-00:11 reference) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#181B24] via-[#111319] to-[#0B0C10] border border-white/15 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
            {/* Decorative Monochrome Blueprint Visual on Right */}
            <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full border border-white/10 flex items-center justify-center pointer-events-none opacity-35">
              <div className="w-44 h-44 rounded-full border border-dashed border-white/20 flex items-center justify-center">
                <Terminal className="w-14 h-14 text-white/30" />
              </div>
            </div>

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
              <button
                onClick={scrollToContact}
                className="px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-[#07080B] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xl"
              >
                <span>Связаться</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/77786078732"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-mono text-xs transition-colors"
              >
                WhatsApp ↗
              </a>
            </div>
          </div>
        </div>

        {/* 3. "ГДЕ РАБОТАЮТ МОИ РЕШЕНИЯ" Infinite Marquee Ticker (00:12-00:13 reference) */}
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

        {/* 4. Giant Dual Filled + Outlined Stroke Headline (00:14 reference: ВИДЕОГРАФ / РЕЖИССЁР) */}
        <div className="mt-20 sm:mt-28 text-center select-none">
          <div
            className="font-display font-black uppercase tracking-[-0.03em] leading-[0.9] text-white"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 9.5rem)' }}
          >
            FULLSTACK
          </div>
          <div
            className="font-display font-black uppercase tracking-[-0.03em] leading-[0.9] text-outline-stroke mt-1"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 9.5rem)' }}
          >
            ИНТЕГРАТОР
          </div>

          {/* Horizontal Editorial Divider Bar from 00:14 */}
          <div className="mt-8 w-full h-3 sm:h-4 rounded-sm bg-white/90 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-neutral-400/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
