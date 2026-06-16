import puppeteer from "puppeteer-core";
import { readFileSync } from "fs";
const CHROME =
  "C:/Users/xagao/.cache/puppeteer/chrome/win64-149.0.7827.22/chrome-win64/chrome.exe";
const b64 = readFileSync("art.png").toString("base64");
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
// art.png 600x450 -> 4x = 2400x1800
await page.setContent(`<body style="margin:0"><img src="data:image/png;base64,${b64}" style="width:2400px;display:block"></body>`);
await new Promise((r) => setTimeout(r, 400));
await page.setViewport({ width: 2400, height: 1800 });
// "1990 - 1999" line (top-left of hero) ~ orig y 60-78 -> 4x 240-312
await page.screenshot({ path: "z-years.png", clip: { x: 60, y: 250, width: 1000, height: 90 } });
// metadata + "this is the 90s" ~ orig y 130-160 -> 520-640
await page.screenshot({ path: "z-meta.png", clip: { x: 60, y: 520, width: 1100, height: 140 } });
// barcode + found memories + scroll to explore ~ orig y 165-200 -> 660-800
await page.screenshot({ path: "z-bottom.png", clip: { x: 60, y: 660, width: 1500, height: 150 } });
await browser.close();
console.log("done");
