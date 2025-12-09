import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const screenshotsDir = path.join(rootDir, 'screenshots');

// Pages to screenshot (you can modify this list)
const pagesToScreenshot = [
  { path: '/corporate-partners/', name: 'corporate-partners' },
  { path: '/corporate-students/', name: 'corporate-students' },
  { path: '/siemens-pgcsef/', name: 'siemens-pgcsef' },
  { path: '/pseg-inquiry/', name: 'pseg-inquiry' },
  { path: '/pseg-pgceai/', name: 'pseg-pgceai' },
  // Add more pages as needed
];

// Default dev server URL (Vite typically runs on 5173)
const BASE_URL = process.env.DEV_URL || 'http://localhost:3000';

// Helper function to wait/delay (replacement for deprecated waitForTimeout)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function takeScreenshots() {
  // Create screenshots directory if it doesn't exist
  await fs.mkdir(screenshotsDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const pageConfig of pagesToScreenshot) {
      const page = await browser.newPage();
      
      try {
        const url = `${BASE_URL}${pageConfig.path}`;
        console.log(`Taking screenshot of ${url}...`);
        
        // Set viewport size (you can adjust these)
        await page.setViewport({
          width: 1920,
          height: 1080,
        });

        // Navigate to the page
        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        });

        // Wait a bit for any animations/transitions
        await delay(1000);

        // Take full page screenshot
        const screenshotPath = path.join(screenshotsDir, `${pageConfig.name}-full.png`);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        });
        console.log(`✓ Saved: ${screenshotPath}`);

        // Also take viewport screenshot (what's visible on screen)
        const viewportPath = path.join(screenshotsDir, `${pageConfig.name}-viewport.png`);
        await page.screenshot({
          path: viewportPath,
          fullPage: false,
        });
        console.log(`✓ Saved: ${viewportPath}`);

      } catch (error) {
        console.error(`✗ Error screenshotting ${pageConfig.path}:`, error.message);
      } finally {
        await page.close();
      }
    }

    console.log('\n✅ Screenshots completed!');
    console.log(`📁 Screenshots saved in: ${screenshotsDir}`);

  } finally {
    await browser.close();
  }
}

// Run the script
takeScreenshots().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
