"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useCartStore } from "../stores/cart-store"
import { Menu, X, Home, Package, ShoppingCart, User, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MobileMenuOverlayProps {
  className?: string
}

export function MobileMenuOverlay({ className }: MobileMenuOverlayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const itemCount = useCartStore((state) => state.itemCount())

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Close menu when route changes
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const menuItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: Package,
      label: "Products",
      href: "/products",
    },
    {
      icon: ShoppingCart,
      label: "Cart",
      href: "/cart",
      badge: itemCount > 0 ? itemCount : undefined,
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
    },
  ]

  return (
    <div className={cn("md:hidden", className)}>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="hover:bg-gray-100 dark:hover:bg-licorice/70"
      >
        <Menu className="h-5 w-5 text-gray-700 dark:text-silver" />
        <span className="sr-only">Open navigation menu</span>
      </Button>

      {/* Overlay Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-night border-r border-gray-200 dark:border-licorice/50 z-50 animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-licorice/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black dark:bg-white rounded-sm flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white dark:border-black rounded-sm"></div>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">mini commerce</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-licorice"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-silver" />
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-licorice/50 transition-colors group">
                          <div className="flex items-center space-x-4">
                            <Icon className="h-6 w-6 text-gray-600 dark:text-silver" />
                            <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.badge && (
                              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="h-4 w-4 text-gray-400 dark:text-silver/50" />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </nav>

                {/* Theme Toggle */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-licorice/50">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-licorice/50">
                    <span className="font-medium text-gray-900 dark:text-white">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-licorice/50">
                <div className="text-center text-sm text-gray-500 dark:text-silver/70">
                  <p>©2023 mini commerce</p>
                  <p>All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
