"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export function ImageGallery({ images, alt, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
        <img
          src={images[selectedImage] || "/placeholder.svg?height=400&width=400"}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "flex-1 aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all",
                selectedImage === index ? "border-gray-400" : "border-transparent hover:border-gray-300",
              )}
            >
              <img
                src={image || "/placeholder.svg?height=100&width=100"}
                alt={`${alt} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
