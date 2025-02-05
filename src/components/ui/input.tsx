import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    disabled?: boolean,
    children?: React.ReactNode,
    posChildren?: React.ReactNode
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, type, value, label, ...props }, ref) => {
    return (
      <span className="flex-1">
        {label && <Label className={`text-sm mb-1 ${disabled && 'text-muted-foreground'}`}>{label}</Label>}
        <input
          type={type}
          disabled={disabled}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          value={value}
          {...props}
        />
      </span>
    )
  }
)
Input.displayName = "Input"

export { Input }
