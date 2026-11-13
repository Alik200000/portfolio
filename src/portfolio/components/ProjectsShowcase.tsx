import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
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
    title: 'Smart Digital Ops & Profit Intelligence (BI / P&L)',
    shortCode: 'BI / ERP P&L CORE',
    year: '2026',
    category: 'fullstack',
    categoryLabel: 'Live Интерактивный BI-Дашборд',
    accentGradient: 'from-white via-[#FAF9F5] to-[#EFEFEA]',
    tagline:
      'Система финансово-управленческого учета, Unit-экономики и BI-дашборд контроля маржинальности проектов для Smart Digital Group.',
    points: [
      'Система метрик P&L: оцифровка выручки, прямых ФОТ-затрат по грейдам, инфраструктурных костов и чистой маржи (Net Margin %) в реальном времени.',
      'Сквозной Data Lineage: Канбан-воронка лидов → автогенерация КП → производственные задачи → экспорт витрины P&L в CSV и печать актов РК.',
      'Статический интерактивный деплой: работает мгновенно в браузере с локальным хранилищем данных без спящего бэкенда.',
    ],
    badges: ['BI Dashboard', 'SQL / P&L Metrics', 'Unit Economics', 'TypeScript', 'Data Lineage'],
    architectureNodes: ['Канбан-воронка сделок', 'AI Cost & P&L Engine', 'Витрина маржинальности', 'CSV & PDF Экспорт'],
    techSpec: {
      runtime: 'Static BI Engine + REST',
      protocol: 'JSON / CSV / LocalStore',
      storage: 'PostgreSQL / Client DB',
      security: 'Role-Based & Strict CORS',
    },
    codeSnippet: {
      language: 'typescript',
      title: 'Расчет чистой маржинальности и себестоимости сделки (Unit Economics)',
      code: `const calculateProjectMargin = (deal: Deal, logs: WorkLog[]) => {
  const directLaborCost = logs.reduce((acc, log) => acc + log.hours * gradeRates[log.grade], 0);
  const directInfrastructureCost = deal.openAiTokensCost + deal.serverHostingCost;
  const netProfit = deal.budget - (directLaborCost + directInfrastructureCost);
  return { netProfit, marginPercent: ((netProfit / deal.budget) * 100).toFixed(1) };
};`,
    },
    githubUrl: 'https://github.com/Alik200000/smart-digital-ops-core',
    liveUrl: '/demos/smart-digital-ops/index.html',
  },
  {
    id: 'alatau-food-trade',
    title: 'Alatau Food Trade (HoReCa B2B & 1С DWH)',
    shortCode: '1С COMMERCEML 3.1',
    year: '2026',
    category: 'b2b',
    categoryLabel: 'B2B E-Commerce & 1С:Предприятие 8.3',
    accentGradient: 'from-white via-stone-50 to-stone-100',
    tagline:
      'Цифровая оптово-розничная платформа поставок продуктов питания для сегмента HoReCa г. Алматы с двусторонним обменом 1С.',
    points: [
      'Стек: Next.js 16 (Static Export) + React 19 + TypeScript 5 + Tailwind CSS.',
      'Интеграция с 1С и каталог данных: шлюз обмена по стандарту CommerceML 3.1 с 1С:Предприятие 8.3 (УТ для Казахстана) — синхронизация цен, остатков и заказов.',
      'B2B-аналитика: управление дебиторской задолженностью, выгрузка ЭСФ и актов сверки, динамические скидки от объёма.',
    ],
    badges: ['Next.js 16', 'React 19', 'TypeScript', '1С:Предприятие 8.3', 'CommerceML 3.1', 'HoReCa'],
    architectureNodes: ['1C:Предприятие 8.3', 'CommerceML 3.1 Gateway', 'Next.js 16 Static Hub', 'B2B Клиентский портал'],
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
    title: 'Kaspi Repricer Enterprise (Analytics & XML)',
    shortCode: 'KASPI TOP-1 ENGINE',
    year: '2026',
    category: 'b2b',
    categoryLabel: 'Live Дашборд • Kaspi.kz Marketplace',
    accentGradient: 'from-white via-slate-50 to-slate-100',
    tagline: 'Интерактивный аналитический дашборд и автоматический репрайсер удержания Топ-1 для селлеров Kaspi Магазина.',
    points: [
      'Захват кнопки «Купить» (Топ-1): алгоритм непрерывно сравнивает цены конкурентов и выставляет цену на 1 ₸ ниже лидера.',
      'Контроль Unit-экономики и стоп-цены: защита минимального порога рентабельности и журнал истории изменений цен.',
      'Инфраструктура: генерация XML-фида для merchant.kaspi.kz, SQLite WAL, Python FastAPI и интерактивный светлый веб-дашборд.',
    ],
    badges: ['Python', 'FastAPI', 'SQLite WAL', 'Kaspi XML Feed', 'BI Analytics', 'Price Elasticity'],
    architectureNodes: ['Kaspi XML Cron', 'FastAPI Scraper Engine', 'Delta Price Algorithm', 'Interactive Seller UI'],
    techSpec: {
      runtime: 'Python 3.11+ & Static UI',
      protocol: 'Kaspi XML 2.0 / HTTPS',
      storage: 'SQLite WAL Multi-tenant',
      security: 'Bearer Auth & Rate Limit',
    },
    codeSnippet: {
      language: 'python',
      title: 'Алгоритм динамического репрайсинга с защитой стоп-цены',
      code: `async def calculate_optimal_price(item_sku: str, competitor_price: float, min_stop_price: float) -> float:
    # Защита от демпинга ниже порога рентабельности
    if competitor_price - 1.0 < min_stop_price:
        return min_stop_price
    # Выставляем цену на 1 ₸ дешевле ближайшего конкурента
    return max(min_stop_price, competitor_price - 1.0)`,
    },
    githubUrl: 'https://github.com/Alik200000/kaspi-repricer',
    liveUrl: '/demos/kaspi-repricer/index.html',
  },
  {
    id: 'wb-manager-ai-bot',
    title: 'Wildberries Manager AI Bot (Supply & Burn Rate)',
    shortCode: 'WB AI AGENT 24/7',
    year: '2026',
    category: 'ai',
    categoryLabel: 'Telegram Bot • E-Commerce Analytics',
    accentGradient: 'from-white via-[#FAF9F5] to-stone-100',
    tagline: 'Автономный 24/7 AI-ассистент и аналитик товарных запасов для селлеров маркетплейса Wildberries.',
    points: [
      'Прогноз Out-of-Stock: расчет скорости продаж (burn rate) по складам и алерты за 5 дней до обнуления остатков для сохранения ранжирования.',
      'Утренний аналитический брифинг: сводка ключевых показателей вчерашнего дня (заказы, выкупы, логистика, чистая маржа).',
      'Автопилот отзывов и OCR: автоответы покупателям и распознавание первичных накладных через Gemini Vision.',
    ],
    badges: ['Python', 'aiogram 3', 'Wildberries API', 'Supply Analytics', 'AsyncIO'],
    architectureNodes: ['WB Seller API v3', 'Burn Rate Calculator', 'Gemini Vision OCR', 'aiogram 3 Bot'],
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
    accentGradient: 'from-white via-slate-50 to-stone-100',
    tagline: 'Браузерное расширение с мультимодальным AI-ассистентом для инженерных и аналитических задач (SQL, Python, Матрицы).',
    points: [
      'Gemini Vision (Alt + S): мгновенное распознавание графиков, схем БД, матриц и математических формул по выделенной области экрана.',
      'Генератор SQL & Python решений: пошаговое выполнение аналитических задач с пояснением физического смысла формул.',
      'Stealth HUD: компактный перетаскиваемый интерфейс поверх веб-страницы с локальным хранением настроек.',
    ],
    badges: ['Chrome Extension', 'Gemini Vision', 'JavaScript', 'Manifest V3', 'SQL & Python'],
    architectureNodes: ['DOM Mutation Observer', 'Chrome Manifest V3', 'Gemini 1.5 Pro Vision', 'Floating HUD Overlay'],
    techSpec: {
      runtime: 'Chrome MV3 / JavaScript',
      protocol: 'Google GenAI API v1',
      storage: 'Chrome Local Storage',
      security: 'Client-side Vault (.env)',
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
    title: 'High-Frequency Trading & ABK Spread Analytics',
    shortCode: 'ABK FINTECH BOT',
    year: '2026',
    category: 'fullstack',
    categoryLabel: 'FinTech • Quantitative Analytics',
    accentGradient: 'from-white via-stone-50 to-slate-100',
    tagline:
      'Количественный скринер «Арбитража Без Карт» (АБК) для анализа межбиржевых спредов Bybit / Binance и дельта-нейтрального фандинга.',
    points: [
      'АБК Скринер (Арбитраж Без Карт): потоковый мониторинг стаканов Bybit vs Binance с вычетом комиссий Taker/Maker и оценкой ликвидности.',
      'Дельта-нейтральный фандинг: автоматический расчет годовой доходности APR и выявление статистических аномалий Funding Rate.',
      'Kill-Switch & Риск-менеджмент: жесткое ограничение 1% риска на сделку и автоблокировка при дневной просадке -3%.',
    ],
    badges: ['Python', 'Bybit API', 'Binance API', 'Quant Analytics', 'WebSocket v5', 'AsyncIO'],
    architectureNodes: ['Bybit / Binance API', 'ABK Spread Engine', 'Delta Funding Arbitrage', '1% Risk Kill-Switch'],
    techSpec: {
      runtime: 'Python 3.11+ AsyncIO',
      protocol: 'WebSocket v5 & REST',
      storage: 'In-Memory Ring Buffer',
      security: 'HMAC SHA256 (process.env)',
    },
    codeSnippet: {
      language: 'python',
      title: 'Межбиржевой расчет чистого спреда АБК с вычетом комиссий Taker',
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
  { code: '01', title: '1С OData & CommerceML', sub: 'Витрины УТ/БП РК', projectIndex: 1 },
  { code: '02', title: 'Битрикс24 Batch Sync', sub: 'Дедупликация БИН/ИИН', projectIndex: 0 },
  { code: '03', title: 'Kaspi Top-1 Repricer', sub: 'Защита стоп-цены 24/7', projectIndex: 2 },
  { code: '04', title: 'Gemini Vision OCR', sub: 'Накладные и схемы', projectIndex: 4 },
  { code: '05', title: 'WB Burn-Rate Аналитика', sub: 'Контроль Out-of-Stock', projectIndex: 3 },
  { code: '06', title: 'Bybit / Binance АБК', sub: 'Спреды и Funding APR', projectIndex: 5 },
  { code: '07', title: 'Smart Digital BI P&L', sub: 'Маржинальность сделок', projectIndex: 0 },
  { code: '08', title: 'Data Lineage & Audit', sub: 'Закон РК & Качество', projectIndex: 1 },
];

export function ProjectsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'b2b' | 'ai' | 'fullstack'>('all');
  const [activeModalProject, setActiveModalProject] = useState<DetailedProject | null>(null);
  const [fanMode, setFanMode] = useState<'arc' | 'cylinder'>('arc');
  const [cylinderAngle, setCylinderAngle] = useState<number>(0);
  const [cylinderPaused, setCylinderPaused] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [wheelPaused, setWheelPaused] = useState<boolean>(false);

  useEffect(() => {
    if (fanMode !== 'cylinder' || cylinderPaused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = setInterval(() => {
      setCylinderAngle((prev) => prev - 0.65);
    }, 30);
    return () => clearInterval(timer);
  }, [fanMode, cylinderPaused]);

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  const categories = [
    { id: 'all', label: 'Все проекты (6)' },
    { id: 'b2b', label: 'Kaspi & 1С (2)' },
    { id: 'ai', label: 'AI & Аналитика (2)' },
    { id: 'fullstack', label: 'BI Дашборды & FinTech (2)' },
  ];

  const flagship = projects[0];
  const secondaryA = projects[1];
  const secondaryB = projects[2];

  return (
    <div id="projects" className="relative">
      {/* =====================================================================
          PART 1: "ГЛАВНЫЙ ПРОЕКТ" — Light Editorial Split Showcase
         ===================================================================== */}
      <section className="bg-[#EFEFEA] text-[#0A0B0E] py-20 sm:py-28 px-4 sm:px-8 border-b border-black/15">
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
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-700 font-semibold max-w-sm">
              ИНТЕРАКТИВНЫЕ BI-ДАШБОРДЫ, B2B-СИСТЕМЫ И ВИТРИНЫ ДАННЫХ С ОТКРЫТЫМ КОДОМ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Flagship Card (Light Surface) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white text-[#0A0B0E] border border-slate-300 p-6 sm:p-10 shadow-xl relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 55%), linear-gradient(to right, rgba(10,11,14,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,11,14,0.05) 1px, transparent 1px)',
                  backgroundSize: 'auto, 36px 36px, 36px 36px',
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 font-mono text-xs font-bold uppercase tracking-wider">
                    {flagship.categoryLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={flagship.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#0A0B0E] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                    {flagship.liveUrl && (
                      <a
                        href={flagship.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Открыть BI-Дашборд</span>
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-4xl tracking-tight text-[#0A0B0E] mb-3">
                  {flagship.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-2xl">
                  {flagship.tagline}
                </p>

                {/* Architecture Flow Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
                  {flagship.architectureNodes.map((node, idx) => (
                    <div
                      key={node}
                      className="p-3 rounded-2xl bg-[#FAF9F5] border border-slate-300 text-left"
                    >
                      <div className="font-mono text-[10px] text-slate-500 font-bold">0{idx + 1}</div>
                      <div className="font-bold text-xs text-[#0A0B0E] mt-0.5">{node}</div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 mb-6">
                  {flagship.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {flagship.badges.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-300 font-mono text-[11px] text-slate-800 font-semibold"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveModalProject(flagship)}
                  className="px-5 py-2.5 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-mono font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
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
                  className="flex-1 rounded-3xl bg-white border border-slate-300 p-6 sm:p-7 shadow-md flex flex-col justify-between hover:border-slate-500 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-[#0A0B0E]">
                        {proj.shortCode}
                      </span>
                      <div className="flex items-center gap-2">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full hover:bg-emerald-100 flex items-center gap-1"
                          >
                            <span>Live Demo ↗</span>
                          </a>
                        )}
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs font-bold text-slate-700 hover:text-[#0A0B0E] flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub ↗</span>
                        </a>
                      </div>
                    </div>

                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#0A0B0E] tracking-tight mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                      {proj.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase text-slate-600">
                      {proj.techSpec.protocol}
                    </span>
                    <button
                      onClick={() => setActiveModalProject(proj)}
                      className="px-4 py-2 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
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
          PART 2: "ПРОЕКТЫ" — Light Interactive 3D Cylindrical Ring & Curved Fan
         ===================================================================== */}
      <section className="bg-[#FAF9F5] text-[#0A0B0E] py-24 sm:py-32 px-4 sm:px-8 overflow-hidden border-b border-black/15">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2
                className="font-display font-black uppercase tracking-[-0.035em] leading-none text-[#0A0B0E]"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}
              >
                ПРОЕКТЫ
              </h2>
            </div>

            <div className="flex flex-col sm:items-end gap-3">
              <p className="text-xs sm:text-sm text-slate-700 max-w-xs sm:text-right">
                BI-дашборды, витрины данных 1С и Kaspi, автономные AI-боты и количественные алгоритмы.
              </p>

              <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white border border-slate-300 shadow-xs">
                <button
                  type="button"
                  onClick={() => setFanMode('arc')}
                  aria-pressed={fanMode === 'arc'}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
                    fanMode === 'arc' ? 'bg-[#0A0B0E] text-[#F5F5F0]' : 'text-slate-700 hover:text-[#0A0B0E]'
                  }`}
                >
                  3D Веер (Дуга)
                </button>
                <button
                  type="button"
                  onClick={() => setFanMode('cylinder')}
                  aria-pressed={fanMode === 'cylinder'}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
                    fanMode === 'cylinder' ? 'bg-[#0A0B0E] text-[#F5F5F0]' : 'text-slate-700 hover:text-[#0A0B0E]'
                  }`}
                >
                  3D Кольцо (360°)
                </button>
              </div>
            </div>
          </div>

          {fanMode === 'arc' ? (
            <div className="perspective-stage py-4 sm:py-10">
              <div className="lg:hidden mb-3 flex items-center justify-between text-[11px] font-mono text-slate-600 font-semibold">
                <span>← Листайте проекты вбок →</span>
                <span>6 кейсов</span>
              </div>
              <div className="flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar items-center">
                {projects.map((proj, index) => {
                  const offsetFromCenter = index - 2.5;
                  const rotateY = offsetFromCenter * -9;
                  const translateY = Math.abs(offsetFromCenter) * 10;
                  const isFocused = focusedIndex === index;
                  const neighborShift =
                    index < focusedIndex ? -6 : index > focusedIndex ? 6 : 0;

                  return (
                    <motion.div
                      key={proj.id}
                      onMouseEnter={() => setFocusedIndex(index)}
                      onClick={() => setActiveModalProject(proj)}
                      animate={{
                        x: neighborShift,
                        y: isFocused ? -14 : translateY,
                        scale: isFocused ? 1.05 : 0.97,
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      style={{
                        transform: `perspective(1200px) rotateY(${rotateY}deg)`,
                      }}
                      className={`group relative w-[78vw] max-w-[290px] sm:w-[250px] lg:w-auto shrink-0 snap-center mobile-carousel-card max-lg:!transform-none rounded-2xl aspect-[3/4] p-5 flex flex-col justify-between cursor-pointer border transition-colors duration-300 overflow-hidden bg-gradient-to-b ${
                        proj.accentGradient
                      } ${
                        isFocused
                          ? 'border-[#0A0B0E] shadow-2xl z-20'
                          : 'border-slate-300 shadow-md opacity-95 hover:opacity-100 z-10'
                      }`}
                    >
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, rgba(10,11,14,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,11,14,0.06) 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                        }}
                      />

                      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-600 font-bold">
                        <span>0{index + 1}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-slate-300 text-[#0A0B0E]">
                          {proj.shortCode}
                        </span>
                      </div>

                      <div className="relative z-10 my-auto py-2">
                        <div className="w-10 h-10 rounded-full bg-[#0A0B0E]/5 group-hover:bg-[#0A0B0E] group-hover:text-[#F5F5F0] border border-slate-300 flex items-center justify-center transition-all mb-3 text-[#0A0B0E]">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0A0B0E] leading-snug">
                          {proj.title}
                        </h3>
                        <p className="text-[11px] text-slate-700 line-clamp-3 mt-1.5 leading-relaxed">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="relative z-10 pt-2.5 border-t border-slate-300 flex items-center justify-between text-[10px] font-mono text-slate-600 font-semibold">
                        <span>{proj.techSpec.runtime}</span>
                        <span className="text-[#0A0B0E] font-bold">Кейс →</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 sm:py-10 overflow-hidden">
              <div
                onMouseEnter={() => setCylinderPaused(true)}
                onMouseLeave={() => setCylinderPaused(false)}
                className="perspective-stage w-full h-[310px] sm:h-[360px] flex items-center justify-center relative"
              >
                <div
                  className="preserve-3d relative w-[185px] h-[245px] sm:w-[240px] sm:h-[300px] transition-transform duration-150 ease-linear"
                  style={{
                    transform: `rotateX(-6deg) rotateY(${cylinderAngle}deg)`,
                  }}
                >
                  {projects.map((proj, idx) => {
                    const itemAngle = idx * 60;
                    const isSmallScreen =
                      typeof window !== 'undefined' && window.innerWidth < 640;
                    const radiusZ = isSmallScreen ? 195 : 310;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => setActiveModalProject(proj)}
                        style={{
                          transform: `rotateY(${itemAngle}deg) translateZ(${radiusZ}px)`,
                        }}
                        className={`absolute inset-0 rounded-2xl p-4 sm:p-5 bg-gradient-to-b ${proj.accentGradient} border border-slate-300 shadow-xl flex flex-col justify-between cursor-pointer hover:border-[#0A0B0E] transition-colors`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 font-bold">
                          <span>0{idx + 1}</span>
                          <span>{proj.shortCode}</span>
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-lg text-[#0A0B0E] leading-tight mb-2">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-slate-700 line-clamp-3">
                            {proj.tagline}
                          </p>
                        </div>
                        <div className="text-[10px] font-mono text-[#0A0B0E] font-bold flex items-center justify-between pt-2 border-t border-slate-300">
                          <span>Открыть архитектуру</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCylinderAngle((a) => a + 60)}
                  aria-label="Повернуть 3D-кольцо влево"
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-[#0A0B0E] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Пред.</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCylinderPaused((p) => !p)}
                  aria-pressed={cylinderPaused}
                  aria-label={cylinderPaused ? 'Запустить вращение 3D-кольца' : 'Поставить 3D-кольцо на паузу'}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-[#0A0B0E] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {cylinderPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  <span>{cylinderPaused ? 'Старт' : 'Пауза'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCylinderAngle((a) => a - 60)}
                  aria-label="Повернуть 3D-кольцо вправо"
                  className="px-4 py-2 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>След. +60°</span>
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          PART 3: "ЛУЧШИЕ АРХИТЕКТУРЫ" — 360° Radial Wheel Collage (Light)
         ===================================================================== */}
      <section className="bg-[#F3F3EE] text-[#0A0B0E] py-20 sm:py-28 px-4 sm:px-8 border-b border-black/15 overflow-hidden">
        <div className="max-w-[1380px] mx-auto flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-700">
              ИНТЕРАКТИВНОЕ КОЛЕСО МОДУЛЕЙ • 360°
            </span>
            <button
              type="button"
              onClick={() => setWheelPaused((p) => !p)}
              aria-pressed={wheelPaused}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-[#0A0B0E] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {wheelPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{wheelPaused ? 'Вращать' : 'Пауза'}</span>
            </button>
          </div>

          <div className="relative w-full max-w-[680px] aspect-square hidden md:flex items-center justify-center my-4">
            <div className="relative z-20 text-center px-6 pointer-events-none">
              <div className="font-display font-black text-3xl lg:text-4xl uppercase tracking-tight text-[#0A0B0E]">
                ЛУЧШИЕ
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-700 font-semibold mt-1">
                ВИТРИНЫ И МОДУЛИ
              </div>
            </div>

            <div
              className={`absolute inset-0 radial-wheel-orbit ${
                wheelPaused ? 'editorial-marquee-paused' : ''
              }`}
            >
              {RADIAL_MODULES.map((mod, idx) => {
                const angleDeg = idx * 45;
                const angleRad = (angleDeg * Math.PI) / 180;
                const radiusPct = 38;
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
                      className={`w-full text-left p-3.5 rounded-2xl bg-white text-[#0A0B0E] border border-slate-300 hover:border-[#0A0B0E] shadow-lg hover:scale-105 transition-all cursor-pointer radial-wheel-counter-orbit ${
                        wheelPaused ? 'editorial-marquee-paused' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 font-bold mb-1">
                        <span>#{mod.code}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#0A0B0E]" />
                      </div>
                      <div className="font-display font-bold text-xs text-[#0A0B0E] leading-snug">
                        {mod.title}
                      </div>
                      <div className="font-mono text-[10px] text-slate-600 mt-0.5">
                        {mod.sub}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full md:hidden">
            <div className="text-center mb-6">
              <div className="font-display font-black text-3xl uppercase tracking-tight text-[#0A0B0E]">
                ЛУЧШИЕ МОДУЛИ
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-slate-700">
                ВИТРИНЫ И АРХИТЕКТУРА
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {RADIAL_MODULES.map((mod) => (
                <button
                  key={mod.code}
                  type="button"
                  onClick={() => setActiveModalProject(projects[mod.projectIndex])}
                  className="p-4 rounded-2xl bg-white border border-slate-300 text-[#0A0B0E] text-left flex flex-col justify-between shadow-sm"
                >
                  <div className="font-mono text-[10px] text-slate-500 font-bold">#{mod.code}</div>
                  <div className="font-display font-bold text-sm mt-1">{mod.title}</div>
                  <div className="font-mono text-[10px] text-slate-600 mt-1">{mod.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PART 4: "ВСЕ РАБОТЫ" — Light Sticky Stack & Filterable Catalog
         ===================================================================== */}
      <section className="bg-[#F5F5F0] text-[#0A0B0E] py-24 sm:py-32 px-4 sm:px-8 border-b border-black/15">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <h2
                className="font-display font-black uppercase tracking-[-0.035em] leading-[0.92] text-[#0A0B0E]"
                style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.2rem)' }}
              >
                ВСЕ
                <br />
                РАБОТЫ
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Фильтровать все работы по направлению"
              className="flex overflow-x-auto sm:flex-wrap gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 no-scrollbar"
            >
              {categories.map((cat) => {
                const isActive = selectedFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedFilter(cat.id as any)}
                    className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      isActive
                        ? 'bg-[#0A0B0E] text-[#F5F5F0] border-[#0A0B0E] shadow-md'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-[#0A0B0E] hover:text-[#0A0B0E]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

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
                  className="md:sticky scroll-entry-card rounded-3xl bg-white border border-slate-300 hover:border-slate-500 transition-colors p-6 sm:p-10 shadow-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-[#0A0B0E]">
                            0{index + 1} • {project.shortCode}
                          </span>
                          <span className="font-mono text-xs text-slate-600 font-semibold">
                            {project.categoryLabel}
                          </span>
                        </div>

                        <h3 className="font-display font-black text-2xl sm:text-4xl text-[#0A0B0E] tracking-tight mb-3">
                          {project.title}
                        </h3>

                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                          {project.tagline}
                        </p>

                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
                          {project.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2.5">
                              <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.badges.map((badge) => (
                            <span
                              key={badge}
                              className="px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-slate-300 text-[11px] font-mono text-slate-800 font-semibold"
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
                            className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[#0A0B0E] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Открыть Дашборд</span>
                            </a>
                          )}

                          <button
                            onClick={() => setActiveModalProject(project)}
                            className="px-5 py-2.5 rounded-full bg-[#0A0B0E] hover:bg-neutral-800 text-[#F5F5F0] font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Архитектура и код</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right 5 Cols: Live Code & Architecture Preview Card (Light) */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl bg-[#FAF9F5] border border-slate-300 p-5 font-mono text-xs text-slate-800 shadow-inner">
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-300 text-[11px] text-slate-600 font-bold">
                          <span>{project.codeSnippet.title}</span>
                          <span className="uppercase text-emerald-800">{project.techSpec.runtime}</span>
                        </div>
                        <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-900 no-scrollbar">
                          <code>{project.codeSnippet.code}</code>
                        </pre>
                        <div className="mt-4 pt-3 border-t border-slate-300 grid grid-cols-2 gap-2 text-[10px] text-slate-600">
                          <div>
                            <span className="block text-slate-500 font-bold">ПРОТОКОЛ</span>
                            <span className="text-[#0A0B0E] font-bold">{project.techSpec.protocol}</span>
                          </div>
                          <div>
                            <span className="block text-slate-500 font-bold">ХРАНИЛИЩЕ</span>
                            <span className="text-[#0A0B0E] font-bold">{project.techSpec.storage}</span>
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

      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
