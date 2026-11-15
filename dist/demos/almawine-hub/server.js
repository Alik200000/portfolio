/**
 * Almawine Omnichannel AI & Data Hub — Backend & Business Logic Engine
 * Специально разработано для демонстрации подхода AI-Assisted Development (Claude Code)
 * под задачи Холдинга Almawine (ТОО «Almatytrade», 24 филиала РК, винотеки Almawine, магазины «Наурыз», E-Commerce).
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

// ---------------------------------------------------------------------------
// 1. Валидатор БИН/ИИН Республики Казахстан (по алгоритму МФ РК + расшифровка)
// ---------------------------------------------------------------------------
function validateKzBinIin(code) {
  const clean = String(code || '').replace(/\D/g, '');
  if (clean.length !== 12) {
    return { valid: false, clean, error: 'БИН/ИИН должен содержать ровно 12 цифр' };
  }

  const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const weights2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];
  const digits = clean.split('').map(Number);

  let sum = 0;
  for (let i = 0; i < 11; i++) sum += digits[i] * weights1[i];
  let control = sum % 11;

  if (control === 10) {
    sum = 0;
    for (let i = 0; i < 11; i++) sum += digits[i] * weights2[i];
    control = sum % 11;
  }

  const isCheckDigitValid = control === digits[11];
  const fifthDigit = digits[4];
  const isBin = fifthDigit >= 4 && fifthDigit <= 6;
  const entityTypes = {
    4: 'Юридическое лицо — резидент РК (ТОО / АО)',
    5: 'Юридическое лицо — нерезидент РК',
    6: 'Индивидуальное совместное предпринимательство',
  };

  return {
    valid: isCheckDigitValid,
    clean,
    type: isBin ? entityTypes[fifthDigit] : 'ИП / Физическое лицо (ИИН)',
    kbe: isBin ? '17' : '19',
    regYear: `20${clean.slice(0, 2)}`,
    regMonth: clean.slice(2, 4),
    checkDigit: digits[11],
    expectedCheckDigit: control,
    error: isCheckDigitValid ? null : `Неверный контрольный разряд (ожидалась цифра ${control})`,
  };
}

// ---------------------------------------------------------------------------
// 2. Эталонные данные Холдинга Almawine (24 филиала РК, бренды, каналы сбыта)
// ---------------------------------------------------------------------------
const BRANCHES = [
  { id: 'ALM-01', name: 'ТОО «Almatytrade» (Алматы Хаб)', city: 'Алматы', channel: 'HoReCa & Дистрибуция', revenueMln: 485.4, planMln: 460.0, arOverdueMln: 11.2, oosCount: 1, syncStatus: 'OK' },
  { id: 'AST-02', name: 'Филиал Астана Север/Левый берег', city: 'Астана', channel: 'HoReCa & Ритейл', revenueMln: 342.8, planMln: 350.0, arOverdueMln: 14.8, oosCount: 2, syncStatus: 'OK' },
  { id: 'SHY-03', name: 'Филиал Шымкент Юг', city: 'Шымкент', channel: 'Традиционная розница', revenueMln: 198.5, planMln: 190.0, arOverdueMln: 6.4, oosCount: 0, syncStatus: 'OK' },
  { id: 'VIN-04', name: 'Сеть винотек «Almawine» (Алматы/Астана)', city: 'Алматы / Астана', channel: 'Винотеки Almawine (B2C/VIP)', revenueMln: 164.2, planMln: 155.0, arOverdueMln: 0.0, oosCount: 1, syncStatus: 'OK' },
  { id: 'NAU-05', name: 'Сеть магазинов у дома «Наурыз»', city: 'Алматы', channel: 'Ритейл «Наурыз»', revenueMln: 148.9, planMln: 145.0, arOverdueMln: 0.0, oosCount: 2, syncStatus: 'OK' },
  { id: 'ECM-06', name: 'Almawine E-Commerce & B2B Portal', city: 'Казахстан (Online)', channel: 'E-Commerce', revenueMln: 112.6, planMln: 100.0, arOverdueMln: 1.5, oosCount: 0, syncStatus: 'OK' },
  { id: 'KAR-07', name: 'Филиал Караганда Центр', city: 'Караганда', channel: 'Дистрибуция', revenueMln: 134.0, planMln: 140.0, arOverdueMln: 9.1, oosCount: 3, syncStatus: 'RETRY_QUEUE' },
  { id: 'ATY-08', name: 'Филиал Атырау Запад', city: 'Атырау', channel: 'HoReCa & Ритейл', revenueMln: 121.4, planMln: 115.0, arOverdueMln: 4.3, oosCount: 1, syncStatus: 'OK' },
  { id: 'AKT-09', name: 'Филиал Актобе', city: 'Актобе', channel: 'Дистрибуция', revenueMln: 108.7, planMln: 110.0, arOverdueMln: 5.2, oosCount: 1, syncStatus: 'OK' },
  { id: 'UKG-10', name: 'Филиал Усть-Каменогорск (ВКО)', city: 'Усть-Каменогорск', channel: 'Дистрибуция', revenueMln: 96.3, planMln: 95.0, arOverdueMln: 3.8, oosCount: 0, syncStatus: 'OK' },
  { id: 'PAV-11', name: 'Филиал Павлодар', city: 'Павлодар', channel: 'Дистрибуция', revenueMln: 91.5, planMln: 90.0, arOverdueMln: 2.9, oosCount: 0, syncStatus: 'OK' },
  { id: 'KOS-12', name: 'Филиал Костанай', city: 'Костанай', channel: 'Дистрибуция', revenueMln: 88.2, planMln: 85.0, arOverdueMln: 4.1, oosCount: 1, syncStatus: 'OK' },
  { id: 'AKT-13', name: 'Филиал Актау (Мангистау)', city: 'Актау', channel: 'HoReCa & Ритейл', revenueMln: 86.0, planMln: 82.0, arOverdueMln: 3.1, oosCount: 0, syncStatus: 'OK' },
  { id: 'URA-14', name: 'Филиал Уральск (ЗКО)', city: 'Уральск', channel: 'Дистрибуция', revenueMln: 74.5, planMln: 75.0, arOverdueMln: 2.4, oosCount: 0, syncStatus: 'OK' },
  { id: 'TAR-15', name: 'Филиал Тараз', city: 'Тараз', channel: 'Дистрибуция', revenueMln: 69.8, planMln: 70.0, arOverdueMln: 3.6, oosCount: 1, syncStatus: 'OK' },
  { id: 'SEM-16', name: 'Филиал Семей (Абай)', city: 'Семей', channel: 'Дистрибуция', revenueMln: 66.1, planMln: 65.0, arOverdueMln: 2.2, oosCount: 0, syncStatus: 'OK' },
  { id: 'KYZ-17', name: 'Филиал Кызылорда', city: 'Кызылорда', channel: 'Дистрибуция', revenueMln: 58.4, planMln: 60.0, arOverdueMln: 2.8, oosCount: 1, syncStatus: 'OK' },
  { id: 'PET-18', name: 'Филиал Петропавловск (СКО)', city: 'Петропавловск', channel: 'Дистрибуция', revenueMln: 54.0, planMln: 52.0, arOverdueMln: 1.9, oosCount: 0, syncStatus: 'OK' },
  { id: 'TAL-19', name: 'Филиал Талдыкорган (Жетысу)', city: 'Талдыкорган', channel: 'Дистрибуция', revenueMln: 51.2, planMln: 50.0, arOverdueMln: 1.7, oosCount: 0, syncStatus: 'OK' },
  { id: 'KOK-20', name: 'Филиал Кокшетау (Акмола)', city: 'Кокшетау', channel: 'Дистрибуция', revenueMln: 48.7, planMln: 48.0, arOverdueMln: 1.4, oosCount: 0, syncStatus: 'OK' },
  { id: 'TUR-21', name: 'Филиал Туркестан', city: 'Туркестан', channel: 'Дистрибуция', revenueMln: 45.3, planMln: 45.0, arOverdueMln: 2.1, oosCount: 0, syncStatus: 'OK' },
  { id: 'EKI-22', name: 'Филиал Экибастуз', city: 'Экибастуз', channel: 'Дистрибуция', revenueMln: 38.9, planMln: 40.0, arOverdueMln: 1.1, oosCount: 0, syncStatus: 'OK' },
  { id: 'ZHE-23', name: 'Филиал Жезказган (Улытау)', city: 'Жезказган', channel: 'Дистрибуция', revenueMln: 34.6, planMln: 35.0, arOverdueMln: 0.9, oosCount: 0, syncStatus: 'OK' },
  { id: 'RUD-24', name: 'Филиал Рудный / Балхаш', city: 'Рудный', channel: 'Дистрибуция', revenueMln: 32.1, planMln: 32.0, arOverdueMln: 0.8, oosCount: 0, syncStatus: 'OK' },
];

const PORTFOLIO_SKUS = [
  { sku: 'AW-BF-001', barcode: '5099873089798', brand: 'Jack Daniel’s Old No.7 (Brown-Forman)', category: 'Крепкий алкоголь', volume: '0.7 л', priceKzt: 11850, marginPct: 28.4, stockUnits: 1420, dailyBurnRate: 185, warehouse: 'ТОО Almatytrade (Алматы)' },
  { sku: 'AW-FIN-002', barcode: '5099873045213', brand: 'Finlandia Classic Vodka', category: 'Крепкий алкоголь', volume: '0.7 л', priceKzt: 6490, marginPct: 26.0, stockUnits: 980, dailyBurnRate: 210, warehouse: 'ТОО Almatytrade (Алматы)' },
  { sku: 'AW-WG-003', barcode: '5010327325125', brand: 'Glenfiddich 12 YO Single Malt (William Grant & Sons)', category: 'Крепкий алкоголь', volume: '0.7 л', priceKzt: 24900, marginPct: 34.2, stockUnits: 310, dailyBurnRate: 42, warehouse: 'Винотеки Almawine' },
  { sku: 'AW-JAG-004', barcode: '4067700015532', brand: 'Jägermeister Herbal Liqueur', category: 'Крепкий алкоголь', volume: '0.7 л', priceKzt: 9750, marginPct: 29.5, stockUnits: 410, dailyBurnRate: 145, warehouse: 'Филиал Астана' },
  { sku: 'AW-PAU-005', barcode: '4066600601944', brand: 'Paulaner Hefe-Weißbier Naturtrüb', category: 'Пиво импортное', volume: '0.5 л ж/б', priceKzt: 1190, marginPct: 31.0, stockUnits: 8400, dailyBurnRate: 920, warehouse: 'Сеть «Наурыз» + HoReCa' },
  { sku: 'AW-ASA-006', barcode: '8008440122301', brand: 'Asahi Super Dry (Япония)', category: 'Пиво импортное', volume: '0.5 л ст.', priceKzt: 1350, marginPct: 32.5, stockUnits: 1150, dailyBurnRate: 380, warehouse: 'ТОО Almatytrade (Алматы)' },
  { sku: 'AW-PIL-007', barcode: '8594403110119', brand: 'Pilsner Urquell Original (Чехия)', category: 'Пиво импортное', volume: '0.5 л ж/б', priceKzt: 1150, marginPct: 29.8, stockUnits: 4920, dailyBurnRate: 540, warehouse: 'ТОО Almatytrade (Алматы)' },
  { sku: 'AW-LON-008', barcode: '5010492112506', brand: 'Fuller’s London Pride & Belhaven Black', category: 'Пиво импортное', volume: '0.5 л ст.', priceKzt: 1680, marginPct: 33.4, stockUnits: 1640, dailyBurnRate: 190, warehouse: 'HoReCa Пабы Алматы/Астана' },
  { sku: 'AW-UND-009', barcode: '7804320114026', brand: 'Undurraga Cabernet Sauvignon Reserve (Чили)', category: 'Вино тихое', volume: '0.75 л', priceKzt: 5890, marginPct: 38.0, stockUnits: 1290, dailyBurnRate: 160, warehouse: 'Винотеки Almawine & E-Com' },
  { sku: 'AW-SER-010', barcode: '8003505003119', brand: 'Serena 1881 Prosecco DOC Treviso Brut (Италия)', category: 'Вино игристое', volume: '0.75 л', priceKzt: 6950, marginPct: 39.5, stockUnits: 520, dailyBurnRate: 175, warehouse: 'Филиал Караганда / Алматы' },
  { sku: 'AW-GOB-011', barcode: '9002493001124', brand: 'Schloss Gobelsburg Grüner Veltliner (Австрия)', category: 'Вино тихое', volume: '0.75 л', priceKzt: 12400, marginPct: 41.2, stockUnits: 290, dailyBurnRate: 28, warehouse: 'Винотеки Almawine VIP' },
  { sku: 'AW-REL-012', barcode: '5602840014209', brand: 'Casa Relvas Herdade de São Miguel (Португалия)', category: 'Вино тихое', volume: '0.75 л', priceKzt: 7200, marginPct: 37.6, stockUnits: 740, dailyBurnRate: 85, warehouse: 'Сеть «Наурыз» + Винотеки' },
].map((item) => {
  const daysOfSupply = +(item.stockUnits / item.dailyBurnRate).toFixed(1);
  const oosRisk = daysOfSupply < 5.0;
  const recommendedReorder = oosRisk ? Math.ceil(item.dailyBurnRate * 14 - item.stockUnits) : 0;
  return { ...item, daysOfSupply, oosRisk, recommendedReorder };
});

// ---------------------------------------------------------------------------
// 3. Симуляция синхронизации Битрикс24 ↔ 1С:Предприятие 8.3 (Outbox + Loop Guard)
// ---------------------------------------------------------------------------
function simulateBitrixTo1CSync(payload) {
  const {
    dealId = 'B24-DEAL-88412',
    counterpartyName = 'ТОО «Ресторанная Группа Алатау HoReCa»',
    bin = '040540004126',
    branchId = 'ALM-01',
    skuCode = 'AW-SER-010',
    quantity = 48,
    modifyByUserId = 42,
  } = payload || {};

  const binCheck = validateKzBinIin(bin);
  const selectedSku = PORTFOLIO_SKUS.find((s) => s.sku === skuCode) || PORTFOLIO_SKUS[0];
  const branch = BRANCHES.find((b) => b.id === branchId) || BRANCHES[0];

  const netAmount = Math.round((selectedSku.priceKzt * quantity) / 1.12);
  const vatAmount = selectedSku.priceKzt * quantity - netAmount;
  const totalAmount = selectedSku.priceKzt * quantity;

  // Защита от бесконечного цикла (Loop Prevention): хэш полезных полей
  const stateHash = crypto
    .createHash('sha256')
    .update(`${dealId}|${binCheck.clean}|${skuCode}|${quantity}|${totalAmount}`)
    .digest('hex')
    .slice(0, 16);

  const isTechUserLoop = Number(modifyByUserId) === 999;
  const refKey1C = crypto.randomUUID();

  return {
    timestamp: new Date().toISOString(),
    status: isTechUserLoop ? 'SKIPPED_LOOP_GUARD' : binCheck.valid ? 'SYNCED_TO_1C' : 'VALIDATION_WARNING',
    loopPrevention: {
      modifyByUserId,
      techUserId: 999,
      stateHash,
      action: isTechUserLoop
        ? 'Событие ONCRMDEALUPDATE от технического пользователя 999 проигнорировано (защита от петли)'
        : 'Хэш состояния проверен в таблице sync_state — дублей нет',
    },
    binValidation: binCheck,
    orderSummary: {
      dealId,
      counterpartyName,
      branchName: branch.name,
      sku: selectedSku.sku,
      brand: selectedSku.brand,
      quantity,
      priceKzt: selectedSku.priceKzt,
      netAmountKzt: netAmount,
      vat12Kzt: vatAmount,
      totalAmountKzt: totalAmount,
      sntRequired: true,
      virtualWarehouseCode: 'VW-ALMATY-ALC-01',
    },
    odataPayload1C: {
      '@odata.type': 'StandardODATA.Document_ЗаказКлиента',
      Ref_Key: refKey1C,
      Number: `АТ-${String(Date.now()).slice(-6)}`,
      Date: new Date().toISOString().slice(0, 19),
      Организация_Name: 'ТОО «Almatytrade» (Холдинг Almawine)',
      Контрагент_БИН: binCheck.clean,
      Контрагент_Наименование: counterpartyName,
      Склад_Name: branch.name,
      ПризнакСНТ_ВиртуальныйСклад: true,
      Комментарий: `[Bitrix24 #${dealId}] Автосинхронизация через AI-шлюз (Hash: ${stateHash})`,
      Товары: [
        {
          LineNumber: '1',
          Номенклатура_Артикул: selectedSku.sku,
          Номенклатура_Штрихкод: selectedSku.barcode,
          Количество: quantity,
          Цена: selectedSku.priceKzt,
          СтавкаНДС: 'НДС12',
          СуммаНДС: vatAmount,
          СуммаСНДС: totalAmount,
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// 4. HTTP Сервер (API + статика)
// ---------------------------------------------------------------------------
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function createServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // Безопасные заголовки
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    if (pathname === '/api/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': MIME_TYPES['.json'] });
      return res.end(JSON.stringify({ ok: true, service: 'almawine-omnichannel-ai-hub', branches: BRANCHES.length, skus: PORTFOLIO_SKUS.length }));
    }

    if (pathname === '/api/branches' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': MIME_TYPES['.json'] });
      return res.end(JSON.stringify({ branches: BRANCHES }));
    }

    if (pathname === '/api/skus' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': MIME_TYPES['.json'] });
      return res.end(JSON.stringify({ skus: PORTFOLIO_SKUS }));
    }

    if (pathname === '/api/sync/bitrix-1c' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 1e5) req.socket.destroy();
      });
      req.on('end', () => {
        try {
          const payload = body ? JSON.parse(body) : {};
          const result = simulateBitrixTo1CSync(payload);
          res.writeHead(200, { 'Content-Type': MIME_TYPES['.json'] });
          res.end(JSON.stringify(result));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': MIME_TYPES['.json'] });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // Раздача статики из папки public
    const safePath = pathname === '/' ? '/index.html' : pathname;
    const filePath = path.join(__dirname, 'public', path.normalize(safePath).replace(/^(\.\.(\/|\\|$))+/, ''));

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 Not Found');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`🍷 Almawine Omnichannel AI Hub запущен: http://localhost:${PORT}`);
  });
}

module.exports = {
  validateKzBinIin,
  simulateBitrixTo1CSync,
  BRANCHES,
  PORTFOLIO_SKUS,
  createServer,
};
