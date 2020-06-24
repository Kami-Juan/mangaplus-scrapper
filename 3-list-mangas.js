const puppeteer = require('puppeteer');

const URL = 'https://mangaplus.shueisha.co.jp/updates';

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto(URL);

  // https://pptr.dev/#?product=Puppeteer&version=v3.1.0&show=api-pageevaluatepagefunction-args
  const popularMangas = await page.evaluate(() => {
    const mangasWrapper = document.querySelector(".Updates-module_subInnerWrapper_1P-W9").children;

    return Array.from(mangasWrapper)
      .filter(mw => mw.querySelector("img"))
      .map(mw => ({
        url: mw.querySelector("a").href,
        src: mw.querySelector("img").src,
      }))
  });

  console.dir(popularMangas, { maxArrayLength: null });

  await browser.close();
})();
