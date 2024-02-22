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
    await fetch(url).then(res => res.text()).then(async(data) => {
      const longUrl = await decodeURIComponent(data.match(/URL\('(.*?)dsource/g)
      .toString()
      .replace(/URL\('/g, '')
      .replace(/%3Fdsource/,''))
      if (aff.test(longUrl)) {  
        const productLink = await `https://c.lazada.vn/t/c.06wSoi?url=${encodeURIComponent(longUrl.match(/share&url=(.*?)\html/)[1] + 'html')}&sub_aff_id=shorTool`
 await fetch(`https://s.slamee.top/yourls-api.php?signature=0b172c9ad7&format=simple&action=shorturl&url=${encodeURIComponent(productLink)}`).then(res => res.text()).then(async(data)  => {console.log(data); await ctx.reply(data, {parse_mode: "HTML"})})
}  else {
  const shopLink = await `https://c.lazada.vn/t/c.06wSoi?url=${encodeURIComponent(longUrl.split("?")[0]+'?path=index.htm')}&sub_aff_id=shorTool`
 await fetch(`https://s.slamee.top/yourls-api.php?signature=0b172c9ad7&format=simple&action=shorturl&url=${encodeURIComponent(shopLink)}`).then(res => res.text()).then(async(data)  => {console.log(data); await ctx.reply(data, {parse_mode: "HTML"})})
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
    const linkLaz = await `https://c.lazada.vn/t/c.06wSoi?url=${encodeURIComponent(url)}&sub_aff_id=shorTool`
   await fetch(`https://s.slamee.top/yourls-api.php?signature=0b172c9ad7&format=simple&action=shorturl&url=${encodeURIComponent(linkLaz)}`).then(res => res.text()).then(async(data)  => {console.log(data); await ctx.reply(data, {parse_mode: "HTML"})})
break;
  }
}
   
} else {
  console.log(message)
  const voucherCode = await `https://c.lazada.vn/t/c.06wSoi?url=${encodeURIComponent(`https://www.lazada.vn/catalog/?q=${message}`)}&sub_aff_id=shorTool`
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

