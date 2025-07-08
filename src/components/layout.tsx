"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { MobileBottomNav } from "./mobile-bottom-nav"

interface LayoutProps {
  children: React.ReactNode
  showBottomNav?: boolean
}

export function Layout({ children, showBottomNav = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-night transition-colors">
      <Header />
      <main className={showBottomNav ? "pb-20 lg:pb-0" : ""}>{children}</main>
      <Footer />
      {showBottomNav && <MobileBottomNav />}
    </div>
  )
}
