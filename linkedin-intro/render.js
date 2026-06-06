const { chromium } = require('playwright');
const path = require('path');
const fs   = require('fs');

const HTML = path.resolve(__dirname, 'post.html');
const OUT  = path.resolve(__dirname, 'post.png');

(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 628 });
  await page.goto('file://' + HTML);
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 628 } });
  console.log('✓ post.png gerado em', OUT);

  await browser.close();
})();
