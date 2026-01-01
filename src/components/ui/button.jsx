import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles: IBM Plex Sans font (per CPE Brand Guidelines), flexible layout
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-stevens-md font-stevens-body font-semibold tracking-wider transition-all duration-stevens-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stevens-light-gray disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary filled button - Black (B&W emphasis per CPE Brand Guidelines)
        default:
          "bg-stevens-black !text-stevens-white shadow-stevens-md hover:bg-stevens-dark-gray hover:shadow-stevens-lg",
        // BACKUP: Old red primary button variant (kept for reference/backup)
        // This was the original default variant before switching to B&W theme
        destructive:
          "bg-stevens-red text-stevens-white shadow-stevens-md hover:bg-stevens-dark-gray hover:shadow-stevens-lg",
        // Outline - mapped to outline-dark (B&W emphasis per CPE Brand Guidelines)
        outline:
          "border border-stevens-dark-gray bg-transparent !text-stevens-dark-gray hover:bg-stevens-dark-gray hover:!text-stevens-white",
        // NEW: White outline button (for dark backgrounds) - per CPE Brand Guidelines page-34
        "outline-white":
          "border border-white bg-transparent text-white hover:bg-white hover:text-stevens-black",
        // NEW: Red outline button (for dark backgrounds) - accent color per CPE Brand Guidelines
        "outline-red":
          "border border-stevens-red bg-transparent text-white hover:bg-stevens-red hover:text-white",
        // NEW: Dark outline button (for light backgrounds)
        "outline-dark":
          "border border-stevens-dark-gray bg-transparent !text-stevens-dark-gray hover:bg-stevens-dark-gray hover:!text-stevens-white",
        // Secondary - mapped to outline-dark (B&W emphasis per CPE Brand Guidelines)
        secondary:
          "border border-stevens-dark-gray bg-transparent !text-stevens-dark-gray hover:bg-stevens-dark-gray hover:!text-stevens-white",
        // Ghost button - minimal, transparent
        ghost: "hover:bg-stevens-light-gray hover:text-stevens-dark-gray",
        // Link style button
        link: "text-stevens-red underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-stevens-lg py-stevens-md text-stevens-lg",
        sm: "h-10 px-stevens-md py-stevens-sm text-stevens-base",
        lg: "h-14 px-stevens-xl py-stevens-lg text-stevens-xl",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
