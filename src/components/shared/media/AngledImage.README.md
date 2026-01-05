# AngledImage Component

A CPE Brand Guidelines compliant parallelogram-shaped image container with 25° angled edges.



## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Image source URL |
| `alt` | `string` | `''` | Alt text for accessibility |
| `direction` | `string` | `'right'` | Shape variant (see above) |
| `angle` | `number` | `25` | Angle in degrees |
| `width` | `string` | - | CSS width (e.g., `'400px'`, `'100%'`) |
| `height` | `string` | - | CSS height (e.g., `'300px'`, `'50vh'`) |
| `aspectRatio` | `string` | `'4/3'` | CSS aspect-ratio (e.g., `'16/9'`, `'1/1'`) |
| `scale` | `number` | `1` | Zoom factor. Values > 1 zoom in. |
| `translateX` | `number` | `0` | Horizontal pan (%). Negative = left. |
| `translateY` | `number` | `0` | Vertical pan (%). Negative = up. |
| `overlay` | `boolean` | `false` | Add dark overlay |
| `overlayColor` | `string` | `'black'` | Overlay color |
| `overlayOpacity` | `number` | `30` | Overlay opacity (0-100) |
| `className` | `string` | - | Container classes |
| `imgClassName` | `string` | - | Image element classes |

## Image Positioning (scale + translate)

To show a specific part of the image:

```
Original:               scale(1.3):            translate(-15%, 0):
┌───────────┐          ┌─────────────┐         ┌─────────────┐
│  ┌───┐    │    →     │    ┌───┐    │    →    │      ┌───┐  │
│  │ ▢ │    │          │    │ ▢ │    │         │      │ ▢ │  │
│  └───┘    │          │    └───┘    │         │      └───┘  │
└───────────┘          └─────────────┘         └─────────────┘
  (image)               (zoom in)              (pan left → see right)
```

## Usage Examples

```jsx
import { AngledImage, AngledImageStack } from '@/components/shared';

// Basic usage
<AngledImage 
  src="/image.jpg" 
  direction="right" 
/>

// With custom size
<AngledImage 
  src="/image.jpg" 
  direction="vertical-left"
  width="400px"
  height="600px"
/>

// Pan to show right side of image
<AngledImage 
  src="/image.jpg" 
  scale={1.3}
  translateX={-15}
/>

// With overlay for text
<AngledImage 
  src="/image.jpg" 
  overlay
  overlayOpacity={40}
>
  <h2 className="text-white">Title</h2>
</AngledImage>

// Layered stack
<AngledImageStack className="h-[600px]">
  <AngledImage 
    src="/bg.jpg" 
    direction="vertical-left"
    className="absolute top-0 left-0 z-10"
  />
  <AngledImage 
    src="/fg.jpg" 
    direction="vertical-right"
    className="absolute bottom-0 right-0 z-20"
  />
</AngledImageStack>
```

## Related Components

- `AngledImageStack` - Container for layering multiple AngledImages
- `AngledContainer` - Parallelogram container for non-image content

## Brand Guidelines Rules

1. **Angle:** 25° (per CPE Brand Guidelines page-25)
2. **Layering:** Can be layered within asterism lines
3. **Composition:** Creates bold, dimensional imagery

