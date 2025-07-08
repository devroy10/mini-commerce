'use client';

import { Layout } from '@/components/layout';
import { useCartStore } from '../../stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Price } from '@/components/ui/price';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { BadgeCustom } from '@/components/ui/badge-custom';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const subtotal = total;
  const discount = subtotal * 0.1; // 10% discount
  const deliveryFee = 50;
  const finalTotal = subtotal - discount + deliveryFee;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some beautiful furniture to get started!</p>
          <Link href="/products">
            <Button className="bg-black hover:bg-gray-800 rounded-full px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6">
              {/* Table Header (only on lg+) */}
              <div className="hidden lg:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div className="col-span-6">Product Code</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
                <div className="col-span-2 text-center">Action</div>
              </div>

              {/* Cart Items */}
              {/* Mobile: Cards, Desktop: Table Rows */}
              <div className="mt-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center lg:py-4 lg:border-b lg:border-gray-100"
                  >
                    {/* Mobile Card Layout */}
                    <div className="block lg:hidden bg-gray-50 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center space-x-4 mb-2">
                        <Image
                          src={item.product.image || '/placeholder.svg'}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                          priority={false}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-sm text-gray-600">Set • {item.product.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-600 text-sm">Quantity</span>
                        <QuantitySelector
                          initialValue={item.quantity}
                          onChange={(quantity) => updateQuantity(item.product.id, quantity)}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-600 text-sm">Total</span>
                        <Price amount={item.product.price * item.quantity} size="md" />
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Desktop Table Row Layout */}
                    <>
                      <div className="hidden lg:flex col-span-6 items-center space-x-4">
                        <Image
                          src={item.product.image || '/placeholder.svg'}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                          priority={false}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-sm text-gray-600">
                            Set • Colour: {item.product.category}
                          </p>
                        </div>
                      </div>
                      <div className="hidden lg:flex col-span-2 justify-center">
                        <QuantitySelector
                          initialValue={item.quantity}
                          onChange={(quantity) => updateQuantity(item.product.id, quantity)}
                        />
                      </div>
                      <div className="hidden lg:flex col-span-2 text-center items-center justify-center">
                        <Price amount={item.product.price * item.quantity} size="md" />
                      </div>
                      <div className="hidden lg:flex col-span-2 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  </div>
                ))}
              </div>

              {/* Update Cart Button */}
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="bg-black text-white hover:bg-gray-800 rounded-full px-8"
                >
                  Update Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Discount Voucher */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <Input placeholder="Discount voucher" className="flex-1" />
                  <Button variant="outline" className="bg-transparent">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sub Total</span>
                  <Price amount={subtotal} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount (10%)</span>
                  <span className="text-green-600">
                    -<Price amount={discount} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery fee</span>
                  <Price amount={deliveryFee} />
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <Price amount={finalTotal} size="lg" />
                  </div>
                </div>
              </div>

              {/* Warranty */}
              <div className="mb-6">
                <div className="flex items-start space-x-2">
                  <Checkbox id="warranty" />
                  <label htmlFor="warranty" className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-medium">90 Day Limited Warranty</span> against
                    manufacturer&apos;s defects{' '}
                    <button className="text-blue-600 hover:underline">Details</button>
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3">
                  Checkout Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
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
