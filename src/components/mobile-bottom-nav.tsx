"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "../stores/cart-store"
import { Home, Package, ShoppingCart, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MobileBottomNavProps {
  className?: string
}

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  const [isVisible, setIsVisible] = useState(false)
  const itemCount = useCartStore((state) => state.itemCount())
  const pathname = usePathname()

  // Show only on mobile/tablet screens
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (!isVisible) return null

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      isActive: pathname === "/",
    },
    {
      icon: Package,
      label: "Products",
      href: "/products",
      isActive: pathname === "/products",
    },
    {
      icon: ShoppingCart,
      label: "Cart",
      href: "/cart",
      isActive: pathname === "/cart",
      badge: itemCount > 0 ? itemCount : undefined,
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
      isActive: pathname === "/profile",
    },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
        "bg-white dark:bg-licorice border-t border-gray-200 dark:border-licorice/50",
        "safe-area-inset-bottom",
        className,
      )}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <Button
                variant="ghost"
                className={cn(
                  "flex flex-col items-center justify-center h-16 w-full space-y-1 rounded-xl relative",
                  "hover:bg-gray-50 dark:hover:bg-night/50",
                  item.isActive
                    ? "text-black dark:text-white bg-gray-100 dark:bg-night/70"
                    : "text-gray-600 dark:text-silver",
                )}
              >
                <div className="relative">
                  <Icon className="h-6 w-6" />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
