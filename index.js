import express from "express";
import { Bot,webhookCallback } from "grammy";
import fetch from "node-fetch"
import {} from 'dotenv/config'
const bot = new Bot(process.env.BOT_TOKEN);


bot.on('message', async (ctx) => {
  const message = ctx.message.text;
  const linkRegex = /(https?:\/\/[^\s]+)/gm;
  const lzd = 'https://s.lazada'
  const laz = 'www.lazada'
  const page = 'pages.lazada'
  const pee = /https:\/\/sh/;
  const shortenLink = async function (originalLink) {
    if (originalLink.includes(lzd)) {
       const resp =  await fetch(originalLink)
       console.log(resp)
       const data = await resp.text()
       const items =  await data.match(/i(\d+)-s(\d+)/) || data.match(/i(\d+)%2Ds(\d+)/) 
      if (items) {
       console.log("Sản Phẩm") 
       const product = await items[0].replace(/%2D/g,'-') 
       const name = await data.match(/<title>(.*?)<\/title>/)[1]
       console.log(name)
       const longUrl =  await `https://www.lazada.vn/${product}.html`
       const res =  await fetch("https://adsense.lazada.vn/newOffer/link-convert.json", {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
              "bx-v": "2.5.11",
              "content-type": "application/json",
              "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "cookie": "lzd_sid=14101d5824364ffdc9730226a7200e87;",
              "Referer": "https://adsense.lazada.vn/index.htm",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"jumpUrl\":\"${longUrl}\",\"subIdTemplateKey\":\"subId_VN_205141355_1712232282669_40\"}`,
            "method": "POST"})
        const shortTarget = await res.json()
        return name + " - " + shortTarget.message   
       
          } else {
          console.log("Shop")
          const nameShop = await data.match(/<title>(.*?)<\/title>/)[1].replace(/ \| LazadaViệt Nam/g,"") 
          const shopUrl = await data.match(/https:\/\/www\.lazada\.vn\/shop\/[^\s]+/g)[0].split('?')[0]
          const res =  await fetch("https://adsense.lazada.vn/newOffer/link-convert.json", {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
              "bx-v": "2.5.11",
              "content-type": "application/json",
              "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "cookie": "lzd_sid=14101d5824364ffdc9730226a7200e87;",
              "Referer": "https://adsense.lazada.vn/index.htm",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"jumpUrl\":\"${shopUrl}\",\"subIdTemplateKey\":\"subId_VN_205141355_1712232282669_40\"}`,
            "method": "POST"})
        const shortTarget = await res.json()
        return "từ " + nameShop + " - "+ shortTarget.message   
        }
      
    
  } else {
    if(originalLink.includes(laz) || originalLink.includes(page)){
      console.log("Ưu Đãi")
      const res =  await fetch("https://adsense.lazada.vn/newOffer/link-convert.json", {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
              "bx-v": "2.5.11",
              "content-type": "application/json",
              "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "cookie": "lzd_sid=14101d5824364ffdc9730226a7200e87;",
              "Referer": "https://adsense.lazada.vn/index.htm",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"jumpUrl\":\"${originalLink}\",\"subIdTemplateKey\":\"subId_VN_205141355_1712232282669_40\"}`,
            "method": "POST"})
        const shortTarget = await res.json()
        return shortTarget.message 
    } else {
      console.log("Code")
      const voucherCode = await `https://www.lazada.vn/catalog/?q=${originalLink}`
      const res =  await fetch("https://adsense.lazada.vn/newOffer/link-convert.json", {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
              "bx-v": "2.5.11",
              "content-type": "application/json",
              "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "cookie": "lzd_sid=14101d5824364ffdc9730226a7200e87;",
              "Referer": "https://adsense.lazada.vn/index.htm",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"jumpUrl\":\"${voucherCode}\",\"subIdTemplateKey\":\"subId_VN_205141355_1712232282669_40\"}`,
            "method": "POST"})
        const shortTarget = await res.json()
        return shortTarget.message 
    }
  }
}

  //////
 
  const shortenLinks = async (text) => {
    const urls = text.match(linkRegex)
    if (urls) {
      for (const url of urls) {
        const shortenedUrl = await shortenLink(url);
        text = text.replace(url, shortenedUrl);
      }
    } else {
      const arrays = text.split("\n");
      for (const array of arrays) {
        console.log(array)
      const shortenedUrl = await shortenLink(array.toString());
      text = text.replace(array.toString(), shortenedUrl);
      }
    }
  
    return text;
  };
  //
  shortenLinks(message).then((shortenedText) => {
    ctx.reply(shortenedText);
  });

})

if (process.env.NODE_ENV === "production") {
    const app = express();
    app.use(express.json());
    app.use(webhookCallback(bot, "express"));
  
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Bot listening on port ${PORT}`);
    });
  } else {
    bot.start();
  }

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
