import { preview } from 'vite';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Load blogs data using fs.readFileSync for Node 18 compatibility
const blogsData = JSON.parse(
  fsSync.readFileSync(path.join(rootDir, 'src/data/blogs.json'), 'utf-8')
);

// Detect if we're in production (Vercel/CI) or local development
const isProduction = process.env.VERCEL || process.env.CI;

// Dynamically import the appropriate puppeteer package
let puppeteer, chromium;
if (isProduction) {
  const puppeteerCore = await import('puppeteer-core');
  const chromiumPackage = await import('@sparticuz/chromium');
  puppeteer = puppeteerCore.default;
  chromium = chromiumPackage.default;
  
  // Optimize Chromium for Vercel serverless environment
  chromium.setGraphicsMode = false;
  chromium.setHeadlessMode = true;
} else {
  const puppeteerPackage = await import('puppeteer');
  puppeteer = puppeteerPackage.default;
}

// Generate list of all routes to pre-render
function generateRoutes() {
  const staticRoutes = [
    '/',
    '/ASAP/',
    '/tuition-and-financial-aid/',
    '/online-mba/',
    '/online-masters-computer-science-mscs/',
    '/online-masters-engineering-management/',
    '/online-masters-data-science-msds/',
    '/compare-our-programs/',
    '/events/',
    '/online-learning-experience/',
    '/admissions/',
    '/request-information/',
    '/ProfessionalEducation',
    '/Certificates',
    '/TuitionOutcomes',
    '/explore/online-mba/',
    '/explore/online-masters-engineering-management/',
    '/explore/online-masters-data-science/',
    '/explore/online-masters-computer-science/',
    '/explore/ai-masters-computer-science/',
    '/page-not-found/',
  ];

  // Blog routes
  const blogRoutes = ['/blog/'];
  blogsData.posts.forEach((post) => {
    blogRoutes.push(`/blog/${post.id}/`);
  });

  // Topic routes
  const topicRoutes = [
    '/topics/engineering-essentials/',
    '/topics/mastering-computer-science/',
    '/topics/online-mba-success/',
    '/topics/uncategorized/',
  ];

  // Add topic-specific blog posts
  blogsData.posts.forEach((post) => {
    if (post.category === "Engineering Management" || post.category === "Engineering Essentials") {
      topicRoutes.push(`/topics/engineering-essentials/${post.id}/`);
    } else if (post.category === "Mastering Computer Science") {
      topicRoutes.push(`/topics/mastering-computer-science/${post.id}/`);
    } else if (post.category === "Online MBA Success") {
      topicRoutes.push(`/topics/online-mba-success/${post.id}/`);
    } else if (post.category === "Other Programs" || post.category === "Uncategorized") {
      topicRoutes.push(`/topics/uncategorized/${post.id}/`);
    }
  });

  return [...staticRoutes, ...blogRoutes, ...topicRoutes];
}

async function prerender() {
  console.log('Starting pre-rendering process...');
  
  const routes = generateRoutes();
  console.log(`Found ${routes.length} routes to pre-render`);

  // Start a preview server
  console.log('Starting preview server...');
  const server = await preview({
    preview: { port: 4173 }
  });
  
  const baseUrl = `http://localhost:${server.config.preview.port}`;
  console.log(`Server running at ${baseUrl}`);

  // Launch Puppeteer with environment-specific configuration
  console.log(`Environment: ${isProduction ? 'Production (Vercel/CI)' : 'Local Development'}`);
  
  const launchOptions = isProduction
    ? {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      }
    : {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      };
  
  const browser = await puppeteer.launch(launchOptions);

  try {
    let rendered = 0;
    for (const route of routes) {
      // Create a new page for each route to avoid detached frame issues
      const page = await browser.newPage();
      
      try {
        const url = `${baseUrl}${route}`;
        console.log(`Pre-rendering: ${route} (${++rendered}/${routes.length})`);
        
        // Set a longer timeout for complex pages
        page.setDefaultTimeout(30000);
        
        // Navigate to the page
        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        // Wait for React to fully render the content
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Wait for article content to appear (for blog pages)
        try {
          await page.waitForSelector('article, main', { timeout: 5000 });
        } catch (e) {
          // Not all pages have article tag, continue anyway
        }

        // Get the rendered HTML
        const html = await page.content();

        // Determine the file path
        let filePath;
        if (route === '/' || route.endsWith('/')) {
          // For routes ending with /, create a directory with index.html
          const dir = route === '/' ? distDir : path.join(distDir, route);
          await fs.mkdir(dir, { recursive: true });
          filePath = path.join(dir, 'index.html');
        } else {
          // For routes without trailing slash, create directory and index.html
          const dir = path.join(distDir, route);
          await fs.mkdir(dir, { recursive: true });
          filePath = path.join(dir, 'index.html');
        }

        // Write the HTML file
        await fs.writeFile(filePath, html, 'utf-8');
      } catch (error) {
        console.error(`Error pre-rendering ${route}:`, error.message);
      } finally {
        // Always close the page to free resources
        await page.close();
      }
    }

    console.log(`\nSuccessfully pre-rendered ${rendered} pages!`);
  } finally {
    await browser.close();
    await server.httpServer.close();
  }
}

prerender().catch(console.error);

