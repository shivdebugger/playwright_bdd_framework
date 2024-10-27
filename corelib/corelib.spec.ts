import { setDefaultTimeout, Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber"
import { Browser, BrowserContext, chromium,firefox,webkit, Page } from "@playwright/test"
import dotenv from "dotenv";


let browser: Browser;
let page: Page;
let bCtx: BrowserContext;

setDefaultTimeout(1000 * 60 * 2)

BeforeAll(async function (){

  dotenv.config();

  let browserType = process.env.browser;

  switch (browserType) {
    case 'chrome':
      browser = await chromium.launch({ headless: false, channel: "chrome",args:["--start-maximized"]});
      break;
    case 'firefox':
      browser = await firefox.launch({ headless: false,args:["--start-maximized"] });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless: false ,args:["--start-maximized"]});
      break;
    default:
      throw new Error(`Unsupported browser type: ${browserType}`);
  }

})

Before(async function () {
  bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
  page = await bCtx.newPage();
});

After(async function () {
  await page.close();
  await bCtx.close();
  
});

AfterAll( async function(){
  await browser.close();
})

export function getPage():Page{
  return page;
  
}
