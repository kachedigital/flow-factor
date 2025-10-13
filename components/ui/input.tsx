"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, defaultValue, onChange, ...props }, ref) => {
    // If value is provided but no onChange, use defaultValue instead to avoid read-only warning
    const inputProps = React.useMemo(() => {
      if (value !== undefined && onChange) {
        // Controlled component with both value and onChange
        return { value: value ?? "" }
      } else if (value !== undefined && !onChange) {
        // Value provided but no onChange - use defaultValue to avoid read-only warning
        return { defaultValue: value ?? "" }
      } else if (defaultValue !== undefined) {
        // Only defaultValue provided
        return { defaultValue: defaultValue ?? "" }
      } else {
        // Neither value nor defaultValue provided
        return {}
      }
    }, [value, defaultValue, onChange])

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        onChange={onChange}
        {...inputProps}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
