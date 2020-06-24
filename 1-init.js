const puppeteer = require('puppeteer');

const URL = 'https://mangaplus.shueisha.co.jp/updates';

(async () => {
  /**
   * Opens a web browser.
   * There are many options that we can tweak it, for example the headless option,
   * that allow us to display a web browser and we can see all scrapping process.
   * It's no recommendable on production enviroment.
   * */
  const browser = await puppeteer.launch({ headless: false });

  // The browser add a new tab
  const page = await browser.newPage();

  // Redirect the current page.
  await page.goto(URL);
})();
