const puppeteer = require('puppeteer');

const URL = 'https://mangaplus.shueisha.co.jp/updates';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // Converts the viewport size to the browser size
    defaultViewport: null,
    // Custom the size browser
    args: [
      '--window-size=1920,920',
    ],
  });

  const page = await browser.newPage();

  await page.goto(URL);
})();
