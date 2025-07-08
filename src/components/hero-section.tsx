import { BadgeCustom } from '@/components/ui/badge-custom';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-warm-50 to-sage-50 dark:from-licorice dark:to-night rounded-3xl mx-4 mb-8 overflow-hidden transition-colors">
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <Image
          src="/placeholder.svg"
          alt="Elegant Furniture"
          fill
          className="w-full h-full object-cover opacity-60 dark:opacity-30"
          priority
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
  );
}
