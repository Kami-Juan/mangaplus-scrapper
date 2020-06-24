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

  for (let manga of popularMangas) {
    await Promise.all([
      page.waitForNavigation(),
      page.goto(manga.url)
    ]);

    await page.waitForFunction("document.querySelector('.ChapterList-module_numberOfViews_14bIt')");

    const { title, content, viewers } = await page.evaluate(() => {
      const title = document.querySelector('.TitleDetailHeader-module_title_Iy33M').textContent;
      const content = document.querySelector('.ChapterList-module_overview_3ajSr').textContent;
      const viewers = document.querySelector('.ChapterList-module_numberOfViews_14bIt').textContent;

      return {
        title,
        content,
        viewers,
      }
    });

    manga.title = title;
    manga.content = content;
    manga.viewers = viewers;
  }

  console.dir(popularMangas, { maxArrayLength: null });

  await browser.close();
})();