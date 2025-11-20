# Media Optimization Scripts

## 📸 Image Conversion (`convert-to-webp.js`)

Converts images (PNG, JPG, AVIF) to WebP format and generates responsive variants.

### Commands

```bash
# Preview what would be converted
npm run convert-to-webp:dry-run

# Convert all images to WebP
npm run convert-to-webp

# Generate responsive variants for existing WebP images
npm run generate-responsive-images

# Preview responsive variants generation
npm run generate-responsive-images:dry-run
```

### Image Options

- `--dry-run` - Preview without converting
- `--quality <num>` - WebP quality (0-100, default: 80)
- `--generate-responsive` - Generate size variants (400w, 640w, 800w, etc.)
- `--sizes <list>` - Custom sizes (e.g., `400,640,800,1024`)
- `--directory <dir>` - Target directory

---

## 🎬 Video Compression (`compress-videos.js`)

Compresses MP4 videos using ffmpeg to reduce file size while maintaining quality.

### Video Commands

```bash
# Preview what would be compressed
npm run compress-videos:dry-run

# Compress videos (high quality, default)
npm run compress-videos
```

### Video Options

- `--dry-run` - Preview without compressing
- `--quality <level>` - `high` (default), `medium`, or `low`
- `--format <format>` - `mp4` (default) or `webm`

### Video Requirements

- `ffmpeg` must be installed
  - macOS: `brew install ffmpeg`
  - Linux: `apt-get install ffmpeg`

## 📝 Notes

- Both scripts support `--dry-run` for safe preview
- Images are organized in page-specific folders under `public/assets/images/`
- Videos are located in `public/assets/videos/`
- Scripts automatically skip already processed files
