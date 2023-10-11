const puppeteer = require('puppeteer');

async function run(){

    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();

   // await page.pdf({path: 'wiki.pdf',format:'A4'});

   await page.goto('https://www.wikipedia.org');

   // await page.type('input[name=search]', 'Adenosine triphosphate');
    await page.focus('input[name="search"]');
    await page.keyboard.type('ethiopia');

   await page.keyboard.press('Enter');

   await page.waitForNavigation({waitUntil:'networkidle2'});

   console.log("Search done successfully!");
   
   await page.screenshot({path: 'wiki.png',fullPage:true});

    await browser.close();
}

run();