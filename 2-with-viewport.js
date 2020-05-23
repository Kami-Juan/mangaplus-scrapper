const puppeteer = require('puppeteer');

const URL = 'https://mangaplus.shueisha.co.jp/updates';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // Obtiene el tamaño del viewport por el tamaño del navegador
    defaultViewport: null,
    // Personaliza el tamaño del navegador
    args: [
      '--window-size=1920,920',
    ],
  });

  const page = await browser.newPage();

  await page.goto(URL);
})();