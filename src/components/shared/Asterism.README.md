# Asterism Component

A CPE Brand Guidelines compliant visual element that creates intersecting lines radiating from a center point.

## Angle Reference

```
                 90° (UP)
                    ↑
    155°        ↖   │   ↗  25°
   (UP-LEFT)        │      (UP-RIGHT)
                    │
 180° (LEFT) ←──────●──────→ 0° (RIGHT)
                    │
    205°        ↙   │   ↘  335°
  (DOWN-LEFT)       │      (DOWN-RIGHT)
                    ↓
               270° (DOWN)
```

**Allowed angles:** `[0, 25, 90, 155, 180, 205, 270, 335]`

**Straight line pairs (180° apart):**
- `0°` ↔ `180°` (horizontal)
- `90°` ↔ `270°` (vertical)
- `25°` ↔ `205°` (diagonal ↗↙)
- `155°` ↔ `335°` (diagonal ↖↘)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `centerX` | `string \| number` | `'50%'` | X position of center point |
| `centerY` | `string \| number` | `'50%'` | Y position of center point |
| `rays` | `number` | `4` | Number of rays (3-8) |
| `angles` | `number[]` | `[0, 25, 90, 335]` | Array of angles to draw |
| `length` | `string \| number` | `'full'` | Default ray length (`'full'`, `'80%'`, or `500`) |
| `rayLengths` | `array` | `null` | Individual lengths per ray |
| `minLength` | `number` | `100` | Minimum ray length (px) |
| `maxLength` | `number` | `2000` | Maximum ray length (px) |
| `color` | `string` | `'stevens-white'` | Line color (see allowed colors) |
| `opacity` | `number` | `0.6` | Base opacity (0-1) |
| `strokeWidth` | `number` | `1` | Line thickness (px) |
| `fadeRays` | `number[]` | `[0, 2]` | Ray indices that should fade |
| `fadeDirection` | `string` | `'out'` | `'out'` (center→edge) or `'in'` |
| `fadeOpacity` | `number` | `0` | Opacity at fade end |
| `animate` | `boolean` | `true` | Enable animation |
| `animationType` | `string` | `'radiate'` | `'radiate'` or `'fade'` |
| `animationDuration` | `number` | `1000` | Animation duration (ms) |
| `animationDelay` | `number` | `300` | Delay before animation starts (ms) |
| `staggerDelay` | `number` | `100` | Delay between each ray (ms) |

## Allowed Colors

Per CPE Brand Guidelines, **only these colors** are allowed (never red!):

- `'stevens-white'` - #FFFFFF
- `'stevens-black'` - #000000
- `'stevens-dark-gray'` - #363D45
- `'stevens-gray'` - #7F7F7F
- `'stevens-light-gray'` - #E4E5E6

## Usage Example

```jsx
import Asterism from '@/components/shared/Asterism';

<Asterism
  centerX="32%"
  centerY="68%"
  rays={5}
  angles={[25, 90, 205, 270, 335]}
  color="stevens-white"
  opacity={1}
  rayLengths={["full", "full", "full", "full", 300]}
  fadeRays={[0, 4]}
  fadeDirection="out"
  fadeOpacity={0}
  minLength={300}
  animationType="radiate"
  animationDuration={1200}
  staggerDelay={150}
/>
```

## Brand Guidelines Rules

1. **Line thickness:** 1px (as thin as possible)
2. **Angles:** Only 0°, 90°, 25°, -25° orientations
3. **Rays:** 3-5 from center point (we allow up to 8)
4. **Colors:** Black, gray, or white only — **NEVER red**
5. **Fading:** At least one line must have gradient fading
6. **Composition:** One main asterism per composition
