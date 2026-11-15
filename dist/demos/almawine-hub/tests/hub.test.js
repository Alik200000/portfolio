const test = require('node:test');
const assert = require('node:assert/strict');
const {
  validateKzBinIin,
  simulateBitrixTo1CSync,
  BRANCHES,
  PORTFOLIO_SKUS,
} = require('../server.js');

test('1. Валидатор БИН/ИИН РК корректно проверяет контрольный разряд и определяет ТОО (КБе 17)', () => {
  const validBin = validateKzBinIin('040540004126');
  assert.equal(validBin.valid, true);
  assert.equal(validBin.kbe, '17');
  assert.equal(validBin.clean, '040540004126');

  const invalidBin = validateKzBinIin('040540004129');
  assert.equal(invalidBin.valid, false);
});

test('2. Сеть дистрибуции включает все 24 филиала РК (включая ТОО «Almatytrade», винотеки Almawine и сеть «Наурыз»)', () => {
  assert.equal(BRANCHES.length, 24);
  const almatytrade = BRANCHES.find((b) => b.name.includes('Almatytrade'));
  const almawineVin = BRANCHES.find((b) => b.name.includes('Almawine'));
  const nauryz = BRANCHES.find((b) => b.name.includes('Наурыз'));
  assert.ok(almatytrade);
  assert.ok(almawineVin);
  assert.ok(nauryz);
});

test('3. Портфель брендов Almawine рассчитывает Burn Rate, дни запаса и риск Out-of-Stock (< 5 дней)', () => {
  assert.equal(PORTFOLIO_SKUS.length, 12);
  const oosItems = PORTFOLIO_SKUS.filter((s) => s.oosRisk);
  assert.ok(oosItems.length > 0);
  for (const item of oosItems) {
    assert.ok(item.daysOfSupply < 5.0);
    assert.ok(item.recommendedReorder > 0);
  }
});

test('4. Шлюз Битрикс24 ↔ 1С 8.3 формирует OData Document_ЗаказКлиента с НДС 12% и блокирует циклы от тех. пользователя 999', () => {
  const normalSync = simulateBitrixTo1CSync({
    dealId: 'B24-TEST-101',
    bin: '040540004126',
    counterpartyName: 'ТОО «Almaty HoReCa»',
    branchId: 'ALM-01',
    skuCode: 'AW-BF-001',
    quantity: 10,
    modifyByUserId: 42,
  });

  assert.equal(normalSync.status, 'SYNCED_TO_1C');
  assert.equal(normalSync.odataPayload1C['@odata.type'], 'StandardODATA.Document_ЗаказКлиента');
  assert.equal(normalSync.orderSummary.totalAmountKzt, 11850 * 10);
  assert.equal(normalSync.odataPayload1C.ПризнакСНТ_ВиртуальныйСклад, true);

  const loopSync = simulateBitrixTo1CSync({
    dealId: 'B24-TEST-101',
    bin: '040540004126',
    modifyByUserId: 999,
  });
  assert.equal(loopSync.status, 'SKIPPED_LOOP_GUARD');
});
