import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load blogs data
const blogsJSON = JSON.parse(
  fsSync.readFileSync(path.join(rootDir, 'src/data/blogs.json'), 'utf-8')
);
const blogsData = blogsJSON.posts || blogsJSON;

// Configuration
const SITE_URL = 'https://online.stevens.edu';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Helper function to convert category to slug
function categoryToSlug(category) {
  const categoryMap = {
    'Engineering Management': 'engineering-essentials',
    'Mastering Computer Science': 'mastering-computer-science',
    'Online MBA Success': 'online-mba-success',
    'Other Programs': 'uncategorized'
  };
  return categoryMap[category] || 'uncategorized';
}

// Generate all routes (same as prerender.js)
function generateRoutes() {
  const staticRoutes = [
    '/',
    '/ASAP/',
    '/tuition-and-financial-aid/',
    '/online-mba/',
    '/online-masters-computer-science-mscs/',
    '/online-masters-engineering-management/',
    '/online-masters-data-science-msds/',
    '/online-masters-engineering-applied-data-science/', // MEADS
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
  blogsData.forEach(blog => {
    blogRoutes.push(`/blog/${blog.id}/`);
  });

  // Topic category routes
  const topicCategories = ['engineering-essentials', 'mastering-computer-science', 'online-mba-success', 'uncategorized'];
  const topicRoutes = topicCategories.map(topic => `/topics/${topic}/`);
  
  blogsData.forEach(blog => {
    const categorySlug = categoryToSlug(blog.category);
    topicRoutes.push(`/topics/${categorySlug}/${blog.id}/`);
  });

  return [...staticRoutes, ...blogRoutes, ...topicRoutes];
}

// Determine priority based on URL
function getPriority(url) {
  if (url === '/') return '1.0';
  if (url.includes('/blog/') && url.split('/').length === 4) return '0.6'; // Individual blog posts
  if (url.includes('/topics/') && url.split('/').length === 5) return '0.6'; // Topic blog posts
  if (url.includes('/explore/')) return '0.8';
  if (url.includes('/online-mba') || url.includes('/online-masters')) return '0.9';
  if (url === '/blog/' || url.includes('/topics/') && url.split('/').length === 4) return '0.7';
  return '0.8';
}

// Determine change frequency
function getChangeFreq(url) {
  if (url === '/') return 'daily';
  if (url.includes('/blog/') || url.includes('/topics/')) return 'weekly';
  return 'weekly';
}

// Generate XML sitemap
function generateSitemapXML(routes) {
  const urls = routes.map(route => {
    const url = `${SITE_URL}${route}`;
    const priority = getPriority(route);
    const changefreq = getChangeFreq(route);
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Main function
async function generateSitemap() {
  console.log('🗺️  Generating sitemap...');
  
  const routes = generateRoutes();
  const sitemapXML = generateSitemapXML(routes);
  
  // Write to public directory (for source)
  const publicPath = path.join(rootDir, 'public/sitemap.xml');
  await fs.writeFile(publicPath, sitemapXML, 'utf-8');
  console.log(`✅ Sitemap written to public/sitemap.xml (${routes.length} URLs)`);
  
  // Also write to dist directory if it exists (after build)
  const distPath = path.join(rootDir, 'dist/sitemap.xml');
  if (fsSync.existsSync(path.join(rootDir, 'dist'))) {
    await fs.writeFile(distPath, sitemapXML, 'utf-8');
    console.log(`✅ Sitemap written to dist/sitemap.xml`);
  }
  
  console.log(`🎉 Sitemap generation complete! Total URLs: ${routes.length}`);
}

// Run the generator
generateSitemap().catch(console.error);

