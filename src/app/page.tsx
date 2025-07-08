'use client';

import { Layout } from '@/components/layout';
import { HeroSection } from '@/components/hero-section';
import { ProductsSection } from '@/components/products-section';
import { BadgeCustom } from '@/components/ui/badge-custom';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { useFeaturedProducts } from '../hooks/use-products-query';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { data: featuredProducts, isLoading, error, refetch } = useFeaturedProducts();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products Section with Filters */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-gray-600 dark:text-silver">Loading featured products...</p>
            </div>
          </div>
        ) : error ? (
          <ErrorMessage
            title="Failed to load featured products"
            message="We couldn't load the featured products. Please try again."
            onRetry={() => refetch()}
            className="py-16"
          />
        ) : (
          <ProductsSection
            products={featuredProducts}
            title="Featured Products"
            description="Discover our handpicked selection of premium furniture pieces"
            showFilters={true} // Enable filters on home page
            className="mb-16"
          />
        )}

        {/* Marketing Section */}
        <div className="bg-gradient-to-r from-warm-50 to-sage-50 dark:from-licorice dark:to-night rounded-3xl p-8 md:p-12 relative overflow-hidden mb-12 transition-colors border border-gray-100 dark:border-licorice/50">
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <Image
              src="/placeholder.svg"
              alt="Natural wood texture"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="relative max-w-2xl">
            <BadgeCustom variant="secondary" className="mb-4">
              Modern Furniture
            </BadgeCustom>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Furniture Is Unique & Cosy!
            </h2>
            <p className="text-gray-700 dark:text-silver leading-relaxed">
              If you redecorated in recent years, you may have opted for the popular neutral tones
              that have dominated interior design. Think bright and airy decor with white walls,
              off-white rugs and neutral colors chairs.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <BadgeCustom variant="secondary" className="mb-4">
            Build custom furniture
          </BadgeCustom>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Craft Own Furniture
          </h2>
          <div className="space-x-4">
            <Button className="rounded-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-silver text-white dark:text-black px-8">
              Let&apos;s Talk!
            </Button>
            <Link href="/products">
              <Button
                variant="outline"
                className="rounded-full bg-transparent border-gray-300 dark:border-silver/30 text-gray-700 dark:text-silver hover:bg-gray-50 dark:hover:bg-licorice/50 px-8"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
