"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ColorOption {
  id: string
  name: string
  value: string
}

interface ColorSelectorProps {
  colors: ColorOption[]
  selectedColor?: string
  onChange?: (colorId: string) => void
  className?: string
}

export function ColorSelector({ colors, selectedColor, onChange, className }: ColorSelectorProps) {
  const [selected, setSelected] = useState(selectedColor || colors[0]?.id)

  const handleColorSelect = (colorId: string) => {
    setSelected(colorId)
    onChange?.(colorId)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-gray-700">Colours Available</p>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorSelect(color.id)}
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-all",
              selected === color.id ? "border-gray-400 scale-110" : "border-gray-200 hover:border-gray-300",
            )}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}
