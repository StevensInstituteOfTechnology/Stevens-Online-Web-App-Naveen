import React from "react";
import { cn } from "@/lib/utils";

/**
 * ParallaxImage - Fixed background parallax image section
 * Creates a visual break between content sections with a fixed scrolling effect
 *
 * @param {string} src - Image source URL (required)
 * @param {string} height - CSS height value (default: "500px")
 * @param {string} position - Background position (default: "top")
 * @param {string} className - Additional CSS classes
 */

function ParallaxImage({ src, position = "top", className }) {
  return (
    <section
      className={cn(
        "relative w-full lg:bg-fixed bg-cover bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: `url('${src}')`,
        backgroundPosition: position,
      }}
      aria-hidden="true"
    />
  );
}

ParallaxImage.displayName = "ParallaxImage";

export default ParallaxImage;
