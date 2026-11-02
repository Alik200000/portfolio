import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Zap,
  Check,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { ProjectDetailModal, DetailedProject } from './ProjectDetailModal';

const projects: (DetailedProject & {
  category: 'b2b' | 'ai' | 'fullstack';
  points: string[];
  badges: string[];
})[] = [
  {
    id: 'smart-digital-ops',
    title: 'Smart Digital Ops & Profit Intelligence',
    category: 'fullstack',
    categoryLabel: 'В продакшене (Live на Render)',
    tagline: 'Сквозная операционная ERP/CRM система автоматизации бизнес-процессов и финансово-управленческого учета для компании Smart Digital Group.',
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
    id: 'kaspi-repricer',
    title: 'Kaspi Repricer Enterprise',
    category: 'b2b',
    categoryLabel: 'B2B SaaS • Kaspi.kz Marketplace',
    tagline: 'Автоматический репрайсер и интеллектуальный демпер цен для продавцов Kaspi Магазина.',
    points: [
      'Захват кнопки «Купить» (Топ-1): алгоритм непрерывно сканирует цены конкурентов и выставляет цену на 1 ₸ ниже лидера.',
      'Стоп-цена и защита маржи: бот никогда не опустит цену ниже себестоимости и поднимает цену вверх, если дешевый конкурент распродан.',
      'Инфраструктура: автоматическая генерация защищенного XML-фида для merchant.kaspi.kz, Cloudflare Tunnel, SQLite WAL (multi-tenant изоляция) и Telegram-алерты.',
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
    id: 'alatau-food-trade',
    title: 'Alatau Food Trade (HoReCa Hub)',
    category: 'b2b',
    categoryLabel: 'B2B E-Commerce & 1С',
    tagline: 'Цифровая оптово-розничная платформа поставок продуктов питания и сырья для ресторанов, отелей и кондитерских г. Алматы.',
    points: [
      'Стек: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5 + Tailwind.',
      'Интеграция с 1С: шлюз обмена данными по стандарту CommerceML 3.1 с 1С:Предприятие 8.3 (Управление торговлей Казахстан) — синхронизация цен, остатков и заказов.',
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
    id: 'wb-manager-ai-bot',
    title: 'Wildberries Manager AI Bot',
    category: 'ai',
    categoryLabel: 'Telegram Bot • AI Agent',
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
    category: 'ai',
    categoryLabel: 'Chrome Extension • Gemini Vision',
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
    category: 'fullstack',
    categoryLabel: 'FinTech • Bybit & Binance АБК Скринер',
    tagline: 'Автономный торговый бот и скринер «Арбитража Без Карт» (АБК) для поиска спредов Bybit / Binance и дельта-нейтрального сбора фандинга.',
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

export function ProjectsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'b2b' | 'ai' | 'fullstack'>('all');
  const [activeModalProject, setActiveModalProject] = useState<DetailedProject | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  const categories = [
    { id: 'all', label: 'Все проекты (6)' },
    { id: 'b2b', label: 'Kaspi & 1С Интеграции (2)' },
    { id: 'ai', label: 'ИИ-Агенты & Расширения (2)' },
    { id: 'fullstack', label: 'Web & FinTech (2)' },
  ];

  return (
    <section id="projects" className="relative px-4 sm:px-6 py-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>РЕАЛЬНЫЕ ПРОЕКТЫ С ОТКРЫТЫМ ИСХОДНЫМ КОДОМ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            Коммерческие и Инженерные Проекты
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-medium">
            Реальные B2B-сервисы, интеграции с Kaspi.kz и 1С, автономные ИИ-агенты и веб-приложения с подтвержденным кодом на GitHub.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          role="tablist"
          aria-label="Фильтровать проекты по категориям"
          className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0F131D]/90 border border-white/10 backdrop-blur-xl"
        >
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedFilter(cat.id as any)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 shadow-md shadow-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid with 3D Tilt Cards */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard className="h-full">
                <div className="h-full rounded-3xl bg-[#0F131D]/85 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-2xl flex flex-col justify-between group transition-colors">
                  <div>
                    {/* Header line: Category tag + Links */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-400">
                        {project.categoryLabel}
                      </span>

                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs font-mono cursor-pointer"
                          title="Открыть репозиторий на GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-colors text-xs font-mono font-semibold cursor-pointer"
                            title="Открыть работающее демо"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed mb-4">
                      {project.tagline}
                    </p>

                    {/* Key Technical Highlights */}
                    <ul className="space-y-2.5 text-xs text-slate-400 mb-6">
                      {project.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom: Tech Badges & Architecture Inspector Button */}
                  <div>
                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 mb-4">
                      {project.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300 font-medium"
                        >
                          #{badge}
                        </span>
                      ))}
                    </div>

                    {/* Architecture Drawer Trigger */}
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                    >
                      <Layers className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
                      <span>Архитектура, схема и код проекта</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Architecture & Details Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
