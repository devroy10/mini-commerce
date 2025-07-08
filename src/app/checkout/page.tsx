"use client"

import type React from "react"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { useCartStore } from "../../stores/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Price } from "@/components/ui/price"
import { CreditCard, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CheckoutFormData {
  // Contact Information
  email: string
  phone: string

  // Shipping Address
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  country: string

  // Payment Information
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string

  // Options
  saveInfo: boolean
  newsletter: boolean
  sameAsBilling: boolean
}

export default function CheckoutPage() {
  const router = useRouter()

  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)
  const clearCart = useCartStore((state) => state.clearCart)

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    saveInfo: false,
    newsletter: false,
    sameAsBilling: true,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = total
  const discount = subtotal * 0.1
  const deliveryFee = 50
  const tax = (subtotal - discount) * 0.08
  const finalTotal = subtotal - discount + deliveryFee + tax

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some items to proceed with checkout</p>
          <Link href="/products">
            <Button className="bg-black hover:bg-gray-800 rounded-full px-8">Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <p className="hidden md:block">Back to Cart</p>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Information", icon: "📝" },
              { step: 2, title: "Shipping", icon: "🚚" },
              { step: 3, title: "Payment", icon: "💳" },
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= item.step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.step}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{item.title}</span>
                {item.step < 3 && <div className="w-16 h-px bg-gray-300 ml-4" />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange("apartment", e.target.value)}
                      placeholder="Apt 4B"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Method</h2>
                <RadioGroup defaultValue="standard" className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 mr-3 text-gray-600" />
                          <div>
                            <div className="font-medium">Standard Shipping</div>
                            <div className="text-sm text-gray-600">5-7 business days</div>
                          </div>
                        </div>
                        <span className="font-medium">$50.00</span>
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <div className="flex-1">
                      <Label htmlFor="express" className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 mr-3 text-gray-600" />
                          <div>
                            <div className="font-medium">Express Shipping</div>
                            <div className="text-sm text-gray-600">2-3 business days</div>
                          </div>
                        </div>
                        <span className="font-medium">$25.00</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>

                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  className="mb-6"
                >
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                      <div className="w-5 h-5 mr-3 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                        P
                      </div>
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          required
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          required
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        required
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image || "/placeholder.svg?height=60&width=60"}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <Price amount={item.product.price * item.quantity} size="sm" />
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <Price amount={subtotal} size="sm" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount (10%)</span>
                    <span className="text-green-600 text-sm">
                      -<Price amount={discount} size="sm" />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <Price amount={deliveryFee} size="sm" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <Price amount={tax} size="sm" />
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <Price amount={finalTotal} size="md" />
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 mb-6 p-3 bg-green-50 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Secure Checkout</span>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Place Order • ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(finalTotal)}`}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}
