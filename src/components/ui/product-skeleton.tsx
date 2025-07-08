import { cn } from "@/lib/utils"

interface ProductSkeletonProps {
  className?: string
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-licorice rounded-2xl overflow-hidden border border-gray-100 dark:border-licorice/50",
        className,
      )}
    >
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="aspect-square bg-gray-200 dark:bg-night rounded-2xl m-4 mb-0" />

        {/* Content skeleton */}
        <div className="p-4 pt-4 space-y-3">
          {/* Title */}
          <div className="h-4 bg-gray-200 dark:bg-night rounded w-3/4" />

          {/* Price */}
          <div className="h-5 bg-gray-200 dark:bg-night rounded w-1/3" />

          {/* Rating */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 dark:bg-night rounded" />
            ))}
          </div>

          {/* Colors */}
          <div className="flex space-x-1 pt-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-night rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
