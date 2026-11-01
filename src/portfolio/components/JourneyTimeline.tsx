import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  ShieldCheck,
  CheckCircle,
  Code2,
  Cpu,
  Layers,
  Globe,
  Phone,
  Mail,
  Github,
} from 'lucide-react';

export function JourneyTimeline() {
  const principles = [
    {
      icon: Code2,
      title: 'Готовые к запуску продукты вместо теории',
      desc: 'Вместо абстрактных учебных примеров я создаю коммерческие сервисы: от автоматического репрайсера для продавцов Kaspi до сквозного финансового учета для IT-агентства.',
    },
    {
      icon: Layers,
      title: 'Глубокие B2B-интеграции и учёт',
      desc: 'Построение шлюзов обмена по стандарту CommerceML 3.1 с 1С:Предприятие 8.3, интеграция с Kaspi XML и API маркетплейсов для надежной синхронизации остатков и цен.',
    },
    {
      icon: Cpu,
      title: 'Прикладной AI для автоматизации рутины',
      desc: 'Внедрение практических нейросетевых решений: OCR-распознавание формул и графиков через Gemini Vision, автоответы клиентам и алерты в Telegram 24/7.',
    },
    {
      icon: ShieldCheck,
      title: 'Открытый код и прозрачность',
      desc: 'Исходный код моих проектов полностью открыт на GitHub, а веб-сервисы развернуты на надежном облачном хостинге Render в боевом режиме.',
    },
  ];

  return (
    <section id="experience" className="relative px-4 sm:px-6 py-24 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>ОБО МНЕ И ПРИНЦИПЫ РАБОТЫ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
          Инженерный Подход
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 font-medium">
          Честные принципы разработки: надёжность, реальная польза для бизнеса и код без лишней шелухи.
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="rounded-3xl bg-[#0F131D]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl mb-12 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-xl text-white">
                A
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Alim</h3>
                <p className="text-cyan-400 font-mono text-xs">
                  Fullstack Developer • AI Systems Engineer
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              🇰🇿 Казахстан (Алматы / Астана / Удалённо)
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Доступен для проектов
            </span>
          </div>
        </div>

        {/* Bio Text */}
        <div className="pt-6 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Я разработчик с фокусом на реальные прикладные задачи: электронную коммерцию, B2B-сервисы, интеграции с Kaspi.kz и 1С, а также внедрение прикладных AI-решений для автоматизации рутины.
          </p>
          <p className="text-slate-400 text-sm">
            Вместо абстрактных учебных примеров я создаю готовые к запуску продукты: от репрайсера с защитой маржи селлеров до сквозного финансового учета для IT-агентства. Мой код открыт на GitHub, а продакшен-демо развернуты на Render и Vercel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div>
              <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Языки</span>
              <span className="text-sm font-semibold text-white">Казахский, Русский, Английский</span>
            </div>
            <div>
              <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Формат работы</span>
              <span className="text-sm font-semibold text-white">Удаленно / Full-time / Проекты</span>
            </div>
            <div>
              <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Локация</span>
              <span className="text-sm font-semibold text-white">Казахстан</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {principles.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#0F131D]/60 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
