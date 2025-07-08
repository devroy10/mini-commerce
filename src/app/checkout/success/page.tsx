'use client';

import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { BadgeCustom } from '@/components/ui/badge-custom';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <BadgeCustom variant="secondary" className="text-sm">
            Order #{orderNumber}
          </BadgeCustom>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What happens next?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Confirmation</h3>
              <p className="text-sm text-gray-600">
                You&apos;ll receive an email confirmation with your order details shortly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600">
                We&apos;ll prepare your items for shipment within 1-2 business days.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-sm text-gray-600">
                Your order will be delivered within 5-7 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Method:</span>
              <span className="font-medium">Standard Shipping</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline" className="bg-transparent rounded-full px-8">
              Continue Shopping
            </Button>
          </Link>
          <Button className="bg-black hover:bg-gray-800 rounded-full px-8">Track Your Order</Button>
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
