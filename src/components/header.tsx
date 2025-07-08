"use client"

import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileNavMenu } from "@/components/mobile-nav-menu"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "../stores/cart-store"
import Link from "next/link"

export function Header() {
  const itemCount = useCartStore((state) => state.itemCount())

  return (
    <header className="w-full bg-white dark:bg-licorice border-b border-gray-100 dark:border-licorice/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white dark:border-black rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">mini commerce</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link
                href="/"
                className="text-gray-600 dark:text-silver hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-600 dark:text-silver hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Products
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              {/* <ThemeToggle /> */}

              {/* Cart Icon */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 dark:hover:bg-licorice/70">
                  <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-silver" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Button
                variant="outline"
                className="rounded-full bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50"
              >
                User Profile
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 dark:hover:bg-licorice/70">
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-silver" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <MobileNavMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
