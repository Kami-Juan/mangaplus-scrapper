const puppeteer = require('puppeteer');

const URL = 'https://mangaplus.shueisha.co.jp/updates';

(async () => {
  /** Inicializa el navegador. Entre las diferentes opciones
   *  que nos permite manipular, headless en false despliega
   *  una ventana emergente y simula el proceso del web scraping.
   *  No recomendable en un ambiente productivo.
   * */
  const browser = await puppeteer.launch({ headless: false });

  // El navegador despliega una nueva página.
  const page = await browser.newPage();

  // Te reedireciona a la página que deseas.
  await page.goto(URL);
})();