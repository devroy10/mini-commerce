"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingFilterFabProps {
  onClick: () => void
  activeFiltersCount?: number
  variant?: "default" | "compact"
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  className?: string
}

export function FloatingFilterFab({
  onClick,
  activeFiltersCount = 0,
  variant = "default",
  position = "bottom-right",
  className,
}: FloatingFilterFabProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Show the floating button only on mobile/tablet screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
  }

  const isCompact = variant === "compact"

  return (
    <div
      className={cn(
        "fixed z-50 lg:hidden transition-all duration-300",
        positionClasses[position],
        isScrolled ? "scale-95 opacity-90" : "scale-100 opacity-100",
        className,
      )}
    >
      <Button
        onClick={onClick}
        size={isCompact ? "default" : "lg"}
        className={cn(
          "shadow-lg hover:shadow-xl transition-all duration-300",
          "bg-black dark:bg-white text-white dark:text-black",
          "hover:bg-gray-800 dark:hover:bg-silver",
          "border-2 border-white dark:border-licorice",
          isCompact ? "rounded-full h-12 w-12 p-0" : "rounded-full h-14 px-6 gap-2",
          activeFiltersCount > 0 && "animate-pulse",
        )}
      >
        {isCompact ? (
          <SlidersHorizontal className="h-5 w-5" />
        ) : (
          <>
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </>
        )}

        {/* Active filters badge */}
        {activeFiltersCount > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 h-6 w-6 rounded-full",
              "bg-red-500 text-white text-xs font-medium",
              "flex items-center justify-center",
              "border-2 border-white dark:border-licorice",
              "animate-in zoom-in-50 duration-200",
            )}
          >
            {activeFiltersCount > 9 ? "9+" : activeFiltersCount}
          </span>
        )}

        <span className="sr-only">Open filters {activeFiltersCount > 0 && `(${activeFiltersCount} active)`}</span>
      </Button>
    </div>
  )
}
