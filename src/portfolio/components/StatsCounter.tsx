import React from 'react';
import { motion } from 'framer-motion';
import { Github, Server, Layers, Bot, Activity } from 'lucide-react';

interface FactItem {
  icon: React.ElementType;
  badge: string;
  title: string;
  detail: string;
  color: string;
}

const facts: FactItem[] = [
  {
    icon: Github,
    badge: 'Открытый код',
    title: 'Реальные репозитории',
    detail: 'Код проектов открыт на GitHub (Alik200000)',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    icon: Server,
    badge: 'Render & Vercel',
    title: 'Боевой продакшн',
    detail: 'Работающие веб-сервисы и API с реальным uptime',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Layers,
    badge: 'B2B Интеграции',
    title: 'Kaspi & 1С:Предприятие',
    detail: 'Шлюзы обмена по CommerceML 3.1 и XML-фиды',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Bot,
    badge: 'Прикладной AI',
    title: 'AI-Агенты & Gemini Vision',
    detail: 'Автоматизация маркетплейсов и OCR для EdTech',
    color: 'from-amber-500 to-orange-500',
  },
];

export function StatsCounter() {
  return (
    <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-4 mb-24">
      {/* Container Frame */}
      <div className="relative rounded-3xl bg-[#090B10]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
        {/* Header Indicator */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="uppercase tracking-wider">Подтверждённый практический стек и опыт</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Без вымышленных цифр</span>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.title}
                className="flex flex-col space-y-2.5 group"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${fact.color} p-[1px] shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full bg-[#0D111A] rounded-[11px] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wide font-mono">
                    {fact.badge}
                  </span>
                </div>

                <div className="text-xl sm:text-2xl text-white font-bold tracking-tight">
                  {fact.title}
                </div>

                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {fact.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
