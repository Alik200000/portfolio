import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Bot,
  ShoppingBag,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

interface EditorialToolCard {
  categoryTag: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  icon: React.ElementType;
}

const editorialTools: EditorialToolCard[] = [
  {
    categoryTag: 'ERP & CRM ИНТЕГРАЦИИ',
    code: '01 / ENTERPRISE',
    title: '1С:ПРЕДПРИЯТИЕ 8.3 & БИТРИКС24',
    subtitle: 'Standard OData REST • CommerceML 3.1 • Batch Webhook',
    description:
      'Двусторонняя синхронизация контрагентов с проверкой БИН/ИИН, номенклатуры, складских остатков и заказов. Генерация счетов на оплату, накладных З-2 и актов Р-1.',
    specs: ['OData v3 JSON', 'CommerceML 3.1 XML', 'Дедупликация БИН/ИИН', 'Печатные формы РК'],
    icon: Layers,
  },
  {
    categoryTag: 'МАРКЕТПЛЕЙСЫ И ФИНАНСЫ',
    code: '02 / E-COMMERCE',
    title: 'KASPI.KZ & WILDBERRIES API',
    subtitle: 'Авторепрайсер Топ-1 • Kaspi Pay • ОФД Webkassa',
    description:
      'Алгоритмическое удержание первой строчки в Kaspi Магазине с жесткой защитой минимальной стоп-цены. Расчет скорости продаж (burn rate) и защита от Out-of-Stock на WB.',
    specs: ['Kaspi XML 2.0 Feed', 'Защита маржи селлера', 'WB Seller API v3', 'HMAC Вебхуки оплат'],
    icon: ShoppingBag,
  },
  {
    categoryTag: 'ПРИКЛАДНОЙ ИИ И БОТЫ',
    code: '03 / AI & BOTS',
    title: 'GEMINI API, PYTHON & WHATSAPP',
    subtitle: 'Gemini Vision OCR • aiogram 3 • Wazzup24 / Green-API',
    description:
      'Мультимодальное распознавание первичных документов и схем, ИИ-аудит звонков менеджеров по скрипту продаж и автоматическая отправка PDF-счетов в WhatsApp и Telegram.',
    specs: ['Gemini 2.5 Pro / Flash', 'aiogram 3 AsyncIO', 'WhatsApp Wazzup24', 'ИИ-Аудит звонков'],
    icon: Bot,
  },
  {
    categoryTag: 'FULLSTACK & ТАБЛИЦЫ',
    code: '04 / WEB & DATA',
    title: 'NEXT.JS 16, FASTAPI & SHEETS',
    subtitle: 'React 19 • TypeScript 5 • Google Sheets & Excel (.xlsx)',
    description:
      'Быстрые B2B-порталы и дашборды маржинальности P&L. Пакетная выгрузка отчетов в Google Sheets API v4 и Excel с сохранением ведущих нулей БИН/ИИН и штрихкодов.',
    specs: ['Next.js 16 & FastAPI', 'Google Sheets Batch', 'openpyxl UTF-8-SIG', 'Render & Docker CI'],
    icon: Server,
  },
];

const workPillars = [
  {
    num: '01',
    title: 'Готовые к запуску системы вместо теории',
    desc: 'Фокус на прикладной окупаемости: удержание кнопки «Купить» в Kaspi, мгновенная смета P&L и исключение ручного ввода между CRM и 1С.',
  },
  {
    num: '02',
    title: 'Учёт специфики рынка Казахстана',
    desc: 'Валидация 12-значных БИН/ИИН, КНП и ИИК (IBAN), НДС 12%, сумма прописью в тенге и соответствие Закону РК «О персональных данных».',
  },
  {
    num: '03',
    title: 'Защита от блокировок и дублей',
    desc: 'Соблюдение лимитов API (batch-запросы 2 req/s в Битрикс24, 60 req/min в Google Sheets), идемпотентность платежей и защита от формульных инъекций.',
  },
  {
    num: '04',
    title: 'Открытый код и проверка 23/23',
    desc: 'Реальные репозитории на GitHub (@Alik200000), рабочие демо на Render и автоматический аудит безопасности перед каждым релизом.',
  },
];

export function TechUniverse() {
  return (
    <section
      id="skills"
      className="relative bg-[#F3F3EE] text-[#0A0B0E] py-20 sm:py-28 px-4 sm:px-8 border-b border-black/15"
    >
      <div className="max-w-[1380px] mx-auto">
        {/* Top Header Row matching 00:35-00:37 (ТЕХНИКА | Описание справа) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2
            className="font-display font-black uppercase tracking-[-0.035em] leading-none text-[#0A0B0E]/85"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
          >
            ТЕХНИКА
          </h2>
          <p className="text-xs sm:text-sm text-[#0A0B0E]/75 max-w-sm leading-relaxed font-medium">
            Стек, протоколы и инженерный инструментарий — всё необходимое, чтобы гарантировать стабильный обмен данными, защиту маржи и высокую скорость работы.
          </p>
        </div>

        {/* 4-Column Editorial Tool Cards (00:36-00:37 reference: SONY A7C II | DJI RS 4 | DJI MIC 2 | MACBOOK AIR M4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {editorialTools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.015 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: idx * 0.07 }}
                className="group rounded-2xl bg-white border border-black/10 p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:border-black/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Visual Preview Box (Monochrome Dark Plate like camera/laptop photos in 00:36) */}
                  <div className="w-full aspect-[4/3] rounded-xl bg-[#12141A] text-white p-4 mb-5 flex flex-col justify-between relative overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent scanline-sweep"
                    />
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>{tool.code}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="relative z-10 my-auto flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-white group-hover:text-[#07080B] border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="relative z-10 text-[10px] font-mono text-neutral-300 truncate">
                      {tool.subtitle}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#0A0B0E]/8 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0A0B0E]/75 mb-2">
                    {tool.categoryTag}
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-black text-base sm:text-lg text-[#0A0B0E] uppercase tracking-tight mb-2">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#0A0B0E]/75 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                {/* Spec Pills */}
                <div className="pt-3 border-t border-black/10 flex flex-wrap gap-1.5">
                  {tool.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 rounded bg-[#F3F3EE] border border-black/10 font-mono text-[10px] font-semibold text-[#0A0B0E]/80"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom 4 Numbered Pillars Strip (00:38 top bar reference) */}
        <div className="mt-14 pt-8 border-t border-black/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workPillars.map((pillar) => (
            <div key={pillar.num} className="space-y-1.5">
              <div className="font-mono text-xs font-bold text-[#0A0B0E]/50">
                /{pillar.num}
              </div>
              <h4 className="font-display font-bold text-sm text-[#0A0B0E]">
                {pillar.title}
              </h4>
              <p className="text-xs text-[#0A0B0E]/70 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
