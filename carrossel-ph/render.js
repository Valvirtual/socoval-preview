const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML = path.resolve(__dirname, 'carrossel.html');
const OUT  = path.resolve(__dirname, 'instagram');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.goto('file://' + HTML);
  await page.waitForLoadState('networkidle');

  const slides = await page.$$('.slide');
  console.log(`Renderizando ${slides.length} slides...`);

  for (let i = 0; i < slides.length; i++) {
    const num  = String(i + 1).padStart(2, '0');
    const file = path.join(OUT, `slide-${num}.png`);
    await slides[i].screenshot({ path: file });
    console.log(`✓ slide-${num}.png`);
  }

  await browser.close();
  console.log(`\nPronto! ${slides.length} PNGs em ./instagram/`);
})();
