// Playwright CLI run-code --filename tools/qa-import.js
// Run only in an isolated QA context. Deliberately simulate failed storage.
async page => {
  const before = await page.evaluate(() => localStorage.getItem('element-atlas-practice-v1'));
  await page.evaluate(() => {
    Storage.prototype.setItem = function () { throw new DOMException('QA quota', 'QuotaExceededError'); };
    window.confirm = () => true;
  });
  await page.locator('#import-record').setInputFiles({
    name: 'practice.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({version:1,answered:2,correct:1,entries:[{z:26,errors:1,reviews:0}]}))
  });
  await page.waitForFunction(() => document.querySelector('#record-stats').textContent.includes('2'));
  const message = await page.locator('#status').textContent();
  if (!message.includes('저장하지 못')) throw new Error('Import must disclose memory-only success: '+message);
  const after = await page.evaluate(() => localStorage.getItem('element-atlas-practice-v1'));
  if (after !== before) throw new Error('Failed import must preserve the previous durable record');
  return {message, durableRecordPreserved:after===before};
}
