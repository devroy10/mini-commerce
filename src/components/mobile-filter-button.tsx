"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileFilterButtonProps {
  onClick: () => void
  activeFiltersCount?: number
  className?: string
}

export function MobileFilterButton({ onClick, activeFiltersCount = 0, className }: MobileFilterButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Show the floating button only on mobile/tablet screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 1024) // Show on screens smaller than lg breakpoint
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 lg:hidden transition-all duration-300",
        isScrolled ? "bottom-8 scale-95" : "bottom-6 scale-100",
        className,
      )}
    >
      <Button
        onClick={onClick}
        size="lg"
        className={cn(
          "rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          "bg-black dark:bg-white text-white dark:text-black",
          "hover:bg-gray-800 dark:hover:bg-silver",
          "h-14 w-14 p-0 relative",
          "border-2 border-white dark:border-licorice",
          activeFiltersCount > 0 && "animate-pulse",
        )}
      >
        <Filter className="h-6 w-6" />

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
