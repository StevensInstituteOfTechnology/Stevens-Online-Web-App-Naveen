import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-stevens-md border border-stevens-gray-300 bg-stevens-white px-stevens-md py-stevens-sm text-stevens-base shadow-stevens-sm transition-colors file:border-0 file:bg-transparent file:text-stevens-sm file:font-stevens-medium file:text-stevens-foreground placeholder:text-stevens-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stevens-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
