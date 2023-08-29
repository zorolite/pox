const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL with the iframe
  await page.goto('https://vd.1xplayer.com/play/ftt14960612?tr=5');

  // Wait for the iframe to load
  await page.waitForSelector('iframe');

  // Get the iframe's content
  const frame = page.frames()[1];
  const iframeContent = await frame.content();

  // Use JavaScript to find and extract the index.m3u8 URL
  const regex = /index\.m3u8[^'"]*/;
  const match = iframeContent.match(regex);

  if (match) {
    const indexM3U8Url = match[0];
    console.log(indexM3U8Url);
  } else {
    console.log('index.m3u8 URL not found.');
  }

  await browser.close();
})();
