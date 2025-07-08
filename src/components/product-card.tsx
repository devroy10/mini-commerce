'use client';

import type React from 'react';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCustom } from '@/components/ui/badge-custom';
import { Price } from '@/components/ui/price';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '../types';
import { useCartStore } from '../stores/cart-store';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  const addToCart = useCartStore((state) => state.addToCart);
  const isInCart = useCartStore((state) => state.isInCart(product.id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>,
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 dark:text-silver/50">
          ☆
        </span>,
      );
    }

    return stars;
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card
        className={cn(
          'group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-white dark:bg-licorice rounded-2xl overflow-hidden',
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square bg-gray-100 dark:bg-night rounded-2xl m-4 mb-0 overflow-hidden">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <BadgeCustom variant="secondary" className="text-xs">
                  New
                </BadgeCustom>
              )}
              {isInCart && (
                <BadgeCustom
                  variant="outline"
                  className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                >
                  In Cart
                </BadgeCustom>
              )}
            </div>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className={cn(
                'absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white/90 dark:bg-licorice/90 backdrop-blur-sm transition-all',
                'hover:bg-white dark:hover:bg-licorice hover:scale-110',
                isFavorite && 'text-red-500',
              )}
            >
              <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
            </Button>

            {/* Add to Cart Button - Shows on Hover */}
            <div
              className={cn(
                'absolute bottom-3 left-3 right-3 transition-all duration-300',
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              )}
            >
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-silver text-white dark:text-black"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {isInCart ? 'Add More' : 'Add to Cart'}
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 pt-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-silver transition-colors">
                {product.name}
              </h3>

              <Price amount={product.price} size="md" className="text-gray-900 dark:text-white" />

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-1 text-sm">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-gray-500 dark:text-silver">({product.reviewCount})</span>
                </div>
              )}

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex space-x-1 pt-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-200 dark:border-silver/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-silver ml-1">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
