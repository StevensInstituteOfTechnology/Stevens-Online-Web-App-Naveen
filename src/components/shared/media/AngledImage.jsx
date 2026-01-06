import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Parse aspect ratio string to numeric value
 * @param {string} ratio - e.g., "16/9", "4/3", "1/1"
 * @returns {number} - numeric ratio (width/height)
 */
const parseAspectRatio = (ratio) => {
  if (!ratio) return 4 / 3; // default
  if (typeof ratio === "number") return ratio;

  const parts = ratio.split("/");
  if (parts.length === 2) {
    return parseFloat(parts[0]) / parseFloat(parts[1]);
  }
  return parseFloat(ratio) || 4 / 3;
};

/**
 * Calculate clip-path for parallelogram with fixed angle
 * @param {string} direction - "right", "left", "vertical-right", "vertical-left", "none"
 * @param {number} aspectRatio - numeric aspect ratio (width/height)
 * @param {number} angle - angle in degrees (default 25)
 * @returns {string} - CSS clip-path polygon value
 */
const calculateClipPath = (direction, aspectRatio, angle = 25) => {
  if (direction === "none") {
    return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  }

  const tanAngle = Math.tan((angle * Math.PI) / 180); // tan(25°) ≈ 0.4663

  // For HORIZONTAL parallelogram: offset is % of width
  // offset% = (1/aspectRatio) * tan(angle) * 100
  // This gives us how much to shift horizontally relative to width

  // For VERTICAL parallelogram: offset is % of height
  // offset% = aspectRatio * tan(angle) * 100
  // This gives us how much to shift vertically relative to height

  let offset;

  switch (direction) {
    case "right":
      // Horizontal parallelogram leaning right
      // offset = (height/width) * tan(angle) = (1/aspectRatio) * tan(angle)
      offset = Math.min((1 / aspectRatio) * tanAngle * 100, 40); // cap at 40%
      return `polygon(${offset}% 0, 100% 0, ${100 - offset}% 100%, 0 100%)`;

    case "left":
      // Horizontal parallelogram leaning left
      offset = Math.min((1 / aspectRatio) * tanAngle * 100, 40);
      return `polygon(0 0, ${100 - offset}% 0, 100% 100%, ${offset}% 100%)`;

    case "vertical-right":
      // Vertical parallelogram, right side pushed down
      offset = Math.min(aspectRatio * tanAngle * 100, 40);
      return `polygon(0 0, 100% ${offset}%, 100% 100%, 0 ${100 - offset}%)`;

    case "vertical-left":
      // Vertical parallelogram, left side pushed down
      offset = Math.min(aspectRatio * tanAngle * 100, 40);
      return `polygon(0 ${offset}%, 100% 0, 100% ${100 - offset}%, 0 100%)`;

    default:
      return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  }
};

/**
 * AngledImage - A parallelogram-shaped image container
 *
 * Per CPE Brand Guidelines (page-25):
 * - Uses 25° angled edges to create dimensional imagery
 * - Can be layered within asterism lines
 * - Creates bold and dynamic compositions
 *
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} direction - Shape variant:
 *   - "right" - Horizontal parallelogram, leans right (top/bottom horizontal, left/right angled)
 *   - "left" - Horizontal parallelogram, leans left
 *   - "vertical-right" - Vertical parallelogram, top/bottom slant down-right (left/right vertical)
 *   - "vertical-left" - Vertical parallelogram, top/bottom slant up-right (left/right vertical)
 *   - "none" - Regular rectangle
 * @param {number} angle - Angle in degrees (default: 25, per CPE Brand Guidelines)
 * @param {string} width - CSS width value (e.g., "100%", "400px", "50vw")
 * @param {string} height - CSS height value (e.g., "300px", "50vh", "auto")
 * @param {string} aspectRatio - CSS aspect-ratio value (e.g., "16/9", "4/3", "1/1"). Used to calculate angle offset.
 * @param {number} scale - Scale factor for the image (default: 1). Values > 1 zoom in, allowing translate to work.
 * @param {number} translateX - Horizontal offset in % (default: 0). Negative = left, Positive = right.
 * @param {number} translateY - Vertical offset in % (default: 0). Negative = up, Positive = down.
 * @param {boolean} overlay - Add dark overlay for text readability
 * @param {string} overlayColor - Custom overlay color (default: black)
 * @param {number} overlayOpacity - Overlay opacity 0-100 (default: 30)
 * @param {string} className - Additional CSS classes
 * @param {string} imgClassName - Additional CSS classes for the image
 * @param {React.ReactNode} children - Optional content to overlay on the image
 *
 * @example
 * // Basic usage
 * <AngledImage src="/image.jpg" direction="right" />
 *
 * @example
 * // Pan to show different part of image
 * <AngledImage
 *   src="/image.jpg"
 *   scale={1.3}           // Zoom in 30%
 *   translateX={-10}      // Shift left 10%
 *   translateY={15}       // Shift down 15%
 * />
 */
const AngledImage = React.forwardRef(
  (
    {
      src,
      alt = "",
      direction = "right",
      angle = 25,
      width,
      height,
      aspectRatio = "4/3",
      scale = 1,
      translateX = 0,
      translateY = 0,
      overlay = false,
      overlayColor = "black",
      overlayOpacity = 30,
      className,
      imgClassName,
      children,
      ...props
    },
    ref
  ) => {
    // Parse aspect ratio and calculate clip-path dynamically
    const numericAspectRatio = parseAspectRatio(aspectRatio);
    const clipPath = calculateClipPath(direction, numericAspectRatio, angle);

    // Build style object - only use aspectRatio if width/height not both specified
    const style = {
      clipPath,
      ...(width && { width }),
      ...(height && { height }),
      // Only apply aspectRatio if we don't have both width and height
      ...(!width || !height ? { aspectRatio } : {}),
    };

    // Build transform string for scale + translate
    // Only apply transform if we have non-default values
    const hasTransform = scale !== 1 || translateX !== 0 || translateY !== 0;
    const imgStyle = hasTransform
      ? {
          transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
          transformOrigin: "center center",
        }
      : {};

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={style}
        {...props}
      >
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            imgClassName
          )}
          style={imgStyle}
          loading="lazy"
        />

        {/* Optional overlay */}
        {overlay && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity / 100,
            }}
          />
        )}

        {/* Optional children (for text overlay, etc.) */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    );
  }
);

AngledImage.displayName = "AngledImage";

/**
 * AngledImageStack - A container for layering multiple AngledImages
 *
 * Creates the dimensional imagery effect from page-25 of CPE Brand Guidelines
 */
const AngledImageStack = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    );
  }
);

AngledImageStack.displayName = "AngledImageStack";

/**
 * AngledContainer - A parallelogram-shaped container for any content
 *
 * Similar to AngledImage but for arbitrary content (not just images)
 *
 * @param {string} direction - Same as AngledImage: "right", "left", "vertical-right", "vertical-left", "none"
 * @param {number} angle - Angle in degrees (default: 25)
 * @param {string} aspectRatio - Used to calculate correct angle offset (e.g., "16/9", "4/3"). Ignored if autoDetectAspectRatio is true.
 * @param {boolean} autoDetectAspectRatio - If true, automatically detect container's actual aspect ratio for accurate angle calculation (default: false)
 * @param {string} width - CSS width value (e.g., "100%", "400px")
 * @param {string} height - CSS height value (e.g., "300px", "auto")
 * @param {string} backgroundColor - Tailwind bg class (default: "bg-stevens-gray")
 */
const AngledContainer = React.forwardRef(
  (
    {
      direction = "right",
      angle = 25,
      aspectRatio = "4/3",
      autoDetectAspectRatio = false,
      width,
      height,
      backgroundColor = "bg-stevens-gray",
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Internal ref for ResizeObserver (use forwarded ref if available)
    const internalRef = React.useRef(null);
    const containerRef = ref || internalRef;

    // State for detected aspect ratio
    const [detectedAspectRatio, setDetectedAspectRatio] = React.useState(
      parseAspectRatio(aspectRatio)
    );

    // ResizeObserver to detect actual aspect ratio
    React.useEffect(() => {
      if (!autoDetectAspectRatio) return;

      const element = containerRef.current;
      if (!element) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width: w, height: h } = entry.contentRect;
          if (w > 0 && h > 0) {
            setDetectedAspectRatio(w / h);
          }
        }
      });

      observer.observe(element);

      // Initial measurement
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDetectedAspectRatio(rect.width / rect.height);
      }

      return () => observer.disconnect();
    }, [autoDetectAspectRatio, containerRef]);

    // Calculate clip-path dynamically based on aspect ratio
    const numericAspectRatio = autoDetectAspectRatio
      ? detectedAspectRatio
      : parseAspectRatio(aspectRatio);
    const clipPath = calculateClipPath(direction, numericAspectRatio, angle);

    const style = {
      clipPath,
      ...(width && { width }),
      ...(height && { height }),
      // Apply aspectRatio for CSS only if not auto-detecting
      ...(!autoDetectAspectRatio && (!width || !height) ? { aspectRatio } : {}),
    };

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", backgroundColor, className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AngledContainer.displayName = "AngledContainer";

export { AngledImage, AngledImageStack, AngledContainer };
