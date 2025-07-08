"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FilterSidebar } from "@/components/filter-sidebar"
import { MobileFilterButton } from "@/components/mobile-filter-button"
import { X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileFilterModalProps {
  onFiltersChange?: (filters: any) => void
  className?: string
}

export function MobileFilterModal({ onFiltersChange, className }: MobileFilterModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFilters, setCurrentFilters] = useState({
    categories: ["all"],
    priceRange: [200, 600] as [number, number],
    colors: [] as string[],
  })

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    let count = 0

    // Count categories (excluding "all")
    if (!currentFilters.categories.includes("all") && currentFilters.categories.length > 0) {
      count += currentFilters.categories.length
    }

    // Count price range (if not default)
    if (currentFilters.priceRange[0] !== 200 || currentFilters.priceRange[1] !== 600) {
      count += 1
    }

    // Count colors
    count += currentFilters.colors.length

    return count
  }

  const handleFiltersChange = (filters: any) => {
    setCurrentFilters(filters)
    onFiltersChange?.(filters)
  }

  const handleClearAll = () => {
    const defaultFilters = {
      categories: ["all"],
      priceRange: [200, 600] as [number, number],
      colors: [] as string[],
    }
    setCurrentFilters(defaultFilters)
    onFiltersChange?.(defaultFilters)
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <>
      {/* Floating Filter Button */}
      <MobileFilterButton
        onClick={() => setIsOpen(true)}
        activeFiltersCount={activeFiltersCount}
        className={className}
      />

      {/* Filter Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={cn(
            "sm:max-w-full sm:h-full sm:max-h-full sm:rounded-none p-0",
            "bg-white dark:bg-night border-0",
            "lg:max-w-md lg:h-auto lg:max-h-[90vh] lg:rounded-2xl lg:border lg:border-gray-200 lg:dark:border-licorice/50",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-licorice/50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-600 dark:text-silver">
                      ({activeFiltersCount} active)
                    </span>
                  )}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-licorice"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-silver" />
                </Button>
              </div>
            </DialogHeader>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <FilterSidebar onFiltersChange={handleFiltersChange} />
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-licorice/50 flex-shrink-0 bg-gray-50 dark:bg-licorice">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-white dark:bg-night border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50"
                  onClick={handleClearAll}
                  disabled={activeFiltersCount === 0}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                <Button
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-silver"
                  onClick={() => setIsOpen(false)}
                >
                  Apply Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-white/20 dark:bg-black/20 px-2 py-0.5 rounded-full text-xs">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
