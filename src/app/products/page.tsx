"use client"

import { Layout } from "@/components/layout"
import { ProductsSection } from "@/components/products-section"
import { BadgeCustom } from "@/components/ui/badge-custom"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <BadgeCustom variant="secondary" className="mb-4">
            Complete Collection
          </BadgeCustom>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of carefully curated furniture and home decor pieces
          </p>
        </div>

        {/* All Products Section - will fetch data internally */}
        <ProductsSection
          title="Products"
          description="Browse through our carefully curated collection of high-quality furniture"
          className="mb-16"
        />

        {/* Call to Action */}
        <div className="text-center">
          <BadgeCustom variant="secondary" className="mb-4">
            Build custom furniture
          </BadgeCustom>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Craft Own Furniture</h2>
          <Button className="rounded-full bg-black hover:bg-gray-800 px-8">Let&apos;s Talk!</Button>
        </div>
      </div>
    </Layout>
  );
}
