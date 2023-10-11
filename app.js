const puppeteer = require('puppeteer');

async function run(){

    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();

   // await page.screenshot({path: 'wiki.png'});
   // await page.screenshot({path: 'wiki.png',fullPage:true});
   // await page.pdf({path: 'wiki.pdf',format:'A4'});

   await page.goto('https://www.wikipedia.org');

   // await page.type('input[name=search]', 'Adenosine triphosphate');
    await page.focus('input[name="search"]');
    await page.keyboard.type('ethiopia');

   await page.keyboard.press('Enter');
   //await page.waitForSelector('#search-form');

   //await page.click('input[type="submit"]');

   await page.waitForNavigation({waitUntil:'networkidle2'});

   console.log("Search done successfully!");
   
   await page.screenshot({path: 'wiki.png',fullPage:true});

//    await page.waitForSelector('#mw-content-text');
//    const text = await page.evaluate(() => {
//        const anchor = document.querySelector('#mw-content-text');
//        return anchor.textContent;
//    });
//    console.log(text);

    await browser.close();
}

run();