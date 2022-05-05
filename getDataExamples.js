const puppeteer = require("puppeteer");

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="landingImage"]');
  const src = await el.getProperty("src");
  const imgURL = await src.jsonValue();

  const [el2] = await page.$x(
    "/html/body/div[2]/div[2]/div[5]/div[4]/div[4]/div[1]/div/h1/span[1]"
  );
  const txt = await el2.getProperty("textContent");
  const title = await txt.jsonValue();

  const [el3] = await page.$x('//*[@id="priceblock_ourprice"]');
  const txt2 = await el3.getProperty("textContent");
  const price = await txt2.jsonValue();

  console.log({ imgURL, title, price });

  browser.close();
}
