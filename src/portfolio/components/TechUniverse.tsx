import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Layout,
  Bot,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

interface TechCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  badge: string;
  accentColor: string;
  items: { title: string; desc: string }[];
}

const techCategories: TechCategory[] = [
  {
    id: 'backend',
    title: 'Backend & Интеграции',
    icon: Server,
    badge: 'Python • 1C • API',
    accentColor: 'from-cyan-500 to-blue-500',
    items: [
      {
        title: 'Python & FastAPI',
        desc: 'Разработка высокоскоростных API, парсинг витрин, фоновые планировщики (APScheduler), асинхронные скрипты демпинга.',
      },
      {
        title: 'Kaspi API & XML Feed',
        desc: 'Автоматическая генерация валидных XML прайс-листов под стандарты merchant.kaspi.kz, работа через Cloudflare Tunnel.',
      },
      {
        title: '1С:Предприятие 8.3',
        desc: 'Интеграция по протоколу CommerceML 3.1: двусторонняя синхронизация номенклатуры, цен, складских остатков и заказов.',
      },
      {
        title: 'Node.js / Express',
        desc: 'Микросервисы, REST API, обработка вебхуков, multi-tenant базы данных (SQLite WAL, JSON, PostgreSQL).',
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & UI Архитектура',
    icon: Layout,
    badge: 'Next.js 16 • React 19',
    accentColor: 'from-violet-500 to-indigo-500',
    items: [
      {
        title: 'Next.js 16 & React 19',
        desc: 'App Router, серверные компоненты (RSC), Turbopack, максимальная скорость отдачи интерфейсов.',
      },
      {
        title: 'TypeScript 5',
        desc: 'Строгая типизация DTO, интерфейсов интеграций, моделей заказов и финансовых отчетов.',
      },
      {
        title: 'Tailwind CSS',
        desc: 'Современный UI: эффекты стекла (Glassmorphism), поддержка темной и светлой темы, чистая компонентная база.',
      },
      {
        title: 'UX & Мобильность',
        desc: 'Mobile-first адаптивность под планшеты складских терминалов и смартфоны предпринимателей.',
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI, Данные & Деплой',
    icon: Bot,
    badge: 'Gemini • LLM • DevOps',
    accentColor: 'from-emerald-500 to-teal-500',
    items: [
      {
        title: 'LLM & AI-Агенты',
        desc: 'Интеграция моделей OpenAI, Claude, Gemini Vision и DeepSeek с интеллектуальной fallback-маршрутизацией при исчерпании лимитов.',
      },
      {
        title: 'Telegram-Боты & Алерты',
        desc: 'Автономные боты на aiogram 3 для мгновенных уведомлений селлеров об изменении цен конкурентов и статусах заказов.',
      },
      {
        title: 'Валидация данных',
        desc: 'Автоматическая валидация товарных карточек маркетплейсов, аудит каталогов e-commerce и контроль маржинальности.',
      },
      {
        title: 'Боевой Деплой',
        desc: 'Развертывание веб-сервисов на Render, Vercel, Cloudflare Tunnels, настройка переменных окружения и CI/CD.',
      },
    ],
  },
];

export function TechUniverse() {
  return (
    <section id="skills" className="relative px-4 sm:px-6 py-24 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>ТЕХНИЧЕСКИЕ КОМПЕТЕНЦИИ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          Практический Стек Без Воды
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 font-medium">
          Инструменты, которые я ежедневно использую для решения реальных коммерческих задач селлеров и B2B-компаний.
        </p>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#0F131D]/80 border border-white/10 hover:border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wide">
                      {cat.badge}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="space-y-1">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pl-5.5">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Подтверждено в репозиториях</span>
                <span className="text-emerald-400">100% Практика</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
