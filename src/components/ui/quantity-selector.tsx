"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
  initialValue?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  className?: string
}

export function QuantitySelector({ initialValue = 1, min = 1, max = 99, onChange, className }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue)

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="h-8 w-8 p-0 rounded-full bg-transparent"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="h-8 w-8 p-0 rounded-full"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
