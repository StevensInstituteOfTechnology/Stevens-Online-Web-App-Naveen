import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * CarouselNavButton - Navigation button for carousels with dashed circle focus effect
 *
 * Props:
 * @param {string} direction - "prev" or "next"
 * @param {function} onClick - Click handler
 * @param {boolean} isActive - Whether to show dashed circle outline
 * @param {string} variant - "dark" (for dark backgrounds) or "light" (for light backgrounds)
 * @param {string} size - "sm" | "md" | "lg"
 * @param {boolean} disabled - Disable the button
 * @param {string} className - Additional classes
 */
const CarouselNavButton = ({
  direction = "next",
  onClick,
  isActive = false,
  variant = "dark",
  size = "md",
  disabled = false,
  className = "",
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { button: "w-10 h-10", icon: "w-4 h-4" },
    md: { button: "w-12 h-12", icon: "w-5 h-5" },
    lg: { button: "w-14 h-14", icon: "w-6 h-6" },
  };

  // Variant styles (dark = white buttons for dark bg, light = dark buttons for light bg, subtle = muted buttons)
  const variantStyles = {
    dark: {
      base: "border-stevens-white text-stevens-white hover:bg-stevens-white/10",
      disabled: "border-white/20 text-white/30 cursor-not-allowed",
      outline: "[outline:1px_dashed_white] outline-offset-4",
    },
    light: {
      base: "border-stevens-gray text-stevens-gray hover:border-stevens-dark-gray hover:text-stevens-dark-gray hover:bg-stevens-gray/10",
      disabled: "border-gray-200 text-gray-300 cursor-not-allowed",
      outline: "[outline:1px_dashed_rgba(0,0,0,0.4)] outline-offset-4",
    },
    subtle: {
      base: "border-white/30 text-white/60 hover:border-white hover:text-white",
      disabled: "border-white/20 text-white/30 cursor-not-allowed",
      outline: "[outline:1px_dashed_white] outline-offset-4",
    },
  };

  const { button: buttonSize, icon: iconSize } = sizeConfig[size];
  const styles = variantStyles[variant];
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full border flex items-center justify-center transition-all duration-200
        ${buttonSize}
        ${disabled ? styles.disabled : styles.base}
        ${isActive ? styles.outline : ""}
        ${className}
      `}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      <Icon className={iconSize} />
    </button>
  );
};

export default CarouselNavButton;

