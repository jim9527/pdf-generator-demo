import puppeteer from "puppeteer";
import fs from 'fs'

const browser = await puppeteer.launch();
const page = await browser.newPage();
const htmlString = fs.readFileSync(`src/content/sample.html`, 'utf-8')
await page.setContent(htmlString, {
    waitUntil: "domcontentloaded"
})


const footerTemplate = `<p style='width: 100%; text-align: center; font-size: 16px;'>CONFIDENTIAL DOCUMENT - FOR AUTHORIZED USE ONLY<p>`
await page.pdf({
    path: 'sample1.pdf',
    printBackground: true,
    format: 'A4',
    displayHeaderFooter: true,
    // headerTemplate: headerTemplate,
    // margin: { top: 140, bottom: 60, left: '20px', right: '20px' },
    margin: { top: '140px', right: '30px', bottom: '100px', left: '30px' },
    footerTemplate: footerTemplate,
    headerTemplate: `<style>
    html {
      -webkit-print-color-adjust: exact;
    }
    header {
        margin: 0 30px;
    }
    .left {
        margin-left: -30px;
    }
    </style><header style='width: 100%; font-size: 16px; border-bottom: 2px solid #333; display: flex; justify-content: space-between; padding-bottom: 10px;'>
    <div class='left' style='font-weight: bold;'>
      <p style="margin: 0 0; padding: 0 0;">NATIONAL PRACTITIONER DATA BANK</p>
      <p class='log' style="margin: 0 0; padding: 0 0; letter-spacing: 0.4;">NPDB</p>
      <p style="margin: 0 0; padding: 0 0;">P.O. Box 10832</p>
      <p style="margin: 0 0; padding: 0 0;">Chantilly, VA 20153-0832</p>
      <p style="margin: 0 0; padding: 0 0; margin: 10px 0;" class='website'>https://www.npdb.hrsa.gov</p>
    </div>
    <div class='right' style="border: 1px solid #333;padding: 5px; width: 300px;">
      <p style="margin: 4px 0; padding: 0 0;"><strong>DCN:</strong> 7950000146051813</p>
      <p style="margin: 4px 0; padding: 0 0;">Process Date: <span class='date'></span></p>
      <p style="margin: 4px 0; padding: 0 0;">Page: <span class='pageNumber'></span> of <span class='totalPages'></span></p>
      <p style="margin: 4px 0; padding: 0 0;">authorized use by: STATE BOARD</p>
    </div>
  </header>`,
    // marginTop:"100px",
  });


  await browser.close()