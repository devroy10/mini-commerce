'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout } from '@/components/layout';
import { ImageGallery } from '@/components/image-gallery';
import { BadgeCustom } from '@/components/ui/badge-custom';
import { Price } from '@/components/ui/price';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { ColorSelector } from '@/components/ui/color-selector';
import { Button } from '@/components/ui/button';
import { AccordionCustom } from '@/components/ui/accordion-custom';
import { ProductCard } from '@/components/product-card';
import { ErrorMessage } from '@/components/ui/error-message';
import { ProductSkeleton } from '@/components/ui/product-skeleton';
import { useCartStore } from '@/stores/cart-store';
import { useProductBySlug, useProductsByCategory } from '@/hooks/use-products-query';
import { Star } from 'lucide-react';

export default function ProductDetailsLayout() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  // const [selectedColor, setSelectedColor] = useState('');

  const addToCart = useCartStore((state) => state.addToCart);

  // Fetch product by slug
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch: refetchProduct,
  } = useProductBySlug(params.slug as string);

  // Fetch similar products by category (only if we have a product)
  const { data: similarProducts, isLoading: similarLoading } = useProductsByCategory(
    product?.category || '',
  );

  // Filter out current product from similar products
  const filteredSimilarProducts =
    similarProducts?.filter((p) => p.slug !== product?.slug).slice(0, 3) || [];

  if (productLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="h-4 bg-gray-200 rounded w-12" />
              <div className="h-4 bg-gray-200 rounded w-1" />
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-4 bg-gray-200 rounded w-1" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Image gallery skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-2xl" />
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex-1 aspect-square bg-gray-200 rounded-lg" />
                  ))}
                </div>
              </div>

              {/* Product info skeleton */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-24" />
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="flex items-center space-x-4">
                    <div className="h-8 bg-gray-200 rounded w-20" />
                    <div className="h-8 bg-gray-200 rounded w-24" />
                  </div>
                  <div className="h-16 bg-gray-200 rounded" />
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
                    ))}
                  </div>
                  <div className="h-12 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (productError || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <ErrorMessage
            title="Product not found"
            message="The product you're looking for doesn't exist or couldn't be loaded."
            onRetry={() => refetchProduct()}
          />
        </div>
      </Layout>
    );
  }

  // Mock additional images for gallery
  const productImages = [product.image, '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'];

  // Mock color options
  const colorOptions = [
    { id: 'sage', name: 'Sage Green', value: '#a3b2a3' },
    { id: 'teal', name: 'Teal', value: '#20b2aa' },
    { id: 'mint', name: 'Mint Green', value: '#98fb98' },
    { id: 'blue', name: 'Sky Blue', value: '#87ceeb' },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  const accordionItems = [
    {
      id: 'additional-info',
      title: 'Additional Information',
      defaultOpen: true,
      content: (
        <p>
          The right coffee table can add the perfect finishing touch to your living room. Some of
          the latest trends include lift-top tables, storage tables and tables with mid-century or
          rustic designs. If you have been looking for a coffee table that is in line with the
          latest trends, you probably know that the choice is endless.
        </p>
      ),
    },
    {
      id: 'designer',
      title: 'Designer',
      content: (
        <div>
          <p className="mb-2">
            <strong>Designer:</strong> Modern Furniture Co.
          </p>
          <p>
            Our design team specializes in creating contemporary furniture pieces that blend
            functionality with aesthetic appeal. Each piece is carefully crafted to meet modern
            living standards.
          </p>
        </div>
      ),
    },
    {
      id: 'usability',
      title: 'Usability',
      content: (
        <div>
          <p className="mb-2">
            <strong>Dimensions:</strong> 24&quot; W x 20&quot; D x 32&quot; H
          </p>
          <p className="mb-2">
            <strong>Weight Capacity:</strong> 250 lbs
          </p>
          <p>
            <strong>Care Instructions:</strong> Clean with a soft, dry cloth. Avoid harsh chemicals
            and direct sunlight to maintain the finish.
          </p>
        </div>
      ),
    },
    {
      id: 'home-decoration',
      title: 'Home Decoration',
      content: (
        <p>
          This versatile piece complements various interior design styles, from minimalist to
          mid-century modern. Its neutral tones make it easy to integrate into existing decor, while
          its unique design serves as a statement piece in any room.
        </p>
      ),
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-900">
            Home
          </a>
          <span>/</span>
          <a href="/products" className="hover:text-gray-900">
            Products
          </a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={productImages} alt={product.name} />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <BadgeCustom variant="secondary" className="mb-4">
                Modern Furniture
              </BadgeCustom>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <Price amount={product.price} size="xl" />
                <QuantitySelector initialValue={quantity} onChange={setQuantity} />
              </div>

              <p className="text-gray-600 mb-4">
                {product.description ||
                  'Browse through our carefully curated collection of high-quality furniture featuring the latest trends and style.'}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1">{renderStars(product.rating || 4.5)}</div>
                <span className="text-gray-600">({product.reviewCount || '4.5k'} reviews)</span>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <ColorSelector colors={colorOptions} />
                {/* <ColorSelector colors={colorOptions} onChange={setSelectedColor} /> */}
              </div>

              {/* Buy Now Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="mb-16">
          <AccordionCustom items={accordionItems} />
        </div>

        {/* Similar Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Furnitures</h2>

          {similarLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : filteredSimilarProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSimilarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No similar products found.</p>
          )}
        </div>

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
