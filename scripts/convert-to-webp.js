#!/usr/bin/env node

/**
 * Image to WebP Conversion Script
 * Detects non-WebP images (PNG, JPG, JPEG, AVIF) in public/assets folder and converts them to WebP format
 * Can also generate responsive image variants for existing WebP images
 * 
 * Note: Images are now organized in page-specific folders under public/assets/images/
 * (e.g., home/, events/, explore-mba/, etc.). The script recursively searches all subdirectories.
 * 
 * Supported input formats: PNG, JPG, JPEG, AVIF
 * Output format: WebP
 * 
 * Usage:
 *   node scripts/convert-to-webp.js [options]
 * 
 * Options:
 *   --dry-run              Show what would be converted without actually doing it
 *   --quality <num>        WebP quality (0-100, default: 80)
 *   --delete-original      Delete original files after conversion
 *   --directory <dir>      Target directory (default: public/assets)
 *   --generate-responsive  Generate responsive image variants (e.g., image-640w.webp)
 *   --sizes <list>         Comma-separated list of widths (default: 400,640,800,1024,1280,1920)
 * 
 * Examples:
 *   # Convert all images (PNG, JPG, AVIF) to WebP in public/assets (recursive)
 *   node scripts/convert-to-webp.js
 * 
 *   # Convert only AVIF files to WebP
 *   node scripts/convert-to-webp.js --directory public/assets/images
 * 
 *   # Generate responsive variants for all WebP images in images folder
 *   node scripts/convert-to-webp.js --generate-responsive --directory public/assets/images
 * 
 *   # Generate responsive variants for a specific page folder
 *   node scripts/convert-to-webp.js --generate-responsive --directory public/assets/images/home
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const deleteOriginal = args.includes('--delete-original');
const generateResponsive = args.includes('--generate-responsive');
const qualityIndex = args.indexOf('--quality');
const quality = qualityIndex >= 0 && args[qualityIndex + 1] 
  ? parseInt(args[qualityIndex + 1], 10) 
  : 80;
const directoryIndex = args.indexOf('--directory');
const targetDirectory = directoryIndex >= 0 && args[directoryIndex + 1]
  ? path.resolve(rootDir, args[directoryIndex + 1])
  : path.join(rootDir, 'public/assets');
const sizesIndex = args.indexOf('--sizes');
const responsiveSizes = sizesIndex >= 0 && args[sizesIndex + 1]
  ? args[sizesIndex + 1].split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))
  : [400, 640, 800, 1024, 1280, 1920];

// Supported image formats (can be converted to WebP)
const SUPPORTED_FORMATS = ['.png', '.jpg', '.jpeg', '.avif'];
const WEBP_EXT = '.webp';

// Check if file is a WebP image
function isWebP(filePath) {
  return path.extname(filePath).toLowerCase() === WEBP_EXT;
}

// Check if file is already a responsive variant (e.g., image-640w.webp)
function isResponsiveVariant(filePath) {
  const basename = path.basename(filePath, WEBP_EXT);
  return /\-\d+w$/.test(basename);
}

// Directories to exclude from conversion
const EXCLUDED_DIRECTORIES = ['company_logo'];

// Check if file is an image that needs conversion
function needsConversion(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return SUPPORTED_FORMATS.includes(ext);
}

// Get file size in MB
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
  } catch (error) {
    return null;
  }
}

// Convert image to WebP
async function convertImageToWebP(inputPath, options = {}) {
  const { quality: webpQuality = 80, dryRun: isDryRun = false, deleteOriginal: shouldDelete = false } = options;

  const ext = path.extname(inputPath);
  const dir = path.dirname(inputPath);
  const basename = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${basename}${WEBP_EXT}`);

  // Check if WebP already exists
  try {
    await fs.access(outputPath);
    return { skipped: true, reason: 'WebP already exists', inputPath, outputPath };
  } catch {
    // WebP doesn't exist, proceed
  }

  if (isDryRun) {
    const size = await getFileSize(inputPath);
    return { 
      dryRun: true, 
      inputPath, 
      outputPath, 
      size: size ? `${size}MB` : 'unknown',
      quality: webpQuality 
    };
  }

  try {
    const originalSize = await getFileSize(inputPath);
    
    // Convert using sharp
    await sharp(inputPath)
      .webp({ quality: webpQuality })
      .toFile(outputPath);

    const convertedSize = await getFileSize(outputPath);
    const reduction = originalSize && convertedSize
      ? ((1 - parseFloat(convertedSize) / parseFloat(originalSize)) * 100).toFixed(1)
      : null;

    // Delete original if requested
    if (shouldDelete) {
      await fs.unlink(inputPath);
    }

    return {
      success: true,
      inputPath,
      outputPath,
      originalSize: originalSize ? `${originalSize}MB` : 'unknown',
      convertedSize: convertedSize ? `${convertedSize}MB` : 'unknown',
      reduction: reduction ? `${reduction}%` : null,
      deleted: shouldDelete
    };
  } catch (error) {
    return {
      success: false,
      inputPath,
      error: error.message
    };
  }
}

// Generate responsive image variants
async function generateResponsiveVariants(inputPath, options = {}) {
  const { 
    sizes = [400, 640, 800, 1024, 1280, 1920], 
    quality: webpQuality = 80, 
    dryRun: isDryRun = false 
  } = options;

  const dir = path.dirname(inputPath);
  const basename = path.basename(inputPath, WEBP_EXT);
  const results = [];

  // Get original image metadata
  let metadata;
  try {
    metadata = await sharp(inputPath).metadata();
  } catch (error) {
    return [{
      success: false,
      inputPath,
      error: `Failed to read image: ${error.message}`
    }];
  }

  const originalWidth = metadata.width;
  if (!originalWidth) {
    return [{
      success: false,
      inputPath,
      error: 'Could not determine image width'
    }];
  }

  for (const width of sizes) {
    // Skip if requested width is larger than original
    if (width > originalWidth) {
      continue;
    }

    const variantPath = path.join(dir, `${basename}-${width}w${WEBP_EXT}`);

    // Check if variant already exists
    try {
      await fs.access(variantPath);
      results.push({
        skipped: true,
        reason: 'Variant already exists',
        inputPath,
        variantPath,
        width: `${width}w`
      });
      continue;
    } catch {
      // Variant doesn't exist, proceed
    }

    if (isDryRun) {
      results.push({
        dryRun: true,
        inputPath,
        variantPath,
        width: `${width}w`,
        quality: webpQuality
      });
      continue;
    }

    try {
      const originalSize = await getFileSize(inputPath);
      
      // Resize and convert to WebP
      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: webpQuality })
        .toFile(variantPath);

      const variantSize = await getFileSize(variantPath);
      const reduction = originalSize && variantSize
        ? ((1 - parseFloat(variantSize) / parseFloat(originalSize)) * 100).toFixed(1)
        : null;

      results.push({
        success: true,
        inputPath,
        variantPath,
        width: `${width}w`,
        variantSize: variantSize ? `${variantSize}MB` : 'unknown',
        reduction: reduction ? `${reduction}%` : null
      });
    } catch (error) {
      results.push({
        success: false,
        inputPath,
        variantPath,
        width: `${width}w`,
        error: error.message
      });
    }
  }

  return results;
}

// Recursively find all images in directory
async function findImages(dir, fileList = [], includeWebP = false) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      
      try {
        const stat = await fs.stat(filePath);
        
        if (stat.isDirectory()) {
          // Skip excluded directories
          if (EXCLUDED_DIRECTORIES.includes(file)) {
            continue;
          }
          // Skip node_modules and other common directories
          if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
            await findImages(filePath, fileList, includeWebP);
          }
        } else if (stat.isFile()) {
          if (needsConversion(filePath)) {
            fileList.push(filePath);
          } else if (includeWebP && isWebP(filePath) && !isResponsiveVariant(filePath)) {
            // Include WebP files for responsive variant generation
            fileList.push(filePath);
          }
        }
      } catch (error) {
        // Skip files we can't access
        continue;
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return fileList;
}

// Main function
async function main() {
  console.log('🖼️  Image to WebP Conversion Script');
  console.log('===================================\n');

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be converted\n');
  }

  console.log(`Target directory: ${targetDirectory}`);
  console.log(`Quality: ${quality}`);
  console.log(`Delete original: ${deleteOriginal ? 'Yes' : 'No'}`);
  console.log(`Generate responsive: ${generateResponsive ? 'Yes' : 'No'}`);
  if (generateResponsive) {
    console.log(`Responsive sizes: ${responsiveSizes.join(', ')}px`);
  }
  console.log('');

  // Check if directory exists
  try {
    await fs.access(targetDirectory);
  } catch (error) {
    console.error(`❌ Error: Directory not found: ${targetDirectory}`);
    process.exit(1);
  }

  // Find all images
  console.log('Searching for images...');
  const images = await findImages(targetDirectory, [], generateResponsive);
  
  if (images.length === 0) {
    console.log('✅ No images found that need processing.');
    return;
  }

  if (generateResponsive) {
    console.log(`Found ${images.length} WebP image(s) to generate responsive variants:\n`);
  } else {
    console.log(`Found ${images.length} image(s) to convert:\n`);
  }

  // Process each image
  const results = {
    converted: [],
    variants: [],
    skipped: [],
    errors: []
  };

  for (const imagePath of images) {
    const relativePath = path.relative(rootDir, imagePath);
    
    if (generateResponsive && isWebP(imagePath)) {
      // Generate responsive variants
      console.log(`Processing: ${relativePath}`);
      const variantResults = await generateResponsiveVariants(imagePath, {
        sizes: responsiveSizes,
        quality,
        dryRun
      });

      for (const result of variantResults) {
        if (result.dryRun) {
          console.log(`  → Would create: ${path.relative(rootDir, result.variantPath)}`);
          console.log(`    Width: ${result.width}, Quality: ${result.quality}`);
          results.variants.push(result);
        } else if (result.skipped) {
          console.log(`  ⏭️  Skipped ${result.width}: ${result.reason}`);
          results.skipped.push(result);
        } else if (result.success) {
          console.log(`  ✅ Created ${result.width}: ${result.variantSize}`);
          if (result.reduction) {
            console.log(`    Size reduction: ${result.reduction}`);
          }
          results.variants.push(result);
        } else {
          console.log(`  ❌ Error ${result.width}: ${result.error}`);
          results.errors.push(result);
        }
      }
    } else {
      // Convert to WebP
      console.log(`Processing: ${relativePath}`);
      const result = await convertImageToWebP(imagePath, {
        quality,
        dryRun,
        deleteOriginal
      });

      if (result.dryRun) {
        console.log(`  → Would convert to: ${path.relative(rootDir, result.outputPath)}`);
        console.log(`    Size: ${result.size}, Quality: ${result.quality}`);
        results.converted.push(result);
      } else if (result.skipped) {
        console.log(`  ⏭️  Skipped: ${result.reason}`);
        results.skipped.push(result);
      } else if (result.success) {
        console.log(`  ✅ Converted: ${result.convertedSize}`);
        if (result.reduction) {
          console.log(`    Reduction: ${result.reduction}`);
        }
        if (result.deleted) {
          console.log(`    Original deleted`);
        }
        results.converted.push(result);
      } else {
        console.log(`  ❌ Error: ${result.error}`);
        results.errors.push(result);
      }
    }
    console.log('');
  }

  // Summary
  console.log('📊 Summary:');
  console.log('===========');
  if (generateResponsive) {
    console.log(`Variants created: ${results.variants.length}`);
  } else {
    console.log(`Converted: ${results.converted.length}`);
  }
  console.log(`Skipped: ${results.skipped.length}`);
  console.log(`Errors: ${results.errors.length}`);

  if (results.errors.length > 0) {
    console.log('\nErrors:');
    results.errors.forEach(err => {
      console.log(`  - ${path.relative(rootDir, err.inputPath)}: ${err.error}`);
    });
  }

  console.log('\n✅ Done!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

