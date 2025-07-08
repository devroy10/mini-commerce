"use client"

import { useState, useMemo } from "react"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ErrorMessage } from "@/components/ui/error-message"
import { ProductSkeleton } from "@/components/ui/product-skeleton"
import { MobileFilterModal } from "@/components/mobile-filter-modal"
import { useFilteredProducts } from "../hooks/use-products-query"
import type { Product } from "../types"

interface ProductsSectionProps {
  products?: Product[] // Optional - if provided, use these instead of fetching
  title?: string
  description?: string
  showFilters?: boolean
  maxProducts?: number
  className?: string
}

export function ProductsSection({
  products: providedProducts,
  title,
  description,
  showFilters = true,
  maxProducts,
  className = "",
}: ProductsSectionProps) {
  const [filters, setFilters] = useState({
    categories: ["all"],
    priceRange: [200, 600] as [number, number],
    colors: [] as string[],
  })

  // Use provided products or fetch from API
  const queryResult = useFilteredProducts(filters)
  const { data: fetchedProducts, isLoading, error, refetch } = queryResult

  // Use provided products or fetched products
  const allProducts = providedProducts || fetchedProducts || []

  // Apply filtering to provided products if they exist
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Apply client-side filtering if we have provided products
    if (providedProducts) {
      filtered = providedProducts.filter((product) => {
        // Category filter
        const categoryMatch =
          filters.categories.includes("all") ||
          filters.categories.some((cat) => product.category.toLowerCase().includes(cat.toLowerCase()))

        // Price filter
        const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

        // Color filter
        const colorMatch =
          filters.colors.length === 0 ||
          (product.colors && product.colors.some((color) => filters.colors.includes(color)))

        return categoryMatch && priceMatch && colorMatch
      })
    }

    // Apply max products limit
    if (maxProducts) {
      filtered = filtered.slice(0, maxProducts)
    }

    return filtered
  }, [allProducts, providedProducts, filters, maxProducts])

  // Show loading state only when fetching data (not when using provided products)
  if (!providedProducts && isLoading) {
    return (
      <div className={`flex flex-col lg:flex-row gap-8 ${className}`}>
        {showFilters && (
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-licorice rounded-2xl p-6 border border-gray-100 dark:border-licorice/50">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-night rounded w-3/4" />
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-night rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Show error state only when fetching data fails
  if (!providedProducts && error) {
    return (
      <div className={`${className}`}>
        <ErrorMessage
          title="Failed to load products"
          message="We couldn't load the products. Please try again."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <>
      <div className={`flex flex-col lg:flex-row gap-8 ${className}`}>
        {/* Desktop Sidebar Filters */}
        {showFilters && (
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-licorice rounded-2xl p-6 sticky top-8 border border-gray-100 dark:border-licorice/50">
              <FilterSidebar onFiltersChange={setFilters} />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {(title || description) && (
            <div className="mb-6">
              {title && (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {title} ({filteredProducts.length})
                </h2>
              )}
              {description && <p className="text-gray-600 dark:text-silver">{description}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-silver text-lg">No products found matching your filters.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50"
                onClick={() => setFilters({ categories: ["all"], priceRange: [200, 600], colors: [] })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && <MobileFilterModal onFiltersChange={setFilters} />}
    </>
  )
}
