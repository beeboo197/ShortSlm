import express from "express";
import { Bot,webhookCallback } from "grammy";
import fetch from "node-fetch"
import {} from 'dotenv/config'
const bot = new Bot(process.env.BOT_TOKEN);


bot.on('message', async (ctx) => {
  const message = ctx.message.text;
  const linkRegex = /(https?:\/\/[^\s]+)/;
  const lzd = 'https://s.lazada'
  const laz = /lazada/gm
  const pee = /https:\/\/sh/;
  const aff = /c.lazada/gm
  let retryCount = 0;
  const maxRetries = 1;
      while (retryCount < maxRetries) {
      try { 
        
  if (linkRegex.test(message)) {
    const url = message.match(linkRegex)[0]
    console.log(url)
    
    if (url.includes(lzd)){ 
      console.log("short") 
      break;
      
    await fetch(url).then(res => res.text()).then(async(data) => {
      
      const longUrl = await decodeURIComponent(data.match(/URL\('(.*?)dsource/g)
      .toString()
      .replace(/URL\('/g, '')
      .replace(/%3Fdsource/,''))
      if (aff.test(longUrl)) {  
        const productLink = await longUrl.match(/share&url=(.*?)\html/)[1] + 'html'
        console.log(productLink)
 await fetch("https://adsense.lazada.vn/newOffer/link-convert.json", {
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
    "cookie": " lzd_sid=1d06323d39f485105e20d8e481a0d933;",
    "Referer": "https://adsense.lazada.vn/index.htm",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `{\"jumpUrl\":\"${productLink}\",\"subIdTemplateKey\":\"subId_VN_205141355_1712232282669_40\"}`,
  "method": "POST"
}).then(res => res.json()).then(async(data)  => {console.log(data.message); await ctx.reply(data.message, {parse_mode: "HTML"})})
}  else {
  const shopLink = await longUrl.split("?")[0]+'?path=index.htm'
        console.log(shopLink)
 await fetch("https://adsense.lazada.vn/newOffer/link-convert.json", {
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
    "cookie": " lzd_sid=1d06323d39f485105e20d8e481a0d933;",
    "Referer": "https://adsense.lazada.vn/index.htm",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `{\"jumpUrl\":\"${shopLink}\",\"subIdTemplateKey\":\"subId_VN_205141355_1712232282669_40\"}`,
  "method": "POST"
}).then(res => res.json()).then(async(data)  => {console.log(data.message); await ctx.reply(data.message, {parse_mode: "HTML"})})
      }
});
break;      
} else {
  console.log("long")
  if (pee.test(url)){
    console.log("shopee")
   break;
  }
  if (laz.test(url)){
    const linkLaz = await `https://c.lazada.vn/t/c.06wSoi?intent=false&fallback=false&url=${encodeURIComponent(url)}&sub_aff_id=shorTool`
   await fetch(`https://s.slamee.top/yourls-api.php?signature=0b172c9ad7&format=simple&action=shorturl&url=${encodeURIComponent(linkLaz)}`).then(res => res.text()).then(async(data)  => {console.log(data); await ctx.reply(data, {parse_mode: "HTML"})})
break;
  }
}
   
} else {
  console.log(message)
  const voucherCode = await `https://c.lazada.vn/t/c.06wSoi?url=${encodeURIComponent(`https://www.lazada.vn/catalog/?q=${message}`)}&fallback=true&intent=false&sub_aff_id=shorTool`
  console.log(voucherCode)
 await fetch(`https://s.slamee.top/yourls-api.php?signature=0b172c9ad7&format=simple&action=shorturl&url=${encodeURIComponent(voucherCode)}`).then(res => res.text()).then(async(data)  => {console.log(data); await ctx.reply(data, {parse_mode: "HTML"})})
break;
} 
} catch {
  console.log(err)
     retryCount++;
}}
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

