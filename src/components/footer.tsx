import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-licorice border-t border-gray-100 dark:border-licorice/50 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Copyright */}
          <div className="text-sm text-gray-600 dark:text-silver">
            <p>©2023, All right reserved.</p>
            <p className="font-medium">SEATIVE DIGITAL</p>
          </div>

          {/* Center - Social Links */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50"
            >
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50"
            >
              Instagram
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50"
            >
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50"
            >
              LinkedIn
            </Button>
          </div>

          {/* Right side - Address */}
          <div className="text-sm text-gray-600 dark:text-silver text-right">
            <p>36 East 78th street</p>
            <p className="font-medium">NEW YORK, NY</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
