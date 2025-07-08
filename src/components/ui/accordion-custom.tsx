"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function AccordionCustom({ items, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter((item) => item.defaultOpen).map((item) => item.id)),
  )

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id)
        return (
          <div key={item.id} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {isOpen && <div className="mt-3 text-gray-700 leading-relaxed">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
