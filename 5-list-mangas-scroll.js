const puppeteer = require('puppeteer');

const URL = 'https://mangaplus.shueisha.co.jp/updates';

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto(URL);

  await page.waitForFunction("document.querySelector('.Updates-module_subInnerWrapper_1P-W9').children.length > 1");

  const popularMangas = await page.evaluate(async () => {
    const wait = () => new Promise((resolve, _) => setTimeout(resolve, 2000))

    let scrollPixels = 0;

    while (scrollPixels <= document.body.scrollHeight) {
      window.scrollTo(0, scrollPixels);
      await wait();
      scrollPixels += 600;
    }

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
