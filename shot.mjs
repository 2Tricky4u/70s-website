import puppeteer from "puppeteer-core";
const CHROME="C:\Users\xagao\.cache\puppeteer\chrome\win64-149.0.7827.22\chrome-win64\chrome.exe";
const browser=await puppeteer.launch({executablePath:CHROME,headless:"new",args:["--no-sandbox"]});
const page=await browser.newPage();
await page.setViewport({width:1440,height:900,deviceScaleFactor:2});
await page.goto("http://localhost:5173/",{waitUntil:"networkidle2",timeout:60000});
await new Promise(r=>setTimeout(r,2000));
await page.screenshot({path:"shot-top.png",clip:{x:0,y:0,width:1440,height:110}});
// left + right band closeups (deviceScaleFactor 2 => coords *2)
await page.screenshot({path:"shot-left.png",clip:{x:0,y:0,width:330,height:62}});
await page.screenshot({path:"shot-right.png",clip:{x:980,y:0,width:460,height:62}});
await browser.close();console.log("done");
