const puppeteer = require("puppeteer");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN =
  process.env.TELEGRAM_TOKEN ||
  "6549917923:AAEXonaUQcIVMVlRyGZclsaUX84r6C92ZFI";

async function run(searchInput) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.wikipedia.org");

  await page.focus('input[name="search"]');
  await page.keyboard.type(searchInput);
  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "networkidle0" });

  console.log("Search done successfully!");

 const pdfFile = await page.pdf({ path: `files/${searchInput}.pdf`, format: "A4" });

  await browser.close();

  return pdfFile;
}

// ************* Bot
const bot = new TelegramBot(TOKEN, { polling: true });

function startMenu(msg) {
  const opts = {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: "🔎 search " }, { text: "👨🏽‍💻 developer" }],
        [{ text: "Back" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    }),
  };
  bot.sendMessage(msg.chat.id, " start menu ", opts);
}

bot.onText(/start/, (msg) => {
  console.log("=============" + msg.chat.first_name);
  startMenu(msg);
});

bot.onText(/search/, async (msg) => {
  const searchInput = await bot.sendMessage(
    msg.chat.id,
    "Enter your search query and i'll give you the wikipedia file in pdf\n\n ",
    {
      reply_markup: {
        force_reply: true,
      },
    }
  );

 bot.onReplyToMessage(
    msg.chat.id,
    searchInput.message_id,
     (userSearch) => {
    //  console.log(userSearch.text);
      userSearchResult = `${msg.chat.id}_${Math.round(Math.random())}`;

     const resultFile = run(userSearch.text);
     resultFile.then(res=>{
      let userFile = __dirname + `/files/${userSearch.text}.pdf`;
      bot.sendDocument(msg.chat.id, userFile);
        }).catch(err=>{
          console.log(err);
          bot.sendMessage(msg.chat.id, "Oops! server side error occured! Try again");
        });

        bot.sendMessage(msg.chat.id, "Searching the file 📑 please wait a few seconds ⏳ ...\n\n ");

    }
  );
});

bot.onText(/developer/, (msg) => {
  bot.sendMessage(msg.chat.id, "Developed By: Yididiya Kassahun\n\n ");
});

bot.onText(/back/, (msg) => {
  startMenu(msg);
});