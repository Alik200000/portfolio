import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Check,
  Layers,
  ArrowUpRight,
  RotateCw,
  Pause,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ProjectDetailModal, DetailedProject } from './ProjectDetailModal';

interface ShowcaseProject extends DetailedProject {
  category: 'b2b' | 'ai' | 'fullstack';
  shortCode: string;
  year: string;
  accentGradient: string;
  points: string[];
  badges: string[];
}

const projects: ShowcaseProject[] = [
  {
    id: 'smart-digital-ops',
    title: 'Smart Digital Ops & Profit Intelligence',
    shortCode: 'ERP / P&L CORE',
    year: '2026',
    category: 'fullstack',
    categoryLabel: 'В продакшене (Live на Render)',
    accentGradient: 'from-neutral-800 via-slate-900 to-black',
    tagline:
      'Сквозная операционная ERP/CRM система автоматизации бизнес-процессов и финансово-управленческого учета для компании Smart Digital Group.',
    points: [
      'Автоматизированный цикл: Канбан-воронка лидов, AI-генератор смет и КП за 2 секунды, авторазворачивание проекта при закрытии сделки.',
      'Себестоимость & P&L: логирование часов команды по грейдам, учет прямых затрат (токены OpenAI, сервера), предотвращение кассовых разрывов.',
      'Деплой: развернут и стабильно работает на платформе Render в боевом режиме.',
    ],
    badges: ['Node.js', 'Express', 'REST API', 'Render Production', 'P&L Analytics'],
    architectureNodes: ['Канбан-воронка сделок', 'AI Cost & P&L Engine', 'Express REST API', 'Render Production'],
    techSpec: {
      runtime: 'Node.js 20 LTS',
      protocol: 'REST / JSON HTTPS',
      storage: 'PostgreSQL & Cache',
      security: 'JWT & Strict CORS',
    },
    codeSnippet: {
      language: 'typescript',
      title: 'Расчет чистой маржинальности и себестоимости сделки',
      code: `const calculateProjectMargin = (deal: Deal, logs: WorkLog[]) => {
  const directLaborCost = logs.reduce((acc, log) => acc + log.hours * gradeRates[log.grade], 0);
  const directInfrastructureCost = deal.openAiTokensCost + deal.serverHostingCost;
  const netProfit = deal.budget - (directLaborCost + directInfrastructureCost);
  return { netProfit, marginPercent: ((netProfit / deal.budget) * 100).toFixed(1) };
};`,
    },
    githubUrl: 'https://github.com/Alik200000/smart-digital-ops-core',
    liveUrl: 'https://smart-digital-ops-core.onrender.com',
  },
  {
    id: 'alatau-food-trade',
    title: 'Alatau Food Trade (HoReCa B2B & 1С)',
    shortCode: '1С COMMERCEML 3.1',
    year: '2026',
    category: 'b2b',
    categoryLabel: 'B2B E-Commerce & 1С:Предприятие 8.3',
    accentGradient: 'from-stone-800 via-neutral-900 to-black',
    tagline:
      'Цифровая оптово-розничная платформа поставок продуктов питания и сырья для ресторанов, отелей и кондитерских г. Алматы.',
    points: [
      'Стек: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5 + Tailwind.',
      'Интеграция с 1С: шлюз обмена данными по стандарту CommerceML 3.1 с 1С:Предприятие 8.3 (УТ для Казахстана) — синхронизация цен, остатков и заказов.',
      'B2B-кабинет: управление отсрочкой платежей, выгрузка ЭСФ и актов сверки, автоскидки от объёма.',
    ],
    badges: ['Next.js 16', 'React 19', 'TypeScript', '1С:Предприятие 8.3', 'CommerceML 3.1', 'HoReCa'],
    architectureNodes: ['1C:Предприятие 8.3', 'CommerceML 3.1 Gateway', 'Next.js 16 SSR Hub', 'B2B Клиентский портал'],
    techSpec: {
      runtime: 'Next.js 16 / React 19',
      protocol: 'CommerceML 3.1 / XML',
      storage: 'PostgreSQL + 1C Репликация',
      security: 'Role-based B2B Auth',
    },
    codeSnippet: {
      language: 'xml',
      title: 'Синхронизация каталога и цен CommerceML 3.1 с 1С',
      code: `<КоммерческаяИнформация ВерсияСхемы="3.1" ДатаФормирования="2026-11-01">
  <Каталог СодержитТолькоИзменения="true">
    <Товары>
      <Товар>
        <Ид>9f8a3c4b-1234-5678-9abc-def012345678</Ид>
        <Артикул>HO-7721</Артикул>
        <Наименование>Сыр Маскарпоне 80% (Италия) 500г</Наименование>
        <Цены><Цена><ЦенаЗаЕдиницу>2850</ЦенаЗаЕдиницу><Валюта>KZT</Валюта></Цена></Цены>
        <Остаток>480</Остаток>
      </Товар>
    </Товары>
  </Каталог>
</КоммерческаяИнформация>`,
    },
    githubUrl: 'https://github.com/Alik200000/alatau-food-trade',
  },
  {
    id: 'kaspi-repricer',
    title: 'Kaspi Repricer Enterprise',
    shortCode: 'KASPI TOP-1 ENGINE',
    year: '2026',
    category: 'b2b',
    categoryLabel: 'B2B SaaS • Kaspi.kz Marketplace',
    accentGradient: 'from-zinc-800 via-neutral-900 to-black',
    tagline: 'Автоматический репрайсер и интеллектуальный демпер цен для продавцов Kaspi Магазина.',
    points: [
      'Захват кнопки «Купить» (Топ-1): алгоритм непрерывно сканирует цены конкурентов и выставляет цену на 1 ₸ ниже лидера.',
      'Стоп-цена и защита маржи: бот никогда не опустит цену ниже себестоимости и поднимает цену вверх, если дешевый конкурент распродан.',
      'Инфраструктура: автоматическая генерация защищенного XML-фида для merchant.kaspi.kz, Cloudflare Tunnel, SQLite WAL и Telegram-алерты.',
    ],
    badges: ['Python', 'FastAPI', 'Kaspi XML Feed', 'Cloudflare Tunnel', 'SQLite WAL', 'Telegram API'],
    architectureNodes: ['Kaspi XML Cron', 'FastAPI Scraper Engine', 'Delta Price Algorithm', 'Cloudflare Tunnel', 'merchant.kaspi.kz'],
    techSpec: {
      runtime: 'Python 3.11+',
      protocol: 'Kaspi XML 2.0 / HTTPS',
      storage: 'SQLite WAL Multi-tenant',
      security: 'Bearer Auth & Cloudflare WAF',
    },
    codeSnippet: {
      language: 'python',
      title: 'Алгоритм динамического репрайсинга с защитой стоп-цены',
      code: `async def calculate_optimal_price(item_sku: str, competitor_price: float, min_stop_price: float) -> float:
    # Защита от демпинга себестоимости
    if competitor_price - 1.0 < min_stop_price:
        return min_stop_price
    # Выставляем цену на 1 ₸ дешевле ближайшего конкурента
    return max(min_stop_price, competitor_price - 1.0)`,
    },
    githubUrl: 'https://github.com/Alik200000/kaspi-repricer',
  },
  {
    id: 'wb-manager-ai-bot',
    title: 'Wildberries Manager AI Bot',
    shortCode: 'WB AI AGENT 24/7',
    year: '2026',
    category: 'ai',
    categoryLabel: 'Telegram Bot • AI Agent',
    accentGradient: 'from-neutral-800 via-zinc-900 to-black',
    tagline: 'Автономный 24/7 AI-ассистент и управляющий магазином для селлеров маркетплейса Wildberries.',
    points: [
      'Автопилот 24/7: автогенерация ответов на отзывы и вопросы покупателей с учетом тональности и контекста товара.',
      'Контроль Out-of-Stock: расчет скорости продаж (burn rate) и алерты за 5 дней до обнуления остатков для удержания позиций в поиске.',
      'Утренний брифинг & SEO: сводка вчерашнего дня (заказы, выкупы, чистая маржа) и умный генератор SEO-карточек с ключевыми словами.',
    ],
    badges: ['Python', 'aiogram 3', 'Wildberries API', 'AI Agent', 'AsyncIO'],
    architectureNodes: ['WB Seller API v3', 'AsyncIO Task Poller', 'Gemini Vision OCR', 'aiogram 3 Bot'],
    techSpec: {
      runtime: 'Python 3.11+ AsyncIO',
      protocol: 'Telegram Bot API & WB REST',
      storage: 'SQLite / JSON Store',
      security: 'Telegram UserID WhiteList',
    },
    codeSnippet: {
      language: 'python',
      title: 'Распознавание накладных и актов через Gemini Vision',
      code: `async def analyze_invoice_image(photo_bytes: bytes) -> InvoiceData:
    prompt = "Извлеки артикулы, количество и сумму из накладной приемки Wildberries в JSON."
    response = await gemini_client.generate_content([
        {"mime_type": "image/jpeg", "data": photo_bytes},
        prompt
    ])
    return InvoiceData.model_validate_json(response.text)`,
    },
    githubUrl: 'https://github.com/Alik200000/wb-manager-ai-bot',
  },
  {
    id: 'adway-ai-helper',
    title: 'Adway AI Helper (Satbayev / ADWAY)',
    shortCode: 'CHROME MV3 VISION',
    year: '2026',
    category: 'ai',
    categoryLabel: 'Chrome Extension • Gemini Vision',
    accentGradient: 'from-slate-800 via-neutral-900 to-black',
    tagline: 'Браузерное расширение с мультимодальным AI-ассистентом для онлайн-платформ ADWAY и Satbayev University.',
    points: [
      'Gemini Vision (Alt + S): мгновенное распознавание графиков, электрических схем, матриц и формул по выделенной области экрана.',
      'Генератор кода & решений: пошаговое выполнение инженерных задач и генерация скриптов (Python, C++, SQL).',
      'Stealth Mode: режим скрытности (Alt + H / Esc), перетаскиваемый draggable-интерфейс и мягкая подсветка ответов.',
    ],
    badges: ['Chrome Extension', 'Gemini Vision', 'JavaScript', 'Manifest V3', 'EdTech'],
    architectureNodes: ['DOM Mutation Observer', 'Chrome Manifest V3', 'Gemini 1.5 Pro Vision', 'Floating HUD Overlay'],
    techSpec: {
      runtime: 'Chrome MV3 / JavaScript',
      protocol: 'Google GenAI API v1',
      storage: 'Chrome Local Storage',
      security: 'Client-side API Key Vault',
    },
    codeSnippet: {
      language: 'javascript',
      title: 'Мгновенный снимок области экрана и мультимодальный анализ',
      code: `chrome.commands.onCommand.addListener(async (command) => {
  if (command === "capture-area") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: "png" });
    chrome.tabs.sendMessage(tab.id, { action: "ANALYZE_IMAGE", image: dataUrl });
  }
});`,
    },
    githubUrl: 'https://github.com/Alik200000/adway-ai-helper',
  },
  {
    id: 'bybit-trading-bot',
    title: 'High-Frequency Trading & ABK Scanner',
    shortCode: 'ABK FINTECH BOT',
    year: '2026',
    category: 'fullstack',
    categoryLabel: 'FinTech • Bybit & Binance АБК Скринер',
    accentGradient: 'from-neutral-800 via-stone-900 to-black',
    tagline:
      'Автономный торговый бот и скринер «Арбитража Без Карт» (АБК) для поиска спредов Bybit / Binance и дельта-нейтрального сбора фандинга.',
    points: [
      'АБК Скринер (Арбитраж Без Карт): потоковый межбиржевой мониторинг цен Bybit vs Binance без использования банковских карт физлиц и риска блокировок.',
      'Дельта-нейтральный фандинг: автоматический расчет годовой ставки APR и выявление аномалий ставки финансирования (Funding Rate Arbitrage).',
      'Kill-Switch & Риск-менеджмент: динамический Stop-Loss/Take-Profit, расчет 1% риска депозита и блокировка при дневной просадке -3%.',
    ],
    badges: ['Python', 'Bybit API', 'Binance API', 'АБК Арбитраж', 'WebSocket v5', 'AsyncIO'],
    architectureNodes: ['Bybit / Binance API', 'ABK Spread Engine', 'Delta Funding Arbitrage', '1% Risk Kill-Switch'],
    techSpec: {
      runtime: 'Python 3.11+ AsyncIO',
      protocol: 'WebSocket v5 & REST',
      storage: 'In-Memory Ring Buffer',
      security: 'HMAC SHA256 Signature',
    },
    codeSnippet: {
      language: 'python',
      title: 'Межбиржевой расчет спреда АБК с вычетом комиссий Taker',
      code: `async def calculate_abk_spread(bybit_bid: float, binance_ask: float) -> dict:
    # Расчет чистого спреда между Bybit и Binance без банковских карт
    raw_spread = ((bybit_bid - binance_ask) / binance_ask) * 100
    total_fee = (0.00055 + 0.00075) * 100  # Bybit Taker (0.055%) + Binance Taker (0.075%)
    net_spread = raw_spread - total_fee
    return {"net_spread_pct": net_spread, "profit_1000usd": (net_spread / 100) * 1000}`,
    },
    githubUrl: 'https://github.com/Alik200000/bybit-trading-bot',
  },
];

const RADIAL_MODULES = [
  { code: '01', title: '1С OData & CommerceML', sub: 'Синхронизация УТ/БП РК', projectIndex: 1 },
  { code: '02', title: 'Битрикс24 Batch Sync', sub: 'Дедупликация БИН/ИИН', projectIndex: 0 },
  { code: '03', title: 'Kaspi Top-1 Repricer', sub: 'Защита стоп-цены 24/7', projectIndex: 2 },
  { code: '04', title: 'Gemini Vision OCR', sub: 'Накладные и схемы', projectIndex: 4 },
  { code: '05', title: 'WB AI Автопилот', sub: 'Контроль Out-of-Stock', projectIndex: 3 },
  { code: '06', title: 'Bybit / Binance АБК', sub: 'Спреды и Funding APR', projectIndex: 5 },
  { code: '07', title: 'Smart Digital P&L', sub: 'Маржинальность сделок', projectIndex: 0 },
  { code: '08', title: '23/23 Security Audit', sub: 'Закон РК & Безопасность', projectIndex: 1 },
];

export function ProjectsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'b2b' | 'ai' | 'fullstack'>('all');
  const [activeModalProject, setActiveModalProject] = useState<DetailedProject | null>(null);
  const [fanMode, setFanMode] = useState<'arc' | 'cylinder'>('arc');
  const [cylinderAngle, setCylinderAngle] = useState<number>(0);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [wheelPaused, setWheelPaused] = useState<boolean>(false);

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  const categories = [
    { id: 'all', label: 'Все проекты (6)' },
    { id: 'b2b', label: 'Kaspi & 1С (2)' },
    { id: 'ai', label: 'AI & Боты (2)' },
    { id: 'fullstack', label: 'Web & FinTech (2)' },
  ];

  const flagship = projects[0];
  const secondaryA = projects[1];
  const secondaryB = projects[2];

  return (
    <div id="projects" className="relative">
      {/* =====================================================================
          PART 1: "ГЛАВНЫЙ ПРОЕКТ" — Light Editorial Split Showcase (00:15-00:16)
         ===================================================================== */}
      <section className="bg-[#EFEFEA] text-[#0A0B0E] py-20 sm:py-28 px-4 sm:px-8 border-b border-black/10">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <h2
              className="font-display font-black uppercase tracking-[-0.035em] leading-[0.92] text-[#0A0B0E]"
              style={{ fontSize: 'clamp(2.6rem, 7vw, 5.8rem)' }}
            >
              ГЛАВНЫЙ
              <br />
              ПРОЕКТ
            </h2>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#0A0B0E]/70 max-w-sm">
              БОЕВЫЕ КОММЕРЧЕСКИЕ СИСТЕМЫ С ОТКРЫТЫМ ИСХОДНЫМ КОДОМ И PRODUCTION-ДЕПЛОЕМ
            </p>
          </div>

          {/* Asymmetric 2-Column Editorial Grid (Left Large Flagship + Right 2 Stacked Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Flagship Card */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-[#0A0B0E] text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.22) 0%, transparent 55%), linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: 'auto, 36px 36px, 36px 36px',
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-white text-[#0A0B0E] font-mono text-xs font-bold uppercase tracking-wider">
                    {flagship.categoryLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={flagship.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                    {flagship.liveUrl && (
                      <a
                        href={flagship.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#07080B] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live на Render</span>
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-white mb-3">
                  {flagship.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 max-w-2xl">
                  {flagship.tagline}
                </p>

                {/* Architecture Flow Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
                  {flagship.architectureNodes.map((node, idx) => (
                    <div
                      key={node}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left"
                    >
                      <div className="font-mono text-[10px] text-neutral-400">0{idx + 1}</div>
                      <div className="font-bold text-xs text-white mt-0.5">{node}</div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 mb-6">
                  {flagship.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {flagship.badges.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-1 rounded-md bg-white/10 font-mono text-[11px] text-neutral-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveModalProject(flagship)}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-[#0A0B0E] font-mono font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Схема и код</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Two Stacked Editorial Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {[secondaryA, secondaryB].map((proj) => (
                <div
                  key={proj.id}
                  className="flex-1 rounded-3xl bg-white border border-black/10 p-6 sm:p-7 shadow-lg flex flex-col justify-between hover:border-black/30 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0A0B0E]/5 text-[#0A0B0E]">
                        {proj.shortCode}
                      </span>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-bold text-[#0A0B0E]/70 hover:text-[#0A0B0E] flex items-center gap-1"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub ↗</span>
                      </a>
                    </div>

                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#0A0B0E] tracking-tight mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0A0B0E]/75 leading-relaxed mb-4">
                      {proj.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-[#0A0B0E]/60">
                      {proj.techSpec.protocol}
                    </span>
                    <button
                      onClick={() => setActiveModalProject(proj)}
                      className="px-4 py-2 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-white font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Открыть кейс</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PART 2: "ПРОЕКТЫ" — Interactive 3D Cylindrical Ring & Curved Fan (00:17-00:22)
         ===================================================================== */}
      <section className="bg-[#07080B] text-white py-24 sm:py-32 px-4 sm:px-8 overflow-hidden border-b border-white/10">
        <div className="max-w-[1380px] mx-auto">
          {/* Header Row matching 00:18-00:22 */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2
                className="font-display font-black uppercase tracking-[-0.035em] leading-none text-white"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
              >
                ПРОЕКТЫ
              </h2>
            </div>

            <div className="flex flex-col sm:items-end gap-3">
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xs sm:text-right">
                B2B-порталы, интеграции с 1С и Kaspi, автономные AI-боты и FinTech-алгоритмы.
              </p>

              {/* Switcher between 3D Curved Fan (00:21) and 3D Cylinder Ring (00:19) */}
              <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setFanMode('arc')}
                  aria-pressed={fanMode === 'arc'}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
                    fanMode === 'arc' ? 'bg-white text-[#07080B]' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  3D Веер (Дуга)
                </button>
                <button
                  type="button"
                  onClick={() => setFanMode('cylinder')}
                  aria-pressed={fanMode === 'cylinder'}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
                    fanMode === 'cylinder' ? 'bg-white text-[#07080B]' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  3D Кольцо (360°)
                </button>
              </div>
            </div>
          </div>

          {/* 3D Stage */}
          {fanMode === 'arc' ? (
            /* 00:21-00:22 Reference: Curved Horizontal 3D Arc Fan of Vertical Cards */
            <div className="perspective-stage py-6 sm:py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
                {projects.map((proj, index) => {
                  // Calculate symmetric arc angles across the 6 cards (-25deg to +25deg)
                  const offsetFromCenter = index - 2.5;
                  const rotateY = offsetFromCenter * -9;
                  const translateY = Math.abs(offsetFromCenter) * 10;
                  const isFocused = focusedIndex === index;

                  return (
                    <motion.div
                      key={proj.id}
                      onMouseEnter={() => setFocusedIndex(index)}
                      onClick={() => setActiveModalProject(proj)}
                      whileHover={{ y: -12, scale: 1.04 }}
                      style={{
                        transform: `perspective(1200px) rotateY(${rotateY}deg) translateY(${translateY}px)`,
                      }}
                      className={`group relative rounded-2xl aspect-[3/4] p-5 flex flex-col justify-between cursor-pointer border transition-all duration-300 overflow-hidden bg-gradient-to-b ${
                        proj.accentGradient
                      } ${
                        isFocused
                          ? 'border-white shadow-2xl shadow-white/10'
                          : 'border-white/15 opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Architectural Grid Overlay */}
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />

                      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-300">
                        <span>0{index + 1}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-white">
                          {proj.shortCode}
                        </span>
                      </div>

                      {/* Center Play/Inspect Badge like in 00:21 */}
                      <div className="relative z-10 my-auto py-2">
                        <div className="w-10 h-10 rounded-full bg-white/15 group-hover:bg-white group-hover:text-[#07080B] border border-white/25 flex items-center justify-center transition-all mb-3">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-white leading-snug">
                          {proj.title}
                        </h3>
                        <p className="text-[11px] text-neutral-300 line-clamp-3 mt-1.5 leading-relaxed">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                        <span>{proj.techSpec.runtime}</span>
                        <span className="text-white font-bold">Кейс →</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 00:18-00:20 Reference: 3D Rotating Cylindrical Ring */
            <div className="flex flex-col items-center py-10">
              <div className="perspective-stage w-full h-[360px] flex items-center justify-center relative">
                <div
                  className="preserve-3d relative w-[240px] h-[300px] transition-transform duration-700 ease-out"
                  style={{
                    transform: `rotateX(-6deg) rotateY(${cylinderAngle}deg)`,
                  }}
                >
                  {projects.map((proj, idx) => {
                    const itemAngle = idx * 60;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => setActiveModalProject(proj)}
                        style={{
                          transform: `rotateY(${itemAngle}deg) translateZ(310px)`,
                        }}
                        className={`absolute inset-0 rounded-2xl p-5 bg-gradient-to-b ${proj.accentGradient} border border-white/25 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-white transition-colors`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
                          <span>0{idx + 1}</span>
                          <span>{proj.shortCode}</span>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg text-white leading-tight mb-2">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-neutral-300 line-clamp-3">
                            {proj.tagline}
                          </p>
                        </div>
                        <div className="text-[10px] font-mono text-white flex items-center justify-between pt-2 border-t border-white/15">
                          <span>Открыть архитектуру</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cylinder Rotation Controls */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCylinderAngle((a) => a + 60)}
                  aria-label="Повернуть 3D-кольцо влево"
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Пред.</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCylinderAngle((a) => a - 60)}
                  aria-label="Повернуть 3D-кольцо вправо"
                  className="px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-[#07080B] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Вращать 3D кольцо</span>
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          PART 3: "ЛУЧШИЕ АРХИТЕКТУРЫ" — 360° Radial Wheel Collage (00:23-00:24)
         ===================================================================== */}
      <section className="bg-[#F3F3EE] text-[#0A0B0E] py-20 sm:py-28 px-4 sm:px-8 border-b border-black/10 overflow-hidden">
        <div className="max-w-[1380px] mx-auto flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A0B0E]/60">
              ИНТЕРАКТИВНОЕ КОЛЕСО МОДУЛЕЙ • 360°
            </span>
            <button
              type="button"
              onClick={() => setWheelPaused((p) => !p)}
              aria-pressed={wheelPaused}
              className="px-3.5 py-1.5 rounded-full bg-[#0A0B0E]/5 hover:bg-[#0A0B0E]/10 border border-[#0A0B0E]/15 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
            >
              {wheelPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{wheelPaused ? 'Вращать' : 'Пауза'}</span>
            </button>
          </div>

          {/* Desktop 360° Radial Wheel (00:23-00:24 video reference) */}
          <div className="relative w-full max-w-[680px] aspect-square hidden md:flex items-center justify-center my-4">
            {/* Center Typography: ЛУЧШИЕ АРХИТЕКТУРЫ */}
            <div className="relative z-20 text-center px-6 pointer-events-none">
              <div className="font-display font-black text-3xl lg:text-4xl uppercase tracking-tight text-[#0A0B0E]">
                ЛУЧШИЕ
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#0A0B0E]/70 mt-1">
                МОДУЛИ И ИНТЕГРАЦИИ
              </div>
            </div>

            {/* Orbiting Ring of 8 Cards */}
            <div
              className={`absolute inset-0 radial-wheel-orbit ${
                wheelPaused ? 'editorial-marquee-paused' : ''
              }`}
            >
              {RADIAL_MODULES.map((mod, idx) => {
                const angleDeg = idx * 45;
                const angleRad = (angleDeg * Math.PI) / 180;
                const radiusPct = 38; // percent from center
                const leftPct = 50 + radiusPct * Math.cos(angleRad);
                const topPct = 50 + radiusPct * Math.sin(angleRad);

                return (
                  <div
                    key={mod.code}
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute w-40"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(projects[mod.projectIndex])}
                      className={`w-full text-left p-3.5 rounded-2xl bg-[#0A0B0E] text-white border border-black/15 shadow-xl hover:scale-105 transition-transform cursor-pointer radial-wheel-counter-orbit ${
                        wheelPaused ? 'editorial-marquee-paused' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 mb-1">
                        <span>#{mod.code}</span>
                        <ArrowUpRight className="w-3 h-3 text-white" />
                      </div>
                      <div className="font-display font-bold text-xs text-white leading-snug">
                        {mod.title}
                      </div>
                      <div className="font-mono text-[10px] text-neutral-400 mt-0.5">
                        {mod.sub}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Responsive Grid fallback for the Radial Wheel */}
          <div className="w-full md:hidden">
            <div className="text-center mb-6">
              <div className="font-display font-black text-3xl uppercase tracking-tight text-[#0A0B0E]">
                ЛУЧШИЕ МОДУЛИ
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#0A0B0E]/70">
                ИНТЕГРАЦИИ И АРХИТЕКТУРА
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {RADIAL_MODULES.map((mod) => (
                <button
                  key={mod.code}
                  type="button"
                  onClick={() => setActiveModalProject(projects[mod.projectIndex])}
                  className="p-4 rounded-2xl bg-[#0A0B0E] text-white text-left flex flex-col justify-between"
                >
                  <div className="font-mono text-[10px] text-neutral-400">#{mod.code}</div>
                  <div className="font-display font-bold text-sm mt-1">{mod.title}</div>
                  <div className="font-mono text-[10px] text-neutral-400 mt-1">{mod.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PART 4: "ВСЕ РАБОТЫ" — Sticky Full-Bleed Stack & Filterable Catalog (00:25-00:34 & 00:45-00:49)
         ===================================================================== */}
      <section className="bg-[#07080B] text-white py-24 sm:py-32 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-[1380px] mx-auto">
          {/* Header + Filter Pills matching 00:25 & 00:46 */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <h2
                className="font-display font-black uppercase tracking-[-0.035em] leading-[0.92] text-white"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.2rem)' }}
              >
                ВСЕ
                <br />
                РАБОТЫ
              </h2>
            </div>

            {/* Category Filter Tabs (00:46-00:49 reference: Fashion | Horeca | Travel | Экспертные рилсы) */}
            <div
              role="tablist"
              aria-label="Фильтровать все работы по направлению"
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => {
                const isActive = selectedFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedFilter(cat.id as any)}
                    className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isActive
                        ? 'bg-white text-[#07080B] border-white shadow-lg'
                        : 'bg-transparent text-neutral-300 border-white/20 hover:border-white/50 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Stacking Cards (00:25-00:34 reference) */}
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    top: `${76 + index * 14}px`,
                  }}
                  className="md:sticky rounded-3xl bg-[#0E1016] border border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left 7 Cols: Editorial Details */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white">
                            0{index + 1} • {project.shortCode}
                          </span>
                          <span className="font-mono text-xs text-neutral-400">
                            {project.categoryLabel}
                          </span>
                        </div>

                        <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-3">
                          {project.title}
                        </h3>

                        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                          {project.tagline}
                        </p>

                        <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 mb-6">
                          {project.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2.5">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.badges.map((badge) => (
                            <span
                              key={badge}
                              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
                            >
                              #{badge}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#07080B] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}

                          <button
                            onClick={() => setActiveModalProject(project)}
                            className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-[#07080B] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Архитектура и код</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right 5 Cols: Live Code & Architecture Preview Card */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl bg-[#07080B] border border-white/10 p-5 font-mono text-xs text-neutral-300 shadow-inner">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] text-neutral-400">
                          <span>{project.codeSnippet.title}</span>
                          <span className="uppercase text-emerald-400">{project.techSpec.runtime}</span>
                        </div>
                        <pre className="overflow-x-auto text-[11px] leading-relaxed text-neutral-200 no-scrollbar">
                          <code>{project.codeSnippet.code}</code>
                        </pre>
                        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] text-neutral-400">
                          <div>
                            <span className="block text-neutral-500">ПРОТОКОЛ</span>
                            <span className="text-white">{project.techSpec.protocol}</span>
                          </div>
                          <div>
                            <span className="block text-neutral-500">ХРАНИЛИЩЕ</span>
                            <span className="text-white">{project.techSpec.storage}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Architecture & Details Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
