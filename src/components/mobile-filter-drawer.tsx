"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileFilterDrawerProps {
  onFiltersChange?: (filters: any) => void
  className?: string
}

export function MobileFilterDrawer({ onFiltersChange, className }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Show the floating button only on mobile/tablet screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 1024) // Show on screens smaller than lg breakpoint
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Floating Filter Button */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 lg:hidden",
          "animate-in slide-in-from-bottom-2 duration-300",
          className,
        )}
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className={cn(
                "rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                "bg-black dark:bg-white text-white dark:text-black",
                "hover:bg-gray-800 dark:hover:bg-silver",
                "h-14 w-14 p-0",
                "border-2 border-white dark:border-licorice",
              )}
            >
              <Filter className="h-6 w-6" />
              <span className="sr-only">Open filters</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className={cn(
              "h-[85vh] bg-white dark:bg-licorice border-t border-gray-200 dark:border-licorice/50",
              "rounded-t-3xl p-0 overflow-hidden",
            )}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-licorice/50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-white">Filters</SheetTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-night"
                  >
                    <X className="h-5 w-5 text-gray-600 dark:text-silver" />
                  </Button>
                </div>
                {/* Drag Handle */}
                <div className="w-12 h-1 bg-gray-300 dark:bg-silver/50 rounded-full mx-auto mt-2" />
              </SheetHeader>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <FilterSidebar onFiltersChange={onFiltersChange} />
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-licorice/50 flex-shrink-0">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-night"
                    onClick={() => {
                      // Reset filters
                      onFiltersChange?.({ categories: ["all"], priceRange: [200, 600], colors: [] })
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-silver"
                    onClick={() => setIsOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Backdrop overlay when drawer is open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
