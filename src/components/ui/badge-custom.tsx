import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline"
  className?: string
}

export function BadgeCustom({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        {
          "bg-gray-100 text-gray-800": variant === "default",
          "bg-sage-100 text-sage-800": variant === "secondary",
          "border border-gray-200 text-gray-700": variant === "outline",
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
