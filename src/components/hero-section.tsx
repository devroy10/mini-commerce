import { BadgeCustom } from "@/components/ui/badge-custom"

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 dark:from-licorice dark:to-night rounded-3xl mx-4 mb-8 overflow-hidden transition-colors">
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Elegant Furniture"
          className="w-full h-full object-cover opacity-60 dark:opacity-30"
        />
      </div>
      <div className="relative px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <BadgeCustom variant="secondary" className="mb-4">
            Modern Furniture
          </BadgeCustom>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Elegant
            <br />
            Furniture
          </h1>
        </div>
      </div>
    </div>
  )
}
