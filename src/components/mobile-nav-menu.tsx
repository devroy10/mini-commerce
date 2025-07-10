"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useCartStore } from "../stores/cart-store"
import { Menu, Home, Package, ShoppingCart, User, Heart, Settings, HelpCircle, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MobileNavMenuProps {
  className?: string
}

export function MobileNavMenu({ className }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const itemCount = useCartStore((state) => state.itemCount())

  // Close menu when route changes (you might want to add route change detection)
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      description: "Browse featured products",
    },
    {
      icon: Package,
      label: "Products",
      href: "/products",
      description: "View all products",
    },
    {
      icon: ShoppingCart,
      label: "Cart",
      href: "/cart",
      description: "View shopping cart",
      badge: itemCount > 0 ? itemCount : undefined,
    },
    {
      icon: Heart,
      label: "Wishlist",
      href: " #",
      description: "Saved items",
      badge: "3", // Mock wishlist count
    },
  ]

  const accountItems = [
    {
      icon: User,
      label: "Profile",
      href: " #",
      description: "Manage your account",
    },
    {
      icon: Settings,
      label: "Settings",
      href: " #",
      description: "App preferences",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "#",
      description: "Get assistance",
    },
  ]

  return (
    <div className={cn("md:hidden", className)}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-licorice/70">
            <Menu className="h-5 w-5 text-gray-700 dark:text-silver" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className={cn(
            "w-80 bg-white dark:bg-night border-r border-gray-200 dark:border-licorice/50",
            "p-0 overflow-hidden",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-licorice/50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black dark:bg-white rounded-sm flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white dark:border-black rounded-sm"></div>
                  </div>
                  <SheetTitle className="text-lg font-semibold text-gray-900 dark:text-white">mini commerce</SheetTitle>
                </div>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-licorice"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-silver" />
                </Button> */}
              </div>
            </SheetHeader>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Main Navigation */}
              <div className="px-6 py-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-silver/70 uppercase tracking-wider mb-3">
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-licorice/50 transition-colors group">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-licorice group-hover:bg-gray-200 dark:group-hover:bg-night transition-colors">
                              <Icon className="h-5 w-5 text-gray-600 dark:text-silver" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                              <p className="text-sm text-gray-500 dark:text-silver/70">{item.description}</p>
                            </div>
                          </div>
                          {item.badge && (
                            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Account Section */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-licorice/50">
                <h3 className="text-sm font-medium text-gray-500 dark:text-silver/70 uppercase tracking-wider mb-3">
                  Account
                </h3>
                <nav className="space-y-1">
                  {accountItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-licorice/50 transition-colors group">
                          <div className="p-2 rounded-lg bg-gray-100 dark:bg-licorice group-hover:bg-gray-200 dark:group-hover:bg-night transition-colors">
                            <Icon className="h-5 w-5 text-gray-600 dark:text-silver" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                            <p className="text-sm text-gray-500 dark:text-silver/70">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Theme Toggle Section */}
              {/* <div className="px-6 py-4 border-t border-gray-200 dark:border-licorice/50">
                <h3 className="text-sm font-medium text-gray-500 dark:text-silver/70 uppercase tracking-wider mb-3">
                  Preferences
                </h3>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-licorice/50">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-night">
                      <Settings className="h-5 w-5 text-gray-600 dark:text-silver" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                      <p className="text-sm text-gray-500 dark:text-silver/70">Switch appearance</p>
                    </div>
                  </div>
                  <ThemeToggle />
                </div>
              </div> */}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-licorice/50 flex-shrink-0 bg-gray-50 dark:bg-licorice/30">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleLinkClick}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
