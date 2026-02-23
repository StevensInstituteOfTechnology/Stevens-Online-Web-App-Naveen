#!/usr/bin/env node

/**
 * Video Compression Script
 * Compresses MP4 videos using ffmpeg to reduce file size while maintaining quality
 * 
 * Usage:
 *   node scripts/compress-videos.js [options]
 * 
 * Options:
 *   --dry-run          Show what would be compressed without actually doing it
 *   --quality <level>  Compression quality: high (default), medium, low
 *   --format <format>  Output format: mp4 (default), webm
 *   --output-dir <dir> Output directory (default: same as input)
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const videosDir = path.join(rootDir, 'public/assets/videos');

// Quality presets for ffmpeg
const QUALITY_PRESETS = {
  high: {
    crf: 23,        // Constant Rate Factor (lower = higher quality, 18-28 range)
    preset: 'slow', // Encoding speed (slower = better compression)
    maxrate: '5M',  // Maximum bitrate
    bufsize: '10M'  // Buffer size
  },
  medium: {
    crf: 26,
    preset: 'medium',
    maxrate: '3M',
    bufsize: '6M'
  },
  low: {
    crf: 28,
    preset: 'fast',
    maxrate: '2M',
    bufsize: '4M'
  }
};

// Check if ffmpeg is installed
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (_error) {
    return false;
  }
}

// Get video file info
async function getVideoInfo(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    // Get video duration and resolution using ffprobe
    const ffprobeCmd = `ffprobe -v error -show_entries format=duration -show_entries stream=width,height -of json "${filePath}"`;
    const output = execSync(ffprobeCmd, { encoding: 'utf-8' });
    const info = JSON.parse(output);
    
    const duration = info.format?.duration || 0;
    const videoStream = info.streams?.find(s => s.codec_type === 'video');
    const width = videoStream?.width || 0;
    const height = videoStream?.height || 0;
    
    return {
      sizeMB: parseFloat(sizeMB),
      duration: parseFloat(duration),
      resolution: `${width}x${height}`,
      width,
      height
    };
  } catch (error) {
    console.error(`Error getting info for ${filePath}:`, error.message);
    return null;
  }
}

// Compress a single video file
async function compressVideo(inputPath, options = {}) {
  const {
    quality = 'high',
    format = 'mp4',
    outputDir = null,
    dryRun = false
  } = options;

  const preset = QUALITY_PRESETS[quality];
  if (!preset) {
    throw new Error(`Invalid quality: ${quality}. Use: high, medium, or low`);
  }

  const inputName = path.basename(inputPath, path.extname(inputPath));
  const outputDirPath = outputDir || path.dirname(inputPath);
  const outputExt = format === 'webm' ? '.webm' : '.mp4';
  const outputPath = path.join(outputDirPath, `${inputName}-compressed${outputExt}`);

  // Get original file info
  const originalInfo = await getVideoInfo(inputPath);
  if (!originalInfo) {
    console.error(`⚠️  Skipping ${inputPath} - could not get video info`);
    return null;
  }

  console.log(`\n📹 Processing: ${path.basename(inputPath)}`);
  console.log(`   Original: ${originalInfo.sizeMB}MB, ${originalInfo.resolution}, ${originalInfo.duration.toFixed(1)}s`);

  if (dryRun) {
    console.log(`   Would compress to: ${outputPath}`);
    console.log(`   Quality: ${quality} (CRF: ${preset.crf})`);
    return { inputPath, outputPath, originalInfo, compressedInfo: null };
  }

  // Build ffmpeg command
  const codec = format === 'webm' ? 'libvpx-vp9' : 'libx264';
  const audioCodec = format === 'webm' ? 'libopus' : 'aac';
  
  const ffmpegArgs = [
    '-i', `"${inputPath}"`,
    '-c:v', codec,
    '-crf', preset.crf.toString(),
    '-preset', preset.preset,
    '-maxrate', preset.maxrate,
    '-bufsize', preset.bufsize,
    '-c:a', audioCodec,
    '-b:a', '128k',  // Audio bitrate
    '-movflags', '+faststart', // Enable fast start for web playback
    '-y', // Overwrite output file
    `"${outputPath}"`
  ];

  const command = `ffmpeg ${ffmpegArgs.join(' ')}`;

  try {
    console.log(`   Compressing... (this may take a while)`);
    execSync(command, { stdio: 'inherit' });

    // Get compressed file info
    const compressedInfo = await getVideoInfo(outputPath);
    if (compressedInfo) {
      const reduction = ((1 - compressedInfo.sizeMB / originalInfo.sizeMB) * 100).toFixed(1);
      console.log(`   ✅ Compressed: ${compressedInfo.sizeMB}MB (${reduction}% reduction)`);
    }

    return { inputPath, outputPath, originalInfo, compressedInfo };
  } catch (error) {
    console.error(`   ❌ Error compressing: ${error.message}`);
    return null;
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const qualityIndex = args.indexOf('--quality');
  const quality = qualityIndex >= 0 && args[qualityIndex + 1] 
    ? args[qualityIndex + 1] 
    : 'high';
  const formatIndex = args.indexOf('--format');
  const format = formatIndex >= 0 && args[formatIndex + 1]
    ? args[formatIndex + 1]
    : 'mp4';
  const outputDirIndex = args.indexOf('--output-dir');
  const outputDir = outputDirIndex >= 0 && args[outputDirIndex + 1]
    ? args[outputDirIndex + 1]
    : null;

  console.log('🎬 Video Compression Script');
  console.log('============================\n');

  // Check ffmpeg
  if (!checkFFmpeg()) {
    console.error('❌ Error: ffmpeg is not installed.');
    console.error('   Install it with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)');
    process.exit(1);
  }

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  // Find all MP4 files
  try {
    const files = await fs.readdir(videosDir);
    const videoFiles = files
      .filter(f => f.endsWith('.mp4') && !f.includes('-compressed'))
      .map(f => path.join(videosDir, f));

    if (videoFiles.length === 0) {
      console.log('No video files found in', videosDir);
      return;
    }

    console.log(`Found ${videoFiles.length} video file(s) to compress:\n`);

    const results = [];
    for (const videoFile of videoFiles) {
      const result = await compressVideo(videoFile, {
        quality,
        format,
        outputDir,
        dryRun
      });
      if (result) {
        results.push(result);
      }
    }

    // Summary
    if (!dryRun && results.length > 0) {
      console.log('\n📊 Summary:');
      console.log('===========');
      let totalOriginal = 0;
      let totalCompressed = 0;

      results.forEach(result => {
        if (result.originalInfo && result.compressedInfo) {
          totalOriginal += result.originalInfo.sizeMB;
          totalCompressed += result.compressedInfo.sizeMB;
          const reduction = ((1 - result.compressedInfo.sizeMB / result.originalInfo.sizeMB) * 100).toFixed(1);
          console.log(`  ${path.basename(result.inputPath)}: ${result.originalInfo.sizeMB}MB → ${result.compressedInfo.sizeMB}MB (${reduction}% reduction)`);
        }
      });

      if (totalOriginal > 0) {
        const totalReduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
        console.log(`\n  Total: ${totalOriginal.toFixed(2)}MB → ${totalCompressed.toFixed(2)}MB (${totalReduction}% reduction)`);
      }
    }

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();

